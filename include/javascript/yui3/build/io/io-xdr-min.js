/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("io-xdr", function (A) {
    var I = "io:xdrReady", D = {}, E = {};

    function F(J, M) {
        var K = '<object id="yuiIoSwf" type="application/x-shockwave-flash" data="' + J + '" width="0" height="0">' + '<param name="movie" value="' + J + '">' + '<param name="FlashVars" value="yid=' + M + '">' + '<param name="allowScriptAccess" value="always">' + "</object>", L = document.createElement("div");
        document.body.appendChild(L);
        L.innerHTML = K;
    }

    function G(J, K) {
        J.c.onprogress = function () {
            E[J.id] = 3;
        };
        J.c.onload = function () {
            E[J.id] = 4;
            A.io.xdrResponse(J, K, "success");
        };
        J.c.onerror = function () {
            E[J.id] = 4;
            A.io.xdrResponse(J, K, "failure");
        };
        if (K.timeout) {
            J.c.ontimeout = function () {
                E[J.id] = 4;
                A.io.xdrResponse(J, K, "timeout");
            };
            J.c.timeout = K.timeout;
        }
    }

    function B(M, K, N) {
        var L, J;
        if (!M.status) {
            L = K ? decodeURI(M.c.responseText) : M.c.responseText;
            J = N ? A.DataType.XML.parse(L) : null;
            return{id:M.id, c:{responseText:L, responseXML:J}};
        } else {
            return{id:M.id, status:M.status};
        }
    }

    function H(J, K) {
        return K.xdr.use === "flash" ? J.c.abort(J.id, K) : J.c.abort();
    }

    function C(K, J) {
        return(J === "flash" && K.c) ? K.c.isInProgress(K.id) : E[K.id] !== 4;
    }

    A.mix(A.io, {_transport:{}, xdr:function (J, K, L) {
        if (L.on && L.xdr.use === "flash") {
            D[K.id] = {on:L.on, context:L.context, arguments:L.arguments};
            L.context = null;
            L.form = null;
            K.c.send(J, L, K.id);
        } else {
            if (window.XDomainRequest) {
                G(K, L);
                K.c.open(L.method || "GET", J);
                K.c.send(L.data);
            }
        }
        return{id:K.id, abort:function () {
            return K.c ? H(K, L) : false;
        }, isInProgress:function () {
            return K.c ? C(K, L.xdr.use) : false;
        }};
    }, xdrResponse:function (N, P, M) {
        var J, L, K = P.xdr.use === "flash" ? true : false, O = P.xdr.dataType === "xml" ? true : false;
        P.on = P.on || {};
        if (K) {
            J = D || {};
            L = J[N.id] ? J[N.id] : null;
            if (L) {
                P.on = L.on;
                P.context = L.context;
                P.arguments = L.arguments;
            }
        }
        if (M === ("abort" || "timeout")) {
            N.status = M;
        }
        switch (M) {
            case"start":
                A.io.start(N.id, P);
                break;
            case"success":
                A.io.success(B(N, K, O), P);
                K ? delete J[N.id] : delete E[N.id];
                break;
            case"timeout":
            case"abort":
            case"failure":
                A.io.failure(B(N, K, O), P);
                K ? delete J[N.id] : delete E[N.id];
                break;
        }
    }, xdrReady:function (J) {
        A.fire(I, J);
    }, transport:function (J) {
        var K = J.yid ? J.yid : A.id;
        F(J.src, K);
        this._transport.flash = A.config.doc.getElementById("yuiIoSwf");
    }});
}, "3.0.0", {requires:["io-base", "datatype-xml"]});