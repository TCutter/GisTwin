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
 * @classdesc UE4
 * @extends BaseScene
 */
class UE extends BaseScene {
  constructor(opts = {}) {
    super(opts);

    this.ue4 = window.ue.interface.broadcast;
    this.ue.interface.eventHandler = this.dispatchEvent;
  }

  sendMsgToRender(cmd, params) {
    this.ue4(cmd, params);
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
 * @alias UeCamera
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
 * @alias UeEnvironment
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
 * @alias UeLayer
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
 * @alias UeFeature
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
 * @alias UeUIControl
 */
class UIControl extends BaseUIControl {
  constructor(opts) {
    super(opts);
  }
}

export default UE;
