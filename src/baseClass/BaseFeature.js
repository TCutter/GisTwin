import Style from "../utils/Style";
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

export default BaseFeature;
