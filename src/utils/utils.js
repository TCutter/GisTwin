export const proxy = (target, sourceKey, key) => {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function proxyGetter() {
      return this[sourceKey][key];
    },
    set: function proxySetter(val) {
      this[sourceKey][key] = val;
    },
  });
};
