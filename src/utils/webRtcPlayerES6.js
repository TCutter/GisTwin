import adapter from "webrtc-adapter";

class WebRtcPlayerES6 {
  constructor(parOptions = {}) {
    //* *********************
    // Config setup
    //* *********************;
    this.cfg = parOptions.peerConnectionOptions || {};
    this.cfg.sdpSemantics = "unified-plan";
    // If this is true in Chrome 89+ SDP is sent that is incompatible with UE WebRTC and breaks.
    this.cfg.offerExtmapAllowMixed = false;
    this.pcClient = null;
    this.dcClient = null;
    this.tnClient = null;

    this.sdpConstraints = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
    };

    // See https://www.w3.org/TR/webrtc/#dom-rtcdatachannelinit for values
    this.dataChannelOptions = { ordered: true };

    this.video = this.createWebRtcVideo();
  }

  // Create Video element and expose that as a parameter
  createWebRtcVideo() {
    var self = this;
    var video = document.createElement("video");
    video.muted = true;
    video.id = "streamingVideo";
    video.playsInline = true;
    video.addEventListener(
      "loadedmetadata",
      function (e) {
        if (self.onVideoInitialised) {
          self.onVideoInitialised();
        }
      },
      true
    );
    return video;
  }

  onsignalingstatechange(state) {
    console.info("signaling state change:", state);
  }

  oniceconnectionstatechange(state) {
    console.info("ice connection state change:", state);
  }

  onicegatheringstatechange(state) {
    console.info("ice gathering state change:", state);
  }

  handleOnTrack(e) {
    console.log("handleOnTrack", e.streams);
    if (this.video.srcObject !== e.streams[0]) {
      console.log("setting video stream from ontrack");
      this.video.srcObject = e.streams[0];
    }
  }

  setupDataChannel(pc, label, options) {
    try {
      var datachannel = pc.createDataChannel(label, options);
      // console.log(`Created datachannel (${label})`)

      datachannel.onopen = (e) => {
        console.log(`data channel (${label}) connect`);
        if (this.onDataChannelConnected) {
          this.onDataChannelConnected();
        }
      };

      datachannel.onclose = (e) => {
        console.log(`data channel (${label}) closed`);
      };

      datachannel.onmessage = (e) => {
        // console.log(`Got message (${label})`, e.data)
        if (this.onDataChannelMessage) {
          this.onDataChannelMessage(e.data);
        }
      };
      return datachannel;
    } catch (e) {
      console.warn("No data channel", e);
      return null;
    }
  }

  onicecandidate(e) {
    console.log("ICE candidate", e);
    if (e.candidate && e.candidate.candidate) {
      this.onWebRtcCandidate(e.candidate);
    }
  }

  handleCreateOffer(pc) {
    var self = this;
    pc.createOffer(self.sdpConstraints).then(
      function (offer) {
        offer.sdp = offer.sdp.replace(
          "useinbandfec=1",
          "useinbandfec=1;stereo=1;maxaveragebitrate=128000"
        );
        pc.setLocalDescription(offer);
        if (self.onWebRtcOffer) {
          // (andriy): increase start bitrate from 300 kbps to 20 mbps and max bitrate from 2.5 mbps to 100 mbps
          // (100 mbps means we don't restrict encoder at all)
          // after we `setLocalDescription` because other browsers are not c happy to see google-specific config
          offer.sdp = offer.sdp.replace(
            /(a=fmtp:\d+ .*level-asymmetry-allowed=.*)\r\n/gm,
            "$1;x-google-start-bitrate=10000;x-google-max-bitrate=20000\r\n"
          );
          offer.sdp = offer.sdp.replace(/(a=extmap-allow-mixed)\r\n/gm, "");
          self.onWebRtcOffer(offer);
        }
      },
      function () {
        console.warn("Couldn't create offer");
      }
    );
  }

  setupPeerConnection(pc) {
    if (pc.SetBitrate) {
      console.log("Hurray! there's RTCPeerConnection.SetBitrate function");
    }

    // Setup peerConnection events
    pc.onsignalingstatechange = this.onsignalingstatechange;
    pc.oniceconnectionstatechange = this.oniceconnectionstatechange;
    pc.onicegatheringstatechange = this.onicegatheringstatechange;

    pc.ontrack = this.handleOnTrack;
    pc.onicecandidate = this.onicecandidate;
  }

  generateAggregatedStatsFunction() {
    var self = this;
    if (!self.aggregatedStats) {
      self.aggregatedStats = {};
    }

    return function (stats) {
      // console.log('Printing Stats');

      const newStat = {};
      // console.log('----------------------------- Stats start -----------------------------')
      stats.forEach((stat) => {
        //                    console.log(JSON.stringify(stat, undefined, 4));
        if (
          stat.type == "inbound-rtp" &&
          !stat.isRemote &&
          (stat.mediaType == "video" || stat.id.toLowerCase().includes("video"))
        ) {
          newStat.timestamp = stat.timestamp;
          newStat.bytesReceived = stat.bytesReceived;
          newStat.framesDecoded = stat.framesDecoded;
          newStat.packetsLost = stat.packetsLost;
          newStat.bytesReceivedStart =
            self.aggregatedStats && self.aggregatedStats.bytesReceivedStart
              ? self.aggregatedStats.bytesReceivedStart
              : stat.bytesReceived;
          newStat.framesDecodedStart =
            self.aggregatedStats && self.aggregatedStats.framesDecodedStart
              ? self.aggregatedStats.framesDecodedStart
              : stat.framesDecoded;
          newStat.timestampStart =
            self.aggregatedStats && self.aggregatedStats.timestampStart
              ? self.aggregatedStats.timestampStart
              : stat.timestamp;

          if (self.aggregatedStats && self.aggregatedStats.timestamp) {
            if (self.aggregatedStats.bytesReceived) {
              // bitrate = bits received since last time / number of ms since last time
              // This is automatically in kbits (where k=1000) since time is in ms and stat we want is in seconds (so a '* 1000' then a '/ 1000' would negate each other)
              newStat.bitrate =
                (8 *
                  (newStat.bytesReceived -
                    self.aggregatedStats.bytesReceived)) /
                (newStat.timestamp - self.aggregatedStats.timestamp);
              newStat.bitrate = Math.floor(newStat.bitrate);
              newStat.lowBitrate =
                self.aggregatedStats.lowBitrate &&
                self.aggregatedStats.lowBitrate < newStat.bitrate
                  ? self.aggregatedStats.lowBitrate
                  : newStat.bitrate;
              newStat.highBitrate =
                self.aggregatedStats.highBitrate &&
                self.aggregatedStats.highBitrate > newStat.bitrate
                  ? self.aggregatedStats.highBitrate
                  : newStat.bitrate;
            }

            if (self.aggregatedStats.bytesReceivedStart) {
              newStat.avgBitrate =
                (8 *
                  (newStat.bytesReceived -
                    self.aggregatedStats.bytesReceivedStart)) /
                (newStat.timestamp - self.aggregatedStats.timestampStart);
              newStat.avgBitrate = Math.floor(newStat.avgBitrate);
            }

            if (self.aggregatedStats.framesDecoded) {
              // framerate = frames decoded since last time / number of seconds since last time
              newStat.framerate =
                (newStat.framesDecoded - self.aggregatedStats.framesDecoded) /
                ((newStat.timestamp - self.aggregatedStats.timestamp) / 1000);
              newStat.framerate = Math.floor(newStat.framerate);
              newStat.lowFramerate =
                self.aggregatedStats.lowFramerate &&
                self.aggregatedStats.lowFramerate < newStat.framerate
                  ? self.aggregatedStats.lowFramerate
                  : newStat.framerate;
              newStat.highFramerate =
                self.aggregatedStats.highFramerate &&
                self.aggregatedStats.highFramerate > newStat.framerate
                  ? self.aggregatedStats.highFramerate
                  : newStat.framerate;
            }

            if (self.aggregatedStats.framesDecodedStart) {
              newStat.avgframerate =
                (newStat.framesDecoded -
                  self.aggregatedStats.framesDecodedStart) /
                ((newStat.timestamp - self.aggregatedStats.timestampStart) /
                  1000);
              newStat.avgframerate = Math.floor(newStat.avgframerate);
            }
          }
        }

        // Read video track stats
        if (
          stat.type == "track" &&
          (stat.trackIdentifier == "video_label" || stat.kind == "video")
        ) {
          newStat.framesDropped = stat.framesDropped;
          newStat.framesReceived = stat.framesReceived;
          newStat.framesDroppedPercentage =
            (stat.framesDropped / stat.framesReceived) * 100;
          newStat.frameHeight = stat.frameHeight;
          newStat.frameWidth = stat.frameWidth;
          newStat.frameHeightStart =
            self.aggregatedStats && self.aggregatedStats.frameHeightStart
              ? self.aggregatedStats.frameHeightStart
              : stat.frameHeight;
          newStat.frameWidthStart =
            self.aggregatedStats && self.aggregatedStats.frameWidthStart
              ? self.aggregatedStats.frameWidthStart
              : stat.frameWidth;
        }

        if (
          stat.type == "candidate-pair" &&
          stat.hasOwnProperty("currentRoundTripTime") &&
          stat.currentRoundTripTime != 0
        ) {
          newStat.currentRoundTripTime = stat.currentRoundTripTime;
        }
      });

      // console.log(JSON.stringify(newStat));
      self.aggregatedStats = newStat;

      if (self.onAggregatedStats) {
        self.onAggregatedStats(newStat);
      }
    };
  }

  //* *********************
  // Public functions
  //* *********************

  // This is called when revceiving new ice candidates individually instead of part of the offer
  // This is currently not used but would be called externally from this class
  handleCandidateFromServer(iceCandidate) {
    console.log("ICE candidate: ", iceCandidate);
    const candidate = new RTCIceCandidate(iceCandidate);
    this.pcClient.addIceCandidate(candidate).then((_) => {
      console.log("ICE candidate successfully added");
    });
  }

  // Called externaly to create an offer for the server
  createOffer() {
    if (this.pcClient) {
      console.log("Closing existing PeerConnection");
      this.pcClient.close();
      this.pcClient = null;
    }
    this.pcClient = new RTCPeerConnection(this.cfg);
    this.setupPeerConnection(this.pcClient);
    this.dcClient = this.setupDataChannel(
      this.pcClient,
      "cirrus",
      this.dataChannelOptions
    );
    this.handleCreateOffer(this.pcClient);
  }

  // Called externaly when an answer is received from the server
  receiveAnswer(answer) {
    console.log(`Received answer:\n${answer}`);
    var answerDesc = new RTCSessionDescription(answer);
    this.pcClient.setRemoteDescription(answerDesc);
  }

  close() {
    if (this.pcClient) {
      console.log("Closing existing peerClient");
      this.pcClient.close();
      this.pcClient = null;
    }
    if (this.aggregateStatsIntervalId) {
      clearInterval(this.aggregateStatsIntervalId);
    }
  }

  // Sends data across the datachannel
  send(data) {
    if (this.dcClient && this.dcClient.readyState == "open") {
      this.dcClient.send(data);
    }
  }

  getStats(onStats) {
    if (this.pcClient && onStats) {
      this.pcClient.getStats(null).then((stats) => {
        onStats(stats);
      });
    }
  }

  aggregateStats(checkInterval) {
    const calcAggregatedStats = this.generateAggregatedStatsFunction();
    const printAggregatedStats = () => {
      this.getStats(calcAggregatedStats);
    };
    this.aggregateStatsIntervalId = setInterval(
      printAggregatedStats,
      checkInterval
    );
  }
}
export default WebRtcPlayerES6;
