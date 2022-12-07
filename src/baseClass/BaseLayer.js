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
export default BaseLayer;
