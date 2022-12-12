import { EventDispatcher } from "../utils/EventDispatcher";

/**
 * @class
 * @classdesc 场景基类
 * @extends EventDispatcher
 * @namespace
 */
class BaseScene extends EventDispatcher {
  constructor(opts = {}) {
    super();
    this.type = opts.type; // 渲染类型

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
   * @param {string} className
   * @param {string} funcName
   * @param {Object} params
   * @param {Fuction} callback
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

  /**
   * 事件机制：发送消息到渲染源
   * @param {string} cmd
   * @param {Object} params
   */
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
  getLayer(id) {
    return this.layerList.find((layer) => layer.id === id);
  }

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
   * @param {string} id
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
   * @param {string} id
   * @returns 相机实例
   */
  getCamera(id) {
    return this.cameraList.find((camera) => camera.id === id);
  }

  /**
   * 场景相机应用
   * @param {string} id
   */
  setUsedCamera(id) {
    this.camera = this.cameraList.find((camera) => camera.id === id);
  }

  /**
   * 删除相机
   * @param {string} id
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

  /**
   *
   */
  setFeature() {}

  /**
   * 全局环境设置
   */
  setEnvironment() {}

  /**
   *
   */
  setUIControl() {}
}

export default BaseScene;
