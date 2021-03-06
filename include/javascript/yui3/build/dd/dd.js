/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-ddm-base', function (Y) {
    var DDMBase = function () {
        DDMBase.superclass.constructor.apply(this, arguments);
    };
    DDMBase.NAME = 'ddm';
    DDMBase.ATTRS = {dragCursor:{value:'move'}, clickPixelThresh:{value:3}, clickTimeThresh:{value:1000}, dragMode:{value:'point', setter:function (mode) {
        this._setDragMode(mode);
        return mode;
    }}};
    Y.extend(DDMBase, Y.Base, {_active:null, _setDragMode:function (mode) {
        if (mode === null) {
            mode = Y.DD.DDM.get('dragMode');
        }
        switch (mode) {
            case 1:
            case'intersect':
                return 1;
            case 2:
            case'strict':
                return 2;
            case 0:
            case'point':
                return 0;
        }
        return 0;
    }, CSS_PREFIX:'yui-dd', _activateTargets:function () {
    }, _drags:[], activeDrag:false, _regDrag:function (d) {
        if (this.getDrag(d.get('node'))) {
            return false;
        }
        if (!this._active) {
            this._setupListeners();
        }
        this._drags.push(d);
        return true;
    }, _unregDrag:function (d) {
        var tmp = [];
        Y.each(this._drags, function (n, i) {
            if (n !== d) {
                tmp[tmp.length] = n;
            }
        });
        this._drags = tmp;
    }, _setupListeners:function () {
        this._active = true;
        var doc = Y.get(document);
        doc.on('mousemove', Y.bind(this._move, this));
        doc.on('mouseup', Y.bind(this._end, this));
    }, _start:function () {
        this.fire('ddm:start');
        this._startDrag();
    }, _startDrag:function () {
    }, _endDrag:function () {
    }, _dropMove:function () {
    }, _end:function () {
        if (this.activeDrag) {
            this._endDrag();
            this.fire('ddm:end');
            this.activeDrag.end.call(this.activeDrag);
            this.activeDrag = null;
        }
    }, stopDrag:function () {
        if (this.activeDrag) {
            this._end();
        }
        return this;
    }, _move:function (ev) {
        if (this.activeDrag) {
            this.activeDrag._move.call(this.activeDrag, ev);
            this._dropMove();
        }
    }, cssSizestoObject:function (gutter) {
        var x = gutter.split(' ');
        switch (x.length) {
            case 1:
                x[1] = x[2] = x[3] = x[0];
                break;
            case 2:
                x[2] = x[0];
                x[3] = x[1];
                break;
            case 3:
                x[3] = x[1];
                break;
        }
        return{top:parseInt(x[0], 10), right:parseInt(x[1], 10), bottom:parseInt(x[2], 10), left:parseInt(x[3], 10)};
    }, getDrag:function (node) {
        var drag = false, n = Y.get(node);
        if (n instanceof Y.Node) {
            Y.each(this._drags, function (v, k) {
                if (n.compareTo(v.get('node'))) {
                    drag = v;
                }
            });
        }
        return drag;
    }});
    Y.namespace('DD');
    Y.DD.DDM = new DDMBase();
}, '3.0.0', {requires:['node', 'base'], skinnable:false});
YUI.add('dd-ddm', function (Y) {
    Y.mix(Y.DD.DDM, {_pg:null, _debugShim:false, _activateTargets:function () {
    }, _deactivateTargets:function () {
    }, _startDrag:function () {
        if (this.activeDrag.get('useShim')) {
            this._pg_activate();
            this._activateTargets();
        }
    }, _endDrag:function () {
        this._pg_deactivate();
        this._deactivateTargets();
    }, _pg_deactivate:function () {
        this._pg.setStyle('display', 'none');
    }, _pg_activate:function () {
        var ah = this.activeDrag.get('activeHandle'), cur = 'auto';
        if (ah) {
            cur = ah.getStyle('cursor');
        }
        if (cur == 'auto') {
            cur = this.get('dragCursor');
        }
        this._pg_size();
        this._pg.setStyles({top:0, left:0, display:'block', opacity:((this._debugShim) ? '.5' : '0'), cursor:cur});
    }, _pg_size:function () {
        if (this.activeDrag) {
            var b = Y.get('body'), h = b.get('docHeight'), w = b.get('docWidth');
            this._pg.setStyles({height:h + 'px', width:w + 'px'});
        }
    }, _createPG:function () {
        var pg = Y.Node.create('<div></div>'), bd = Y.get('body');
        pg.setStyles({top:'0', left:'0', position:'absolute', zIndex:'9999', overflow:'hidden', backgroundColor:'red', display:'none', height:'5px', width:'5px'});
        pg.set('id', Y.stamp(pg));
        pg.addClass('yui-dd-shim');
        if (bd.get('firstChild')) {
            bd.insertBefore(pg, bd.get('firstChild'));
        } else {
            bd.appendChild(pg);
        }
        this._pg = pg;
        this._pg.on('mouseup', Y.bind(this._end, this));
        this._pg.on('mousemove', Y.bind(this._move, this));
        var win = Y.get(window);
        Y.on('window:resize', Y.bind(this._pg_size, this));
        win.on('scroll', Y.bind(this._pg_size, this));
    }}, true);
    Y.on('domready', Y.bind(Y.DD.DDM._createPG, Y.DD.DDM));
}, '3.0.0', {requires:['dd-ddm-base', 'event-resize'], skinnable:false});
YUI.add('dd-ddm-drop', function (Y) {
    Y.mix(Y.DD.DDM, {_noShim:false, _activeShims:[], _hasActiveShim:function () {
        if (this._noShim) {
            return true;
        }
        return this._activeShims.length;
    }, _addActiveShim:function (d) {
        this._activeShims[this._activeShims.length] = d;
    }, _removeActiveShim:function (d) {
        var s = [];
        Y.each(this._activeShims, function (v, k) {
            if (v._yuid !== d._yuid) {
                s[s.length] = v;
            }
        });
        this._activeShims = s;
    }, syncActiveShims:function (force) {
        Y.later(0, this, function (force) {
            var drops = ((force) ? this.targets : this._lookup());
            Y.each(drops, function (v, k) {
                v.sizeShim.call(v);
            }, this);
        }, force);
    }, mode:0, POINT:0, INTERSECT:1, STRICT:2, useHash:true, activeDrop:null, validDrops:[], otherDrops:{}, targets:[], _addValid:function (drop) {
        this.validDrops[this.validDrops.length] = drop;
        return this;
    }, _removeValid:function (drop) {
        var drops = [];
        Y.each(this.validDrops, function (v, k) {
            if (v !== drop) {
                drops[drops.length] = v;
            }
        });
        this.validDrops = drops;
        return this;
    }, isOverTarget:function (drop) {
        if (this.activeDrag && drop) {
            var xy = this.activeDrag.mouseXY, r, dMode = this.activeDrag.get('dragMode'), aRegion;
            if (xy && this.activeDrag) {
                aRegion = this.activeDrag.region;
                if (dMode == this.STRICT) {
                    return this.activeDrag.get('dragNode').inRegion(drop.region, true, aRegion);
                } else {
                    if (drop && drop.shim) {
                        if ((dMode == this.INTERSECT) && this._noShim) {
                            r = ((aRegion) ? aRegion : this.activeDrag.get('node'));
                            return drop.get('node').intersect(r).inRegion;
                        } else {
                            return drop.shim.intersect({top:xy[1], bottom:xy[1], left:xy[0], right:xy[0]}, drop.region).inRegion;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, clearCache:function () {
        this.validDrops = [];
        this.otherDrops = {};
        this._activeShims = [];
    }, _activateTargets:function () {
        this.clearCache();
        Y.each(this.targets, function (v, k) {
            v._activateShim.apply(v, []);
        }, this);
        this._handleTargetOver();
    }, getBestMatch:function (drops, all) {
        var biggest = null, area = 0, out;
        Y.each(drops, function (v, k) {
            var inter = this.activeDrag.get('dragNode').intersect(v.get('node'));
            v.region.area = inter.area;
            if (inter.inRegion) {
                if (inter.area > area) {
                    area = inter.area;
                    biggest = v;
                }
            }
        }, this);
        if (all) {
            out = [];
            Y.each(drops, function (v, k) {
                if (v !== biggest) {
                    out[out.length] = v;
                }
            }, this);
            return[biggest, out];
        } else {
            return biggest;
        }
    }, _deactivateTargets:function () {
        var other = [], tmp, activeDrag = this.activeDrag, activeDrop = this.activeDrop;
        if (activeDrag && activeDrop && this.otherDrops[activeDrop]) {
            if (!activeDrag.get('dragMode')) {
                other = this.otherDrops;
                delete other[activeDrop];
            } else {
                tmp = this.getBestMatch(this.otherDrops, true);
                activeDrop = tmp[0];
                other = tmp[1];
            }
            activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');
            if (activeDrop) {
                activeDrop.fire('drop:hit', {drag:activeDrag, drop:activeDrop, others:other});
                activeDrag.fire('drag:drophit', {drag:activeDrag, drop:activeDrop, others:other});
            }
        } else if (activeDrag) {
            activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');
            activeDrag.fire('drag:dropmiss', {pageX:activeDrag.lastXY[0], pageY:activeDrag.lastXY[1]});
        } else {
        }
        this.activeDrop = null;
        Y.each(this.targets, function (v, k) {
            v._deactivateShim.apply(v, []);
        }, this);
    }, _dropMove:function () {
        if (this._hasActiveShim()) {
            this._handleTargetOver();
        } else {
            Y.each(this.otherDrops, function (v, k) {
                v._handleOut.apply(v, []);
            });
        }
    }, _lookup:function () {
        if (!this.useHash || this._noShim) {
            return this.validDrops;
        }
        var drops = [];
        Y.each(this.validDrops, function (v, k) {
            if (v.shim && v.shim.inViewportRegion(false, v.region)) {
                drops[drops.length] = v;
            }
        });
        return drops;
    }, _handleTargetOver:function () {
        var drops = this._lookup();
        Y.each(drops, function (v, k) {
            v._handleTargetOver.call(v);
        }, this);
    }, _regTarget:function (t) {
        this.targets[this.targets.length] = t;
    }, _unregTarget:function (drop) {
        var targets = [], vdrops;
        Y.each(this.targets, function (v, k) {
            if (v != drop) {
                targets[targets.length] = v;
            }
        }, this);
        this.targets = targets;
        vdrops = [];
        Y.each(this.validDrops, function (v, k) {
            if (v !== drop) {
                vdrops[vdrops.length] = v;
            }
        });
        this.validDrops = vdrops;
    }, getDrop:function (node) {
        var drop = false, n = Y.Node.get(node);
        if (n instanceof Y.Node) {
            Y.each(this.targets, function (v, k) {
                if (n.compareTo(v.get('node'))) {
                    drop = v;
                }
            });
        }
        return drop;
    }}, true);
}, '3.0.0', {requires:['dd-ddm'], skinnable:false});
YUI.add('dd-drag', function (Y) {
    var DDM = Y.DD.DDM, NODE = 'node', DRAGGING = 'dragging', DRAG_NODE = 'dragNode', OFFSET_HEIGHT = 'offsetHeight', OFFSET_WIDTH = 'offsetWidth', MOUSE_UP = 'mouseup', MOUSE_DOWN = 'mousedown', DRAG_START = 'dragstart', EV_MOUSE_DOWN = 'drag:mouseDown', EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown', EV_REMOVE_HANDLE = 'drag:removeHandle', EV_ADD_HANDLE = 'drag:addHandle', EV_REMOVE_INVALID = 'drag:removeInvalid', EV_ADD_INVALID = 'drag:addInvalid', EV_START = 'drag:start', EV_END = 'drag:end', EV_DRAG = 'drag:drag', EV_ALIGN = 'drag:align', Drag = function (o) {
        this._lazyAddAttrs = false;
        Drag.superclass.constructor.apply(this, arguments);
        var valid = DDM._regDrag(this);
        if (!valid) {
            Y.error('Failed to register node, already in use: ' + o.node);
        }
    };
    Drag.NAME = 'drag';
    Drag.ATTRS = {node:{setter:function (node) {
        var n = Y.get(node);
        if (!n) {
            Y.error('DD.Drag: Invalid Node Given: ' + node);
        } else {
            n = n.item(0);
        }
        return n;
    }}, dragNode:{setter:function (node) {
        var n = Y.Node.get(node);
        if (!n) {
            Y.error('DD.Drag: Invalid dragNode Given: ' + node);
        }
        return n;
    }}, offsetNode:{value:true}, clickPixelThresh:{value:DDM.get('clickPixelThresh')}, clickTimeThresh:{value:DDM.get('clickTimeThresh')}, lock:{value:false, setter:function (lock) {
        if (lock) {
            this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');
        } else {
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');
        }
        return lock;
    }}, data:{value:false}, move:{value:true}, useShim:{value:true}, activeHandle:{value:false}, primaryButtonOnly:{value:true}, dragging:{value:false}, parent:{value:false}, target:{value:false, setter:function (config) {
        this._handleTarget(config);
        return config;
    }}, dragMode:{value:null, setter:function (mode) {
        return DDM._setDragMode(mode);
    }}, groups:{value:['default'], getter:function () {
        if (!this._groups) {
            this._groups = {};
        }
        var ret = [];
        Y.each(this._groups, function (v, k) {
            ret[ret.length] = k;
        });
        return ret;
    }, setter:function (g) {
        this._groups = {};
        Y.each(g, function (v, k) {
            this._groups[v] = true;
        }, this);
        return g;
    }}, handles:{value:null, setter:function (g) {
        if (g) {
            this._handles = {};
            Y.each(g, function (v, k) {
                this._handles[v] = true;
            }, this);
        } else {
            this._handles = null;
        }
        return g;
    }}, bubbles:{writeOnce:true, value:Y.DD.DDM}};
    Y.extend(Drag, Y.Base, {addToGroup:function (g) {
        this._groups[g] = true;
        DDM._activateTargets();
        return this;
    }, removeFromGroup:function (g) {
        delete this._groups[g];
        DDM._activateTargets();
        return this;
    }, target:null, _handleTarget:function (config) {
        if (Y.DD.Drop) {
            if (config === false) {
                if (this.target) {
                    DDM._unregTarget(this.target);
                    this.target = null;
                }
                return false;
            } else {
                if (!Y.Lang.isObject(config)) {
                    config = {};
                }
                config.bubbles = ('bubbles'in config) ? config.bubbles : this.get('bubbles');
                config.node = this.get(NODE);
                config.groups = config.groups || this.get('groups');
                this.target = new Y.DD.Drop(config);
            }
        } else {
            return false;
        }
    }, _groups:null, _createEvents:function () {
        this.publish(EV_MOUSE_DOWN, {defaultFn:this._defMouseDownFn, queuable:false, emitFacade:true, bubbles:true, prefix:'drag'});
        this.publish(EV_ALIGN, {defaultFn:this._defAlignFn, queuable:false, emitFacade:true, bubbles:true, prefix:'drag'});
        this.publish(EV_DRAG, {defaultFn:this._defDragFn, queuable:false, emitFacade:true, bubbles:true, prefix:'drag'});
        this.publish(EV_END, {preventedFn:this._prevEndFn, queuable:false, emitFacade:true, bubbles:true, prefix:'drag'});
        var ev = [EV_AFTER_MOUSE_DOWN, EV_REMOVE_HANDLE, EV_ADD_HANDLE, EV_REMOVE_INVALID, EV_ADD_INVALID, EV_START, 'drag:drophit', 'drag:dropmiss', 'drag:over', 'drag:enter', 'drag:exit'];
        Y.each(ev, function (v, k) {
            this.publish(v, {type:v, emitFacade:true, bubbles:true, preventable:false, queuable:false, prefix:'drag'});
        }, this);
        if (this.get('bubbles')) {
            this.addTarget(this.get('bubbles'));
        }
    }, _ev_md:null, _startTime:null, _endTime:null, _handles:null, _invalids:null, _invalidsDefault:{'textarea':true, 'input':true, 'a':true, 'button':true, 'select':true}, _dragThreshMet:null, _fromTimeout:null, _clickTimeout:null, deltaXY:null, startXY:null, nodeXY:null, lastXY:null, actXY:null, realXY:null, mouseXY:null, region:null, _handleMouseUp:function (ev) {
        this._fixIEMouseUp();
        if (DDM.activeDrag) {
            DDM._end();
        }
    }, _fixDragStart:function (e) {
        e.preventDefault();
    }, _ieSelectFix:function () {
        return false;
    }, _ieSelectBack:null, _fixIEMouseDown:function () {
        if (Y.UA.ie) {
            this._ieSelectBack = Y.config.doc.body.onselectstart;
            Y.config.doc.body.onselectstart = this._ieSelectFix;
        }
    }, _fixIEMouseUp:function () {
        if (Y.UA.ie) {
            Y.config.doc.body.onselectstart = this._ieSelectBack;
        }
    }, _handleMouseDownEvent:function (ev) {
        this.fire(EV_MOUSE_DOWN, {ev:ev});
    }, _defMouseDownFn:function (e) {
        var ev = e.ev;
        this._dragThreshMet = false;
        this._ev_md = ev;
        if (this.get('primaryButtonOnly') && ev.button > 1) {
            return false;
        }
        if (this.validClick(ev)) {
            this._fixIEMouseDown();
            ev.halt();
            this._setStartPosition([ev.pageX, ev.pageY]);
            DDM.activeDrag = this;
            this._clickTimeout = Y.later(this.get('clickTimeThresh'), this, this._timeoutCheck);
        }
        this.fire(EV_AFTER_MOUSE_DOWN, {ev:ev});
    }, validClick:function (ev) {
        var r = false, n = false, tar = ev.target, hTest = null, els = null, set = false;
        if (this._handles) {
            Y.each(this._handles, function (i, n) {
                if (Y.Lang.isString(n)) {
                    if (tar.test(n + ', ' + n + ' *') && !hTest) {
                        hTest = n;
                        r = true;
                    }
                }
            });
        } else {
            n = this.get(NODE)
            if (n.contains(tar) || n.compareTo(tar)) {
                r = true;
            }
        }
        if (r) {
            if (this._invalids) {
                Y.each(this._invalids, function (i, n) {
                    if (Y.Lang.isString(n)) {
                        if (tar.test(n + ', ' + n + ' *')) {
                            r = false;
                        }
                    }
                });
            }
        }
        if (r) {
            if (hTest) {
                els = ev.currentTarget.queryAll(hTest);
                set = false;
                els.each(function (n, i) {
                    if ((n.contains(tar) || n.compareTo(tar)) && !set) {
                        set = true;
                        this.set('activeHandle', n);
                    }
                }, this);
            } else {
                this.set('activeHandle', this.get(NODE));
            }
        }
        return r;
    }, _setStartPosition:function (xy) {
        this.startXY = xy;
        this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();
        if (this.get('offsetNode')) {
            this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
        } else {
            this.deltaXY = [0, 0];
        }
    }, _timeoutCheck:function () {
        if (!this.get('lock') && !this._dragThreshMet) {
            this._fromTimeout = this._dragThreshMet = true;
            this.start();
            this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);
        }
    }, removeHandle:function (str) {
        if (this._handles[str]) {
            delete this._handles[str];
            this.fire(EV_REMOVE_HANDLE, {handle:str});
        }
        return this;
    }, addHandle:function (str) {
        if (!this._handles) {
            this._handles = {};
        }
        if (Y.Lang.isString(str)) {
            this._handles[str] = true;
            this.fire(EV_ADD_HANDLE, {handle:str});
        }
        return this;
    }, removeInvalid:function (str) {
        if (this._invalids[str]) {
            this._invalids[str] = null;
            delete this._invalids[str];
            this.fire(EV_REMOVE_INVALID, {handle:str});
        }
        return this;
    }, addInvalid:function (str) {
        if (Y.Lang.isString(str)) {
            this._invalids[str] = true;
            this.fire(EV_ADD_INVALID, {handle:str});
        }
        return this;
    }, initializer:function () {
        this.get(NODE).dd = this;
        if (!this.get(NODE).get('id')) {
            var id = Y.stamp(this.get(NODE));
            this.get(NODE).set('id', id);
        }
        this.actXY = [];
        this._invalids = Y.clone(this._invalidsDefault, true);
        this._createEvents();
        if (!this.get(DRAG_NODE)) {
            this.set(DRAG_NODE, this.get(NODE));
        }
        this.on('initializedChange', Y.bind(this._prep, this));
        this.set('groups', this.get('groups'));
    }, _prep:function () {
        this._dragThreshMet = false;
        var node = this.get(NODE);
        node.addClass(DDM.CSS_PREFIX + '-draggable');
        node.on(MOUSE_DOWN, Y.bind(this._handleMouseDownEvent, this));
        node.on(MOUSE_UP, Y.bind(this._handleMouseUp, this));
        node.on(DRAG_START, Y.bind(this._fixDragStart, this));
    }, _unprep:function () {
        var node = this.get(NODE);
        node.removeClass(DDM.CSS_PREFIX + '-draggable');
        node.detachAll();
    }, start:function () {
        if (!this.get('lock') && !this.get(DRAGGING)) {
            var node = this.get(NODE), ow = node.get(OFFSET_WIDTH), oh = node.get(OFFSET_HEIGHT);
            this._startTime = (new Date()).getTime();
            DDM._start();
            node.addClass(DDM.CSS_PREFIX + '-dragging');
            this.fire(EV_START, {pageX:this.nodeXY[0], pageY:this.nodeXY[1], startTime:this._startTime});
            var xy = this.nodeXY;
            this.region = {'0':xy[0], '1':xy[1], area:0, top:xy[1], right:xy[0] + ow, bottom:xy[1] + oh, left:xy[0]};
            this.set(DRAGGING, true);
        }
        return this;
    }, end:function () {
        this._endTime = (new Date()).getTime();
        if (this._clickTimeout) {
            this._clickTimeout.cancel();
        }
        this._dragThreshMet = false;
        this._fromTimeout = false;
        if (!this.get('lock') && this.get(DRAGGING)) {
            this.fire(EV_END, {pageX:this.lastXY[0], pageY:this.lastXY[1], startTime:this._startTime, endTime:this._endTime});
        }
        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');
        this.set(DRAGGING, false);
        this.deltaXY = [0, 0];
        return this;
    }, _prevEndFn:function (e) {
        this.get(DRAG_NODE).setXY(this.nodeXY);
    }, _align:function (xy) {
        this.fire(EV_ALIGN, {pageX:xy[0], pageY:xy[1]});
    }, _defAlignFn:function (e) {
        this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];
    }, _alignNode:function (eXY) {
        this._align(eXY);
        this._moveNode();
    }, _moveNode:function (scroll) {
        var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;
        diffXY[0] = (xy[0] - this.lastXY[0]);
        diffXY[1] = (xy[1] - this.lastXY[1]);
        diffXY2[0] = (xy[0] - this.nodeXY[0]);
        diffXY2[1] = (xy[1] - this.nodeXY[1]);
        this.region = {'0':xy[0], '1':xy[1], area:0, top:xy[1], right:xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH), bottom:xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT), left:xy[0]};
        this.fire(EV_DRAG, {pageX:xy[0], pageY:xy[1], scroll:scroll, info:{start:startXY, xy:xy, delta:diffXY, offset:diffXY2}});
        this.lastXY = xy;
    }, _defDragFn:function (e) {
        if (this.get('move')) {
            if (e.scroll) {
                e.scroll.node.set('scrollTop', e.scroll.top);
                e.scroll.node.set('scrollLeft', e.scroll.left);
            }
            this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);
            this.realXY = [e.pageX, e.pageY];
        }
    }, _move:function (ev) {
        if (this.get('lock')) {
            return false;
        } else {
            this.mouseXY = [ev.pageX, ev.pageY];
            if (!this._dragThreshMet) {
                var diffX = Math.abs(this.startXY[0] - ev.pageX), diffY = Math.abs(this.startXY[1] - ev.pageY);
                if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {
                    this._dragThreshMet = true;
                    this.start();
                    this._alignNode([ev.pageX, ev.pageY]);
                }
            } else {
                if (this._clickTimeout) {
                    this._clickTimeout.cancel();
                }
                this._alignNode([ev.pageX, ev.pageY]);
            }
        }
    }, stopDrag:function () {
        if (this.get(DRAGGING)) {
            DDM._end();
        }
        return this;
    }, destructor:function () {
        this._unprep();
        this.detachAll();
        if (this.target) {
            this.target.destroy();
        }
        DDM._unregDrag(this);
    }});
    Y.namespace('DD');
    Y.DD.Drag = Drag;
}, '3.0.0', {requires:['dd-ddm-base'], skinnable:false});
YUI.add('dd-proxy', function (Y) {
    var DDM = Y.DD.DDM, NODE = 'node', DRAG_NODE = 'dragNode', HOST = 'host', TRUE = true;
    var P = function (config) {
        P.superclass.constructor.apply(this, arguments);
    };
    P.NAME = 'DDProxy';
    P.NS = 'proxy';
    P.ATTRS = {host:{}, moveOnEnd:{value:TRUE}, hideOnEnd:{value:TRUE}, resizeFrame:{value:TRUE}, positionProxy:{value:TRUE}, borderStyle:{value:'1px solid #808080'}};
    var proto = {_hands:null, _init:function () {
        if (!DDM._proxy) {
            Y.on('domready', Y.bind(this._init, this));
            return;
        }
        if (!this._hands) {
            this._hands = [];
        }
        var i, h, h1, host = this.get(HOST), dnode = host.get(DRAG_NODE);
        if (dnode.compareTo(host.get(NODE))) {
            if (DDM._proxy) {
                host.set(DRAG_NODE, DDM._proxy);
            }
        }
        Y.each(this._hands, function (v) {
            v.detach();
        });
        h = DDM.on('ddm:start', Y.bind(function () {
            if (DDM.activeDrag === host) {
                DDM._setFrame(host);
            }
        }, this));
        h1 = DDM.on('ddm:end', Y.bind(function () {
            if (host.get('dragging')) {
                if (this.get('moveOnEnd')) {
                    host.get(NODE).setXY(host.lastXY);
                }
                if (this.get('hideOnEnd')) {
                    host.get(DRAG_NODE).setStyle('display', 'none');
                }
            }
        }, this));
        this._hands = [h, h1];
    }, initializer:function () {
        this._init();
    }, destructor:function () {
        var host = this.get(HOST);
        Y.each(this._hands, function (v) {
            v.detach();
        });
        host.set(DRAG_NODE, host.get(NODE));
    }};
    Y.namespace('Plugin');
    Y.extend(P, Y.Base, proto);
    Y.Plugin.DDProxy = P;
    Y.mix(DDM, {_createFrame:function () {
        if (!DDM._proxy) {
            DDM._proxy = TRUE;
            var p = Y.Node.create('<div></div>'), b = Y.Node.get('body');
            p.setStyles({position:'absolute', display:'none', zIndex:'999', top:'-999px', left:'-999px'});
            b.insertBefore(p, b.get('firstChild'));
            p.set('id', Y.stamp(p));
            p.addClass(DDM.CSS_PREFIX + '-proxy');
            DDM._proxy = p;
        }
    }, _setFrame:function (drag) {
        var n = drag.get(NODE), d = drag.get(DRAG_NODE), ah, cur = 'auto';
        if (drag.proxy.get('resizeFrame')) {
            DDM._proxy.setStyles({height:n.get('offsetHeight') + 'px', width:n.get('offsetWidth') + 'px'});
        }
        ah = DDM.activeDrag.get('activeHandle');
        if (ah) {
            cur = ah.getStyle('cursor');
        }
        if (cur == 'auto') {
            cur = DDM.get('dragCursor');
        }
        d.setStyles({visibility:'hidden', display:'block', cursor:cur, border:drag.proxy.get('borderStyle')});
        if (drag.proxy.get('positionProxy')) {
            d.setXY(drag.nodeXY);
        }
        d.setStyle('visibility', 'visible');
    }});
    Y.on('domready', Y.bind(DDM._createFrame, DDM));
}, '3.0.0', {requires:['dd-ddm', 'dd-drag'], skinnable:false});
YUI.add('dd-constrain', function (Y) {
    var DRAG_NODE = 'dragNode', OFFSET_HEIGHT = 'offsetHeight', OFFSET_WIDTH = 'offsetWidth', HOST = 'host', CON_2_REGION = 'constrain2region', CON_2_NODE = 'constrain2node', TICK_X_ARRAY = 'tickXArray', TICK_Y_ARRAY = 'tickYArray', DDM = Y.DD.DDM, TOP = 'top', RIGHT = 'right', BOTTOM = 'bottom', LEFT = 'left', proto = null;
    var C = function (config) {
        C.superclass.constructor.apply(this, arguments);
    };
    C.NAME = 'DragConstrained';
    C.NS = 'con';
    C.ATTRS = {host:{}, stickX:{value:false}, stickY:{value:false}, tickX:{value:false}, tickY:{value:false}, tickXArray:{value:false}, tickYArray:{value:false}, constrain2region:{value:false, getter:function (r) {
        if (Y.Lang.isObject(r)) {
            var o = {};
            Y.mix(o, r);
            return o;
        } else {
            return false;
        }
    }, setter:function (r) {
        if (Y.Lang.isObject(r)) {
            if (Y.Lang.isNumber(r[TOP]) && Y.Lang.isNumber(r[RIGHT]) && Y.Lang.isNumber(r[LEFT]) && Y.Lang.isNumber(r[BOTTOM])) {
                var o = {};
                Y.mix(o, r);
                return o;
            } else {
                return false;
            }
        } else if (r !== false) {
            return false;
        }
        return r;
    }}, gutter:{value:'0', setter:function (gutter) {
        return Y.DD.DDM.cssSizestoObject(gutter);
    }}, constrain2node:{value:false, setter:function (n) {
        if (!this.get(CON_2_REGION)) {
            var node = Y.Node.get(n);
            if (node) {
                return node;
            }
        } else if (this.get(CON_2_REGION) !== false) {
        }
        return false;
    }}, constrain2view:{value:false}};
    proto = {initializer:function () {
        this.get(HOST).on('drag:start', Y.bind(this._handleStart, this));
        this.get(HOST).after('drag:align', Y.bind(this.align, this));
    }, _handleStart:function () {
        this._regionCache = null;
    }, _regionCache:null, _cacheRegion:function () {
        this._regionCache = this.get(CON_2_NODE).get('region');
    }, getRegion:function (inc) {
        var r = {}, oh = null, ow = null, g = this.get('gutter'), host = this.get(HOST);
        if (this.get(CON_2_NODE)) {
            if (!this._regionCache) {
                Y.on('resize', Y.bind(this._cacheRegion, this), window);
                this._cacheRegion();
            }
            r = Y.clone(this._regionCache);
        } else if (this.get(CON_2_REGION)) {
            r = this.get(CON_2_REGION);
        } else if (this.get('constrain2view')) {
            r = host.get(DRAG_NODE).get('viewportRegion');
        } else {
            return false;
        }
        Y.each(g, function (i, n) {
            if ((n == RIGHT) || (n == BOTTOM)) {
                r[n] -= i;
            } else {
                r[n] += i;
            }
        });
        if (inc) {
            oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT);
            ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);
            r[RIGHT] = r[RIGHT] - ow;
            r[BOTTOM] = r[BOTTOM] - oh;
        }
        return r;
    }, _checkRegion:function (_xy) {
        var oxy = _xy, r = this.getRegion(), host = this.get(HOST), oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT), ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);
        if (oxy[1] > (r[BOTTOM] - oh)) {
            _xy[1] = (r[BOTTOM] - oh);
        }
        if (r[TOP] > oxy[1]) {
            _xy[1] = r[TOP];
        }
        if (oxy[0] > (r[RIGHT] - ow)) {
            _xy[0] = (r[RIGHT] - ow);
        }
        if (r[LEFT] > oxy[0]) {
            _xy[0] = r[LEFT];
        }
        return _xy;
    }, inRegion:function (xy) {
        xy = xy || this.get(HOST).get(DRAG_NODE).getXY();
        var _xy = this._checkRegion([xy[0], xy[1]]), inside = false;
        if ((xy[0] === _xy[0]) && (xy[1] === _xy[1])) {
            inside = true;
        }
        return inside;
    }, align:function () {
        var host = this.get(HOST), _xy = host.actXY, r = this.getRegion(true);
        if (this.get('stickX')) {
            _xy[1] = (host.startXY[1] - host.deltaXY[1]);
        }
        if (this.get('stickY')) {
            _xy[0] = (host.startXY[0] - host.deltaXY[0]);
        }
        if (r) {
            _xy = this._checkRegion(_xy);
        }
        _xy = this._checkTicks(_xy, r);
        host.actXY = _xy;
    }, _checkTicks:function (xy, r) {
        var host = this.get(HOST), lx = (host.startXY[0] - host.deltaXY[0]), ly = (host.startXY[1] - host.deltaXY[1]), xt = this.get('tickX'), yt = this.get('tickY');
        if (xt && !this.get(TICK_X_ARRAY)) {
            xy[0] = DDM._calcTicks(xy[0], lx, xt, r[LEFT], r[RIGHT]);
        }
        if (yt && !this.get(TICK_Y_ARRAY)) {
            xy[1] = DDM._calcTicks(xy[1], ly, yt, r[TOP], r[BOTTOM]);
        }
        if (this.get(TICK_X_ARRAY)) {
            xy[0] = DDM._calcTickArray(xy[0], this.get(TICK_X_ARRAY), r[LEFT], r[RIGHT]);
        }
        if (this.get(TICK_Y_ARRAY)) {
            xy[1] = DDM._calcTickArray(xy[1], this.get(TICK_Y_ARRAY), r[TOP], r[BOTTOM]);
        }
        return xy;
    }};
    Y.namespace('Plugin');
    Y.extend(C, Y.Base, proto);
    Y.Plugin.DDConstrained = C;
    Y.mix(DDM, {_calcTicks:function (pos, start, tick, off1, off2) {
        var ix = ((pos - start) / tick), min = Math.floor(ix), max = Math.ceil(ix);
        if ((min !== 0) || (max !== 0)) {
            if ((ix >= min) && (ix <= max)) {
                pos = (start + (tick * min));
                if (off1 && off2) {
                    if (pos < off1) {
                        pos = (start + (tick * (min + 1)));
                    }
                    if (pos > off2) {
                        pos = (start + (tick * (min - 1)));
                    }
                }
            }
        }
        return pos;
    }, _calcTickArray:function (pos, ticks, off1, off2) {
        var i = 0, len = ticks.length, next = 0, diff1, diff2, ret;
        if (!ticks || (ticks.length === 0)) {
            return pos;
        } else if (ticks[0] >= pos) {
            return ticks[0];
        } else {
            for (i = 0; i < len; i++) {
                next = (i + 1);
                if (ticks[next] && ticks[next] >= pos) {
                    diff1 = pos - ticks[i];
                    diff2 = ticks[next] - pos;
                    ret = (diff2 > diff1) ? ticks[i] : ticks[next];
                    if (off1 && off2) {
                        if (ret > off2) {
                            if (ticks[i]) {
                                ret = ticks[i];
                            } else {
                                ret = ticks[len - 1];
                            }
                        }
                    }
                    return ret;
                }
            }
            return ticks[ticks.length - 1];
        }
    }});
}, '3.0.0', {requires:['dd-drag'], skinnable:false});
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
YUI.add('dd-plugin', function (Y) {
    var Drag = function (config) {
        config.node = ((Y.Widget && config.host instanceof Y.Widget) ? config.host.get('boundingBox') : config.host);
        Drag.superclass.constructor.apply(this, arguments);
    };
    Drag.NAME = "dd-plugin";
    Drag.NS = "dd";
    Y.extend(Drag, Y.DD.Drag);
    Y.namespace('Plugin');
    Y.Plugin.Drag = Drag;
}, '3.0.0', {skinnable:false, requires:['dd-drag'], optional:['dd-constrain', 'dd-proxy']});
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
YUI.add('dd-drop-plugin', function (Y) {
    var Drop = function (config) {
        config.node = config.host;
        Drop.superclass.constructor.apply(this, arguments);
    };
    Drop.NAME = "dd-drop-plugin";
    Drop.NS = "drop";
    Y.extend(Drop, Y.DD.Drop);
    Y.namespace('Plugin');
    Y.Plugin.Drop = Drop;
}, '3.0.0', {requires:['dd-drop'], skinnable:false});
YUI.add('dd', function (Y) {
}, '3.0.0', {use:['dd-ddm-base', 'dd-ddm', 'dd-ddm-drop', 'dd-drag', 'dd-proxy', 'dd-constrain', 'dd-plugin', 'dd-drop', 'dd-drop-plugin', 'dd-scroll'], skinnable:false});