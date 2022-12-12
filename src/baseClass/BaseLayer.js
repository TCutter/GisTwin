/**
 * @class
 * @classdesc 图层基类
 * @namespace
 */
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
   * @returns featuresArray
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
   * @param {*} id
   */
  removeFeatures(id) {
    let index = this._featuresArray.findIndex((feature) => feature.id === id);
    this._featuresArray.splice(index, 1);
  }

  /**
   * 层级设置
   * @param {*} level
   */
  setLevel(level) {
    this._level = level;
  }

  /**
   * 获取图层层级
   * @returns level
   */
  getLevel() {
    return this._level;
  }

  /**
   * 设置图层现隐
   * @param {*} display
   */
  setLayerDisplay(display) {
    this._display = display;
  }

  /**
   * 获取图层显隐
   * @returns display
   */
  getLayerDisplay() {
    return this._display;
  }

  /**
   * 图层中心位置设置
   * @param {*} pos
   */
  setLayerPos(pos) {
    this._position = pos;
  }

  /**
   * 图层中心位置获取
   * @returns position
   */
  getLayerPos() {
    return this._position;
  }
}
export default BaseLayer;
