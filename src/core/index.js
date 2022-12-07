import UE from "../ue";
import Cloud from "../cloud";
import { MODE_TYPE } from "../utils/const";

class GisTwin {
  constructor(options = {}) {
    const type = (options.type || "cloud").toUpperCase();
    console.log(`渲染源为： %c${type}`, "color: red");
    if (type === MODE_TYPE.UE) {
      return new UE(options);
    } else if (type === MODE_TYPE.CLOUD) {
      return new Cloud(options);
    }
  }
}

export default GisTwin;
