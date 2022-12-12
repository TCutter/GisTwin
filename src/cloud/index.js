import {
  BaseCamera,
  BaseEnvironment,
  BaseLayer,
  BaseFeature,
  BaseUIControl,
  BaseScene,
} from "../baseClass";

/**
 * @class
 * @classdesc 云渲染源
 * @extends BaseScene
 */
class Cloud extends BaseScene {
  constructor(opts = {}) {
    super(opts);
    this._cloudUrl = opts.cloudUrl;

    this._webRtcApp = window.$WebRtcApp || {};
    this._WebRtcApp.load(this._cloudUrl);
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

/**
 * @class
 * @classdesc 相机
 * @extends BaseCamera
 * @alias CloudCamera
 */
class Camera extends BaseCamera {
  constructor(opts) {
    super(opts);
  }
}

/**
 * @class
 * @classdesc 全局环境
 * @extends BaseEnvironment
 * @alias CloudEnvironment
 */
class Environment extends BaseEnvironment {
  constructor(opts) {
    super(opts);
  }
}

/**
 * @class
 * @classdesc 图层
 * @extends BaseLayer
 * @alias CloudLayer
 */
class Layer extends BaseLayer {
  constructor(opts) {
    super(opts);
  }

  addFeatures(featureOpt) {
    let feature = new Feature(featureOpt);
    this._featuresArray.push(feature);
  }
}

/**
 * @class
 * @classdesc 对象管理
 * @extends BaseFeature
 * @name CloudFeature
 */
class Feature extends BaseFeature {
  constructor(opts) {
    super(opts);
  }
}

/**
 * @class
 * @classdesc UI控制对象
 * @extends BaseUIControl
 * @alias CloudUIControl
 */
class UIControl extends BaseUIControl {
  constructor(opts) {
    super(opts);
  }
}

export default Cloud;
