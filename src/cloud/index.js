import {
  BaseCamera,
  BaseEnvironment,
  BaseLayer,
  BaseFeature,
  BaseUIControl,
  BaseScene,
} from "../baseClass";

class Cloud extends BaseScene {
  constructor(opts = {}) {
    super(opts);
    this._cloudUrl = opts.cloudUrl;

    this._webRtcApp = window.$WebRtcApp || {};
    this._webRtcApp.receivedMessagehandlerSet = this.dispatchEvent;
  }

  sendMsgToRender(cmd, params) {
    this._webRtcApp.sendMessageHandler(cmd, params);
  }

  addLayer(layerOpt) {
    let layer = new Layer(layerOpt);
    this.layerList.push(layer);
    this.setLayerSort();
  }

  addCamera(cameraOpt) {
    let camera = new Camera(cameraOpt);
    this.cameraList.push(camera);
  }

  setFeature(featureOpt) {
    this.feature = new Feature(featureOpt);
  }

  setEnvironment(environmentOpt) {
    this.environment = new Environment(environmentOpt);
  }

  setUIControl(controlOpt) {
    this.UIControl = new UIControl(controlOpt);
  }
}

class Camera extends BaseCamera {
  constructor(opts) {
    super(opts);
  }
}

class Environment extends BaseEnvironment {
  constructor(opts) {
    super(opts);
  }
}

class Layer extends BaseLayer {
  constructor(opts) {
    super(opts);
  }

  addFeatures(featureOpt) {
    let feature = new Feature(featureOpt);
    this._featuresArray.push(feature);
  }
}

class Feature extends BaseFeature {
  constructor(opts) {
    super(opts);
  }
}

class UIControl extends BaseUIControl {
  constructor(opts) {
    super(opts);
  }
}

export default Cloud;
