import Style from "../utils/Style";

/**
 * @class
 * @classdesc 对象基类
 * @namespace
 */
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
   * @param {*} pos
   */
  setPosition(pos) {
    this._position = pos;
  }

  /**
   * 获取对象位置
   * @returns position
   */
  getPosition() {
    return this._position;
  }

  /**
   * 对象显隐设置
   * @param {*} display
   */
  setDisplay(display) {
    this._display = display;
  }

  /**
   * 获取对象显隐设置
   * @returns display
   */
  getDisplay() {
    return this._display;
  }

  /**
   * 对象样式设置
   * @param {*} style
   */
  setStyle(style) {
    this._featureStyle = new Style(style);
  }

  /**
   * 获取对象样式
   * @returns featureStyle
   */
  getStyle() {
    return this._featureStyle;
  }

  /**
   * 对象标注设置
   * @param {*} label
   */
  setLabel(label) {
    this._label = label;
  }

  /**
   * 获取对象标注
   * @returns label
   */
  getLabel() {
    return this._label;
  }
}

export default BaseFeature;
