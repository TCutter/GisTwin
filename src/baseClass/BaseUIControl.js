/**
 * 操作模式
 * @const
 */
const ControlMode = {
  default: "default",
  pick: "pick",
  hover: "hover",
  identify: "identify",
  editDrawPoint: "editDrawPoint",
  editDrawLine: "editDrawLine",
  editDrayPolygon: "editDrayPolygon",
};

/**
 * @class
 * @classdesc UI控制基类
 * @namespace
 */
class BaseUIControl {
  constructor(opts = {}) {
    this._controlMode = opts.mode || ControlMode.default;
  }

  /**
   * 切换操作模式
   * @param {string} mode
   */
  setMode(mode) {
    this._controlMode = mode;
  }

  getMode() {
    return this._controlMode;
  }

  /**
   * 管理操作模式的参数调整
   * @param {*} params
   */
  setModeParams(params) {
    this._params = params;
  }

  getModeParams() {
    return this._params;
  }
}

export default BaseUIControl;
