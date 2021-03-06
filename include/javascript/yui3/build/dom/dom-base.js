/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dom-base', function (Y) {
    (function (Y) {
        var NODE_TYPE = 'nodeType', OWNER_DOCUMENT = 'ownerDocument', DEFAULT_VIEW = 'defaultView', PARENT_WINDOW = 'parentWindow', TAG_NAME = 'tagName', PARENT_NODE = 'parentNode', FIRST_CHILD = 'firstChild', PREVIOUS_SIBLING = 'previousSibling', NEXT_SIBLING = 'nextSibling', CONTAINS = 'contains', COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition', documentElement = document.documentElement, re_tag = /<([a-z]+)/i;
        Y.DOM = {byId:function (id, doc) {
            doc = doc || Y.config.doc;
            return doc.getElementById(id);
        }, children:function (node, tag) {
            var ret = [];
            if (node) {
                tag = tag || '*';
                ret = Y.Selector.query('> ' + tag, node);
            }
            return ret;
        }, firstByTag:function (tag, root) {
            var ret;
            root = root || Y.config.doc;
            if (tag && root.getElementsByTagName) {
                ret = root.getElementsByTagName(tag)[0];
            }
            return ret || null;
        }, getText:(documentElement.textContent !== undefined) ? function (element) {
            var ret = '';
            if (element) {
                ret = element.textContent;
            }
            return ret || '';
        } : function (element) {
            var ret = '';
            if (element) {
                ret = element.innerText;
            }
            return ret || '';
        }, setText:(documentElement.textContent !== undefined) ? function (element, content) {
            if (element) {
                element.textContent = content;
            }
        } : function (element, content) {
            if (element) {
                element.innerText = content;
            }
        }, previous:function (element, fn, all) {
            return Y.DOM.elementByAxis(element, PREVIOUS_SIBLING, fn, all);
        }, next:function (element, fn, all) {
            return Y.DOM.elementByAxis(element, NEXT_SIBLING, fn, all);
        }, ancestor:function (element, fn, all) {
            return Y.DOM.elementByAxis(element, PARENT_NODE, fn, all);
        }, elementByAxis:function (element, axis, fn, all) {
            while (element && (element = element[axis])) {
                if ((all || element[TAG_NAME]) && (!fn || fn(element))) {
                    return element;
                }
            }
            return null;
        }, contains:function (element, needle) {
            var ret = false;
            if (!needle || !element || !needle[NODE_TYPE] || !element[NODE_TYPE]) {
                ret = false;
            } else if (element[CONTAINS]) {
                if (Y.UA.opera || needle[NODE_TYPE] === 1) {
                    ret = element[CONTAINS](needle);
                } else {
                    ret = Y.DOM._bruteContains(element, needle);
                }
            } else if (element[COMPARE_DOCUMENT_POSITION]) {
                if (element === needle || !!(element[COMPARE_DOCUMENT_POSITION](needle) & 16)) {
                    ret = true;
                }
            }
            return ret;
        }, inDoc:function (element, doc) {
            doc = doc || element[OWNER_DOCUMENT];
            var id = element.id;
            if (!id) {
                id = element.id = Y.guid();
            }
            return!!(doc.getElementById(id));
        }, create:function (html, doc) {
            if (typeof html === 'string') {
                html = Y.Lang.trim(html);
            }
            if (!doc && Y.DOM._cloneCache[html]) {
                return Y.DOM._cloneCache[html].cloneNode(true);
            }
            doc = doc || Y.config.doc;
            var m = re_tag.exec(html), create = Y.DOM._create, custom = Y.DOM.creators, ret = null, tag, nodes;
            if (m && custom[m[1]]) {
                if (typeof custom[m[1]] === 'function') {
                    create = custom[m[1]];
                } else {
                    tag = custom[m[1]];
                }
            }
            nodes = create(html, doc, tag).childNodes;
            if (nodes.length === 1) {
                ret = nodes[0].parentNode.removeChild(nodes[0]);
            } else {
                ret = Y.DOM._nl2frag(nodes, doc);
            }
            if (ret) {
                Y.DOM._cloneCache[html] = ret.cloneNode(true);
            }
            return ret;
        }, _nl2frag:function (nodes, doc) {
            var ret = null, i, len;
            if (nodes && (nodes.push || nodes.item) && nodes[0]) {
                doc = doc || nodes[0].ownerDocument;
                ret = doc.createDocumentFragment();
                if (nodes.item) {
                    nodes = Y.Array(nodes, 0, true);
                }
                for (i = 0, len = nodes.length; i < len; i++) {
                    ret.appendChild(nodes[i]);
                }
            }
            return ret;
        }, CUSTOM_ATTRIBUTES:(!documentElement.hasAttribute) ? {'for':'htmlFor', 'class':'className'} : {'htmlFor':'for', 'className':'class'}, setAttribute:function (el, attr, val, ieAttr) {
            if (el && el.setAttribute) {
                attr = Y.DOM.CUSTOM_ATTRIBUTES[attr] || attr;
                el.setAttribute(attr, val, ieAttr);
            }
        }, getAttribute:function (el, attr, ieAttr) {
            ieAttr = (ieAttr !== undefined) ? ieAttr : 2;
            var ret = '';
            if (el && el.getAttribute) {
                attr = Y.DOM.CUSTOM_ATTRIBUTES[attr] || attr;
                ret = el.getAttribute(attr, ieAttr);
                if (ret === null) {
                    ret = '';
                }
            }
            return ret;
        }, isWindow:function (obj) {
            return obj.alert && obj.document;
        }, _fragClones:{div:document.createElement('div')}, _create:function (html, doc, tag) {
            tag = tag || 'div';
            var frag = Y.DOM._fragClones[tag];
            if (frag) {
                frag = frag.cloneNode(false);
            } else {
                frag = Y.DOM._fragClones[tag] = doc.createElement(tag);
            }
            frag.innerHTML = html;
            return frag;
        }, _removeChildNodes:function (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }, _cloneCache:{}, addHTML:function (node, content, where) {
            if (typeof content === 'string') {
                content = Y.Lang.trim(content);
            }
            var newNode = Y.DOM._cloneCache[content], nodeParent = node.parentNode;
            if (newNode) {
                newNode = newNode.cloneNode(true);
            } else {
                if (content.nodeType) {
                    newNode = content;
                } else {
                    newNode = Y.DOM.create(content);
                }
            }
            if (where) {
                if (where.nodeType) {
                    where.parentNode.insertBefore(newNode, where);
                } else {
                    switch (where) {
                        case'replace':
                            while (node.firstChild) {
                                node.removeChild(node.firstChild);
                            }
                            node.appendChild(newNode);
                            break;
                        case'before':
                            nodeParent.insertBefore(newNode, node);
                            break;
                        case'after':
                            if (node.nextSibling) {
                                nodeParent.insertBefore(newNode, node.nextSibling);
                            } else {
                                nodeParent.appendChild(newNode);
                            }
                            break;
                        default:
                            node.appendChild(newNode);
                    }
                }
            } else {
                node.appendChild(newNode);
            }
            return newNode;
        }, VALUE_SETTERS:{}, VALUE_GETTERS:{}, getValue:function (node) {
            var ret = '', getter;
            if (node && node[TAG_NAME]) {
                getter = Y.DOM.VALUE_GETTERS[node[TAG_NAME].toLowerCase()];
                if (getter) {
                    ret = getter(node);
                } else {
                    ret = node.value;
                }
            }
            return(typeof ret === 'string') ? ret : '';
        }, setValue:function (node, val) {
            var setter;
            if (node && node[TAG_NAME]) {
                setter = Y.DOM.VALUE_SETTERS[node[TAG_NAME].toLowerCase()];
                if (setter) {
                    setter(node, val);
                } else {
                    node.value = val;
                }
            }
        }, _bruteContains:function (element, needle) {
            while (needle) {
                if (element === needle) {
                    return true;
                }
                needle = needle.parentNode;
            }
            return false;
        }, _getRegExp:function (str, flags) {
            flags = flags || '';
            Y.DOM._regexCache = Y.DOM._regexCache || {};
            if (!Y.DOM._regexCache[str + flags]) {
                Y.DOM._regexCache[str + flags] = new RegExp(str, flags);
            }
            return Y.DOM._regexCache[str + flags];
        }, _getDoc:function (element) {
            element = element || {};
            return(element[NODE_TYPE] === 9) ? element : element[OWNER_DOCUMENT] || element.document || Y.config.doc;
        }, _getWin:function (element) {
            var doc = Y.DOM._getDoc(element);
            return doc[DEFAULT_VIEW] || doc[PARENT_WINDOW] || Y.config.win;
        }, _batch:function (nodes, fn, arg1, arg2, arg3, etc) {
            fn = (typeof name === 'string') ? Y.DOM[fn] : fn;
            var result, ret = [];
            if (fn && nodes) {
                Y.each(nodes, function (node) {
                    if ((result = fn.call(Y.DOM, node, arg1, arg2, arg3, etc)) !== undefined) {
                        ret[ret.length] = result;
                    }
                });
            }
            return ret.length ? ret : nodes;
        }, _testElement:function (element, tag, fn) {
            tag = (tag && tag !== '*') ? tag.toUpperCase() : null;
            return(element && element[TAG_NAME] && (!tag || element[TAG_NAME].toUpperCase() === tag) && (!fn || fn(element)));
        }, creators:{}, _IESimpleCreate:function (html, doc) {
            doc = doc || Y.config.doc;
            return doc.createElement(html);
        }};
        (function (Y) {
            var creators = Y.DOM.creators, create = Y.DOM.create, re_tbody = /(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/, TABLE_OPEN = '<table>', TABLE_CLOSE = '</table>';
            if (Y.UA.ie) {
                Y.mix(creators, {tbody:function (html, doc) {
                    var frag = create(TABLE_OPEN + html + TABLE_CLOSE, doc), tb = frag.children.tags('tbody')[0];
                    if (frag.children.length > 1 && tb && !re_tbody.test(html)) {
                        tb[PARENT_NODE].removeChild(tb);
                    }
                    return frag;
                }, script:function (html, doc) {
                    var frag = doc.createElement('div');
                    frag.innerHTML = '-' + html;
                    frag.removeChild(frag[FIRST_CHILD]);
                    return frag;
                }}, true);
                Y.mix(Y.DOM.VALUE_GETTERS, {button:function (node) {
                    return(node.attributes && node.attributes.value) ? node.attributes.value.value : '';
                }});
                Y.mix(Y.DOM.VALUE_SETTERS, {button:function (node, val) {
                    var attr = node.attributes.value;
                    if (!attr) {
                        attr = node[OWNER_DOCUMENT].createAttribute('value');
                        node.setAttributeNode(attr);
                    }
                    attr.value = val;
                }});
            }
            if (Y.UA.gecko || Y.UA.ie) {
                Y.mix(creators, {option:function (html, doc) {
                    return create('<select>' + html + '</select>', doc);
                }, tr:function (html, doc) {
                    return create('<tbody>' + html + '</tbody>', doc);
                }, td:function (html, doc) {
                    return create('<tr>' + html + '</tr>', doc);
                }, tbody:function (html, doc) {
                    return create(TABLE_OPEN + html + TABLE_CLOSE, doc);
                }});
                Y.mix(creators, {legend:'fieldset', th:creators.td, thead:creators.tbody, tfoot:creators.tbody, caption:creators.tbody, colgroup:creators.tbody, col:creators.tbody, optgroup:creators.option});
            }
            Y.mix(Y.DOM.VALUE_GETTERS, {option:function (node) {
                var attrs = node.attributes;
                return(attrs.value && attrs.value.specified) ? node.value : node.text;
            }, select:function (node) {
                var val = node.value, options = node.options;
                if (options && val === '') {
                    if (node.multiple) {
                    } else {
                        val = Y.DOM.getValue(options[node.selectedIndex], 'value');
                    }
                }
                return val;
            }});
        })(Y);
    })(Y);
    var addClass, hasClass, removeClass;
    Y.mix(Y.DOM, {hasClass:function (node, className) {
        var re = Y.DOM._getRegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
        return re.test(node.className);
    }, addClass:function (node, className) {
        if (!Y.DOM.hasClass(node, className)) {
            node.className = Y.Lang.trim([node.className, className].join(' '));
        }
    }, removeClass:function (node, className) {
        if (className && hasClass(node, className)) {
            node.className = Y.Lang.trim(node.className.replace(Y.DOM._getRegExp('(?:^|\\s+)' +
                className + '(?:\\s+|$)'), ' '));
            if (hasClass(node, className)) {
                removeClass(node, className);
            }
        }
    }, replaceClass:function (node, oldC, newC) {
        addClass(node, newC);
        removeClass(node, oldC);
    }, toggleClass:function (node, className) {
        if (hasClass(node, className)) {
            removeClass(node, className);
        } else {
            addClass(node, className);
        }
    }});
    hasClass = Y.DOM.hasClass;
    removeClass = Y.DOM.removeClass;
    addClass = Y.DOM.addClass;
}, '3.0.0', {requires:['oop']});