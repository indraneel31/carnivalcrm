/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-scroll', function (Y) {
    var S = function () {
        S.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', BUFFER = 'buffer', PARENT_SCROLL = 'parentScroll', WINDOW_SCROLL = 'windowScroll', SCROLL_TOP = 'scrollTop', SCROLL_LEFT = 'scrollLeft', OFFSET_WIDTH = 'offsetWidth', OFFSET_HEIGHT = 'offsetHeight';
    S.ATTRS = {parentScroll:{value:false, setter:function (node) {
        if (node) {
            return node;
        }
        return false;
    }}, buffer:{value:30}, scrollDelay:{value:235}, host:{value:null}, windowScroll:{value:false}, vertical:{value:true}, horizontal:{value:true}};
    Y.extend(S, Y.Base, {_scrolling:null, _vpRegionCache:null, _dimCache:null, _scrollTimer:null, _getVPRegion:function () {
        var r = {};
        var n = this.get(PARENT_SCROLL), b = this.get(BUFFER), ws = this.get(WINDOW_SCROLL), xy = ((ws) ? [] : n.getXY()), w = ((ws) ? 'winWidth' : OFFSET_WIDTH), h = ((ws) ? 'winHeight' : OFFSET_HEIGHT), t = ((ws) ? n.get(SCROLL_TOP) : xy[1]), l = ((ws) ? n.get(SCROLL_LEFT) : xy[0]);
        r = {top:t + b, right:(n.get(w) + l) - b, bottom:(n.get(h) + t) - b, left:l + b};
        this._vpRegionCache = r;
        return r;
    }, initializer:function () {
        var h = this.get(HOST);
        h.after('drag:start', Y.bind(this.start, this));
        h.after('drag:end', Y.bind(this.end, this));
        h.on('drag:align', Y.bind(this.align, this));
        Y.get(window).on('scroll', Y.bind(function () {
            this._vpRegionCache = null;
        }, this));
    }, _checkWinScroll:function (move) {
        var r = this._getVPRegion(), ho = this.get(HOST), ws = this.get(WINDOW_SCROLL), xy = ho.lastXY, scroll = false, b = this.get(BUFFER), win = this.get(PARENT_SCROLL), sTop = win.get(SCROLL_TOP), sLeft = win.get(SCROLL_LEFT), w = this._dimCache.w, h = this._dimCache.h, bottom = xy[1] + h, top = xy[1], right = xy[0] + w, left = xy[0], nt = top, nl = left, st = sTop, sl = sLeft;
        if (this.get('horizontal')) {
            if (left <= r.left) {
                scroll = true;
                nl = xy[0] - ((ws) ? b : 0);
                sl = sLeft - b;
            }
            if (right >= r.right) {
                scroll = true;
                nl = xy[0] + ((ws) ? b : 0);
                sl = sLeft + b;
            }
        }
        if (this.get('vertical')) {
            if (bottom >= r.bottom) {
                scroll = true;
                nt = xy[1] + ((ws) ? b : 0);
                st = sTop + b;
            }
            if (top <= r.top) {
                scroll = true;
                nt = xy[1] - ((ws) ? b : 0);
                st = sTop - b;
            }
        }
        if (st < 0) {
            st = 0;
            nt = xy[1];
        }
        if (sl < 0) {
            sl = 0;
            nl = xy[0];
        }
        if (nt < 0) {
            nt = xy[1];
        }
        if (nl < 0) {
            nl = xy[0];
        }
        if (move) {
            ho.actXY = [nl, nt];
            ho._moveNode({node:win, top:st, left:sl});
            if (!st && !sl) {
                this._cancelScroll();
            }
        } else {
            if (scroll) {
                this._initScroll();
            } else {
                this._cancelScroll();
            }
        }
    }, _initScroll:function () {
        this._cancelScroll();
        this._scrollTimer = Y.Lang.later(this.get('scrollDelay'), this, this._checkWinScroll, [true], true);
    }, _cancelScroll:function () {
        this._scrolling = false;
        if (this._scrollTimer) {
            this._scrollTimer.cancel();
            delete this._scrollTimer;
        }
    }, align:function (e) {
        if (this._scrolling) {
            this._cancelScroll();
            e.preventDefault();
        }
        if (!this._scrolling) {
            this._checkWinScroll();
        }
    }, _setDimCache:function () {
        var node = this.get(HOST).get('dragNode');
        this._dimCache = {h:node.get(OFFSET_HEIGHT), w:node.get(OFFSET_WIDTH)};
    }, start:function () {
        this._setDimCache();
    }, end:function (xy) {
        this._dimCache = null;
        this._cancelScroll();
    }, toString:function () {
        return S.NAME + ' #' + this.get('node').get('id');
    }});
    Y.namespace('Plugin');
    var WS = function () {
        WS.superclass.constructor.apply(this, arguments);
    };
    WS.ATTRS = Y.merge(S.ATTRS, {windowScroll:{value:true, setter:function (scroll) {
        if (scroll) {
            this.set(PARENT_SCROLL, Y.get(window));
        }
        return scroll;
    }}});
    Y.extend(WS, S, {initializer:function () {
        this.set('windowScroll', this.get('windowScroll'));
    }});
    WS.NAME = WS.NS = 'winscroll';
    Y.Plugin.DDWinScroll = WS;
    var NS = function () {
        NS.superclass.constructor.apply(this, arguments);
    };
    NS.ATTRS = Y.merge(S.ATTRS, {node:{value:false, setter:function (node) {
        var n = Y.get(node);
        if (!n) {
            if (node !== false) {
                Y.error('DDNodeScroll: Invalid Node Given: ' + node);
            }
        } else {
            n = n.item(0);
            this.set(PARENT_SCROLL, n);
        }
        return n;
    }}});
    Y.extend(NS, S, {initializer:function () {
        this.set('node', this.get('node'));
    }});
    NS.NAME = NS.NS = 'nodescroll';
    Y.Plugin.DDNodeScroll = NS;
    Y.DD.Scroll = S;
}, '3.0.0', {skinnable:false, requires:['dd-drag'], optional:['dd-proxy']});