((definition)=>{
    "use strict";

    var moduleName = "uiSmoothscroll";

    var root = (typeof self === "object" && self.self === self && self) || (typeof global === "object" && global.global === global && global);

    if (typeof exports === "object"){
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})((root, $)=>{
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------
    const isUndefined = (obj)=>{ return obj === void 0; }

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
    const factory = (param)=>{

        var rootElement = ".js-smoothscroll";
        var opt = !isUndefined(param) ? param : {};

        var $list;
        if (isUndefined(opt.root)) $list = $(rootElement);
        if (!isUndefined(opt.root)) $list = opt.root instanceof jQuery ? param.root : $(param.root);

        var length = $list.length;
        var mappedlist = [];
        for (var i = 0; i < length; i++) {
            mappedlist[i] = new Module(opt, $list[i]);
        };
        return mappedlist;
    }


    /**
     * constructor
     * @type {Function}
     */
    function Module(opt, moduleRoot){

        // options
        this.opt = {
            speed: !isUndefined(opt.speed) ? opt.speed : 500,
            easing: !isUndefined(opt.easing) ? opt.easing : "swing",
        };

        // elements
        this.$root = $(moduleRoot);
        this.href = this.$root.attr("href");

        // false no have id at target
        if( !$(this.href)[0] ) throw new Error("have to attribute id assigned anchor");


        this.init();

        // set event
        this.setClickEvent();
    }

    Module.prototype.init = function(){
        this.setTarget();
        this.setAnimateParam();
    };

    Module.prototype.setTarget = function(){
        this.$target = $(this.href);
    };

    Module.prototype.setAnimateParam = function(){
        this.animateParam = {
            scrollTop: this.$target.offset().top
        };
    };

    Module.prototype.setClickEvent = function(){
        this.$root.on( "click", ()=>{
            this.moveAnchor();
            return false;
        });
    };

    Module.prototype.moveAnchor = function(){
        $("html, body").animate( this.animateParam, this.opt.speed, this.opt.easing );
    };

    return factory;
});
