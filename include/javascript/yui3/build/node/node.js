/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('node-base', function (Y) {
    var DOT = '.', NODE_NAME = 'nodeName', NODE_TYPE = 'nodeType', OWNER_DOCUMENT = 'ownerDocument', TAG_NAME = 'tagName', UID = '_yuid', Node = function (node) {
        var uid = node[UID];
        if (uid && Node._instances[uid] && Node._instances[uid]._node !== node) {
            node[UID] = null;
        }
        uid = Y.stamp(node);
        if (!uid) {
            uid = Y.guid();
        }
        this[UID] = uid;
        this._node = node;
        Node._instances[uid] = this;
        this._stateProxy = node;
        if (this._initPlugins) {
            this._initPlugins();
        }
    }, _wrapFn = function (fn) {
        var ret = null;
        if (fn) {
            ret = (typeof fn === 'string') ? function (n) {
                return Y.Selector.test(n, fn);
            } : function (n) {
                return fn(Node.get(n));
            };
        }
        return ret;
    };
    Node.NAME = 'Node';
    Node.re_aria = /^(?:role$|aria-)/;
    Node.DOM_EVENTS = {abort:true, beforeunload:true, blur:true, change:true, click:true, close:true, command:true, contextmenu:true, drag:true, dragstart:true, dragenter:true, dragover:true, dragleave:true, dragend:true, drop:true, dblclick:true, error:true, focus:true, keydown:true, keypress:true, keyup:true, load:true, message:true, mousedown:true, mousemove:true, mouseout:true, mouseover:true, mouseup:true, mousemultiwheel:true, mousewheel:true, submit:true, mouseenter:true, mouseleave:true, scroll:true, reset:true, resize:true, select:true, textInput:true, unload:true};
    Y.mix(Node.DOM_EVENTS, Y.Env.evt.plugins);
    Node._instances = {};
    Node.getDOMNode = function (node) {
        if (node) {
            return(node.nodeType) ? node : node._node || null;
        }
        return null;
    };
    Node.scrubVal = function (val, node) {
        if (node && val) {
            if (typeof val === 'object' || typeof val === 'function') {
                if (NODE_TYPE in val || Y.DOM.isWindow(val)) {
                    val = Node.get(val);
                } else if ((val.item && !val._nodes) || (val[0] && val[0][NODE_TYPE])) {
                    val = Y.all(val);
                }
            }
        } else if (val === undefined) {
            val = node;
        }
        return val;
    };
    Node.addMethod = function (name, fn, context) {
        if (name && fn && typeof fn === 'function') {
            Node.prototype[name] = function () {
                context = context || this;
                var args = Y.Array(arguments), ret;
                if (args[0] && args[0]instanceof Node) {
                    args[0] = args[0]._node;
                }
                if (args[1] && args[1]instanceof Node) {
                    args[1] = args[1]._node;
                }
                args.unshift(this._node);
                ret = Node.scrubVal(fn.apply(context, args), this);
                return ret;
            };
        } else {
        }
    };
    Node.importMethod = function (host, name, altName) {
        if (typeof name === 'string') {
            altName = altName || name;
            Node.addMethod(altName, host[name], host);
        } else {
            Y.each(name, function (n) {
                Node.importMethod(host, n);
            });
        }
    };
    Node.one = function (node) {
        var instance = null, cachedNode, uid;
        if (node) {
            if (typeof node === 'string') {
                if (node.indexOf('doc') === 0) {
                    node = Y.config.doc;
                } else if (node.indexOf('win') === 0) {
                    node = Y.config.win;
                } else {
                    node = Y.Selector.query(node, null, true);
                }
                if (!node) {
                    return null;
                }
            } else if (node instanceof Node) {
                return node;
            }
            uid = node._yuid;
            instance = Node._instances[uid];
            cachedNode = instance ? instance._node : null;
            if (!instance || (cachedNode && node !== cachedNode)) {
                instance = new Node(node);
            }
        }
        return instance;
    };
    Node.get = function () {
        return Node.one.apply(Node, arguments);
    };
    Node.create = function () {
        return Node.get(Y.DOM.create.apply(Y.DOM, arguments));
    };
    Node.ATTRS = {text:{getter:function () {
        return Y.DOM.getText(this._node);
    }, setter:function (content) {
        Y.DOM.setText(this._node, content);
        return content;
    }}, 'options':{getter:function () {
        return this._node.getElementsByTagName('option');
    }}, 'elements':{getter:function () {
        return Y.all(this._node.elements);
    }}, 'children':{getter:function () {
        var node = this._node, children = node.children, childNodes, i, len;
        if (!children) {
            childNodes = node.childNodes;
            children = [];
            for (i = 0, len = childNodes.length; i < len; ++i) {
                if (childNodes[i][TAG_NAME]) {
                    children[children.length] = childNodes[i];
                }
            }
        }
        return Y.all(children);
    }}, value:{getter:function () {
        return Y.DOM.getValue(this._node);
    }, setter:function (val) {
        Y.DOM.setValue(this._node, val);
        return val;
    }}, data:{getter:function () {
        return this._data;
    }, setter:function (val) {
        this._data = val;
        return val;
    }}};
    Node.DEFAULT_SETTER = function (name, val) {
        var node = this._stateProxy, strPath;
        if (name.indexOf(DOT) > -1) {
            strPath = name;
            name = name.split(DOT);
            Y.Object.setValue(node, name, val);
        } else if (node[name] !== undefined) {
            node[name] = val;
        }
        return val;
    };
    Node.DEFAULT_GETTER = function (name) {
        var node = this._stateProxy, val;
        if (name.indexOf && name.indexOf(DOT) > -1) {
            val = Y.Object.getValue(node, name.split(DOT));
        } else if (node[name] !== undefined) {
            val = node[name];
        }
        return val;
    };
    Y.augment(Node, Y.Event.Target);
    Y.mix(Node.prototype, {toString:function () {
        var str = '', errorMsg = this[UID] + ': not bound to a node', node = this._node;
        if (node) {
            str += node[NODE_NAME];
            if (node.id) {
                str += '#' + node.id;
            }
            if (node.className) {
                str += '.' + node.className.replace(' ', '.');
            }
            str += ' ' + this[UID];
        }
        return str || errorMsg;
    }, get:function (attr) {
        var val;
        if (this._getAttr) {
            val = this._getAttr(attr);
        } else {
            val = this._get(attr);
        }
        if (val) {
            val = Y.Node.scrubVal(val, this);
        }
        return val;
    }, _get:function (attr) {
        var attrConfig = Node.ATTRS[attr], val;
        if (attrConfig && attrConfig.getter) {
            val = attrConfig.getter.call(this);
        } else if (Node.re_aria.test(attr)) {
            val = this._node.getAttribute(attr, 2);
        } else {
            val = Node.DEFAULT_GETTER.apply(this, arguments);
        }
        return val;
    }, set:function (attr, val) {
        var attrConfig = Node.ATTRS[attr];
        if (this._setAttr) {
            this._setAttr.apply(this, arguments);
        } else {
            if (attrConfig && attrConfig.setter) {
                attrConfig.setter.call(this, val);
            } else if (Node.re_aria.test(attr)) {
                this._node.setAttribute(attr, val);
            } else {
                Node.DEFAULT_SETTER.apply(this, arguments);
            }
        }
        return this;
    }, setAttrs:function (attrMap) {
        if (this._setAttrs) {
            this._setAttrs(attrMap);
        } else {
            Y.Object.each(attrMap, function (v, n) {
                this.set(n, v);
            }, this);
        }
        return this;
    }, getAttrs:function (attrs) {
        var ret = {};
        if (this._getAttrs) {
            this._getAttrs(attrs);
        } else {
            Y.Array.each(attrs, function (v, n) {
                ret[v] = this.get(v);
            }, this);
        }
        return ret;
    }, create:Node.create, compareTo:function (refNode) {
        var node = this._node;
        if (refNode instanceof Y.Node) {
            refNode = refNode._node;
        }
        return node === refNode;
    }, inDoc:function (doc) {
        var node = this._node;
        doc = (doc) ? doc._node || doc : node[OWNER_DOCUMENT];
        if (doc.documentElement) {
            return Y.DOM.contains(doc.documentElement, node);
        }
    }, getById:function (id) {
        var node = this._node, ret = Y.DOM.byId(id, node[OWNER_DOCUMENT]);
        if (ret && Y.DOM.contains(node, ret)) {
            ret = Y.one(ret);
        } else {
            ret = null;
        }
        return ret;
    }, ancestor:function (fn) {
        return Node.get(Y.DOM.elementByAxis(this._node, 'parentNode', _wrapFn(fn)));
    }, previous:function (fn, all) {
        return Node.get(Y.DOM.elementByAxis(this._node, 'previousSibling', _wrapFn(fn), all));
    }, next:function (node, fn, all) {
        return Node.get(Y.DOM.elementByAxis(this._node, 'nextSibling', _wrapFn(fn), all));
    }, one:function (selector) {
        return Y.one(Y.Selector.query(selector, this._node, true));
    }, query:function (selector) {
        return this.one(selector);
    }, all:function (selector) {
        var nodelist = Y.all(Y.Selector.query(selector, this._node));
        nodelist._query = selector;
        return nodelist;
    }, queryAll:function (selector) {
        return this.all(selector);
    }, test:function (selector) {
        return Y.Selector.test(this._node, selector);
    }, remove:function (destroy) {
        var node = this._node;
        node.parentNode.removeChild(node);
        if (destroy) {
            this.destroy(true);
        }
        return this;
    }, replace:function (newNode) {
        var node = this._node;
        node.parentNode.replaceChild(newNode, node);
        return this;
    }, purge:function (recurse, type) {
        Y.Event.purgeElement(this._node, recurse, type);
    }, destroy:function (purge) {
        delete Node._instances[this[UID]];
        if (purge) {
            this.purge(true);
        }
        if (this.unplug) {
            this.unplug();
        }
        this._node._yuid = null;
        this._node = null;
        this._stateProxy = null;
    }, invoke:function (method, a, b, c, d, e) {
        var node = this._node, ret;
        if (a && a instanceof Y.Node) {
            a = a._node;
        }
        if (b && b instanceof Y.Node) {
            b = b._node;
        }
        ret = node[method](a, b, c, d, e);
        return Y.Node.scrubVal(ret, this);
    }, each:function (fn, context) {
        context = context || this;
        return fn.call(context, this);
    }, item:function (index) {
        return this;
    }, size:function () {
        return this._node ? 1 : 0;
    }, insert:function (content, where) {
        var node = this._node;
        if (content) {
            if (typeof where === 'number') {
                where = this._node.childNodes[where];
            }
            if (typeof content !== 'string') {
                if (content._node) {
                    content = content._node;
                } else if (content._nodes || (!content.nodeType && content.length)) {
                    Y.each(content._nodes, function (n) {
                        Y.DOM.addHTML(node, n, where);
                    });
                    return this;
                }
            }
            Y.DOM.addHTML(node, content, where);
        }
        return this;
    }, prepend:function (content) {
        return this.insert(content, 0);
    }, append:function (content) {
        return this.insert(content, null);
    }, setContent:function (content) {
        Y.DOM.addHTML(this._node, content, 'replace');
        return this;
    }, hasMethod:function (method) {
        var node = this._node;
        return(node && (typeof node === 'function'));
    }}, true);
    Y.Node = Node;
    Y.get = Y.Node.get;
    Y.one = Y.Node.one;
    var NodeList = function (nodes) {
        if (typeof nodes === 'string') {
            this._query = nodes;
            nodes = Y.Selector.query(nodes);
        } else {
            nodes = Y.Array(nodes, 0, true);
        }
        NodeList._instances[Y.stamp(this)] = this;
        this._nodes = nodes;
    };
    NodeList.NAME = 'NodeList';
    NodeList.getDOMNodes = function (nodeList) {
        return nodeList._nodes;
    };
    NodeList._instances = [];
    NodeList.each = function (instance, fn, context) {
        var nodes = instance._nodes;
        if (nodes && nodes.length) {
            Y.Array.each(nodes, fn, context || instance);
        } else {
        }
    };
    NodeList.addMethod = function (name, fn, context) {
        if (name && fn) {
            NodeList.prototype[name] = function () {
                var ret = [], args = arguments;
                Y.Array.each(this._nodes, function (node) {
                    var UID = '_yuid', instance = Y.Node._instances[node[UID]], ctx, result;
                    if (!instance) {
                        instance = NodeList._getTempNode(node);
                    }
                    ctx = context || instance;
                    result = fn.apply(ctx, args);
                    if (result !== undefined && result !== instance) {
                        ret[ret.length] = result;
                    }
                });
                return ret.length ? ret : this;
            };
        } else {
        }
    };
    NodeList.importMethod = function (host, name, altName) {
        if (typeof name === 'string') {
            altName = altName || name;
            NodeList.addMethod(name, host[name]);
        } else {
            Y.each(name, function (n) {
                NodeList.importMethod(host, n);
            });
        }
    };
    NodeList._getTempNode = function (node) {
        var tmp = NodeList._tempNode;
        if (!tmp) {
            tmp = Y.Node.create('<div></div>');
            NodeList._tempNode = tmp;
        }
        tmp._node = node;
        tmp._stateProxy = node;
        return tmp;
    };
    Y.mix(NodeList.prototype, {item:function (index) {
        return Y.one((this._nodes || [])[index]);
    }, each:function (fn, context) {
        var instance = this;
        Y.Array.each(this._nodes, function (node, index) {
            node = Y.one(node);
            return fn.call(context || node, node, index, instance);
        });
        return instance;
    }, batch:function (fn, context) {
        var nodelist = this;
        Y.Array.each(this._nodes, function (node, index) {
            var instance = Y.Node._instances[node[UID]];
            if (!instance) {
                instance = NodeList._getTempNode(node);
            }
            return fn.call(context || instance, instance, index, nodelist);
        });
        return nodelist;
    }, some:function (fn, context) {
        var instance = this;
        return Y.Array.some(this._nodes, function (node, index) {
            node = Y.one(node);
            context = context || node;
            return fn.call(context, node, index, instance);
        });
    }, toFrag:function () {
        return Y.one(Y.DOM._nl2frag(this._nodes));
    }, indexOf:function (node) {
        return Y.Array.indexOf(this._nodes, Y.Node.getDOMNode(node));
    }, filter:function (selector) {
        return Y.all(Y.Selector.filter(this._nodes, selector));
    }, modulus:function (n, r) {
        r = r || 0;
        var nodes = [];
        NodeList.each(this, function (node, i) {
            if (i % n === r) {
                nodes.push(node);
            }
        });
        return Y.all(nodes);
    }, odd:function () {
        return this.modulus(2, 1);
    }, even:function () {
        return this.modulus(2);
    }, destructor:function () {
        delete NodeList._instances[this[UID]];
    }, refresh:function () {
        var doc, nodes = this._nodes;
        if (this._query) {
            if (nodes && nodes[0] && nodes[0].ownerDocument) {
                doc = nodes[0].ownerDocument;
            }
            this._nodes = Y.Selector.query(this._query, doc || Y.config.doc);
        }
        return this;
    }, on:function (type, fn, context) {
        var args = Y.Array(arguments, 0, true);
        args.splice(2, 0, this._nodes);
        args[3] = context || this;
        return Y.on.apply(Y, args);
    }, after:function (type, fn, context) {
        var args = Y.Array(arguments, 0, true);
        args.splice(2, 0, this._nodes);
        args[3] = context || this;
        return Y.after.apply(Y, args);
    }, size:function () {
        return this._nodes.length;
    }, toString:function () {
        var str = '', errorMsg = this[UID] + ': not bound to any nodes', nodes = this._nodes, node;
        if (nodes && nodes[0]) {
            node = nodes[0];
            str += node[NODE_NAME];
            if (node.id) {
                str += '#' + node.id;
            }
            if (node.className) {
                str += '.' + node.className.replace(' ', '.');
            }
            if (nodes.length > 1) {
                str += '...[' + nodes.length + ' items]';
            }
        }
        return str || errorMsg;
    }}, true);
    NodeList.importMethod(Y.Node.prototype, ['append', 'detach', 'detachAll', 'insert', 'prepend', 'remove', 'set', 'setContent']);
    NodeList.prototype.get = function (attr) {
        var ret = [], nodes = this._nodes, isNodeList = false, getTemp = NodeList._getTempNode, instance, val;
        if (nodes[0]) {
            instance = Y.Node._instances[nodes[0]._yuid] || getTemp(nodes[0]);
            val = instance._get(attr);
            if (val && val.nodeType) {
                isNodeList = true;
            }
        }
        Y.Array.each(nodes, function (node) {
            instance = Y.Node._instances[node._yuid];
            if (!instance) {
                instance = getTemp(node);
            }
            val = instance._get(attr);
            if (!isNodeList) {
                val = Y.Node.scrubVal(val, instance);
            }
            ret.push(val);
        });
        return(isNodeList) ? Y.all(ret) : ret;
    };
    Y.NodeList = NodeList;
    Y.all = function (nodes) {
        return new NodeList(nodes);
    };
    Y.Node.all = Y.all;
    Y.Array.each(['replaceChild', 'appendChild', 'insertBefore', 'removeChild', 'hasChildNodes', 'cloneNode', 'hasAttribute', 'removeAttribute', 'scrollIntoView', 'getElementsByTagName', 'focus', 'blur', 'submit', 'reset', 'select'], function (method) {
        Y.Node.prototype[method] = function (arg1, arg2, arg3) {
            var ret = this.invoke(method, arg1, arg2, arg3);
            return ret;
        };
    });
    Node.importMethod(Y.DOM, ['contains', 'setAttribute', 'getAttribute']);
    Y.NodeList.importMethod(Y.Node.prototype, ['getAttribute', 'setAttribute']);
    (function (Y) {
        var methods = ['hasClass', 'addClass', 'removeClass', 'replaceClass', 'toggleClass'];
        Y.Node.importMethod(Y.DOM, methods);
        Y.NodeList.importMethod(Y.Node.prototype, methods);
    })(Y);
    if (!document.documentElement.hasAttribute) {
        Y.Node.prototype.hasAttribute = function (attr) {
            return Y.DOM.getAttribute(this._node, attr) !== '';
        };
    }
    Y.Node.ATTRS.type = {setter:function (val) {
        if (val === 'hidden') {
            try {
                this._node.type = 'hidden';
            } catch (e) {
                this.setStyle('display', 'none');
                this._inputType = 'hidden';
            }
        } else {
            try {
                this._node.type = val;
            } catch (e) {
            }
        }
        return val;
    }, getter:function () {
        return this._inputType || this._node.type;
    }, _bypassProxy:true};
}, '3.0.0', {requires:['dom-base', 'selector-css2', 'event-base']});
YUI.add('node-style', function (Y) {
    (function (Y) {
        var methods = ['getStyle', 'getComputedStyle', 'setStyle', 'setStyles'];
        Y.Node.importMethod(Y.DOM, methods);
        Y.NodeList.importMethod(Y.Node.prototype, methods);
    })(Y);
}, '3.0.0', {requires:['dom-style', 'node-base']});
YUI.add('node-screen', function (Y) {
    Y.each(['winWidth', 'winHeight', 'docWidth', 'docHeight', 'docScrollX', 'docScrollY'], function (name) {
        Y.Node.ATTRS[name] = {getter:function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(Y.Node.getDOMNode(this));
            return Y.DOM[name].apply(this, args);
        }};
    });
    Y.Node.ATTRS.scrollLeft = {getter:function () {
        var node = Y.Node.getDOMNode(this);
        return('scrollLeft'in node) ? node.scrollLeft : Y.DOM.docScrollX(node);
    }, setter:function (val) {
        var node = Y.Node.getDOMNode(this);
        if (node) {
            if ('scrollLeft'in node) {
                node.scrollLeft = val;
            } else if (node.document || node.nodeType === 9) {
                Y.DOM._getWin(node).scrollTo(val, Y.DOM.docScrollY(node));
            }
        } else {
        }
    }};
    Y.Node.ATTRS.scrollTop = {getter:function () {
        var node = Y.Node.getDOMNode(this);
        return('scrollTop'in node) ? node.scrollTop : Y.DOM.docScrollY(node);
    }, setter:function (val) {
        var node = Y.Node.getDOMNode(this);
        if (node) {
            if ('scrollTop'in node) {
                node.scrollTop = val;
            } else if (node.document || node.nodeType === 9) {
                Y.DOM._getWin(node).scrollTo(Y.DOM.docScrollX(node), val);
            }
        } else {
        }
    }};
    Y.Node.importMethod(Y.DOM, ['getXY', 'setXY', 'getX', 'setX', 'getY', 'setY']);
    Y.Node.ATTRS.region = {getter:function () {
        var node = Y.Node.getDOMNode(this);
        if (node && !node.tagName) {
            if (node.nodeType === 9) {
                node = node.documentElement;
            } else if (node.alert) {
                node = node.document.documentElement;
            }
        }
        return Y.DOM.region(node);
    }};
    Y.Node.ATTRS.viewportRegion = {getter:function () {
        return Y.DOM.viewportRegion(Y.Node.getDOMNode(this));
    }};
    Y.Node.importMethod(Y.DOM, 'inViewportRegion');
    Y.Node.prototype.intersect = function (node2, altRegion) {
        var node1 = Y.Node.getDOMNode(this);
        if (node2 instanceof Y.Node) {
            node2 = Y.Node.getDOMNode(node2);
        }
        return Y.DOM.intersect(node1, node2, altRegion);
    };
    Y.Node.prototype.inRegion = function (node2, all, altRegion) {
        var node1 = Y.Node.getDOMNode(this);
        if (node2 instanceof Y.Node) {
            node2 = Y.Node.getDOMNode(node2);
        }
        return Y.DOM.inRegion(node1, node2, all, altRegion);
    };
}, '3.0.0', {requires:['dom-screen']});
YUI.add('node-pluginhost', function (Y) {
    Y.Node.plug = function () {
        var args = Y.Array(arguments);
        args.unshift(Y.Node);
        Y.Plugin.Host.plug.apply(Y.Base, args);
        return Y.Node;
    };
    Y.Node.unplug = function () {
        var args = Y.Array(arguments);
        args.unshift(Y.Node);
        Y.Plugin.Host.unplug.apply(Y.Base, args);
        return Y.Node;
    };
    Y.mix(Y.Node, Y.Plugin.Host, false, null, 1);
    Y.NodeList.prototype.plug = function () {
        var args = arguments;
        Y.NodeList.each(this, function (node) {
            Y.Node.prototype.plug.apply(Y.one(node), args);
        });
    };
    Y.NodeList.prototype.unplug = function () {
        var args = arguments;
        Y.NodeList.each(this, function (node) {
            Y.Node.prototype.unplug.apply(Y.one(node), args);
        });
    };
}, '3.0.0', {requires:['node-base', 'pluginhost']});
YUI.add('node-event-delegate', function (Y) {
    Y.Node.prototype.delegate = function (type, fn, selector) {
        var args = Array.prototype.slice.call(arguments, 3), a = [type, fn, Y.Node.getDOMNode(this), selector];
        a = a.concat(args);
        return Y.delegate.apply(Y, a);
    };
}, '3.0.0', {requires:['node-base', 'event-delegate', 'pluginhost']});
YUI.add('node', function (Y) {
}, '3.0.0', {skinnable:false, use:['node-base', 'node-style', 'node-screen', 'node-pluginhost', 'node-event-delegate'], requires:['dom', 'event-base', 'event-delegate', 'pluginhost']});