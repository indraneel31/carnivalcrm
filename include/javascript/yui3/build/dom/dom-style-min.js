/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("dom-style", function (A) {
    (function (E) {
        var C = "documentElement", B = "defaultView", D = "ownerDocument", L = "style", N = "float", F = "cssFloat", G = "styleFloat", J = "transparent", H = "getComputedStyle", M = E.config.doc, I = undefined, K = /color$/i;
        E.mix(E.DOM, {CUSTOM_STYLES:{}, setStyle:function (R, O, S, Q) {
            Q = Q || R.style;
            var P = E.DOM.CUSTOM_STYLES;
            if (Q) {
                if (S === null) {
                    S = "";
                }
                if (O in P) {
                    if (P[O].set) {
                        P[O].set(R, S, Q);
                        return;
                    } else {
                        if (typeof P[O] === "string") {
                            O = P[O];
                        }
                    }
                }
                Q[O] = S;
            }
        }, getStyle:function (R, O) {
            var Q = R[L], P = E.DOM.CUSTOM_STYLES, S = "";
            if (Q) {
                if (O in P) {
                    if (P[O].get) {
                        return P[O].get(R, O, Q);
                    } else {
                        if (typeof P[O] === "string") {
                            O = P[O];
                        }
                    }
                }
                S = Q[O];
                if (S === "") {
                    S = E.DOM[H](R, O);
                }
            }
            return S;
        }, setStyles:function (P, Q) {
            var O = P.style;
            E.each(Q, function (R, S) {
                E.DOM.setStyle(P, S, R, O);
            }, E.DOM);
        }, getComputedStyle:function (P, O) {
            var R = "", Q = P[D];
            if (P[L]) {
                R = Q[B][H](P, null)[O];
            }
            return R;
        }});
        if (M[C][L][F] !== I) {
            E.DOM.CUSTOM_STYLES[N] = F;
        } else {
            if (M[C][L][G] !== I) {
                E.DOM.CUSTOM_STYLES[N] = G;
            }
        }
        if (E.UA.opera) {
            E.DOM[H] = function (Q, P) {
                var O = Q[D][B], R = O[H](Q, "")[P];
                if (K.test(P)) {
                    R = E.Color.toRGB(R);
                }
                return R;
            };
        }
        if (E.UA.webkit) {
            E.DOM[H] = function (Q, P) {
                var O = Q[D][B], R = O[H](Q, "")[P];
                if (R === "rgba(0, 0, 0, 0)") {
                    R = J;
                }
                return R;
            };
        }
    })(A);
    (function (D) {
        var B = parseInt, C = RegExp;
        D.Color = {KEYWORDS:{black:"000", silver:"c0c0c0", gray:"808080", white:"fff", maroon:"800000", red:"f00", purple:"800080", fuchsia:"f0f", green:"008000", lime:"0f0", olive:"808000", yellow:"ff0", navy:"000080", blue:"00f", teal:"008080", aqua:"0ff"}, re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i, re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i, re_hex3:/([0-9A-F])/gi, toRGB:function (E) {
            if (!D.Color.re_RGB.test(E)) {
                E = D.Color.toHex(E);
            }
            if (D.Color.re_hex.exec(E)) {
                E = "rgb(" + [B(C.$1, 16), B(C.$2, 16), B(C.$3, 16)].join(", ") + ")";
            }
            return E;
        }, toHex:function (F) {
            F = D.Color.KEYWORDS[F] || F;
            if (D.Color.re_RGB.exec(F)) {
                F = [Number(C.$1).toString(16), Number(C.$2).toString(16), Number(C.$3).toString(16)];
                for (var E = 0; E < F.length; E++) {
                    if (F[E].length < 2) {
                        F[E] = F[E].replace(D.Color.re_hex3, "$1$1");
                    }
                }
                F = "#" + F.join("");
            }
            if (F.length < 6) {
                F = F.replace(D.Color.re_hex3, "$1$1");
            }
            if (F !== "transparent" && F.indexOf("#") < 0) {
                F = "#" + F;
            }
            return F.toLowerCase();
        }};
    })(A);
    (function (D) {
        var W = "hasLayout", K = "px", L = "filter", B = "filters", T = "opacity", M = "auto", G = "borderWidth", J = "borderTopWidth", Q = "borderRightWidth", V = "borderBottomWidth", H = "borderLeftWidth", I = "width", O = "height", R = "transparent", S = "visible", C = "getComputedStyle", Z = undefined, X = document.documentElement, P = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i, E = function (Y) {
            return Y.currentStyle || Y.style;
        }, N = {CUSTOM_STYLES:{}, get:function (Y, b) {
            var a = "", c;
            if (Y) {
                c = E(Y)[b];
                if (b === T && D.DOM.CUSTOM_STYLES[T]) {
                    a = D.DOM.CUSTOM_STYLES[T].get(Y);
                } else {
                    if (!c || (c.indexOf && c.indexOf(K) > -1)) {
                        a = c;
                    } else {
                        if (D.DOM.IE.COMPUTED[b]) {
                            a = D.DOM.IE.COMPUTED[b](Y, b);
                        } else {
                            if (P.test(c)) {
                                a = N.getPixel(Y, b) + K;
                            } else {
                                a = c;
                            }
                        }
                    }
                }
            }
            return a;
        }, sizeOffsets:{width:["Left", "Right"], height:["Top", "Bottom"], top:["Top"], bottom:["Bottom"]}, getOffset:function (b, g) {
            var d = E(b)[g], Y = g.charAt(0).toUpperCase() + g.substr(1), f = "offset" + Y, a = "pixel" + Y, e = N.sizeOffsets[g], c = "";
            if (d === M || d.indexOf("%") > -1) {
                c = b["offset" + Y];
                if (e[0]) {
                    c -= N.getPixel(b, "padding" + e[0]);
                    c -= N.getBorderWidth(b, "border" + e[0] + "Width", 1);
                }
                if (e[1]) {
                    c -= N.getPixel(b, "padding" + e[1]);
                    c -= N.getBorderWidth(b, "border" + e[1] + "Width", 1);
                }
            } else {
                if (!b.style[a] && !b.style[g]) {
                    b.style[g] = d;
                }
                c = b.style[a];
            }
            return c + K;
        }, borderMap:{thin:"2px", medium:"4px", thick:"6px"}, getBorderWidth:function (a, c, Y) {
            var b = Y ? "" : K, d = a.currentStyle[c];
            if (d.indexOf(K) < 0) {
                if (N.borderMap[d]) {
                    d = N.borderMap[d];
                } else {
                }
            }
            return(Y) ? parseFloat(d) : d;
        }, getPixel:function (b, Y) {
            var d = null, a = E(b), e = a.right, c = a[Y];
            b.style.right = c;
            d = b.style.pixelRight;
            b.style.right = e;
            return d;
        }, getMargin:function (b, Y) {
            var c, a = E(b);
            if (a[Y] == M) {
                c = 0;
            } else {
                c = N.getPixel(b, Y);
            }
            return c + K;
        }, getVisibility:function (a, Y) {
            var b;
            while ((b = a.currentStyle) && b[Y] == "inherit") {
                a = a.parentNode;
            }
            return(b) ? b[Y] : S;
        }, getColor:function (a, Y) {
            var b = E(a)[Y];
            if (!b || b === R) {
                D.DOM.elementByAxis(a, "parentNode", null, function (c) {
                    b = E(c)[Y];
                    if (b && b !== R) {
                        a = c;
                        return true;
                    }
                });
            }
            return D.Color.toRGB(b);
        }, getBorderColor:function (a, Y) {
            var b = E(a), c = b[Y] || b.color;
            return D.Color.toRGB(D.Color.toHex(c));
        }}, F = {};
        try {
            if (X.style[T] === Z && X[B]) {
                D.DOM.CUSTOM_STYLES[T] = {get:function (a) {
                    var c = 100;
                    try {
                        c = a[B]["DXImageTransform.Microsoft.Alpha"][T];
                    } catch (b) {
                        try {
                            c = a[B]("alpha")[T];
                        } catch (Y) {
                        }
                    }
                    return c / 100;
                }, set:function (a, d, Y) {
                    var c, b;
                    if (d === "") {
                        b = E(a);
                        c = (T in b) ? b[T] : 1;
                        d = c;
                    }
                    if (typeof Y[L] == "string") {
                        Y[L] = "alpha(" + T + "=" + d * 100 + ")";
                        if (!a.currentStyle || !a.currentStyle[W]) {
                            Y.zoom = 1;
                        }
                    }
                }};
            }
        } catch (U) {
        }
        try {
            document.createElement("div").style.height = "-1px";
        } catch (U) {
            D.DOM.CUSTOM_STYLES.height = {set:function (b, c, a) {
                var Y = parseFloat(c);
                if (isNaN(Y) || Y >= 0) {
                    a.height = c;
                } else {
                }
            }};
            D.DOM.CUSTOM_STYLES.width = {set:function (b, c, a) {
                var Y = parseFloat(c);
                if (isNaN(Y) || Y >= 0) {
                    a.width = c;
                } else {
                }
            }};
        }
        F[I] = F[O] = N.getOffset;
        F.color = F.backgroundColor = N.getColor;
        F[G] = F[J] = F[Q] = F[V] = F[H] = N.getBorderWidth;
        F.marginTop = F.marginRight = F.marginBottom = F.marginLeft = N.getMargin;
        F.visibility = N.getVisibility;
        F.borderColor = F.borderTopColor = F.borderRightColor = F.borderBottomColor = F.borderLeftColor = N.getBorderColor;
        if (!D.config.win[C]) {
            D.DOM[C] = N.get;
        }
        D.namespace("DOM.IE");
        D.DOM.IE.COMPUTED = F;
        D.DOM.IE.ComputedStyle = N;
    })(A);
}, "3.0.0", {requires:["dom-base"]});