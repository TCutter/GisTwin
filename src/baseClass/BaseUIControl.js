const ControlMode = {
  default: "default",
  pick: "pick",
  hover: "hover",
  identify: "identify",
  editDrawPoint: "editDrawPoint",
  editDrawLine: "editDrawLine",
  editDrayPolygon: "editDrayPolygon",
};

class BaseUIControl {
  constructor(opts = {}) {
    this._controlMode = opts.mode || ControlMode.default;
  }

  /**
   * 切换操作模式
   */
  setMode(mode) {
    this._controlMode = mode;
  }

  getMode() {
    return this._controlMode;
  }

  /**
   * 管理操作模式的参数调整
   */
  setModeParams(params) {
    this._params = params;
  }

  getModeParams() {
    return this._params;
  }
}

export default BaseUIControl;
