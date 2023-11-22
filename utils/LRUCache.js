/**
 * LRU缓存算法
 * 剔除最近没有使用的数据
 */
class LRUCache {
    #map;
    #length;
    constructor(length) {
        // Map类型是键值对的有序列表，而键和值都可以是任意类型
        this.#map = new Map();
        this.#length = length;
    }

    get(key) {
        if (!this.#map.has(key)) {
            return;
        }
        const value = this.#map.get(key);
        this.#map.delete(key);
        this.#map.set(key, value); 
        return value;
    }

    set(key, value) {
        if (this.#map.has(key)) {
            this.#map.delete(key);
        }
        this.#map.set(key, value);
        if (this.#map.size > this.#length) {
            const firstKey = this.#map.keys().next().value;
            this.#map.delete(firstKey);
        }
    }
}