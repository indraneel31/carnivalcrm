/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add("dataschema-xml", function (C) {
    var B = C.Lang, A = {apply:function (F, G) {
        var D = G, E = {results:[], meta:{}};
        if (D && D.nodeType && (D.nodeType === 9 || D.nodeType === 1 || D.nodeType === 11) && F) {
            E = A._parseResults(F, D, E);
            E = A._parseMeta(F.metaFields, D, E);
        } else {
            E.error = new Error("XML schema parse failure");
        }
        return E;
    }, _getLocationValue:function (K, H) {
        var F = K.locator || K.key || K, E = H.ownerDocument || H, D, G, I = null;
        try {
            if (!B.isUndefined(E.evaluate)) {
                D = E.evaluate(F, H, E.createNSResolver(!H.ownerDocument ? H.documentElement : H.ownerDocument.documentElement), 0, null);
                while (G = D.iterateNext()) {
                    I = G.textContent;
                }
            } else {
                E.setProperty("SelectionLanguage", "XPath");
                D = H.selectNodes(F)[0];
                I = D.value || D.text || null;
            }
            return C.DataSchema.Base.parse(I, K);
        } catch (J) {
        }
    }, _parseMeta:function (H, G, F) {
        if (B.isObject(H)) {
            var E, D = G.ownerDocument || G;
            for (E in H) {
                if (H.hasOwnProperty(E)) {
                    F.meta[E] = A._getLocationValue(H[E], D);
                }
            }
        }
        return F;
    }, _parseResults:function (F, K, G) {
        if (F.resultListLocator && B.isArray(F.resultFields)) {
            var E = K.getElementsByTagName(F.resultListLocator), L = F.resultFields, J = [], D, M, N, I, H;
            if (E.length) {
                for (I = E.length - 1; I >= 0; I--) {
                    N = {};
                    D = E[I];
                    for (H = L.length - 1; H >= 0; H--) {
                        M = L[H];
                        N[M.key || M] = A._getLocationValue(M, D);
                    }
                    J[I] = N;
                }
                G.results = J;
            } else {
                G.error = new Error("XML schema result nodes retrieval failure");
            }
        }
        return G;
    }};
    C.DataSchema.XML = C.mix(A, C.DataSchema.Base);
}, "3.0.0", {requires:["dataschema-base"]});