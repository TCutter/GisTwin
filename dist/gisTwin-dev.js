(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.GisTwin = factory());
}(this, (function () { 'use strict';

  class BaseCamera {
    constructor(opts = {}) {
      this.id = opts.id;
      this._position = opts.position;
      this._heading = opts.heading; // 方位角（z轴）
      this._pitch = opts.pitch; // 仰角（y轴）
      this._roll = opts.roll; // 翻滚角（x轴）
      this._viewerArray = opts.viewerArray;
    }

    /**
     * 平移
     */
    gotoFeat() {}

    lookAtFeat() {}

    focusToFeat() {}

    /**
     * 相机姿态调整
     * @param {*} heading
     */
    setHeading(heading) {
      this._heading = heading;
    }

    setPitch(pitch) {
      this._pitch = pitch;
    }

    setRoll(roll) {
      this._roll = roll;
    }

    setPosition(position) {
      this._position = position;
    }

    /**
     * 视口参数获取
     */

    getHeading() {
      return this._heading;
    }

    getPitch() {
      return this._pitch;
    }

    getRoll() {
      return this._roll;
    }

    getPosition() {
      return this._position;
    }
  }

  class BaseEnvironment {
    constructor(opts = {}) {
      this._atmo = opts.atmo;
      this._skyBox = opts.skyBox;
      this._flg = opts.flg;
      this._particleSystem = opts.particleSystem;
      this._weather = opts.weather;
      this._light = opts.light;
      this._saturation = opts.saturation;
      this._contrast = opts.contrast;
      this._bloom = opts.bloom;
      this._HDR = opts.HDR;
    }

    /**
     * 调整色彩参数
     */
    setLight(light) {
      this._light = light;
    }

    setSaturation(saturation) {
      this._saturation = saturation;
    }

    setContrast(contrast) {
      this._contrast = contrast;
    }

    getLight() {
      return this.light;
    }

    getSaturation() {
      return this._saturation;
    }

    getContrast() {
      return this._contrast;
    }

    /**
     * 场景环境参数
     */
    setBloom(bloom) {
      this._bloom = bloom;
    }

    setHDR() {
      this._HDR = HDR;
    }

    getBloom() {
      return this._bloom;
    }

    getHDR() {
      return this._HDR;
    }

    /**
     * 场景天气设置：晴、多云、阴、雨、雪
     * @param {*} params
     */
    setWeather(weather) {
      this._weather = weather;
    }

    getWeather() {
      return this._weather;
    }
  }

  class BaseLayer {
    constructor(opts = {}) {
      this.id = opts.id;
      this._type = opts.type;
      this._name = opts.name;
      this._source = opts.source;
      this._level = opts.level;
      this._display = opts.display;
      this._position = opts.position;

      this._featuresArray = [];
    }

    /**
     * 图层要素获取
     */
    getFeatures() {
      return this._featuresArray;
    }

    /**
     * 图层新增获取
     */
    addFeatures() {}

    /**
     * 图层删除要素
     */
    removeFeatures(id) {
      let index = this._featuresArray.findIndex((feature) => feature.id === id);
      this._featuresArray.splice(index, 1);
    }

    /**
     * 层级设置
     */
    setLevel(level) {
      this._level = level;
    }

    getLevel() {
      return this._level;
    }

    /**
     * 图层现隐
     */
    setLayerDisplay(display) {
      this._display = display;
    }

    getLayerDisplay() {
      return this._display;
    }

    /**
     * 图层中心位置设置
     */
    setLayerPos(pos) {
      this._position = pos;
    }

    getLayerPos() {
      return this._position;
    }
  }

  class Style {
    constructor(opts = {}) {}

    /**
     * 对象样式实则
     */
    setFeatureStyle() {}

    /**
     * 对象标注设置
     */
    setFeatureLabel() {}
  }

  class BaseFeature {
    constructor(opts = {}) {
      this.id = opts.id;
      this._geometry = opts.geometry;
      this._property = opts.property;
      this._position = opts.position;
      this._display = opts.display;
      this._featureStyle = new Style(opts.featureStyle);
      this._label = opts.label;
    }

    /**
     * 对象位置设置
     */
    setPosition(pos) {
      this._position = pos;
    }

    getPosition() {
      return this._position;
    }

    /**
     * 对象显隐设置
     */
    setDisplay(display) {
      this._display = display;
    }

    getDisplay() {
      return this._display;
    }

    /**
     * 对象样式设置
     */
    setStyle(style) {
      this._featureStyle = new Style(style);
    }

    getStyle() {
      return this._featureStyle;
    }

    /**
     * 对象标注设置
     */
    setLabel(label) {
      this._label = label;
    }

    getLabel() {
      return this._label;
    }
  }

  const ControlMode = {
    default: "default",
    pick: "pick",
    hover: "hover",
    identify: "identify",
    editDrawPoint: "editDrawPoint",
    editDrawLine: "editDrawLine",
    editDrayPolygon: "editDrayPolygon",
  };

  class BaseUIControl {
    constructor(opts = {}) {
      this._controlMode = opts.mode || ControlMode.default;
    }

    /**
     * 切换操作模式
     */
    setMode(mode) {
      this._controlMode = mode;
    }

    getMode() {
      return this._controlMode;
    }

    /**
     * 管理操作模式的参数调整
     */
    setModeParams(params) {
      this._params = params;
    }

    getModeParams() {
      return this._params;
    }
  }

  class EventDispatcher {
    addEventListener(type, listener) {
      if (this._listeners === undefined) this._listeners = {};

      const listeners = this._listeners;

      if (listeners[type] === undefined) {
        listeners[type] = [];
      }

      if (listeners[type].indexOf(listener) === -1) {
        listeners[type].push(listener);
      }
    }

    hasEventListener(type, listener) {
      if (this._listeners === undefined) return false;

      const listeners = this._listeners;

      return (
        listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1
      );
    }

    removeEventListener(type, listener) {
      if (this._listeners === undefined) return;

      const listeners = this._listeners;
      const listenerArray = listeners[type];

      if (listenerArray !== undefined) {
        const index = listenerArray.indexOf(listener);

        if (index !== -1) {
          listenerArray.splice(index, 1);
        }
      }
    }

    dispatchEvent(event) {
      if (this._listeners === undefined) return;

      const listeners = this._listeners;
      const listenerArray = listeners[event.type];

      if (listenerArray !== undefined) {
        event.target = this;

        // Make a copy, in case listeners are removed while iterating.
        const array = listenerArray.slice(0);

        for (let i = 0, l = array.length; i < l; i++) {
          array[i].call(this, event);
        }

        event.target = null;
      }
    }
  }

  class BaseScene extends EventDispatcher {
    constructor(opts = {}) {
      super();
      this._type = opts.type; // 渲染类型

      this.layerList = []; // 多个图层信息
      this.cameraList = []; // 多个相机信息
      this.layer = null; // 当前图层
      this.camera = null; // 当前相机

      this.feature = null;
      this.environment = null;
      this.UIControl = null;
    }

    /**
     * 消息通讯
     * 使用方法：
     * gisTwin.sendMsg("scene", "setCoord", {}, e=> {
          console.log("setCoord callback", e)
        })
        gisTwin.sendMsg("RegisterEvent", "beginPlay", () => {
          console.log("beginPlay")
        })
     * @param {*} className
     * @param {*} funcName
     * @param {Object|Function} params
     * @param {Fuction} callback
     * 
     */
    sendMsg(className, funcName, params, callback) {
      // 事件监听
      if (className === "RegisterEvent") {
        this.addEventListener(funcName, params);
      } else {
        try {
          if (className === "scene") {
            this[funcName](params);
          } else {
            this[className][funcName](params);
          }
          console.log(`${className} - ${funcName} - ${params}`);
          this.sendMsgToRender(funcName, params);
        } catch (err) {
          console.error("SendMsg Error", err);
        }

        callback && this.addEventListener(funcName, callback);
      }
    }

    sendMsgToRender(cmd, params) {}

    /**
     * 坐标系设置
     */
    setCoord() {}

    /**
     * 输出分辨率设置
     */
    setResolution() {}

    /**
     * 获取图层
     */
    getLayer() {}

    /**
     * 新增图层
     */
    addLayer() {}

    /**
     * 根据level将layer排序，level最小的在最上面
     */
    setLayerSort() {
      this.layerList.sort((l1, l2) => l1.level - l2.level);
      this.layer = this.layerList[0];
    }

    /**
     * 删除图层
     */
    removeLayer(id) {
      let index = this.layerList.findIndex((layer) => layer.id == id);
      this.layerList.splice(index, 1); // 前端删除
      this.layer = this.layerList[0];
    }

    /**
     * 新增相机
     */
    addCamera() {}

    /**
     * 场景相机获取
     */
    getCamera() {}

    /**
     * 场景相机应用
     */
    setUsedCamera(id) {
      this.camera = this.cameraList.find((camera) => camera.id === id);
    }

    /**
     * 删除相机
     */
    removeCamera(id) {
      let index = this.cameraList.findIndex((camera) => camera.id === id);
      this.cameraList.splice(index, 1);
      if (this.camera.id == id) {
        this.camera = this.cameraList[0];
      }
    }

    /**
     * 场景环境获取
     */
    getEnvironment() {}

    setFeature() {}

    /**
     * 全局环境设置
     */
    setEnvironment() {}

    setUIControl() {}
  }

  class Cloud extends BaseScene {
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

  class Cloud$1 extends BaseScene {
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
      let layer = new Layer$1(layerOpt);
      this.layerList.push(layer);
      this.setLayerSort();
    }

    addCamera(cameraOpt) {
      let camera = new Camera$1(cameraOpt);
      this.cameraList.push(camera);
    }

    setFeature(featureOpt) {
      this.feature = new Feature$1(featureOpt);
    }

    setEnvironment(environmentOpt) {
      this.environment = new Environment$1(environmentOpt);
    }

    setUIControl(controlOpt) {
      this.UIControl = new UIControl$1(controlOpt);
    }
  }

  class Camera$1 extends BaseCamera {
    constructor(opts) {
      super(opts);
    }
  }

  class Environment$1 extends BaseEnvironment {
    constructor(opts) {
      super(opts);
    }
  }

  class Layer$1 extends BaseLayer {
    constructor(opts) {
      super(opts);
    }

    addFeatures(featureOpt) {
      let feature = new Feature$1(featureOpt);
      this._featuresArray.push(feature);
    }
  }

  class Feature$1 extends BaseFeature {
    constructor(opts) {
      super(opts);
    }
  }

  class UIControl$1 extends BaseUIControl {
    constructor(opts) {
      super(opts);
    }
  }

  // 渲染类型
  const MODE_TYPE = {
    CLOUD: "CLOUD", // 云渲染
    UE: "UE",
    CESIUM: "CESIUM",
  };

  class GisTwin {
    constructor(options = {}) {
      const type = (options.type || "cloud").toUpperCase();
      console.log(`渲染源为： %c${type}`, "color: red");
      if (type === MODE_TYPE.UE) {
        return new Cloud(options);
      } else if (type === MODE_TYPE.CLOUD) {
        return new Cloud$1(options);
      }
    }
  }

  return GisTwin;

})));
