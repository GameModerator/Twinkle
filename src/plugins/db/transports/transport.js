class Transport {
    constructor(config) {
        this.config = config;
    }

    list() {
        throw new Error('Unimplemented');
    }

    get(key) {
        throw new Error('Unimplemented');
    }

    set(key, object) {
        throw new Error('Unimplemented');
    }

    delete(key) {
        throw new Error('Unimplemented');
    }

    extend(key, object) {
        throw new Error('Unimplemented');
    }

    push(key, ...items) {
        throw new Error('Unimplemented');
    }

    static extend(obj1, obj2) {
        for (const key in obj2) {
            if (this._isPlainObject(obj2[key]) && this._isPlainObject(obj1[key])) {
                obj2[key] = this.extend(obj1[key], obj2[key]);
            }
        }
    
        return {
            ...obj1,
            ...obj2
        };
    }

    static _isPlainObject(object) {
        return String(object) == '[object Object]';
    }
}

module.exports = Transport;