/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("base-build", function (C) {
    var B = C.Base, A = C.Lang;
    B._buildCfg = {aggregates:["ATTRS", "_PLUG", "_UNPLUG"]};
    B.build = function (D, I, M, L) {
        var O = B.build, E = O._getClass(I, L), K = O._getAggregates(I, L), G = E._yuibuild.dynamic, J, H, F, N;
        if (G) {
            if (K) {
                for (J = 0, H = K.length; J < H; ++J) {
                    F = K[J];
                    if (I.hasOwnProperty(F)) {
                        E[F] = A.isArray(I[F]) ? [] : {};
                    }
                }
                C.aggregate(E, I, true, K);
            }
        }
        for (J = 0, H = M.length; J < H; J++) {
            N = M[J];
            if (K) {
                C.aggregate(E, N, true, K);
            }
            C.mix(E, N, true, null, 1);
            E._yuibuild.exts.push(N);
        }
        E.prototype.hasImpl = O._hasImpl;
        if (G) {
            E.NAME = D;
            E.prototype.constructor = E;
        }
        return E;
    };
    C.mix(B.build, {_template:function (D) {
        function E() {
            E.superclass.constructor.apply(this, arguments);
            var H = E._yuibuild.exts, F = H.length, G;
            for (G = 0; G < F; G++) {
                H[G].apply(this, arguments);
            }
            return this;
        }

        C.extend(E, D);
        return E;
    }, _hasImpl:function (G) {
        var J = this._getClasses();
        for (var I = 0, E = J.length; I < E; I++) {
            var D = J[I];
            if (D._yuibuild) {
                var H = D._yuibuild.exts, K = H.length, F;
                for (F = 0; F < K; F++) {
                    if (H[F] === G) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, _getClass:function (D, E) {
        var F = (E && false === E.dynamic) ? false : true, G = (F) ? B.build._template(D) : D;
        G._yuibuild = {id:null, exts:[], dynamic:F};
        return G;
    }, _getAggregates:function (D, E) {
        var F = [], H = (E && E.aggregates), I = D, G;
        while (I && I.prototype) {
            G = I._buildCfg && I._buildCfg.aggregates;
            if (G) {
                F = F.concat(G);
            }
            I = I.superclass ? I.superclass.constructor : null;
        }
        if (H) {
            F = F.concat(H);
        }
        return F;
    }});
}, "3.0.0", {requires:["base-base"]});