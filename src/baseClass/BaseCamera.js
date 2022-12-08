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

  focusTo() {}

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
export default BaseCamera;
