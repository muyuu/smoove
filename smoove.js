"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (definition) {
    "use strict";

    var moduleName = "smoove";

    var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" && global.global === global && global;

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})(function (root, $) {
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------

    var isUndefined = function isUndefined(obj) {
        return obj === void 0;
    };

    // -------------------------------------------------------
    // module
    // -------------------------------------------------------

    /**
     * module factory
     * this module is dependent on jQuery
     * @prop {string} rootElement default root element class or id
     * @prop {array} instance
     * @namespace
     */
    var factory = function factory(param) {

        var rootElement = ".js-smoove";
        var opt = !isUndefined(param) ? param : {};

        var $list;
        if (isUndefined(opt.root)) $list = $(rootElement);
        if (!isUndefined(opt.root)) $list = opt.root instanceof $ ? param.root : $(param.root);

        var length = $list.length;
        var mappedlist = [];
        for (var i = 0; i < length; i++) {
            mappedlist[i] = new Module(opt, $list[i]);
        };
        return mappedlist;
    };

    /**
     * constructor
     * @type {Function}
     */
    function Module(opt, moduleRoot) {

        // options
        this.opt = {
            speed: !isUndefined(opt.speed) ? opt.speed : 500,
            easing: !isUndefined(opt.easing) ? opt.easing : "swing"
        };

        // elements
        this.$root = $(moduleRoot);
        this.href = this.$root.attr("href");

        // false no have id at target
        if (!$(this.href)[0]) throw new Error("have to attribute id assigned anchor");

        this.init();

        // set event
        this.setClickEvent();
    }

    Module.prototype.init = function () {
        this.setTarget();
    };

    Module.prototype.setTarget = function () {
        this.$target = $(this.href);
        return this;
    };

    Module.prototype.setAnimateParam = function () {
        this.animateParam = {
            scrollTop: this.$target.offset().top
        };
        return this;
    };

    Module.prototype.setClickEvent = function () {
        var _this = this;

        this.$root.on("click", function () {
            _this.setAnimateParam().moveAnchor();
            return false;
        });
    };

    Module.prototype.moveAnchor = function () {
        $("html, body").animate(this.animateParam, this.opt.speed, this.opt.easing);
        return this;
    };

    return factory;
});