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
export default BaseEnvironment;
