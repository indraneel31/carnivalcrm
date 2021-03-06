/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("dom-screen", function (A) {
    (function (F) {
        var D = "documentElement", O = "compatMode", M = "position", C = "fixed", K = "relative", G = "left", H = "top", I = "BackCompat", N = "medium", E = "borderLeftWidth", B = "borderTopWidth", P = "getBoundingClientRect", J = "getComputedStyle", L = /^t(?:able|d|h)$/i;
        F.mix(F.DOM, {winHeight:function (R) {
            var Q = F.DOM._getWinSize(R).height;
            return Q;
        }, winWidth:function (R) {
            var Q = F.DOM._getWinSize(R).width;
            return Q;
        }, docHeight:function (R) {
            var Q = F.DOM._getDocSize(R).height;
            return Math.max(Q, F.DOM._getWinSize(R).height);
        }, docWidth:function (R) {
            var Q = F.DOM._getDocSize(R).width;
            return Math.max(Q, F.DOM._getWinSize(R).width);
        }, docScrollX:function (Q) {
            var R = F.DOM._getDoc(Q);
            return Math.max(R[D].scrollLeft, R.body.scrollLeft);
        }, docScrollY:function (Q) {
            var R = F.DOM._getDoc(Q);
            return Math.max(R[D].scrollTop, R.body.scrollTop);
        }, getXY:function () {
            if (document[D][P]) {
                return function (T) {
                    var a = null, U, R, V, Y, X, Q, S, W, Z;
                    if (T) {
                        if (F.DOM.inDoc(T)) {
                            U = F.DOM.docScrollX(T);
                            R = F.DOM.docScrollY(T);
                            V = T[P]();
                            Z = F.DOM._getDoc(T);
                            a = [V.left, V.top];
                            if (F.UA.ie) {
                                Y = 2;
                                X = 2;
                                W = Z[O];
                                Q = F.DOM[J](Z[D], E);
                                S = F.DOM[J](Z[D], B);
                                if (F.UA.ie === 6) {
                                    if (W !== I) {
                                        Y = 0;
                                        X = 0;
                                    }
                                }
                                if ((W == I)) {
                                    if (Q !== N) {
                                        Y = parseInt(Q, 10);
                                    }
                                    if (S !== N) {
                                        X = parseInt(S, 10);
                                    }
                                }
                                a[0] -= Y;
                                a[1] -= X;
                            }
                            if ((R || U)) {
                                a[0] += U;
                                a[1] += R;
                            }
                        } else {
                            a = F.DOM._getOffset(T);
                        }
                    }
                    return a;
                };
            } else {
                return function (R) {
                    var T = null, Q, V, S, U;
                    if (R) {
                        if (F.DOM.inDoc(R)) {
                            T = [R.offsetLeft, R.offsetTop];
                            Q = R;
                            V = ((F.UA.gecko || F.UA.webkit > 519) ? true : false);
                            while ((Q = Q.offsetParent)) {
                                T[0] += Q.offsetLeft;
                                T[1] += Q.offsetTop;
                                if (V) {
                                    T = F.DOM._calcBorders(Q, T);
                                }
                            }
                            if (F.DOM.getStyle(R, M) != C) {
                                Q = R;
                                while ((Q = Q.parentNode)) {
                                    S = Q.scrollTop;
                                    U = Q.scrollLeft;
                                    if (F.UA.gecko && (F.DOM.getStyle(Q, "overflow") !== "visible")) {
                                        T = F.DOM._calcBorders(Q, T);
                                    }
                                    if (S || U) {
                                        T[0] -= U;
                                        T[1] -= S;
                                    }
                                }
                                T[0] += F.DOM.docScrollX(R);
                                T[1] += F.DOM.docScrollY(R);
                            } else {
                                T[0] += F.DOM.docScrollX(R);
                                T[1] += F.DOM.docScrollY(R);
                            }
                        } else {
                            T = F.DOM._getOffset(R);
                        }
                    }
                    return T;
                };
            }
        }(), _getOffset:function (Q) {
            var S, R = null;
            if (Q) {
                S = F.DOM.getStyle(Q, M);
                R = [parseInt(F.DOM[J](Q, G), 10), parseInt(F.DOM[J](Q, H), 10)];
                if (isNaN(R[0])) {
                    R[0] = parseInt(F.DOM.getStyle(Q, G), 10);
                    if (isNaN(R[0])) {
                        R[0] = (S === K) ? 0 : Q.offsetLeft || 0;
                    }
                }
                if (isNaN(R[1])) {
                    R[1] = parseInt(F.DOM.getStyle(Q, H), 10);
                    if (isNaN(R[1])) {
                        R[1] = (S === K) ? 0 : Q.offsetTop || 0;
                    }
                }
            }
            return R;
        }, getX:function (Q) {
            return F.DOM.getXY(Q)[0];
        }, getY:function (Q) {
            return F.DOM.getXY(Q)[1];
        }, setXY:function (R, U, X) {
            var S = F.DOM.setStyle, W, V, Q, T;
            if (R && U) {
                W = F.DOM.getStyle(R, M);
                V = F.DOM._getOffset(R);
                if (W == "static") {
                    W = K;
                    S(R, M, W);
                }
                T = F.DOM.getXY(R);
                if (U[0] !== null) {
                    S(R, G, U[0] - T[0] + V[0] + "px");
                }
                if (U[1] !== null) {
                    S(R, H, U[1] - T[1] + V[1] + "px");
                }
                if (!X) {
                    Q = F.DOM.getXY(R);
                    if (Q[0] !== U[0] || Q[1] !== U[1]) {
                        F.DOM.setXY(R, U, true);
                    }
                }
            } else {
            }
        }, setX:function (R, Q) {
            return F.DOM.setXY(R, [Q, null]);
        }, setY:function (Q, R) {
            return F.DOM.setXY(Q, [null, R]);
        }, _calcBorders:function (S, T) {
            var R = parseInt(F.DOM[J](S, B), 10) || 0, Q = parseInt(F.DOM[J](S, E), 10) || 0;
            if (F.UA.gecko) {
                if (L.test(S.tagName)) {
                    R = 0;
                    Q = 0;
                }
            }
            T[0] += Q;
            T[1] += R;
            return T;
        }, _getWinSize:function (T) {
            var V = F.DOM._getDoc(), U = V.defaultView || V.parentWindow, W = V[O], S = U.innerHeight, R = U.innerWidth, Q = V[D];
            if (W && !F.UA.opera) {
                if (W != "CSS1Compat") {
                    Q = V.body;
                }
                S = Q.clientHeight;
                R = Q.clientWidth;
            }
            return{height:S, width:R};
        }, _getDocSize:function (R) {
            var S = F.DOM._getDoc(), Q = S[D];
            if (S[O] != "CSS1Compat") {
                Q = S.body;
            }
            return{height:Q.scrollHeight, width:Q.scrollWidth};
        }});
    })(A);
    (function (G) {
        var D = "top", C = "right", H = "bottom", B = "left", F = function (L, K) {
            var N = Math.max(L[D], K[D]), O = Math.min(L[C], K[C]), I = Math.min(L[H], K[H]), J = Math.max(L[B], K[B]), M = {};
            M[D] = N;
            M[C] = O;
            M[H] = I;
            M[B] = J;
            return M;
        }, E = G.DOM;
        G.mix(E, {region:function (J) {
            var K = E.getXY(J), I = false;
            if (J && K) {
                I = E._getRegion(K[1], K[0] + J.offsetWidth, K[1] + J.offsetHeight, K[0]);
            }
            return I;
        }, intersect:function (K, I, M) {
            var J = M || E.region(K), L = {}, O = I, N;
            if (O.tagName) {
                L = E.region(O);
            } else {
                if (G.Lang.isObject(I)) {
                    L = I;
                } else {
                    return false;
                }
            }
            N = F(L, J);
            return{top:N[D], right:N[C], bottom:N[H], left:N[B], area:((N[H] - N[D]) * (N[C] - N[B])), yoff:((N[H] - N[D])), xoff:(N[C] - N[B]), inRegion:E.inRegion(K, I, false, M)};
        }, inRegion:function (L, I, J, N) {
            var M = {}, K = N || E.region(L), P = I, O;
            if (P.tagName) {
                M = E.region(P);
            } else {
                if (G.Lang.isObject(I)) {
                    M = I;
                } else {
                    return false;
                }
            }
            if (J) {
                return(K[B] >= M[B] && K[C] <= M[C] && K[D] >= M[D] && K[H] <= M[H]);
            } else {
                O = F(M, K);
                if (O[H] >= O[D] && O[C] >= O[B]) {
                    return true;
                } else {
                    return false;
                }
            }
        }, inViewportRegion:function (J, I, K) {
            return E.inRegion(J, E.viewportRegion(J), I, K);
        }, _getRegion:function (K, L, I, J) {
            var M = {};
            M[D] = M[1] = K;
            M[B] = M[0] = J;
            M[H] = I;
            M[C] = L;
            M.width = M[C] - M[B];
            M.height = M[H] - M[D];
            return M;
        }, viewportRegion:function (J) {
            J = J || G.config.doc.documentElement;
            var I = false, L, K;
            if (J) {
                L = E.docScrollX(J);
                K = E.docScrollY(J);
                I = E._getRegion(K, E.winWidth(J) + L, K + E.winHeight(J), L);
            }
            return I;
        }});
    })(A);
}, "3.0.0", {requires:["dom-base", "dom-style"]});