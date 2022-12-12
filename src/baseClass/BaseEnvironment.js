/**
 * @class
 * @classdesc 全局环境配置基类
 * @namespace
 */
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
   * @param {*} light
   */
  setLight(light) {
    this._light = light;
  }

  /**
   *
   * @param {*} saturation
   */
  setSaturation(saturation) {
    this._saturation = saturation;
  }

  /**
   *
   * @param {*} contrast
   */
  setContrast(contrast) {
    this._contrast = contrast;
  }

  /**
   * 获取light
   * @returns light
   */
  getLight() {
    return this._light;
  }

  /**
   * 获取saturation
   * @returns saturation
   */
  getSaturation() {
    return this._saturation;
  }

  /**
   * 获取contrast
   * @returns contrast
   */
  getContrast() {
    return this._contrast;
  }

  /**
   * 场景环境参数
   * @param {*} bloom
   */
  setBloom(bloom) {
    this._bloom = bloom;
  }

  /**
   *
   */
  setHDR() {
    this._HDR = HDR;
  }

  /**
   * 获取bloom
   * @returns bloom
   */
  getBloom() {
    return this._bloom;
  }

  /**
   * 获取HDR
   * @returns HDR
   */
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

  /**
   * 获取天气
   * @returns weather
   */
  getWeather() {
    return this._weather;
  }
}
export default BaseEnvironment;
