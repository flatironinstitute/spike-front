import lru from "lru-cache";

// maxAge is in ms
export var cache = lru({
  maxAge: 8.64e7,
  length: function(n) {
    return n.length;
  }
});

export const set = (key, value) => {
  cache.set(key, value);
};

export const get = key => {
  return cache.get(key);
};

// export default {
//   get,
//   set
// };
