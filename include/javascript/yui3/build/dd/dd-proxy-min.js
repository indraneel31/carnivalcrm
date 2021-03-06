/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("dd-proxy", function (H) {
    var F = H.DD.DDM, B = "node", C = "dragNode", A = "host", D = true;
    var G = function (I) {
        G.superclass.constructor.apply(this, arguments);
    };
    G.NAME = "DDProxy";
    G.NS = "proxy";
    G.ATTRS = {host:{}, moveOnEnd:{value:D}, hideOnEnd:{value:D}, resizeFrame:{value:D}, positionProxy:{value:D}, borderStyle:{value:"1px solid #808080"}};
    var E = {_hands:null, _init:function () {
        if (!F._proxy) {
            H.on("domready", H.bind(this._init, this));
            return;
        }
        if (!this._hands) {
            this._hands = [];
        }
        var K, L, J, M = this.get(A), I = M.get(C);
        if (I.compareTo(M.get(B))) {
            if (F._proxy) {
                M.set(C, F._proxy);
            }
        }
        H.each(this._hands, function (N) {
            N.detach();
        });
        L = F.on("ddm:start", H.bind(function () {
            if (F.activeDrag === M) {
                F._setFrame(M);
            }
        }, this));
        J = F.on("ddm:end", H.bind(function () {
            if (M.get("dragging")) {
                if (this.get("moveOnEnd")) {
                    M.get(B).setXY(M.lastXY);
                }
                if (this.get("hideOnEnd")) {
                    M.get(C).setStyle("display", "none");
                }
            }
        }, this));
        this._hands = [L, J];
    }, initializer:function () {
        this._init();
    }, destructor:function () {
        var I = this.get(A);
        H.each(this._hands, function (J) {
            J.detach();
        });
        I.set(C, I.get(B));
    }};
    H.namespace("Plugin");
    H.extend(G, H.Base, E);
    H.Plugin.DDProxy = G;
    H.mix(F, {_createFrame:function () {
        if (!F._proxy) {
            F._proxy = D;
            var J = H.Node.create("<div></div>"), I = H.Node.get("body");
            J.setStyles({position:"absolute", display:"none", zIndex:"999", top:"-999px", left:"-999px"});
            I.insertBefore(J, I.get("firstChild"));
            J.set("id", H.stamp(J));
            J.addClass(F.CSS_PREFIX + "-proxy");
            F._proxy = J;
        }
    }, _setFrame:function (J) {
        var M = J.get(B), L = J.get(C), I, K = "auto";
        if (J.proxy.get("resizeFrame")) {
            F._proxy.setStyles({height:M.get("offsetHeight") + "px", width:M.get("offsetWidth") + "px"});
        }
        I = F.activeDrag.get("activeHandle");
        if (I) {
            K = I.getStyle("cursor");
        }
        if (K == "auto") {
            K = F.get("dragCursor");
        }
        L.setStyles({visibility:"hidden", display:"block", cursor:K, border:J.proxy.get("borderStyle")});
        if (J.proxy.get("positionProxy")) {
            L.setXY(J.nodeXY);
        }
        L.setStyle("visibility", "visible");
    }});
    H.on("domready", H.bind(F._createFrame, F));
}, "3.0.0", {requires:["dd-ddm", "dd-drag"], skinnable:false});