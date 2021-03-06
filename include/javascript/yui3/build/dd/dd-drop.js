/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-drop', function (Y) {
    var NODE = 'node', DDM = Y.DD.DDM, OFFSET_HEIGHT = 'offsetHeight', OFFSET_WIDTH = 'offsetWidth', EV_DROP_OVER = 'drop:over', EV_DROP_ENTER = 'drop:enter', EV_DROP_EXIT = 'drop:exit', Drop = function () {
        this._lazyAddAttrs = false;
        Drop.superclass.constructor.apply(this, arguments);
        Y.on('domready', Y.bind(function () {
            Y.later(100, this, this._createShim);
        }, this));
        DDM._regTarget(this);
    };
    Drop.NAME = 'drop';
    Drop.ATTRS = {node:{setter:function (node) {
        var n = Y.Node.get(node);
        if (!n) {
            Y.error('DD.Drop: Invalid Node Given: ' + node);
        }
        return n;
    }}, groups:{value:['default'], setter:function (g) {
        this._groups = {};
        Y.each(g, function (v, k) {
            this._groups[v] = true;
        }, this);
        return g;
    }}, padding:{value:'0', setter:function (p) {
        return DDM.cssSizestoObject(p);
    }}, lock:{value:false, setter:function (lock) {
        if (lock) {
            this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-locked');
        } else {
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-locked');
        }
        return lock;
    }}, bubbles:{writeOnce:true, value:Y.DD.DDM}};
    Y.extend(Drop, Y.Base, {_createEvents:function () {
        var ev = [EV_DROP_OVER, EV_DROP_ENTER, EV_DROP_EXIT, 'drop:hit'];
        Y.each(ev, function (v, k) {
            this.publish(v, {type:v, emitFacade:true, preventable:false, bubbles:true, queuable:false, prefix:'drop'});
        }, this);
        if (this.get('bubbles')) {
            this.addTarget(this.get('bubbles'));
        }
    }, _valid:null, _groups:null, shim:null, region:null, overTarget:null, inGroup:function (groups) {
        this._valid = false;
        var ret = false;
        Y.each(groups, function (v, k) {
            if (this._groups[v]) {
                ret = true;
                this._valid = true;
            }
        }, this);
        return ret;
    }, initializer:function () {
        Y.later(100, this, this._createEvents);
        var node = this.get(NODE), id;
        if (!node.get('id')) {
            id = Y.stamp(node);
            node.set('id', id);
        }
        node.addClass(DDM.CSS_PREFIX + '-drop');
        this.set('groups', this.get('groups'));
    }, destructor:function () {
        DDM._unregTarget(this);
        if (this.shim) {
            this.shim.detachAll();
            this.shim.get('parentNode').removeChild(this.shim);
            this.shim = null;
        }
        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop');
        this.detachAll();
    }, _deactivateShim:function () {
        if (!this.shim) {
            return false;
        }
        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
        this.shim.setStyles({top:'-999px', left:'-999px', zIndex:'1'});
        this.overTarget = false;
    }, _activateShim:function () {
        if (!DDM.activeDrag) {
            return false;
        }
        if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
            return false;
        }
        if (this.get('lock')) {
            return false;
        }
        var node = this.get(NODE);
        if (this.inGroup(DDM.activeDrag.get('groups'))) {
            node.removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            node.addClass(DDM.CSS_PREFIX + '-drop-active-valid');
            DDM._addValid(this);
            this.overTarget = false;
            this.sizeShim();
        } else {
            DDM._removeValid(this);
            node.removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
            node.addClass(DDM.CSS_PREFIX + '-drop-active-invalid');
        }
    }, sizeShim:function () {
        if (!DDM.activeDrag) {
            return false;
        }
        if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
            return false;
        }
        if (this.get('lock')) {
            return false;
        }
        if (!this.shim) {
            Y.later(100, this, this.sizeShim);
            return false;
        }
        var node = this.get(NODE), nh = node.get(OFFSET_HEIGHT), nw = node.get(OFFSET_WIDTH), xy = node.getXY(), p = this.get('padding'), dd, dH, dW;
        nw = nw + p.left + p.right;
        nh = nh + p.top + p.bottom;
        xy[0] = xy[0] - p.left;
        xy[1] = xy[1] - p.top;
        if (DDM.activeDrag.get('dragMode') === DDM.INTERSECT) {
            dd = DDM.activeDrag;
            dH = dd.get(NODE).get(OFFSET_HEIGHT);
            dW = dd.get(NODE).get(OFFSET_WIDTH);
            nh = (nh + dH);
            nw = (nw + dW);
            xy[0] = xy[0] - (dW - dd.deltaXY[0]);
            xy[1] = xy[1] - (dH - dd.deltaXY[1]);
        }
        this.shim.setStyles({height:nh + 'px', width:nw + 'px', top:xy[1] + 'px', left:xy[0] + 'px'});
        this.region = {'0':xy[0], '1':xy[1], area:0, top:xy[1], right:xy[0] + nw, bottom:xy[1] + nh, left:xy[0]};
    }, _createShim:function () {
        if (!DDM._pg) {
            Y.later(10, this, this._createShim);
            return;
        }
        if (this.shim) {
            return;
        }
        var s = Y.Node.create('<div id="' + this.get(NODE).get('id') + '_shim"></div>');
        s.setStyles({height:this.get(NODE).get(OFFSET_HEIGHT) + 'px', width:this.get(NODE).get(OFFSET_WIDTH) + 'px', backgroundColor:'yellow', opacity:'.5', zIndex:'1', overflow:'hidden', top:'-900px', left:'-900px', position:'absolute'});
        DDM._pg.appendChild(s);
        this.shim = s;
        s.on('mouseover', Y.bind(this._handleOverEvent, this));
        s.on('mouseout', Y.bind(this._handleOutEvent, this));
    }, _handleTargetOver:function () {
        if (DDM.isOverTarget(this)) {
            this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-over');
            DDM.activeDrop = this;
            DDM.otherDrops[this] = this;
            if (this.overTarget) {
                DDM.activeDrag.fire('drag:over', {drop:this, drag:DDM.activeDrag});
                this.fire(EV_DROP_OVER, {drop:this, drag:DDM.activeDrag});
            } else {
                this.overTarget = true;
                this.fire(EV_DROP_ENTER, {drop:this, drag:DDM.activeDrag});
                DDM.activeDrag.fire('drag:enter', {drop:this, drag:DDM.activeDrag});
                DDM.activeDrag.get(NODE).addClass(DDM.CSS_PREFIX + '-drag-over');
            }
        } else {
            this._handleOut();
        }
    }, _handleOverEvent:function () {
        this.shim.setStyle('zIndex', '999');
        DDM._addActiveShim(this);
    }, _handleOutEvent:function () {
        this.shim.setStyle('zIndex', '1');
        DDM._removeActiveShim(this);
    }, _handleOut:function (force) {
        if (!DDM.isOverTarget(this) || force) {
            if (this.overTarget) {
                this.overTarget = false;
                if (!force) {
                    DDM._removeActiveShim(this);
                }
                if (DDM.activeDrag) {
                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
                    DDM.activeDrag.get(NODE).removeClass(DDM.CSS_PREFIX + '-drag-over');
                    this.fire(EV_DROP_EXIT);
                    DDM.activeDrag.fire('drag:exit', {drop:this});
                    delete DDM.otherDrops[this];
                }
            }
        }
    }});
    Y.DD.Drop = Drop;
}, '3.0.0', {requires:['dd-ddm-drop', 'dd-drag'], skinnable:false});