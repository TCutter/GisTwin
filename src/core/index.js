import UE from "../ue";
import Cloud from "../cloud";
import { MODE_TYPE } from "../utils/const";

class GisTwin {
  constructor(opts = {}) {
    const type = (opts.type || "cloud").toUpperCase();
    console.log(`渲染源为： %c${type}`, "color: red");
    if (type === MODE_TYPE.UE) {
      return new UE(opts);
    } else if (type === MODE_TYPE.CLOUD) {
      return new Cloud(opts);
    }
  }
}

export default GisTwin;
