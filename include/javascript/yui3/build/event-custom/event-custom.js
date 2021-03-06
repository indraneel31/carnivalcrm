/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-custom-base', function (Y) {
    Y.Env.evt = {handles:{}, plugins:{}};
    (function () {
        var BEFORE = 0, AFTER = 1;
        Y.Do = {objs:{}, before:function (fn, obj, sFn, c) {
            var f = fn, a;
            if (c) {
                a = [fn, c].concat(Y.Array(arguments, 4, true));
                f = Y.rbind.apply(Y, a);
            }
            return this._inject(BEFORE, f, obj, sFn);
        }, after:function (fn, obj, sFn, c) {
            var f = fn, a;
            if (c) {
                a = [fn, c].concat(Y.Array(arguments, 4, true));
                f = Y.rbind.apply(Y, a);
            }
            return this._inject(AFTER, f, obj, sFn);
        }, _inject:function (when, fn, obj, sFn) {
            var id = Y.stamp(obj), o, sid;
            if (!this.objs[id]) {
                this.objs[id] = {};
            }
            o = this.objs[id];
            if (!o[sFn]) {
                o[sFn] = new Y.Do.Method(obj, sFn);
                obj[sFn] = function () {
                    return o[sFn].exec.apply(o[sFn], arguments);
                };
            }
            sid = id + Y.stamp(fn) + sFn;
            o[sFn].register(sid, fn, when);
            return new Y.EventHandle(o[sFn], sid);
        }, detach:function (handle) {
            if (handle.detach) {
                handle.detach();
            }
        }, _unload:function (e, me) {
        }};
        Y.Do.Method = function (obj, sFn) {
            this.obj = obj;
            this.methodName = sFn;
            this.method = obj[sFn];
            this.before = {};
            this.after = {};
        };
        Y.Do.Method.prototype.register = function (sid, fn, when) {
            if (when) {
                this.after[sid] = fn;
            } else {
                this.before[sid] = fn;
            }
        };
        Y.Do.Method.prototype._delete = function (sid) {
            delete this.before[sid];
            delete this.after[sid];
        };
        Y.Do.Method.prototype.exec = function () {
            var args = Y.Array(arguments, 0, true), i, ret, newRet, bf = this.before, af = this.after, prevented = false;
            for (i in bf) {
                if (bf.hasOwnProperty(i)) {
                    ret = bf[i].apply(this.obj, args);
                    if (ret) {
                        switch (ret.constructor) {
                            case Y.Do.Halt:
                                return ret.retVal;
                            case Y.Do.AlterArgs:
                                args = ret.newArgs;
                                break;
                            case Y.Do.Prevent:
                                prevented = true;
                                break;
                            default:
                        }
                    }
                }
            }
            if (!prevented) {
                ret = this.method.apply(this.obj, args);
            }
            for (i in af) {
                if (af.hasOwnProperty(i)) {
                    newRet = af[i].apply(this.obj, args);
                    if (newRet && newRet.constructor == Y.Do.Halt) {
                        return newRet.retVal;
                    } else if (newRet && newRet.constructor == Y.Do.AlterReturn) {
                        ret = newRet.newRetVal;
                    }
                }
            }
            return ret;
        };
        Y.Do.AlterArgs = function (msg, newArgs) {
            this.msg = msg;
            this.newArgs = newArgs;
        };
        Y.Do.AlterReturn = function (msg, newRetVal) {
            this.msg = msg;
            this.newRetVal = newRetVal;
        };
        Y.Do.Halt = function (msg, retVal) {
            this.msg = msg;
            this.retVal = retVal;
        };
        Y.Do.Prevent = function (msg) {
            this.msg = msg;
        };
        Y.Do.Error = Y.Do.Halt;
    })();
    var AFTER = 'after', CONFIGS = ['broadcast', 'bubbles', 'context', 'contextFn', 'currentTarget', 'defaultFn', 'details', 'emitFacade', 'fireOnce', 'host', 'preventable', 'preventedFn', 'queuable', 'silent', 'stoppedFn', 'target', 'type'], YUI3_SIGNATURE = 9, YUI_LOG = 'yui:log';
    Y.EventHandle = function (evt, sub) {
        this.evt = evt;
        this.sub = sub;
    };
    Y.EventHandle.prototype = {detach:function () {
        var evt = this.evt, i;
        if (evt) {
            if (Y.Lang.isArray(evt)) {
                for (i = 0; i < evt.length; i++) {
                    evt[i].detach();
                }
            } else {
                evt._delete(this.sub);
            }
        }
    }};
    Y.CustomEvent = function (type, o) {
        o = o || {};
        this.id = Y.stamp(this);
        this.type = type;
        this.context = Y;
        this.logSystem = (type == YUI_LOG);
        this.silent = this.logSystem;
        this.subscribers = {};
        this.afters = {};
        this.preventable = true;
        this.bubbles = true;
        this.signature = YUI3_SIGNATURE;
        this.applyConfig(o, true);
    };
    Y.CustomEvent.prototype = {applyConfig:function (o, force) {
        if (o) {
            Y.mix(this, o, force, CONFIGS);
        }
    }, _on:function (fn, context, args, when) {
        if (!fn) {
            this.log("Invalid callback for CE: " + this.type);
        }
        var s = new Y.Subscriber(fn, context, args, when);
        if (this.fireOnce && this.fired) {
            Y.later(0, this, Y.bind(this._notify, this, s, this.firedWith));
        }
        if (when == AFTER) {
            this.afters[s.id] = s;
            this.hasAfters = true;
        } else {
            this.subscribers[s.id] = s;
            this.hasSubscribers = true;
        }
        return new Y.EventHandle(this, s);
    }, subscribe:function (fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true) : null;
        return this._on(fn, context, a, true);
    }, on:function (fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true) : null;
        return this._on(fn, context, a, true);
    }, after:function (fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true) : null;
        return this._on(fn, context, a, AFTER);
    }, detach:function (fn, context) {
        if (fn && fn.detach) {
            return fn.detach();
        }
        var found = 0, subs = this.subscribers, i, s;
        for (i in subs) {
            if (subs.hasOwnProperty(i)) {
                s = subs[i];
                if (s && (!fn || fn === s.fn)) {
                    this._delete(s);
                    found++;
                }
            }
        }
        return found;
    }, unsubscribe:function () {
        return this.detach.apply(this, arguments);
    }, _notify:function (s, args, ef) {
        this.log(this.type + "->" + "sub: " + s.id);
        var ret;
        ret = s.notify(args, this);
        if (false === ret || this.stopped > 1) {
            this.log(this.type + " cancelled by subscriber");
            return false;
        }
        return true;
    }, log:function (msg, cat) {
        if (!this.silent) {
        }
    }, fire:function () {
        if (this.fireOnce && this.fired) {
            this.log('fireOnce event: ' + this.type + ' already fired');
            return true;
        } else {
            var args = Y.Array(arguments, 0, true);
            this.fired = true;
            this.firedWith = args;
            if (this.emitFacade) {
                return this.fireComplex(args);
            } else {
                return this.fireSimple(args);
            }
        }
    }, fireSimple:function (args) {
        if (this.hasSubscribers || this.hasAfters) {
            this._procSubs(Y.merge(this.subscribers, this.afters), args);
        }
        this._broadcast(args);
        return this.stopped ? false : true;
    }, fireComplex:function (args) {
        args[0] = args[0] || {};
        return this.fireSimple(args);
    }, _procSubs:function (subs, args, ef) {
        var s, i;
        for (i in subs) {
            if (subs.hasOwnProperty(i)) {
                s = subs[i];
                if (s && s.fn) {
                    if (false === this._notify(s, args, ef)) {
                        this.stopped = 2;
                    }
                    if (this.stopped == 2) {
                        return false;
                    }
                }
            }
        }
        return true;
    }, _broadcast:function (args) {
        if (!this.stopped && this.broadcast) {
            var a = Y.Array(args);
            a.unshift(this.type);
            if (this.host !== Y) {
                Y.fire.apply(Y, a);
            }
            if (this.broadcast == 2) {
                Y.Global.fire.apply(Y.Global, a);
            }
        }
    }, unsubscribeAll:function () {
        return this.detachAll.apply(this, arguments);
    }, detachAll:function () {
        return this.detach();
    }, _delete:function (s) {
        if (s) {
            delete s.fn;
            delete s.context;
            delete this.subscribers[s.id];
            delete this.afters[s.id];
        }
    }};
    Y.Subscriber = function (fn, context, args) {
        this.fn = fn;
        this.context = context;
        this.id = Y.stamp(this);
        this.args = args;
        this.events = null;
    };
    Y.Subscriber.prototype = {_notify:function (c, args, ce) {
        var a = this.args, ret;
        switch (ce.signature) {
            case 0:
                ret = this.fn.call(c, ce.type, args, c);
                break;
            case 1:
                ret = this.fn.call(c, args[0] || null, c);
                break;
            default:
                if (a || args) {
                    args = args || [];
                    a = (a) ? args.concat(a) : args;
                    ret = this.fn.apply(c, a);
                } else {
                    ret = this.fn.call(c);
                }
        }
        return ret;
    }, notify:function (args, ce) {
        var c = this.context, ret = true;
        if (!c) {
            c = (ce.contextFn) ? ce.contextFn() : ce.context;
        }
        if (Y.config.throwFail) {
            ret = this._notify(c, args, ce);
        } else {
            try {
                ret = this._notify(c, args, ce);
            } catch (e) {
                Y.error(this + ' failed: ' + e.message, e);
            }
        }
        return ret;
    }, contains:function (fn, context) {
        if (context) {
            return((this.fn == fn) && this.context == context);
        } else {
            return(this.fn == fn);
        }
    }};
    (function () {
        var L = Y.Lang, PREFIX_DELIMITER = ':', CATEGORY_DELIMITER = '|', AFTER_PREFIX = '~AFTER~', _getType = Y.cached(function (type, pre) {
            if (!pre || !L.isString(type) || type.indexOf(PREFIX_DELIMITER) > -1) {
                return type;
            }
            return pre + PREFIX_DELIMITER + type;
        }), _parseType = Y.cached(function (type, pre) {
            var t = type, detachcategory, after, i;
            if (!L.isString(t)) {
                return t;
            }
            i = t.indexOf(AFTER_PREFIX);
            if (i > -1) {
                after = true;
                t = t.substr(AFTER_PREFIX.length);
            }
            i = t.indexOf(CATEGORY_DELIMITER);
            if (i > -1) {
                detachcategory = t.substr(0, (i));
                t = t.substr(i + 1);
                if (t == '*') {
                    t = null;
                }
            }
            return[detachcategory, (pre) ? _getType(t, pre) : t, after, t];
        }), ET = function (opts) {
            var o = (L.isObject(opts)) ? opts : {};
            this._yuievt = this._yuievt || {id:Y.guid(), events:{}, targets:{}, config:o, chain:('chain'in o) ? o.chain : Y.config.chain, defaults:{context:o.context || this, host:this, emitFacade:o.emitFacade, fireOnce:o.fireOnce, queuable:o.queuable, broadcast:o.broadcast, bubbles:('bubbles'in o) ? o.bubbles : true}};
        };
        ET.prototype = {on:function (type, fn, context, x) {
            var parts = _parseType(type, this._yuievt.config.prefix), f, c, args, ret, ce, detachcategory, handle, store = Y.Env.evt.handles, after, adapt, shorttype, Node = Y.Node, n, domevent;
            if (L.isObject(type)) {
                if (L.isFunction(type)) {
                    return Y.Do.before.apply(Y.Do, arguments);
                }
                f = fn;
                c = context;
                args = Y.Array(arguments, 0, true);
                ret = {};
                after = type._after;
                delete type._after;
                Y.each(type, function (v, k) {
                    if (v) {
                        f = v.fn || ((Y.Lang.isFunction(v)) ? v : f);
                        c = v.context || c;
                    }
                    args[0] = (after) ? AFTER_PREFIX + k : k;
                    args[1] = f;
                    args[2] = c;
                    ret[k] = this.on.apply(this, args);
                }, this);
                return(this._yuievt.chain) ? this : new Y.EventHandle(ret);
            }
            detachcategory = parts[0];
            after = parts[2];
            shorttype = parts[3];
            if (Node && (this instanceof Node) && (shorttype in Node.DOM_EVENTS)) {
                args = Y.Array(arguments, 0, true);
                args.splice(2, 0, Node.getDOMNode(this));
                return Y.on.apply(Y, args);
            }
            type = parts[1];
            if (this instanceof YUI) {
                adapt = Y.Env.evt.plugins[type];
                args = Y.Array(arguments, 0, true);
                args[0] = shorttype;
                if (Node) {
                    n = args[2];
                    if (n instanceof Y.NodeList) {
                        n = Y.NodeList.getDOMNodes(n);
                    } else if (n instanceof Node) {
                        n = Node.getDOMNode(n);
                    }
                    domevent = (shorttype in Node.DOM_EVENTS);
                    if (domevent) {
                        args[2] = n;
                    }
                }
                if (adapt) {
                    handle = adapt.on.apply(Y, args);
                } else if ((!type) || domevent) {
                    handle = Y.Event._attach(args);
                }
            }
            if (!handle) {
                ce = this._yuievt.events[type] || this.publish(type);
                handle = ce._on(fn, context, (arguments.length > 3) ? Y.Array(arguments, 3, true) : null, (after) ? 'after' : true);
            }
            if (detachcategory) {
                store[detachcategory] = store[detachcategory] || {};
                store[detachcategory][type] = store[detachcategory][type] || [];
                store[detachcategory][type].push(handle);
            }
            return(this._yuievt.chain) ? this : handle;
        }, subscribe:function () {
            return this.on.apply(this, arguments);
        }, detach:function (type, fn, context) {
            var evts = this._yuievt.events, i, ret, Node = Y.Node, isNode = (this instanceof Node);
            if (!type && (this !== Y)) {
                for (i in evts) {
                    if (evts.hasOwnProperty(i)) {
                        ret = evts[i].detach(fn, context);
                    }
                }
                if (isNode) {
                    Y.Event.purgeElement(Node.getDOMNode(this));
                }
                return ret;
            }
            var parts = _parseType(type, this._yuievt.config.prefix), detachcategory = L.isArray(parts) ? parts[0] : null, shorttype = (parts) ? parts[3] : null, handle, adapt, store = Y.Env.evt.handles, cat, args, ce, keyDetacher = function (lcat, ltype) {
                var handles = lcat[ltype];
                if (handles) {
                    while (handles.length) {
                        handle = handles.pop();
                        handle.detach();
                    }
                }
            };
            if (detachcategory) {
                cat = store[detachcategory];
                type = parts[1];
                if (cat) {
                    if (type) {
                        keyDetacher(cat, type);
                    } else {
                        for (i in cat) {
                            if (cat.hasOwnProperty(i)) {
                                keyDetacher(cat, i);
                            }
                        }
                    }
                    return(this._yuievt.chain) ? this : true;
                }
            } else if (L.isObject(type) && type.detach) {
                ret = type.detach();
                return(this._yuievt.chain) ? this : ret;
            } else if (isNode && ((!shorttype) || (shorttype in Node.DOM_EVENTS))) {
                args = Y.Array(arguments, 0, true);
                args[2] = Node.getDOMNode(this);
                return Y.detach.apply(Y, args);
            }
            adapt = Y.Env.evt.plugins[shorttype];
            if (this instanceof YUI) {
                args = Y.Array(arguments, 0, true);
                if (adapt && adapt.detach) {
                    return adapt.detach.apply(Y, args);
                } else if (!type || (!adapt && Node && (type in Node.DOM_EVENTS))) {
                    args[0] = type;
                    return Y.Event.detach.apply(Y.Event, args);
                }
            }
            ce = evts[type];
            if (ce) {
                ret = ce.detach(fn, context);
            }
            return(this._yuievt.chain) ? this : ret;
        }, unsubscribe:function () {
            return this.detach.apply(this, arguments);
        }, detachAll:function (type) {
            return this.detach(type);
        }, unsubscribeAll:function () {
            return this.detachAll.apply(this, arguments);
        }, publish:function (type, opts) {
            var events, ce, ret, pre = this._yuievt.config.prefix;
            type = (pre) ? _getType(type, pre) : type;
            if (L.isObject(type)) {
                ret = {};
                Y.each(type, function (v, k) {
                    ret[k] = this.publish(k, v || opts);
                }, this);
                return ret;
            }
            events = this._yuievt.events;
            ce = events[type];
            if (ce) {
                if (opts) {
                    ce.applyConfig(opts, true);
                }
            } else {
                ce = new Y.CustomEvent(type, (opts) ? Y.mix(opts, this._yuievt.defaults) : this._yuievt.defaults);
                events[type] = ce;
            }
            return events[type];
        }, addTarget:function (o) {
            this._yuievt.targets[Y.stamp(o)] = o;
            this._yuievt.hasTargets = true;
        }, removeTarget:function (o) {
            delete this._yuievt.targets[Y.stamp(o)];
        }, fire:function (type) {
            var typeIncluded = L.isString(type), t = (typeIncluded) ? type : (type && type.type), ce, a, ret, pre = this._yuievt.config.prefix;
            t = (pre) ? _getType(t, pre) : t;
            ce = this.getEvent(t, true);
            if (!ce) {
                if (this._yuievt.hasTargets) {
                    a = (typeIncluded) ? arguments : Y.Array(arguments, 0, true).unshift(t);
                    return this.bubble(null, a, this);
                }
                ret = true;
            } else {
                a = Y.Array(arguments, (typeIncluded) ? 1 : 0, true);
                ret = ce.fire.apply(ce, a);
                ce.target = null;
            }
            return(this._yuievt.chain) ? this : ret;
        }, getEvent:function (type, prefixed) {
            var pre, e;
            if (!prefixed) {
                pre = this._yuievt.config.prefix;
                type = (pre) ? _getType(type, pre) : type;
            }
            e = this._yuievt.events;
            return(e && type in e) ? e[type] : null;
        }, after:function (type, fn) {
            var a = Y.Array(arguments, 0, true);
            switch (L.type(type)) {
                case'function':
                    return Y.Do.after.apply(Y.Do, arguments);
                case'object':
                    a[0]._after = true;
                    break;
                default:
                    a[0] = AFTER_PREFIX + type;
            }
            return this.on.apply(this, a);
        }, before:function () {
            return this.on.apply(this, arguments);
        }};
        Y.EventTarget = ET;
        Y.mix(Y, ET.prototype, false, false, {bubbles:false});
        ET.call(Y);
        YUI.Env.globalEvents = YUI.Env.globalEvents || new ET();
        Y.Global = YUI.Env.globalEvents;
    })();
}, '3.0.0', {requires:['oop']});
YUI.add('event-custom-complex', function (Y) {
    (function () {
        var FACADE, FACADE_KEYS, CEProto = Y.CustomEvent.prototype;
        Y.EventFacade = function (e, currentTarget) {
            e = e || {};
            this.details = e.details;
            this.type = e.type;
            this.target = e.target;
            this.currentTarget = currentTarget;
            this.relatedTarget = e.relatedTarget;
            this.stopPropagation = function () {
                e.stopPropagation();
            };
            this.stopImmediatePropagation = function () {
                e.stopImmediatePropagation();
            };
            this.preventDefault = function () {
                e.preventDefault();
            };
            this.halt = function (immediate) {
                e.halt(immediate);
            };
        };
        CEProto.fireComplex = function (args) {
            var es = Y.Env._eventstack, ef, q, queue, ce, ret, events;
            if (es) {
                if (this.queuable && this.type != es.next.type) {
                    this.log('queue ' + this.type);
                    es.queue.push([this, args]);
                    return true;
                }
            } else {
                Y.Env._eventstack = {id:this.id, next:this, silent:this.silent, stopped:0, prevented:0, queue:[]};
                es = Y.Env._eventstack;
            }
            this.stopped = 0;
            this.prevented = 0;
            this.target = this.target || this.host;
            events = new Y.EventTarget({fireOnce:true, context:this.host});
            this.events = events;
            if (this.preventedFn) {
                events.on('prevented', this.preventedFn);
            }
            if (this.stoppedFn) {
                events.on('stopped', this.stoppedFn);
            }
            this.currentTarget = this.host || this.currentTarget;
            this.details = args.slice();
            this.log("Firing " + this.type);
            this._facade = null;
            ef = this._getFacade(args);
            if (Y.Lang.isObject(args[0])) {
                args[0] = ef;
            } else {
                args.unshift(ef);
            }
            if (this.hasSubscribers) {
                this._procSubs(Y.merge(this.subscribers), args, ef);
            }
            if (this.bubbles && this.host && this.host.bubble && !this.stopped) {
                es.stopped = 0;
                es.prevented = 0;
                ret = this.host.bubble(this);
                this.stopped = Math.max(this.stopped, es.stopped);
                this.prevented = Math.max(this.prevented, es.prevented);
            }
            if (this.defaultFn && !this.prevented) {
                this.defaultFn.apply(this.host || this, args);
            }
            this._broadcast(args);
            if (this.hasAfters && !this.prevented && this.stopped < 2) {
                this._procSubs(Y.merge(this.afters), args, ef);
            }
            if (es.id === this.id) {
                queue = es.queue;
                while (queue.length) {
                    q = queue.pop();
                    ce = q[0];
                    es.stopped = 0;
                    es.prevented = 0;
                    es.next = ce;
                    ce.fire.apply(ce, q[1]);
                }
                Y.Env._eventstack = null;
            }
            return this.stopped ? false : true;
        };
        CEProto._getFacade = function () {
            var ef = this._facade, o, o2, args = this.details;
            if (!ef) {
                ef = new Y.EventFacade(this, this.currentTarget);
            }
            o = args && args[0];
            if (Y.Lang.isObject(o, true)) {
                o2 = {};
                Y.mix(o2, ef, true, FACADE_KEYS);
                Y.mix(ef, o, true);
                Y.mix(ef, o2, true, FACADE_KEYS);
            }
            ef.details = this.details;
            ef.target = this.target;
            ef.currentTarget = this.currentTarget;
            ef.stopped = 0;
            ef.prevented = 0;
            this._facade = ef;
            return this._facade;
        };
        CEProto.stopPropagation = function () {
            this.stopped = 1;
            Y.Env._eventstack.stopped = 1;
            this.events.fire('stopped', this);
        };
        CEProto.stopImmediatePropagation = function () {
            this.stopped = 2;
            Y.Env._eventstack.stopped = 2;
            this.events.fire('stopped', this);
        };
        CEProto.preventDefault = function () {
            if (this.preventable) {
                this.prevented = 1;
                Y.Env._eventstack.prevented = 1;
                this.events.fire('prevented', this);
            }
        };
        CEProto.halt = function (immediate) {
            if (immediate) {
                this.stopImmediatePropagation();
            } else {
                this.stopPropagation();
            }
            this.preventDefault();
        };
        Y.EventTarget.prototype.bubble = function (evt, args, target) {
            var targs = this._yuievt.targets, ret = true, t, type, ce, i, bc;
            if (!evt || ((!evt.stopped) && targs)) {
                for (i in targs) {
                    if (targs.hasOwnProperty(i)) {
                        t = targs[i];
                        type = evt && evt.type;
                        ce = t.getEvent(type, true);
                        if (!ce) {
                            if (t._yuievt.hasTargets) {
                                t.bubble.call(t, evt, args, target);
                            }
                        } else {
                            ce.target = target || (evt && evt.target) || this;
                            ce.currentTarget = t;
                            bc = ce.broadcast;
                            ce.broadcast = false;
                            ret = ret && ce.fire.apply(ce, args || evt.details);
                            ce.broadcast = bc;
                            if (ce.stopped) {
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        };
        FACADE = new Y.EventFacade();
        FACADE_KEYS = Y.Object.keys(FACADE);
    })();
}, '3.0.0', {requires:['event-custom-base']});
YUI.add('event-custom', function (Y) {
}, '3.0.0', {use:['event-custom-base', 'event-custom-complex']});