/**
 * @class
 * @classdesc 相机基类
 * @namespace
 */
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
  goto() {}

  lookAt() {}

  /**
   * 定位
   */
  focusTo() {}

  /**
   * 相机姿态调整
   * @param {*} heading
   */
  setHeading(heading) {
    this._heading = heading;
  }

  /**
   *
   * @param {*} pitch
   */
  setPitch(pitch) {
    this._pitch = pitch;
  }

  /**
   *
   * @param {*} roll
   */
  setRoll(roll) {
    this._roll = roll;
  }

  /**
   *
   * @param {*} position
   */
  setPosition(position) {
    this._position = position;
  }

  /**
   * 视口参数获取
   */
  getHeading() {
    return this._heading;
  }

  /**
   * 获取pitch
   * @returns pitch
   */
  getPitch() {
    return this._pitch;
  }

  /**
   * 获取roll
   * @returns roll
   */
  getRoll() {
    return this._roll;
  }

  /**
   * 获取position
   * @returns position
   */
  getPosition() {
    return this._position;
  }
}
export default BaseCamera;
