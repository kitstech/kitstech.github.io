/**
 * KITS
 * Individual
 * Toolkit
 * Suite
 * https://github.com/kitstech/KitsIndividualToolkitSuite
 */
const kits = {};

kits.ajax = function(url, param, callback, method) {
    const that = this;
    param = that.toQueryString(param);
    method = method || 'POST';
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url + ((method === 'POST') ? '' : ('?' + param)));
        xhr.onload = () => resolve(xhr);
        xhr.onerror = () => reject(xhr);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send((method === 'POST') ? param : null);
    });
    p.then(function(httpRequest) {
        if(typeof callback === 'function' && that.isJsonString(httpRequest.responseText)) {
            callback(JSON.parse(httpRequest.responseText), true, httpRequest);
        }
    }).catch(function(httpRequest) {
        callback({}, false, httpRequest);
    });
};

kits.isJsonString = function(s) {
    try {
        const json = JSON.parse(s);
        return (typeof json === 'object');
    } catch(e) {
        return false;
    }
};

kits.toQueryString = function(param) {
    if(typeof param === 'string') {
        //key1=value1&key2=value2 ...
    } else {
        param = Object.keys(param).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(param[k]);
        }).join('&');
    }
    return param;
};

kits.loading = {
    vars: {
        loadingLayerId: 'loading-layer',
        loadingTextId: 'loading-text',
        defaultText: 'Processing',
        flagClassName: 'off'
    },
    init: function() {
        if(!this.isExist()) {
            const target = document.body;

            const outer = document.createElement('div');
            outer.id = this.vars.loadingLayerId;
            outer.classList.add(this.vars.flagClassName);

            const inner = document.createElement('div');
            inner.classList.add('loading-container');

            const div = document.createElement('div');
            div.classList.add('loading');

            const txt = document.createElement('div');
            txt.id = this.vars.loadingTextId;

            inner.append(div);
            inner.append(txt);
            
            outer.append(inner);

            target.prepend(outer);
        }
    },
    show: function(text) {
        if(!this.isExist()) {
            this.init();
        }
        const el1 = document.getElementById(this.vars.loadingLayerId);
        el1.classList.remove(this.vars.flagClassName);

        const el2 = document.getElementById(this.vars.loadingTextId);
        el2.innerHTML = (typeof text === 'undefined') ? this.vars.defaultText : text;
    },
    hide: function() {
        if(this.isExist()) {
            const el1 = document.getElementById(this.vars.loadingLayerId);
            el1.classList.add(this.vars.flagClassName);
        }
    },
    isExist: function() {
        return document.getElementById(this.vars.loadingLayerId) === null ? false : true;
    }
};