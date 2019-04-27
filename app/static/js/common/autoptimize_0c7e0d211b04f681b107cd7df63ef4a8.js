/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0), function (a, b, c) {
    function d(c) {
        var d = b.console;
        f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()))
    }

    function e(b, c, e, f) {
        if (Object.defineProperty) try {
            return void Object.defineProperty(b, c, {
                configurable: !0, enumerable: !0, get: function () {
                    return d(f), e
                }, set: function (a) {
                    d(f), e = a
                }
            })
        } catch (g) {
        }
        a._definePropertyBroken = !0, b[c] = e
    }

    a.migrateVersion = "1.4.1";
    var f = {};
    a.migrateWarnings = [], b.console && b.console.log && b.console.log("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion), a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function () {
        f = {}, a.migrateWarnings.length = 0
    }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
    var g = a("<input/>", {size: 1}).attr("size") && a.attrFn, h = a.attr,
        i = a.attrHooks.value && a.attrHooks.value.get || function () {
            return null
        }, j = a.attrHooks.value && a.attrHooks.value.set || function () {
            return c
        }, k = /^(?:input|button)$/i, l = /^[238]$/,
        m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        n = /^(?:checked|selected)$/i;
    e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function (b, e, f, i) {
        var j = e.toLowerCase(), o = b && b.nodeType;
        return i && (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
            get: function (b, d) {
                var e, f = a.prop(b, d);
                return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
            }, set: function (b, c, d) {
                var e;
                return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d
            }
        }, n.test(j) && d("jQuery.fn.attr('" + j + "') might use property instead of attribute")), h.call(a, b, e, f))
    }, a.attrHooks.value = {
        get: function (a, b) {
            var c = (a.nodeName || "").toLowerCase();
            return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value : null)
        }, set: function (a, b) {
            var c = (a.nodeName || "").toLowerCase();
            return "button" === c ? j.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value', val) no longer sets properties"), void(a.value = b))
        }
    };
    var o, p, q = a.fn.init, r = a.find, s = a.parseJSON, t = /^\s*</,
        u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
        v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g, w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    a.fn.init = function (b, e, f) {
        var g, h;
        return b && "string" == typeof b && !a.isPlainObject(e) && (g = w.exec(a.trim(b))) && g[0] && (t.test(b) || d("$(html) HTML strings must start with '<' character"), g[3] && d("$(html) HTML text after last tag is ignored"), "#" === g[0].charAt(0) && (d("HTML string cannot start with a '#' character"), a.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && e.context.nodeType && (e = e.context), a.parseHTML) ? q.call(this, a.parseHTML(g[2], e && e.ownerDocument || e || document, !0), e, f) : (h = q.apply(this, arguments), b && b.selector !== c ? (h.selector = b.selector, h.context = b.context) : (h.selector = "string" == typeof b ? b : "", b && (h.context = b.nodeType ? b : e || document)), h)
    }, a.fn.init.prototype = a.fn, a.find = function (a) {
        var b = Array.prototype.slice.call(arguments);
        if ("string" == typeof a && u.test(a)) try {
            document.querySelector(a)
        } catch (c) {
            a = a.replace(v, function (a, b, c, d) {
                return "[" + b + c + '"' + d + '"]'
            });
            try {
                document.querySelector(a), d("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a
            } catch (e) {
                d("Attribute selector with '#' was not fixed: " + b[0])
            }
        }
        return r.apply(this, b)
    };
    var x;
    for (x in r) Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
    a.parseJSON = function (a) {
        return a ? s.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
    }, a.uaMatch = function (a) {
        a = a.toLowerCase();
        var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        return {browser: b[1] || "", version: b[2] || "0"}
    }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode, e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"), e(a.support, "boxModel", a.support.boxModel, "jQuery.support.boxModel is deprecated"), a.sub = function () {
        function b(a, c) {
            return new b.fn.init(a, c)
        }

        a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, b.sub = this.sub, b.fn.init = function (d, e) {
            var f = a.fn.init.call(this, d, e, c);
            return f instanceof b ? f : b(f)
        }, b.fn.init.prototype = b.fn;
        var c = b(document);
        return d("jQuery.sub() is deprecated"), b
    }, a.fn.size = function () {
        return d("jQuery.fn.size() is deprecated; use the .length property"), this.length
    };
    var y = !1;
    a.swap && a.each(["height", "width", "reliableMarginRight"], function (b, c) {
        var d = a.cssHooks[c] && a.cssHooks[c].get;
        d && (a.cssHooks[c].get = function () {
            var a;
            return y = !0, a = d.apply(this, arguments), y = !1, a
        })
    }), a.swap = function (a, b, c, e) {
        var f, g, h = {};
        y || d("jQuery.swap() is undocumented and deprecated");
        for (g in b) h[g] = a.style[g], a.style[g] = b[g];
        f = c.apply(a, e || []);
        for (g in b) a.style[g] = h[g];
        return f
    }, a.ajaxSetup({converters: {"text json": a.parseJSON}});
    var z = a.fn.data;
    a.fn.data = function (b) {
        var e, f, g = this[0];
        return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? z.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
    };
    var A = /\/(java|ecma)script/i;
    a.clean || (a.clean = function (b, c, e, f) {
        c = c || document, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, d("jQuery.clean() is deprecated");
        var g, h, i, j, k = [];
        if (a.merge(k, a.buildFragment(b, c).childNodes), e) for (i = function (a) {
            return !a.type || A.test(a.type) ? f ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a) : void 0
        }, g = 0; null != (h = k[g]); g++) a.nodeName(h, "script") && i(h) || (e.appendChild(h), "undefined" != typeof h.getElementsByTagName && (j = a.grep(a.merge([], h.getElementsByTagName("script")), i), k.splice.apply(k, [g + 1, 0].concat(j)), g += j.length));
        return k
    });
    var B = a.event.add, C = a.event.remove, D = a.event.trigger, E = a.fn.toggle, F = a.fn.live, G = a.fn.die,
        H = a.fn.load, I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
        J = new RegExp("\\b(?:" + I + ")\\b"), K = /(?:^|\s)hover(\.\S+|)\b/, L = function (b) {
            return "string" != typeof b || a.event.special.hover ? b : (K.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(K, "mouseenter$1 mouseleave$1"))
        };
    a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), a.event.add = function (a, b, c, e, f) {
        a !== document && J.test(b) && d("AJAX events should be attached to document: " + b), B.call(this, a, L(b || ""), c, e, f)
    }, a.event.remove = function (a, b, c, d, e) {
        C.call(this, a, L(b) || "", c, d, e)
    }, a.each(["load", "unload", "error"], function (b, c) {
        a.fn[c] = function () {
            var a = Array.prototype.slice.call(arguments, 0);
            return "load" === c && "string" == typeof a[0] ? H.apply(this, a) : (d("jQuery.fn." + c + "() is deprecated"), a.splice(0, 0, c), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this))
        }
    }), a.fn.toggle = function (b, c) {
        if (!a.isFunction(b) || !a.isFunction(c)) return E.apply(this, arguments);
        d("jQuery.fn.toggle(handler, handler...) is deprecated");
        var e = arguments, f = b.guid || a.guid++, g = 0, h = function (c) {
            var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
            return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1
        };
        for (h.guid = f; g < e.length;) e[g++].guid = f;
        return this.click(h)
    }, a.fn.live = function (b, c, e) {
        return d("jQuery.fn.live() is deprecated"), F ? F.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
    }, a.fn.die = function (b, c) {
        return d("jQuery.fn.die() is deprecated"), G ? G.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
    }, a.event.trigger = function (a, b, c, e) {
        return c || J.test(a) || d("Global events are undocumented and deprecated"), D.call(this, a, b, c || document, e)
    }, a.each(I.split("|"), function (b, c) {
        a.event.special[c] = {
            setup: function () {
                var b = this;
                return b !== document && (a.event.add(document, c + "." + a.guid, function () {
                    a.event.trigger(c, Array.prototype.slice.call(arguments, 1), b, !0)
                }), a._data(this, c, a.guid++)), !1
            }, teardown: function () {
                return this !== document && a.event.remove(document, c + "." + a._data(this, c)), !1
            }
        }
    }), a.event.special.ready = {
        setup: function () {
            this === document && d("'ready' event is deprecated")
        }
    };
    var M = a.fn.andSelf || a.fn.addBack, N = a.fn.find;
    if (a.fn.andSelf = function () {
        return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), M.apply(this, arguments)
    }, a.fn.find = function (a) {
        var b = N.apply(this, arguments);
        return b.context = this.context, b.selector = this.selector ? this.selector + " " + a : a, b
    }, a.Callbacks) {
        var O = a.Deferred,
            P = [["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"], ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"], ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]];
        a.Deferred = function (b) {
            var c = O(), e = c.promise();
            return c.pipe = e.pipe = function () {
                var b = arguments;
                return d("deferred.pipe() is deprecated"), a.Deferred(function (d) {
                    a.each(P, function (f, g) {
                        var h = a.isFunction(b[f]) && b[f];
                        c[g[1]](function () {
                            var b = h && h.apply(this, arguments);
                            b && a.isFunction(b.promise) ? b.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[g[0] + "With"](this === e ? d.promise() : this, h ? [b] : arguments)
                        })
                    }), b = null
                }).promise()
            }, c.isResolved = function () {
                return d("deferred.isResolved is deprecated"), "resolved" === c.state()
            }, c.isRejected = function () {
                return d("deferred.isRejected is deprecated"), "rejected" === c.state()
            }, b && b.call(c, c), c
        }
    }
}(jQuery, window);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {
        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };
}));

/*!
* Parsley.js
* Version 2.8.0 - built Wed, Sep 13th 2017, 11:04 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i
    }
    return Array.from(e)
}

var _slice = Array.prototype.slice, _slicedToArray = function () {
    function e(e, t) {
        var i = [], n = !0, r = !1, s = void 0;
        try {
            for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0) ;
        } catch (l) {
            r = !0, s = l
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r) throw s
            }
        }
        return i
    }

    return function (t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}(), _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
    }
    return e
};
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.parsley = t(e.jQuery)
}(this, function (e) {
    "use strict";

    function t(e, t) {
        return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function () {
            var i = Array.prototype.slice.call(arguments, 0);
            i.unshift(this), e.apply(t || M, i)
        }), e.parsleyAdaptedCallback
    }

    function i(e) {
        return 0 === e.lastIndexOf(D, 0) ? e.substr(D.length) : e
    }

    /**
     * inputevent - Alleviate browser bugs for input events
     * https://github.com/marcandre/inputevent
     * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
     * @author Marc-Andre Lafortune <github@marc-andre.ca>
     * @license MIT
     */
    function n() {
        var t = this, i = window || global;
        _extends(this, {
            isNativeEvent: function (e) {
                return e.originalEvent && e.originalEvent.isTrusted !== !1
            }, fakeInputEvent: function (i) {
                t.isNativeEvent(i) && e(i.target).trigger("input")
            }, misbehaves: function (i) {
                t.isNativeEvent(i) && (t.behavesOk(i), e(document).on("change.inputevent", i.data.selector, t.fakeInputEvent), t.fakeInputEvent(i))
            }, behavesOk: function (i) {
                t.isNativeEvent(i) && e(document).off("input.inputevent", i.data.selector, t.behavesOk).off("change.inputevent", i.data.selector, t.misbehaves)
            }, install: function () {
                if (!i.inputEventPatched) {
                    i.inputEventPatched = "0.0.3";
                    for (var n = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < n.length; r++) {
                        var s = n[r];
                        e(document).on("input.inputevent", s, {selector: s}, t.behavesOk).on("change.inputevent", s, {selector: s}, t.misbehaves)
                    }
                }
            }, uninstall: function () {
                delete i.inputEventPatched, e(document).off(".inputevent")
            }
        })
    }

    var r = 1, s = {}, a = {
        attr: function (e, t, i) {
            var n, r, s, a = new RegExp("^" + t, "i");
            if ("undefined" == typeof i) i = {}; else for (n in i) i.hasOwnProperty(n) && delete i[n];
            if (!e) return i;
            for (s = e.attributes, n = s.length; n--;) r = s[n], r && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(t.length))] = this.deserializeValue(r.value));
            return i
        }, checkAttr: function (e, t, i) {
            return e.hasAttribute(t + i)
        }, setAttr: function (e, t, i, n) {
            e.setAttribute(this.dasherize(t + i), String(n))
        }, getType: function (e) {
            return e.getAttribute("type") || "text"
        }, generateID: function () {
            return "" + r++
        }, deserializeValue: function (e) {
            var t;
            try {
                return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e
            } catch (i) {
                return e
            }
        }, camelize: function (e) {
            return e.replace(/-+(.)?/g, function (e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, dasherize: function (e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }, warn: function () {
            var e;
            window.console && "function" == typeof window.console.warn && (e = window.console).warn.apply(e, arguments)
        }, warnOnce: function (e) {
            s[e] || (s[e] = !0, this.warn.apply(this, arguments))
        }, _resetWarnings: function () {
            s = {}
        }, trimString: function (e) {
            return e.replace(/^\s+|\s+$/g, "")
        }, parse: {
            date: function S(e) {
                var t = e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
                if (!t) return null;
                var i = t.map(function (e) {
                    return parseInt(e, 10)
                }), n = _slicedToArray(i, 4), r = (n[0], n[1]), s = n[2], a = n[3], S = new Date(r, s - 1, a);
                return S.getFullYear() !== r || S.getMonth() + 1 !== s || S.getDate() !== a ? null : S
            }, string: function (e) {
                return e
            }, integer: function (e) {
                return isNaN(e) ? null : parseInt(e, 10)
            }, number: function (e) {
                if (isNaN(e)) throw null;
                return parseFloat(e)
            }, "boolean": function (e) {
                return !/^\s*false\s*$/i.test(e)
            }, object: function (e) {
                return a.deserializeValue(e)
            }, regexp: function (e) {
                var t = "";
                return /^\/.*\/(?:[gimy]*)$/.test(e) ? (t = e.replace(/.*\/([gimy]*)$/, "$1"), e = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")) : e = "^" + e + "$", new RegExp(e, t)
            }
        }, parseRequirement: function (e, t) {
            var i = this.parse[e || "string"];
            if (!i) throw'Unknown requirement specification: "' + e + '"';
            var n = i(t);
            if (null === n) throw"Requirement is not a " + e + ': "' + t + '"';
            return n
        }, namespaceEvents: function (t, i) {
            return t = this.trimString(t || "").split(/\s+/), t[0] ? e.map(t, function (e) {
                return e + "." + i
            }).join(" ") : ""
        }, difference: function (t, i) {
            var n = [];
            return e.each(t, function (e, t) {
                i.indexOf(t) == -1 && n.push(t)
            }), n
        }, all: function (t) {
            return e.when.apply(e, _toConsumableArray(t).concat([42, 42]))
        }, objectCreate: Object.create || function () {
            var e = function () {
            };
            return function (t) {
                if (arguments.length > 1) throw Error("Second argument not supported");
                if ("object" != typeof t) throw TypeError("Argument must be an object");
                e.prototype = t;
                var i = new e;
                return e.prototype = null, i
            }
        }(), _SubmitSelector: 'input[type="submit"], button:submit'
    }, o = {
        namespace: "data-parsley-",
        inputs: "input, textarea, select",
        excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
        priorityEnabled: !0,
        multiple: null,
        group: null,
        uiEnabled: !0,
        validationThreshold: 3,
        focus: "first",
        trigger: !1,
        triggerAfterFailure: "input",
        errorClass: "parsley-error",
        successClass: "parsley-success",
        classHandler: function (e) {
        },
        errorsContainer: function (e) {
        },
        errorsWrapper: '<ul class="parsley-errors-list"></ul>',
        errorTemplate: "<li></li>"
    }, l = function () {
        this.__id__ = a.generateID()
    };
    l.prototype = {
        asyncSupport: !0, _pipeAccordingToValidationResult: function () {
            var t = this, i = function () {
                var i = e.Deferred();
                return !0 !== t.validationResult && i.reject(), i.resolve().promise()
            };
            return [i, i]
        }, actualizeOptions: function () {
            return a.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
        }, _resetOptions: function (e) {
            this.domOptions = a.objectCreate(this.parent.options), this.options = a.objectCreate(this.domOptions);
            for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
            this.actualizeOptions()
        }, _listeners: null, on: function (e, t) {
            this._listeners = this._listeners || {};
            var i = this._listeners[e] = this._listeners[e] || [];
            return i.push(t), this
        }, subscribe: function (t, i) {
            e.listenTo(this, t.toLowerCase(), i)
        }, off: function (e, t) {
            var i = this._listeners && this._listeners[e];
            if (i) if (t) for (var n = i.length; n--;) i[n] === t && i.splice(n, 1); else delete this._listeners[e];
            return this
        }, unsubscribe: function (t, i) {
            e.unsubscribeTo(this, t.toLowerCase())
        }, trigger: function (e, t, i) {
            t = t || this;
            var n, r = this._listeners && this._listeners[e];
            if (r) for (var s = r.length; s--;) if (n = r[s].call(t, t, i), n === !1) return n;
            return !this.parent || this.parent.trigger(e, t, i)
        }, asyncIsValid: function (e, t) {
            return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
                group: e,
                force: t
            })
        }, _findRelated: function () {
            return this.options.multiple ? e(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
        }
    };
    var u = function (e, t) {
        var i = e.match(/^\s*\[(.*)\]\s*$/);
        if (!i) throw'Requirement is not an array: "' + e + '"';
        var n = i[1].split(",").map(a.trimString);
        if (n.length !== t) throw"Requirement has " + n.length + " values when " + t + " are needed";
        return n
    }, d = function (e, t, i) {
        var n = null, r = {};
        for (var s in e) if (s) {
            var o = i(s);
            "string" == typeof o && (o = a.parseRequirement(e[s], o)), r[s] = o
        } else n = a.parseRequirement(e[s], t);
        return [n, r]
    }, h = function (t) {
        e.extend(!0, this, t)
    };
    h.prototype = {
        validate: function (e, t) {
            if (this.fn) return arguments.length > 3 && (t = [].slice.call(arguments, 1, -1)), this.fn(e, t);
            if (Array.isArray(e)) {
                if (!this.validateMultiple) throw"Validator `" + this.name + "` does not handle multiple values";
                return this.validateMultiple.apply(this, arguments)
            }
            var i = arguments[arguments.length - 1];
            if (this.validateDate && i._isDateInput()) return arguments[0] = a.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);
            if (this.validateNumber) return !isNaN(e) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
            if (this.validateString) return this.validateString.apply(this, arguments);
            throw"Validator `" + this.name + "` only handles multiple values"
        }, parseRequirements: function (t, i) {
            if ("string" != typeof t) return Array.isArray(t) ? t : [t];
            var n = this.requirementType;
            if (Array.isArray(n)) {
                for (var r = u(t, n.length), s = 0; s < r.length; s++) r[s] = a.parseRequirement(n[s], r[s]);
                return r
            }
            return e.isPlainObject(n) ? d(n, t, i) : [a.parseRequirement(n, t)]
        }, requirementType: "string", priority: 2
    };
    var p = function (e, t) {
        this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(e || {}, t || {})
    }, c = {
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
        integer: /^-?\d+$/,
        digits: /^\d+$/,
        alphanum: /^\w+$/i,
        date: {
            test: function (e) {
                return null !== a.parse.date(e)
            }
        },
        url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i")
    };
    c.range = c.number;
    var f = function (e) {
        var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
    }, m = function (e, t) {
        return t.map(a.parse[e])
    }, g = function (e, t) {
        return function (i) {
            for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
            return r.pop(), t.apply(void 0, [i].concat(_toConsumableArray(m(e, r))))
        }
    }, v = function (e) {
        return {
            validateDate: g("date", e),
            validateNumber: g("number", e),
            requirementType: e.length <= 2 ? "string" : ["string", "string"],
            priority: 30
        }
    };
    p.prototype = {
        init: function (e, t) {
            this.catalog = t, this.validators = _extends({}, this.validators);
            for (var i in e) this.addValidator(i, e[i].fn, e[i].priority);
            window.Parsley.trigger("parsley:validator:init")
        }, setLocale: function (e) {
            if ("undefined" == typeof this.catalog[e]) throw new Error(e + " is not available in the catalog");
            return this.locale = e, this
        }, addCatalog: function (e, t, i) {
            return "object" == typeof t && (this.catalog[e] = t), !0 === i ? this.setLocale(e) : this
        }, addMessage: function (e, t, i) {
            return "undefined" == typeof this.catalog[e] && (this.catalog[e] = {}), this.catalog[e][t] = i, this
        }, addMessages: function (e, t) {
            for (var i in t) this.addMessage(e, i, t[i]);
            return this
        }, addValidator: function (e, t, i) {
            if (this.validators[e]) a.warn('Validator "' + e + '" is already defined.'); else if (o.hasOwnProperty(e)) return void a.warn('"' + e + '" is a restricted keyword and is not a valid validator name.');
            return this._setValidator.apply(this, arguments)
        }, hasValidator: function (e) {
            return !!this.validators[e]
        }, updateValidator: function (e, t, i) {
            return this.validators[e] ? this._setValidator.apply(this, arguments) : (a.warn('Validator "' + e + '" is not already defined.'), this.addValidator.apply(this, arguments))
        }, removeValidator: function (e) {
            return this.validators[e] || a.warn('Validator "' + e + '" is not defined.'), delete this.validators[e], this
        }, _setValidator: function (e, t, i) {
            "object" != typeof t && (t = {fn: t, priority: i}), t.validate || (t = new h(t)), this.validators[e] = t;
            for (var n in t.messages || {}) this.addMessage(n, e, t.messages[n]);
            return this
        }, getErrorMessage: function (e) {
            var t;
            if ("type" === e.name) {
                var i = this.catalog[this.locale][e.name] || {};
                t = i[e.requirements]
            } else t = this.formatMessage(this.catalog[this.locale][e.name], e.requirements);
            return t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
        }, formatMessage: function (e, t) {
            if ("object" == typeof t) {
                for (var i in t) e = this.formatMessage(e, t[i]);
                return e
            }
            return "string" == typeof e ? e.replace(/%s/i, t) : ""
        }, validators: {
            notblank: {
                validateString: function (e) {
                    return /\S/.test(e)
                }, priority: 2
            }, required: {
                validateMultiple: function (e) {
                    return e.length > 0
                }, validateString: function (e) {
                    return /\S/.test(e)
                }, priority: 512
            }, type: {
                validateString: function (e, t) {
                    var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], n = i.step,
                        r = void 0 === n ? "any" : n, s = i.base, a = void 0 === s ? 0 : s, o = c[t];
                    if (!o) throw new Error("validator type `" + t + "` is not supported");
                    if (!o.test(e)) return !1;
                    if ("number" === t && !/^any$/i.test(r || "")) {
                        var l = Number(e), u = Math.max(f(r), f(a));
                        if (f(l) > u) return !1;
                        var d = function (e) {
                            return Math.round(e * Math.pow(10, u))
                        };
                        if ((d(l) - d(a)) % d(r) != 0) return !1
                    }
                    return !0
                }, requirementType: {"": "string", step: "string", base: "number"}, priority: 256
            }, pattern: {
                validateString: function (e, t) {
                    return t.test(e)
                }, requirementType: "regexp", priority: 64
            }, minlength: {
                validateString: function (e, t) {
                    return e.length >= t
                }, requirementType: "integer", priority: 30
            }, maxlength: {
                validateString: function (e, t) {
                    return e.length <= t
                }, requirementType: "integer", priority: 30
            }, length: {
                validateString: function (e, t, i) {
                    return e.length >= t && e.length <= i
                }, requirementType: ["integer", "integer"], priority: 30
            }, mincheck: {
                validateMultiple: function (e, t) {
                    return e.length >= t
                }, requirementType: "integer", priority: 30
            }, maxcheck: {
                validateMultiple: function (e, t) {
                    return e.length <= t
                }, requirementType: "integer", priority: 30
            }, check: {
                validateMultiple: function (e, t, i) {
                    return e.length >= t && e.length <= i
                }, requirementType: ["integer", "integer"], priority: 30
            }, min: v(function (e, t) {
                return e >= t
            }), max: v(function (e, t) {
                return e <= t
            }), range: v(function (e, t, i) {
                return e >= t && e <= i
            }), equalto: {
                validateString: function (t, i) {
                    var n = e(i);
                    return n.length ? t === n.val() : t === i
                }, priority: 256
            }
        }
    };
    var y = {}, _ = function k(e, t, i) {
        for (var n = [], r = [], s = 0; s < e.length; s++) {
            for (var a = !1, o = 0; o < t.length; o++) if (e[s].assert.name === t[o].assert.name) {
                a = !0;
                break
            }
            a ? r.push(e[s]) : n.push(e[s])
        }
        return {kept: r, added: n, removed: i ? [] : k(t, e, !0).added}
    };
    y.Form = {
        _actualizeTriggers: function () {
            var e = this;
            this.$element.on("submit.Parsley", function (t) {
                e.onSubmitValidate(t)
            }), this.$element.on("click.Parsley", a._SubmitSelector, function (t) {
                e.onSubmitButton(t)
            }), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
        }, focus: function () {
            if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;
            for (var e = 0; e < this.fields.length; e++) {
                var t = this.fields[e];
                if (!0 !== t.validationResult && t.validationResult.length > 0 && "undefined" == typeof t.options.noFocus && (this._focusedField = t.$element, "first" === this.options.focus)) break
            }
            return null === this._focusedField ? null : this._focusedField.focus()
        }, _destroyUI: function () {
            this.$element.off(".Parsley")
        }
    }, y.Field = {
        _reflowUI: function () {
            if (this._buildUI(), this._ui) {
                var e = _(this.validationResult, this._ui.lastValidationResult);
                this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(e), this._actualizeTriggers(), !e.kept.length && !e.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers())
            }
        }, getErrorsMessages: function () {
            if (!0 === this.validationResult) return [];
            for (var e = [], t = 0; t < this.validationResult.length; t++) e.push(this.validationResult[t].errorMessage || this._getErrorMessage(this.validationResult[t].assert));
            return e
        }, addError: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], i = t.message, n = t.assert,
                r = t.updateClass, s = void 0 === r || r;
            this._buildUI(), this._addError(e, {message: i, assert: n}), s && this._errorClass()
        }, updateError: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], i = t.message, n = t.assert,
                r = t.updateClass, s = void 0 === r || r;
            this._buildUI(), this._updateError(e, {message: i, assert: n}), s && this._errorClass()
        }, removeError: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], i = t.updateClass,
                n = void 0 === i || i;
            this._buildUI(), this._removeError(e), n && this._manageStatusClass()
        }, _manageStatusClass: function () {
            this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
        }, _manageErrorsMessages: function (t) {
            if ("undefined" == typeof this.options.errorsMessagesDisabled) {
                if ("undefined" != typeof this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                for (var i = 0; i < t.removed.length; i++) this._removeError(t.removed[i].assert.name);
                for (i = 0; i < t.added.length; i++) this._addError(t.added[i].assert.name, {
                    message: t.added[i].errorMessage,
                    assert: t.added[i].assert
                });
                for (i = 0; i < t.kept.length; i++) this._updateError(t.kept[i].assert.name, {
                    message: t.kept[i].errorMessage,
                    assert: t.kept[i].assert
                })
            }
        }, _addError: function (t, i) {
            var n = i.message, r = i.assert;
            this._insertErrorWrapper(), this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-" + t).html(n || this._getErrorMessage(r)))
        }, _updateError: function (e, t) {
            var i = t.message, n = t.assert;
            this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + e).html(i || this._getErrorMessage(n))
        }, _removeError: function (e) {
            this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + e).remove()
        }, _getErrorMessage: function (e) {
            var t = e.name + "Message";
            return "undefined" != typeof this.options[t] ? window.Parsley.formatMessage(this.options[t], e.requirements) : window.Parsley.getErrorMessage(e)
        }, _buildUI: function () {
            if (!this._ui && !1 !== this.options.uiEnabled) {
                var t = {};
                this.element.setAttribute(this.options.namespace + "id", this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), t.$errorsWrapper = e(this.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t
            }
        }, _manageClassHandler: function () {
            if ("string" == typeof this.options.classHandler && e(this.options.classHandler).length) return e(this.options.classHandler);
            var t = this.options.classHandler;
            if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), "function" == typeof t) {
                var i = t.call(this, this);
                if ("undefined" != typeof i && i.length) return i
            } else {
                if ("object" == typeof t && t instanceof jQuery && t.length) return t;
                t && a.warn("The class handler `" + t + "` does not exist in DOM nor as a global JS function")
            }
            return this._inputHolder()
        }, _inputHolder: function () {
            return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
        }, _insertErrorWrapper: function () {
            var t = this.options.errorsContainer;
            if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
            if ("string" == typeof t) {
                if (e(t).length) return e(t).append(this._ui.$errorsWrapper);
                "function" == typeof window[t] ? t = window[t] : a.warn("The errors container `" + t + "` does not exist in DOM nor as a global JS function")
            }
            return "function" == typeof t && (t = t.call(this, this)), "object" == typeof t && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
        }, _actualizeTriggers: function () {
            var e, t = this, i = this._findRelated();
            i.off(".Parsley"), this._failedOnce ? i.on(a.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function () {
                t._validateIfNeeded()
            }) : (e = a.namespaceEvents(this.options.trigger, "Parsley")) && i.on(e, function (e) {
                t._validateIfNeeded(e)
            })
        }, _validateIfNeeded: function (e) {
            var t = this;
            e && /key|input/.test(e.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function () {
                return t.validate()
            }, this.options.debounce)) : this.validate())
        }, _resetUI: function () {
            this._failedOnce = !1, this._actualizeTriggers(), "undefined" != typeof this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1)
        }, _destroyUI: function () {
            this._resetUI(), "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(), delete this._ui
        }, _successClass: function () {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
        }, _errorClass: function () {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
        }, _resetClass: function () {
            this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
        }
    };
    var w = function (t, i, n) {
        this.__class__ = "Form", this.element = t, this.$element = e(t), this.domOptions = i, this.options = n, this.parent = window.Parsley, this.fields = [], this.validationResult = null
    }, b = {pending: null, resolved: !0, rejected: !1};
    w.prototype = {
        onSubmitValidate: function (e) {
            var t = this;
            if (!0 !== e.parsley) {
                var i = this._submitSource || this.$element.find(a._SubmitSelector)[0];
                if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) {
                    window.Parsley._remoteCache = {};
                    var n = this.whenValidate({event: e});
                    "resolved" === n.state() && !1 !== this._trigger("submit") || (e.stopImmediatePropagation(), e.preventDefault(), "pending" === n.state() && n.done(function () {
                        t._submit(i)
                    }))
                }
            }
        }, onSubmitButton: function (e) {
            this._submitSource = e.currentTarget
        }, _submit: function (t) {
            if (!1 !== this._trigger("submit")) {
                if (t) {
                    var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
                    0 === i.length && (i = e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), i.attr({
                        name: t.getAttribute("name"),
                        value: t.getAttribute("value")
                    })
                }
                this.$element.trigger(_extends(e.Event("submit"), {parsley: !0}))
            }
        }, validate: function (t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments), n = i[0], r = i[1], s = i[2];
                t = {group: n, force: r, event: s}
            }
            return b[this.whenValidate(t).state()]
        }, whenValidate: function () {
            var t, i = this, n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], r = n.group,
                s = n.force, o = n.event;
            this.submitEvent = o, o && (this.submitEvent = _extends({}, o, {
                preventDefault: function () {
                    a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1
                }
            })), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
            var l = this._withoutReactualizingFormOptions(function () {
                return e.map(i.fields, function (e) {
                    return e.whenValidate({force: s, group: r})
                })
            });
            return (t = a.all(l).done(function () {
                i._trigger("success")
            }).fail(function () {
                i.validationResult = !1, i.focus(), i._trigger("error")
            }).always(function () {
                i._trigger("validated")
            })).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()))
        }, isValid: function (t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments), n = i[0], r = i[1];
                t = {group: n, force: r}
            }
            return b[this.whenValid(t).state()]
        }, whenValid: function () {
            var t = this, i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = i.group,
                r = i.force;
            this._refreshFields();
            var s = this._withoutReactualizingFormOptions(function () {
                return e.map(t.fields, function (e) {
                    return e.whenValid({group: n, force: r})
                })
            });
            return a.all(s)
        }, refresh: function () {
            return this._refreshFields(), this
        }, reset: function () {
            for (var e = 0; e < this.fields.length; e++) this.fields[e].reset();
            this._trigger("reset")
        }, destroy: function () {
            this._destroyUI();
            for (var e = 0; e < this.fields.length; e++) this.fields[e].destroy();
            this.$element.removeData("Parsley"), this._trigger("destroy")
        }, _refreshFields: function () {
            return this.actualizeOptions()._bindFields()
        }, _bindFields: function () {
            var t = this, i = this.fields;
            return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function () {
                t.$element.find(t.options.inputs).not(t.options.excluded).each(function (e, i) {
                    var n = new window.Parsley.Factory(i, {}, t);
                    if (("Field" === n.__class__ || "FieldMultiple" === n.__class__) && !0 !== n.options.excluded) {
                        var r = n.__class__ + "-" + n.__id__;
                        "undefined" == typeof t.fieldsMappedById[r] && (t.fieldsMappedById[r] = n, t.fields.push(n))
                    }
                }), e.each(a.difference(i, t.fields), function (e, t) {
                    t.reset()
                })
            }), this
        }, _withoutReactualizingFormOptions: function (e) {
            var t = this.actualizeOptions;
            this.actualizeOptions = function () {
                return this
            };
            var i = e();
            return this.actualizeOptions = t, i
        }, _trigger: function (e) {
            return this.trigger("form:" + e)
        }
    };
    var F = function (e, t, i, n, r) {
        var s = window.Parsley._validatorRegistry.validators[t], a = new h(s);
        n = n || e.options[t + "Priority"] || a.priority, r = !0 === r, _extends(this, {
            validator: a,
            name: t,
            requirements: i,
            priority: n,
            isDomConstraint: r
        }), this._parseRequirements(e.options)
    }, C = function (e) {
        var t = e[0].toUpperCase();
        return t + e.slice(1)
    };
    F.prototype = {
        validate: function (e, t) {
            var i;
            return (i = this.validator).validate.apply(i, [e].concat(_toConsumableArray(this.requirementList), [t]))
        }, _parseRequirements: function (e) {
            var t = this;
            this.requirementList = this.validator.parseRequirements(this.requirements, function (i) {
                return e[t.name + C(i)]
            })
        }
    };
    var E = function (t, i, n, r) {
        this.__class__ = "Field", this.element = t, this.$element = e(t), "undefined" != typeof r && (this.parent = r), this.options = n, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
    }, A = {pending: null, resolved: !0, rejected: !1};
    E.prototype = {
        validate: function (t) {
            arguments.length >= 1 && !e.isPlainObject(t) && (a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), t = {options: t});
            var i = this.whenValidate(t);
            if (!i) return !0;
            switch (i.state()) {
                case"pending":
                    return null;
                case"resolved":
                    return !0;
                case"rejected":
                    return this.validationResult
            }
        }, whenValidate: function () {
            var e, t = this, i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = i.force,
                r = i.group;
            if (this.refresh(), !r || this._isInGroup(r)) return this.value = this.getValue(), this._trigger("validate"), (e = this.whenValid({
                force: n,
                value: this.value,
                _refreshed: !0
            }).always(function () {
                t._reflowUI()
            }).done(function () {
                t._trigger("success")
            }).fail(function () {
                t._trigger("error")
            }).always(function () {
                t._trigger("validated")
            })).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()))
        }, hasConstraints: function () {
            return 0 !== this.constraints.length
        }, needsValidation: function (e) {
            return "undefined" == typeof e && (e = this.getValue()), !(!e.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty)
        }, _isInGroup: function (t) {
            return Array.isArray(this.options.group) ? -1 !== e.inArray(t, this.options.group) : this.options.group === t
        }, isValid: function (t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments), n = i[0], r = i[1];
                t = {force: n, value: r}
            }
            var s = this.whenValid(t);
            return !s || A[s.state()]
        }, whenValid: function () {
            var t = this, i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = i.force,
                r = void 0 !== n && n, s = i.value, o = i.group, l = i._refreshed;
            if (l || this.refresh(), !o || this._isInGroup(o)) {
                if (this.validationResult = !0, !this.hasConstraints()) return e.when();
                if ("undefined" != typeof s && null !== s || (s = this.getValue()), !this.needsValidation(s) && !0 !== r) return e.when();
                var u = this._getGroupedConstraints(), d = [];
                return e.each(u, function (i, n) {
                    var r = a.all(e.map(n, function (e) {
                        return t._validateConstraint(s, e)
                    }));
                    if (d.push(r), "rejected" === r.state()) return !1
                }), a.all(d)
            }
        }, _validateConstraint: function (t, i) {
            var n = this, r = i.validate(t, this);
            return !1 === r && (r = e.Deferred().reject()), a.all([r]).fail(function (e) {
                n.validationResult instanceof Array || (n.validationResult = []), n.validationResult.push({
                    assert: i,
                    errorMessage: "string" == typeof e && e
                })
            })
        }, getValue: function () {
            var e;
            return e = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof e || null === e ? "" : this._handleWhitespace(e)
        }, reset: function () {
            return this._resetUI(), this._trigger("reset")
        }, destroy: function () {
            this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy")
        }, refresh: function () {
            return this._refreshConstraints(), this
        }, _refreshConstraints: function () {
            return this.actualizeOptions()._bindConstraints()
        }, refreshConstraints: function () {
            return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh()
        }, addConstraint: function (e, t, i, n) {
            if (window.Parsley._validatorRegistry.validators[e]) {
                var r = new F(this, e, t, i, n);
                "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r
            }
            return this
        }, removeConstraint: function (e) {
            for (var t = 0; t < this.constraints.length; t++) if (e === this.constraints[t].name) {
                this.constraints.splice(t, 1);
                break
            }
            return delete this.constraintsByName[e], this
        }, updateConstraint: function (e, t, i) {
            return this.removeConstraint(e).addConstraint(e, t, i)
        }, _bindConstraints: function () {
            for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (e.push(this.constraints[i]), t[this.constraints[i].name] = this.constraints[i]);
            this.constraints = e, this.constraintsByName = t;
            for (var n in this.options) this.addConstraint(n, this.options[n], void 0, !0);
            return this._bindHtml5Constraints()
        }, _bindHtml5Constraints: function () {
            null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
            var e = this.element.getAttribute("min"), t = this.element.getAttribute("max");
            null !== e && null !== t ? this.addConstraint("range", [e, t], void 0, !0) : null !== e ? this.addConstraint("min", e, void 0, !0) : null !== t && this.addConstraint("max", t, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
            var i = a.getType(this.element);
            return "number" === i ? this.addConstraint("type", ["number", {
                step: this.element.getAttribute("step") || "1",
                base: e || this.element.getAttribute("value")
            }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this
        }, _isRequired: function () {
            return "undefined" != typeof this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
        }, _trigger: function (e) {
            return this.trigger("field:" + e)
        }, _handleWhitespace: function (e) {
            return !0 === this.options.trimValue && a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (e = e.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (e = a.trimString(e)), e
        }, _isDateInput: function () {
            var e = this.constraintsByName.type;
            return e && "date" === e.requirements
        }, _getGroupedConstraints: function () {
            if (!1 === this.options.priorityEnabled) return [this.constraints];
            for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) {
                var n = this.constraints[i].priority;
                t[n] || e.push(t[n] = []), t[n].push(this.constraints[i])
            }
            return e.sort(function (e, t) {
                return t[0].priority - e[0].priority
            }), e
        }
    };
    var x = E, $ = function () {
        this.__class__ = "FieldMultiple"
    };
    $.prototype = {
        addElement: function (e) {
            return this.$elements.push(e), this
        }, _refreshConstraints: function () {
            var t;
            if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
            for (var i = 0; i < this.$elements.length; i++) if (e("html").has(this.$elements[i]).length) {
                t = this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;
                for (var n = 0; n < t.length; n++) this.addConstraint(t[n].name, t[n].requirements, t[n].priority, t[n].isDomConstraint)
            } else this.$elements.splice(i, 1);
            return this
        }, getValue: function () {
            if ("function" == typeof this.options.value) return this.options.value(this);
            if ("undefined" != typeof this.options.value) return this.options.value;
            if ("INPUT" === this.element.nodeName) {
                var t = a.getType(this.element);
                if ("radio" === t) return this._findRelated().filter(":checked").val() || "";
                if ("checkbox" === t) {
                    var i = [];
                    return this._findRelated().filter(":checked").each(function () {
                        i.push(e(this).val())
                    }), i
                }
            }
            return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val();
        }, _init: function () {
            return this.$elements = [this.$element], this
        }
    };
    var P = function (t, i, n) {
        this.element = t, this.$element = e(t);
        var r = this.$element.data("Parsley");
        if (r) return "undefined" != typeof n && r.parent === window.Parsley && (r.parent = n, r._resetOptions(r.options)), "object" == typeof i && _extends(r.options, i), r;
        if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
        if ("undefined" != typeof n && "Form" !== n.__class__) throw new Error("Parent instance must be a Form instance");
        return this.parent = n || window.Parsley, this.init(i)
    };
    P.prototype = {
        init: function (e) {
            return this.__class__ = "Parsley", this.__version__ = "2.8.0", this.__id__ = a.generateID(), this._resetOptions(e), "FORM" === this.element.nodeName || a.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
        }, isMultiple: function () {
            var e = a.getType(this.element);
            return "radio" === e || "checkbox" === e || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
        }, handleMultiple: function () {
            var t, i, n = this;
            if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
            if (!this.options.multiple) return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
            this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), t && e('input[name="' + t + '"]').each(function (e, t) {
                var i = a.getType(t);
                "radio" !== i && "checkbox" !== i || t.setAttribute(n.options.namespace + "multiple", n.options.multiple)
            });
            for (var r = this._findRelated(), s = 0; s < r.length; s++) if (i = e(r.get(s)).data("Parsley"), "undefined" != typeof i) {
                this.$element.data("FieldMultiple") || i.addElement(this.$element);
                break
            }
            return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple")
        }, bind: function (t, i) {
            var n;
            switch (t) {
                case"parsleyForm":
                    n = e.extend(new w(this.element, this.domOptions, this.options), new l, window.ParsleyExtend)._bindFields();
                    break;
                case"parsleyField":
                    n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new l, window.ParsleyExtend);
                    break;
                case"parsleyFieldMultiple":
                    n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new $, new l, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(t + "is not a supported Parsley type")
            }
            return this.options.multiple && a.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof i ? (this.$element.data("FieldMultiple", n), n) : (this.$element.data("Parsley", n), n._actualizeTriggers(), n._trigger("init"), n)
        }
    };
    var V = e.fn.jquery.split(".");
    if (parseInt(V[0]) <= 1 && parseInt(V[1]) < 8) throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
    V.forEach || a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
    var T = _extends(new l, {
        element: document,
        $element: e(document),
        actualizeOptions: null,
        _resetOptions: null,
        Factory: P,
        version: "2.8.0"
    });
    _extends(x.prototype, y.Field, l.prototype), _extends(w.prototype, y.Form, l.prototype), _extends(P.prototype, l.prototype), e.fn.parsley = e.fn.psly = function (t) {
        if (this.length > 1) {
            var i = [];
            return this.each(function () {
                i.push(e(this).parsley(t))
            }), i
        }
        if (0 != this.length) return new P(this[0], t)
    }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), T.options = _extends(a.objectCreate(o), window.ParsleyConfig), window.ParsleyConfig = T.options, window.Parsley = window.psly = T, T.Utils = a, window.ParsleyUtils = {}, e.each(a, function (e, t) {
        "function" == typeof t && (window.ParsleyUtils[e] = function () {
            return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), a[e].apply(a, arguments)
        })
    });
    var O = window.Parsley._validatorRegistry = new p(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
    window.ParsleyValidator = {}, e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function (e, t) {
        window.Parsley[t] = function () {
            return O[t].apply(O, arguments)
        }, window.ParsleyValidator[t] = function () {
            var e;
            return a.warnOnce("Accessing the method '" + t + "' through Validator is deprecated. Simply call 'window.Parsley." + t + "(...)'"), (e = window.Parsley)[t].apply(e, arguments)
        }
    }), window.Parsley.UI = y, window.ParsleyUI = {
        removeError: function (e, t, i) {
            var n = !0 !== i;
            return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e.removeError(t, {updateClass: n})
        }, getErrorsMessages: function (e) {
            return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), e.getErrorsMessages()
        }
    }, e.each("addError updateError".split(" "), function (e, t) {
        window.ParsleyUI[t] = function (e, i, n, r, s) {
            var o = !0 !== s;
            return a.warnOnce("Accessing UI is deprecated. Call '" + t + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e[t](i, {
                message: n,
                assert: r,
                updateClass: o
            })
        }
    }), !1 !== window.ParsleyConfig.autoBind && e(function () {
        e("[data-parsley-validate]").length && e("[data-parsley-validate]").parsley()
    });
    var M = e({}), R = function () {
        a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
    }, D = "parsley:";
    e.listen = function (e, n) {
        var r;
        if (R(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1], n = arguments[2]), "function" != typeof n) throw new Error("Wrong parameters");
        window.Parsley.on(i(e), t(n, r))
    }, e.listenTo = function (e, n, r) {
        if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
        if ("string" != typeof n || "function" != typeof r) throw new Error("Wrong parameters");
        e.on(i(n), t(r))
    }, e.unsubscribe = function (e, t) {
        if (R(), "string" != typeof e || "function" != typeof t) throw new Error("Wrong arguments");
        window.Parsley.off(i(e), t.parsleyAdaptedCallback)
    }, e.unsubscribeTo = function (e, t) {
        if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
        e.off(i(t))
    }, e.unsubscribeAll = function (t) {
        R(), window.Parsley.off(i(t)), e("form,input,textarea,select").each(function () {
            var n = e(this).data("Parsley");
            n && n.off(i(t))
        })
    }, e.emit = function (e, t) {
        var n;
        R();
        var r = t instanceof x || t instanceof w, s = Array.prototype.slice.call(arguments, r ? 2 : 1);
        s.unshift(i(e)), r || (t = window.Parsley), (n = t).trigger.apply(n, _toConsumableArray(s))
    };
    e.extend(!0, T, {
        asyncValidators: {
            "default": {
                fn: function (e) {
                    return e.status >= 200 && e.status < 300
                }, url: !1
            }, reverse: {
                fn: function (e) {
                    return e.status < 200 || e.status >= 300
                }, url: !1
            }
        }, addAsyncValidator: function (e, t, i, n) {
            return T.asyncValidators[e] = {fn: t, url: i || !1, options: n || {}}, this
        }
    }), T.addValidator("remote", {
        requirementType: {
            "": "string",
            validator: "string",
            reverse: "boolean",
            options: "object"
        }, validateString: function (t, i, n, r) {
            var s, a, o = {}, l = n.validator || (!0 === n.reverse ? "reverse" : "default");
            if ("undefined" == typeof T.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");
            i = T.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(t)) : o[r.element.getAttribute("name") || r.element.getAttribute("id")] = t;
            var u = e.extend(!0, n.options || {}, T.asyncValidators[l].options);
            s = e.extend(!0, {}, {
                url: i,
                data: o,
                type: "GET"
            }, u), r.trigger("field:ajaxoptions", r, s), a = e.param(s), "undefined" == typeof T._remoteCache && (T._remoteCache = {});
            var d = T._remoteCache[a] = T._remoteCache[a] || e.ajax(s), h = function () {
                var t = T.asyncValidators[l].fn.call(r, d, i, n);
                return t || (t = e.Deferred().reject()), e.when(t)
            };
            return d.then(h, h)
        }, priority: -1
    }), T.on("form:submit", function () {
        T._remoteCache = {}
    }), l.prototype.addAsyncValidator = function () {
        return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), T.addAsyncValidator.apply(T, arguments)
    }, T.addMessages("en", {
        defaultMessage: "This value seems to be invalid.",
        type: {
            email: "This value should be a valid email.",
            url: "This value should be a valid url.",
            number: "This value should be a valid number.",
            integer: "This value should be a valid integer.",
            digits: "This value should be digits.",
            alphanum: "This value should be alphanumeric."
        },
        notblank: "This value should not be blank.",
        required: "This value is required.",
        pattern: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "This value is too short. It should have %s characters or more.",
        maxlength: "This value is too long. It should have %s characters or fewer.",
        length: "This value length is invalid. It should be between %s and %s characters long.",
        mincheck: "You must select at least %s choices.",
        maxcheck: "You must select %s choices or fewer.",
        check: "You must select between %s and %s choices.",
        equalto: "This value should be the same."
    }), T.setLocale("en");
    var I = new n;
    I.install();
    var q = T;
    return q
});
;
jQuery(document).ready(function ($) {
    $('.usp-callout-failure').addClass('usp-hidden').hide();
    $('#user-submitted-post').on('click', function () {
        usp_validate();
    });

    function usp_validate() {
        if (true === $('#usp_form').parsley().isValid()) {
            $('.usp-callout-failure').addClass('usp-hidden').hide();
            $('.usp-clone').each(function () {
                var opt = $(this).data('parsley-excluded');
                if (typeof opt !== 'undefined' && opt == true) {
                    var val = $(this).val();
                    if (!val.trim()) $(this).remove();
                }
            });
        } else {
            $('.usp-callout-failure').removeClass('usp-hidden').show();
        }
    };$('#usp_form').submit(function (e) {
        usp_captcha_check(e);
        if ($(this).parsley().isValid()) {
            $('.usp-submit').css('cursor', 'wait');
            $('.usp-submit').attr('disabled', true);
        }
    });
    $('.usp-captcha .usp-input').change(function (e) {
        usp_captcha_check(e);
    });

    function usp_captcha_check(e) {
        if (usp_case_sensitivity === 'true') var usp_casing = ''; else var usp_casing = 'i';
        var usp_response = new RegExp(usp_challenge_response + '$', usp_casing);
        var usp_captcha = $('.user-submitted-captcha').val();
        if (typeof usp_captcha != 'undefined') {
            if (usp_captcha.match(usp_response)) {
                $('.usp-captcha-error').remove();
                $('.usp-captcha .usp-input').removeClass('parsley-error');
                $('.usp-captcha .usp-input').addClass('parsley-success');
            } else {
                if (e) e.preventDefault();
                $('.usp-captcha-error').remove();
                $('.usp-captcha').append('<ul class="usp-captcha-error parsley-errors-list filled"><li class="parsley-required">' + usp_parsley_error + '</li></ul>');
                $('.usp-captcha .usp-input').removeClass('parsley-success');
                $('.usp-captcha .usp-input').addClass('parsley-error');
            }
        }
    }

    usp_remember();
    usp_forget();

    function usp_cookie(selector) {
        $(selector).each(function () {
            var name = $(this).attr('name');
            if ($.cookie(name)) {
                if (name == usp_custom_checkbox) {
                    if ($.cookie(name) == 1) {
                        $(this).val(1).prop('checked', 1);
                    } else {
                        $(this).val(0).prop('checked', 0);
                    }
                } else {
                    $(this).val($.cookie(name));
                }
            }
            $(this).on('change', function () {
                if (name == usp_custom_checkbox) {
                    var value = ($(this).is(":checked")) ? 1 : 0;
                    $(this).val(value);
                } else {
                    var value = $(this).val();
                }
                $.cookie(name, value, {path: '/', expires: 365});
            });
        });
    }

    function usp_remember() {
        usp_cookie('[name="user-submitted-name"]');
        usp_cookie('[name="user-submitted-email"]');
        usp_cookie('[name="user-submitted-url"]');
        usp_cookie('[name="user-submitted-title"]');
        usp_cookie('[name="user-submitted-tags"]');
        usp_cookie('[name="user-submitted-category"]');
        usp_cookie('[name="user-submitted-content"]');
        usp_cookie('[name="' + usp_custom_field + '"]');
        usp_cookie('[name="' + usp_custom_checkbox + '"]');
        usp_cookie('[name="user-submitted-captcha"]');
    }

    function usp_forget() {
        var re = /[?&]success=/;
        if (re.test(location.href)) {
            $.removeCookie('user-submitted-name', {path: '/'});
            $.removeCookie('user-submitted-email', {path: '/'});
            $.removeCookie('user-submitted-url', {path: '/'});
            $.removeCookie('user-submitted-title', {path: '/'});
            $.removeCookie('user-submitted-tags', {path: '/'});
            $.removeCookie('user-submitted-category', {path: '/'});
            $.removeCookie('user-submitted-content', {path: '/'});
            $.removeCookie(usp_custom_field, {path: '/'});
            $.removeCookie(usp_custom_checkbox, {path: '/'});
            $.removeCookie('user-submitted-captcha', {path: '/'});
            $('#usp_form').find('input[type="text"], textarea').val('');
            $('#usp_form option[value=""]').attr('selected', '');
        }
    }

    $('#usp_add-another').removeClass('usp-no-js');
    $('#usp_add-another').addClass('usp-js');
    usp_add_another();

    function usp_add_another() {
        var x = parseInt($('#usp-min-images').val());
        var y = parseInt($('#usp-max-images').val());
        if (x === 0) x = 1;
        if (x >= y) $('#usp_add-another').hide();
        $('#usp_add-another').click(function (e) {
            e.preventDefault();
            x++;
            var link = $(this);
            var clone = $('#user-submitted-image').find('input:visible:last').clone().val('').attr('style', 'display:block;');
            $('#usp-min-images').val(x);
            if (x < y) {
                link.before(clone.fadeIn(300));
            } else if (x = y) {
                link.before(clone.fadeIn(300));
                link.hide();
            } else {
                link.hide();
            }
            clone.attr('data-parsley-excluded', 'true');
        });
    }
});
(function ($) {
    'use strict';
    $(document).on('click', '.sl-button', function () {
        var button = $(this);
        var post_id = button.attr('data-post-id');
        var security = button.attr('data-nonce');
        var iscomment = button.attr('data-iscomment');
        var allbuttons;
        if (iscomment === '1') {
            allbuttons = $('.sl-comment-button-' + post_id);
        } else {
            allbuttons = $('.sl-button-' + post_id);
        }
        var loader = allbuttons.next('.sl-loader');
        if (post_id !== '') {
            $.ajax({
                type: 'POST',
                url: simpleLikes.ajaxurl,
                data: {action: 'process_simple_like', post_id: post_id, nonce: security, is_comment: iscomment,},
                beforeSend: function () {
                    loader.html('');
                },
                success: function (response) {
                    var icon = response.icon;
                    var count = response.count;
                    allbuttons.html(icon + count);
                    if (response.status === 'unliked') {
                        var like_text = simpleLikes.like;
                        allbuttons.prop('title', like_text);
                        allbuttons.removeClass('liked');
                    } else {
                        var unlike_text = simpleLikes.unlike;
                        allbuttons.prop('title', unlike_text);
                        allbuttons.addClass('liked');
                    }
                    loader.empty();
                }
            });
        }
        return false;
    });
})(jQuery);
(function ($, w) {
    "use strict";
    var methods = (function () {
        var c = {
            bcClass: 'sf-breadcrumb',
            menuClass: 'sf-js-enabled',
            anchorClass: 'sf-with-ul',
            menuArrowClass: 'sf-arrows'
        }, ios = (function () {
            var ios = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
            if (ios) {
                $('html').css('cursor', 'pointer').on('click', $.noop);
            }
            return ios;
        })(), wp7 = (function () {
            var style = document.documentElement.style;
            return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
        })(), unprefixedPointerEvents = (function () {
            return (!!w.PointerEvent);
        })(), toggleMenuClasses = function ($menu, o, add) {
            var classes = c.menuClass, method;
            if (o.cssArrows) {
                classes += ' ' + c.menuArrowClass;
            }
            method = (add) ? 'addClass' : 'removeClass';
            $menu[method](classes);
        }, setPathToCurrent = function ($menu, o) {
            return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels).addClass(o.hoverClass + ' ' + c.bcClass).filter(function () {
                return ($(this).children(o.popUpSelector).hide().show().length);
            }).removeClass(o.pathClass);
        }, toggleAnchorClass = function ($li, add) {
            var method = (add) ? 'addClass' : 'removeClass';
            $li.children('a')[method](c.anchorClass);
        }, toggleTouchAction = function ($menu) {
            var msTouchAction = $menu.css('ms-touch-action');
            var touchAction = $menu.css('touch-action');
            touchAction = touchAction || msTouchAction;
            touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
            $menu.css({'ms-touch-action': touchAction, 'touch-action': touchAction});
        }, getMenu = function ($el) {
            return $el.closest('.' + c.menuClass);
        }, getOptions = function ($el) {
            return getMenu($el).data('sfOptions');
        }, over = function () {
            var $this = $(this), o = getOptions($this);
            clearTimeout(o.sfTimer);
            $this.siblings().superfish('hide').end().superfish('show');
        }, close = function (o) {
            o.retainPath = ($.inArray(this[0], o.$path) > -1);
            this.superfish('hide');
            if (!this.parents('.' + o.hoverClass).length) {
                o.onIdle.call(getMenu(this));
                if (o.$path.length) {
                    $.proxy(over, o.$path)();
                }
            }
        }, out = function () {
            var $this = $(this), o = getOptions($this);
            if (ios) {
                $.proxy(close, $this, o)();
            }
            else {
                clearTimeout(o.sfTimer);
                o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
            }
        }, touchHandler = function (e) {
            var $this = $(this), o = getOptions($this), $ul = $this.siblings(e.data.popUpSelector);
            if (o.onHandleTouch.call($ul) === false) {
                return this;
            }
            if ($ul.length > 0 && $ul.is(':hidden')) {
                $this.one('click.superfish', false);
                if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
                    $this.trigger('focus');
                } else {
                    $.proxy(over, $this.parent('li'))();
                }
            }
        }, applyHandlers = function ($menu, o) {
            var targets = 'li:has(' + o.popUpSelector + ')';
            if ($.fn.hoverIntent && !o.disableHI) {
                $menu.hoverIntent(over, out, targets);
            }
            else {
                $menu.on('mouseenter.superfish', targets, over).on('mouseleave.superfish', targets, out);
            }
            var touchevent = 'MSPointerDown.superfish';
            if (unprefixedPointerEvents) {
                touchevent = 'pointerdown.superfish';
            }
            if (!ios) {
                touchevent += ' touchend.superfish';
            }
            if (wp7) {
                touchevent += ' mousedown.superfish';
            }
            $menu.on('focusin.superfish', 'li', over).on('focusout.superfish', 'li', out).on(touchevent, 'a', o, touchHandler);
        };
        return {
            hide: function (instant) {
                if (this.length) {
                    var $this = this, o = getOptions($this);
                    if (!o) {
                        return this;
                    }
                    var not = (o.retainPath === true) ? o.$path : '',
                        $ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
                        speed = o.speedOut;
                    if (instant) {
                        $ul.show();
                        speed = 0;
                    }
                    o.retainPath = false;
                    if (o.onBeforeHide.call($ul) === false) {
                        return this;
                    }
                    $ul.stop(true, true).animate(o.animationOut, speed, function () {
                        var $this = $(this);
                        o.onHide.call($this);
                    });
                }
                return this;
            }, show: function () {
                var o = getOptions(this);
                if (!o) {
                    return this;
                }
                var $this = this.addClass(o.hoverClass), $ul = $this.children(o.popUpSelector);
                if (o.onBeforeShow.call($ul) === false) {
                    return this;
                }
                $ul.stop(true, true).animate(o.animation, o.speed, function () {
                    o.onShow.call($ul);
                });
                return this;
            }, destroy: function () {
                return this.each(function () {
                    var $this = $(this), o = $this.data('sfOptions'), $hasPopUp;
                    if (!o) {
                        return false;
                    }
                    $hasPopUp = $this.find(o.popUpSelector).parent('li');
                    clearTimeout(o.sfTimer);
                    toggleMenuClasses($this, o);
                    toggleAnchorClass($hasPopUp);
                    toggleTouchAction($this);
                    $this.off('.superfish').off('.hoverIntent');
                    $hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
                        return style.replace(/display[^;]+;?/g, '');
                    });
                    o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
                    $this.find('.' + o.hoverClass).removeClass(o.hoverClass);
                    o.onDestroy.call($this);
                    $this.removeData('sfOptions');
                });
            }, init: function (op) {
                return this.each(function () {
                    var $this = $(this);
                    if ($this.data('sfOptions')) {
                        return false;
                    }
                    var o = $.extend({}, $.fn.superfish.defaults, op),
                        $hasPopUp = $this.find(o.popUpSelector).parent('li');
                    o.$path = setPathToCurrent($this, o);
                    $this.data('sfOptions', o);
                    toggleMenuClasses($this, o, true);
                    toggleAnchorClass($hasPopUp, true);
                    toggleTouchAction($this);
                    applyHandlers($this, o);
                    $hasPopUp.not('.' + c.bcClass).superfish('hide', true);
                    o.onInit.call(this);
                });
            }
        };
    })();
    $.fn.superfish = function (method, args) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            return $.error('Method ' + method + ' does not exist on jQuery.fn.superfish');
        }
    };
    $.fn.superfish.defaults = {
        popUpSelector: 'ul,.sf-mega',
        hoverClass: 'sfHover',
        pathClass: 'overrideThisToUse',
        pathLevels: 1,
        delay: 800,
        animation: {opacity: 'show'},
        animationOut: {opacity: 'hide'},
        speed: 'normal',
        speedOut: 'fast',
        cssArrows: true,
        disableHI: false,
        onInit: $.noop,
        onBeforeShow: $.noop,
        onShow: $.noop,
        onBeforeHide: $.noop,
        onHide: $.noop,
        onIdle: $.noop,
        onDestroy: $.noop,
        onHandleTouch: $.noop
    };
})(jQuery, window);
/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!function (e, t, n) {
    function a(t, n) {
        this.element = t, this.settings = e.extend({}, i, n), this.settings.duplicate || n.hasOwnProperty("removeIds") || (this.settings.removeIds = !1), this._defaults = i, this._name = s, this.init()
    }

    var i = {
            label: "MENU",
            duplicate: !0,
            duration: 200,
            easingOpen: "swing",
            easingClose: "swing",
            closedSymbol: "&#9658;",
            openedSymbol: "&#9660;",
            prependTo: "body",
            appendTo: "",
            parentTag: "a",
            closeOnClick: !1,
            allowParentLinks: !1,
            nestedParentLinks: !0,
            showChildren: !1,
            removeIds: !0,
            removeClasses: !1,
            removeStyles: !1,
            brand: "",
            animations: "jquery",
            init: function () {
            },
            beforeOpen: function () {
            },
            beforeClose: function () {
            },
            afterOpen: function () {
            },
            afterClose: function () {
            }
        }, s = "slicknav", o = "slicknav",
        l = {DOWN: 40, ENTER: 13, ESCAPE: 27, LEFT: 37, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38};
    a.prototype.init = function () {
        var n, a, i = this, s = e(this.element), r = this.settings;
        if (r.duplicate ? i.mobileNav = s.clone() : i.mobileNav = s, r.removeIds && (i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function (t, n) {
            e(n).removeAttr("id")
        })), r.removeClasses && (i.mobileNav.removeAttr("class"), i.mobileNav.find("*").each(function (t, n) {
            e(n).removeAttr("class")
        })), r.removeStyles && (i.mobileNav.removeAttr("style"), i.mobileNav.find("*").each(function (t, n) {
            e(n).removeAttr("style")
        })), n = o + "_icon", "" === r.label && (n += " " + o + "_no-text"), "a" == r.parentTag && (r.parentTag = 'a href="#"'), i.mobileNav.attr("class", o + "_nav"), a = e('<div class="' + o + '_menu"></div>'), "" !== r.brand) {
            var c = e('<div class="' + o + '_brand">' + r.brand + "</div>");
            e(a).append(c)
        }
        i.btn = e(["<" + r.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + o + "_btn " + o + '_collapsed">', '<span class="' + o + '_menutxt">' + r.label + "</span>", '<span class="' + n + '">', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', "</span>", "</" + r.parentTag + ">"].join("")), e(a).append(i.btn), "" !== r.appendTo ? e(r.appendTo).append(a) : e(r.prependTo).prepend(a), a.append(i.mobileNav);
        var p = i.mobileNav.find("li");
        e(p).each(function () {
            var t = e(this), n = {};
            if (n.children = t.children("ul").attr("role", "menu"), t.data("menu", n), n.children.length > 0) {
                var a = t.contents(), s = !1, l = [];
                e(a).each(function () {
                    return e(this).is("ul") ? !1 : (l.push(this), void(e(this).is("a") && (s = !0)))
                });
                var c = e("<" + r.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + o + '_item"/>');
                if (r.allowParentLinks && !r.nestedParentLinks && s) e(l).wrapAll('<span class="' + o + "_parent-link " + o + '_row"/>').parent(); else {
                    var p = e(l).wrapAll(c).parent();
                    p.addClass(o + "_row")
                }
                r.showChildren ? t.addClass(o + "_open") : t.addClass(o + "_collapsed"), t.addClass(o + "_parent");
                var d = e('<span class="' + o + '_arrow">' + (r.showChildren ? r.openedSymbol : r.closedSymbol) + "</span>");
                r.allowParentLinks && !r.nestedParentLinks && s && (d = d.wrap(c).parent()), e(l).last().after(d)
            } else 0 === t.children().length && t.addClass(o + "_txtnode");
            t.children("a").attr("role", "menuitem").click(function (t) {
                r.closeOnClick && !e(t.target).parent().closest("li").hasClass(o + "_parent") && e(i.btn).click()
            }), r.closeOnClick && r.allowParentLinks && (t.children("a").children("a").click(function (t) {
                e(i.btn).click()
            }), t.find("." + o + "_parent-link a:not(." + o + "_item)").click(function (t) {
                e(i.btn).click()
            }))
        }), e(p).each(function () {
            var t = e(this).data("menu");
            r.showChildren || i._visibilityToggle(t.children, null, !1, null, !0)
        }), i._visibilityToggle(i.mobileNav, null, !1, "init", !0), i.mobileNav.attr("role", "menu"), e(t).mousedown(function () {
            i._outlines(!1)
        }), e(t).keyup(function () {
            i._outlines(!0)
        }), e(i.btn).click(function (e) {
            e.preventDefault(), i._menuToggle()
        }), i.mobileNav.on("click", "." + o + "_item", function (t) {
            t.preventDefault(), i._itemClick(e(this))
        }), e(i.btn).keydown(function (t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.ENTER:
                case l.SPACE:
                case l.DOWN:
                    t.preventDefault(), n.keyCode === l.DOWN && e(i.btn).hasClass(o + "_open") || i._menuToggle(), e(i.btn).next().find('[role="menuitem"]').first().focus()
            }
        }), i.mobileNav.on("keydown", "." + o + "_item", function (t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.ENTER:
                    t.preventDefault(), i._itemClick(e(t.target));
                    break;
                case l.RIGHT:
                    t.preventDefault(), e(t.target).parent().hasClass(o + "_collapsed") && i._itemClick(e(t.target)), e(t.target).next().find('[role="menuitem"]').first().focus()
            }
        }), i.mobileNav.on("keydown", '[role="menuitem"]', function (t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.DOWN:
                    t.preventDefault();
                    var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
                        s = a.index(t.target), r = s + 1;
                    a.length <= r && (r = 0);
                    var c = a.eq(r);
                    c.focus();
                    break;
                case l.UP:
                    t.preventDefault();
                    var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
                        s = a.index(t.target), c = a.eq(s - 1);
                    c.focus();
                    break;
                case l.LEFT:
                    if (t.preventDefault(), e(t.target).parent().parent().parent().hasClass(o + "_open")) {
                        var p = e(t.target).parent().parent().prev();
                        p.focus(), i._itemClick(p)
                    } else e(t.target).parent().parent().hasClass(o + "_nav") && (i._menuToggle(), e(i.btn).focus());
                    break;
                case l.ESCAPE:
                    t.preventDefault(), i._menuToggle(), e(i.btn).focus()
            }
        }), r.allowParentLinks && r.nestedParentLinks && e("." + o + "_item a").click(function (e) {
            e.stopImmediatePropagation()
        })
    }, a.prototype._menuToggle = function (e) {
        var t = this, n = t.btn, a = t.mobileNav;
        n.hasClass(o + "_collapsed") ? (n.removeClass(o + "_collapsed"), n.addClass(o + "_open")) : (n.removeClass(o + "_open"), n.addClass(o + "_collapsed")), n.addClass(o + "_animating"), t._visibilityToggle(a, n.parent(), !0, n)
    }, a.prototype._itemClick = function (e) {
        var t = this, n = t.settings, a = e.data("menu");
        a || (a = {}, a.arrow = e.children("." + o + "_arrow"), a.ul = e.next("ul"), a.parent = e.parent(), a.parent.hasClass(o + "_parent-link") && (a.parent = e.parent().parent(), a.ul = e.parent().next("ul")), e.data("menu", a)), a.parent.hasClass(o + "_collapsed") ? (a.arrow.html(n.openedSymbol), a.parent.removeClass(o + "_collapsed"), a.parent.addClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e)) : (a.arrow.html(n.closedSymbol), a.parent.addClass(o + "_collapsed"), a.parent.removeClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e))
    }, a.prototype._visibilityToggle = function (t, n, a, i, s) {
        function l(t, n) {
            e(t).removeClass(o + "_animating"), e(n).removeClass(o + "_animating"), s || p.afterOpen(t)
        }

        function r(n, a) {
            t.attr("aria-hidden", "true"), d.attr("tabindex", "-1"), c._setVisAttr(t, !0), t.hide(), e(n).removeClass(o + "_animating"), e(a).removeClass(o + "_animating"), s ? "init" == n && p.init() : p.afterClose(n)
        }

        var c = this, p = c.settings, d = c._getActionItems(t), u = 0;
        a && (u = p.duration), t.hasClass(o + "_hidden") ? (t.removeClass(o + "_hidden"), s || p.beforeOpen(i), "jquery" === p.animations ? t.stop(!0, !0).slideDown(u, p.easingOpen, function () {
            l(i, n)
        }) : "velocity" === p.animations && t.velocity("finish").velocity("slideDown", {
            duration: u,
            easing: p.easingOpen,
            complete: function () {
                l(i, n)
            }
        }), t.attr("aria-hidden", "false"), d.attr("tabindex", "0"), c._setVisAttr(t, !1)) : (t.addClass(o + "_hidden"), s || p.beforeClose(i), "jquery" === p.animations ? t.stop(!0, !0).slideUp(u, this.settings.easingClose, function () {
            r(i, n)
        }) : "velocity" === p.animations && t.velocity("finish").velocity("slideUp", {
            duration: u,
            easing: p.easingClose,
            complete: function () {
                r(i, n)
            }
        }))
    }, a.prototype._setVisAttr = function (t, n) {
        var a = this, i = t.children("li").children("ul").not("." + o + "_hidden");
        n ? i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "true");
            var i = a._getActionItems(t);
            i.attr("tabindex", "-1"), a._setVisAttr(t, n)
        }) : i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "false");
            var i = a._getActionItems(t);
            i.attr("tabindex", "0"), a._setVisAttr(t, n)
        })
    }, a.prototype._getActionItems = function (e) {
        var t = e.data("menu");
        if (!t) {
            t = {};
            var n = e.children("li"), a = n.find("a");
            t.links = a.add(n.find("." + o + "_item")), e.data("menu", t)
        }
        return t.links
    }, a.prototype._outlines = function (t) {
        t ? e("." + o + "_item, ." + o + "_btn").css("outline", "") : e("." + o + "_item, ." + o + "_btn").css("outline", "none")
    }, a.prototype.toggle = function () {
        var e = this;
        e._menuToggle()
    }, a.prototype.open = function () {
        var e = this;
        e.btn.hasClass(o + "_collapsed") && e._menuToggle()
    }, a.prototype.close = function () {
        var e = this;
        e.btn.hasClass(o + "_open") && e._menuToggle()
    }, e.fn[s] = function (t) {
        var n = arguments;
        if (void 0 === t || "object" == typeof t) return this.each(function () {
            e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new a(this, t))
        });
        if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
            var i;
            return this.each(function () {
                var o = e.data(this, "plugin_" + s);
                o instanceof a && "function" == typeof o[t] && (i = o[t].apply(o, Array.prototype.slice.call(n, 1)))
            }), void 0 !== i ? i : this
        }
    }
}(jQuery, document, window);
window.Modernizr = function (e, t, n) {
    function r(e) {
        m.cssText = e
    }

    function o(e, t) {
        return typeof e === t
    }

    function i(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function a(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!i(o, "-") && m[o] !== n) return "pfx" != t || o
        }
        return !1
    }

    function c(e, t, r) {
        var i = e.charAt(0).toUpperCase() + e.slice(1), c = (e + " " + E.join(i + " ") + i).split(" ");
        return o(t, "string") || o(t, "undefined") ? a(c, t) : function (e, t, r) {
            for (var i in e) {
                var a = t[e[i]];
                if (a !== n) return !1 === r ? e[i] : o(a, "function") ? a.bind(r || t) : a
            }
            return !1
        }(c = (e + " " + w.join(i + " ") + i).split(" "), t, r)
    }

    var s, l, u = {}, f = t.documentElement, d = "modernizr", p = t.createElement(d), m = p.style,
        h = t.createElement("input"), g = ":)", v = {}.toString, y = " -webkit- -moz- -o- -ms- ".split(" "),
        b = "Webkit Moz O ms", E = b.split(" "), w = b.toLowerCase().split(" "), x = "http://www.w3.org/2000/svg",
        S = {}, C = {}, k = {}, T = [], j = T.slice, N = function (e, n, r, o) {
            var i, a, c, s, l = t.createElement("div"), u = t.body, p = u || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;) c = t.createElement("div"), c.id = o ? o[r] : d + (r + 1), l.appendChild(c);
            return i = ["&#173;", '<style id="s', d, '">', e, "</style>"].join(""), l.id = d, (u ? l : p).innerHTML += i, p.appendChild(l), u || (p.style.background = "", p.style.overflow = "hidden", s = f.style.overflow, f.style.overflow = "hidden", f.appendChild(p)), a = n(l, e), u ? l.parentNode.removeChild(l) : (p.parentNode.removeChild(p), f.style.overflow = s), !!a
        }, M = function () {
            var e = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return function (r, i) {
                i = i || t.createElement(e[r] || "div");
                var a = (r = "on" + r) in i;
                return a || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(r, ""), a = o(i[r], "function"), o(i[r], "undefined") || (i[r] = n), i.removeAttribute(r))), i = null, a
            }
        }(), P = {}.hasOwnProperty;
    l = o(P, "undefined") || o(P.call, "undefined") ? function (e, t) {
        return t in e && o(e.constructor.prototype[t], "undefined")
    } : function (e, t) {
        return P.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = j.call(arguments, 1), r = function () {
            if (this instanceof r) {
                var o = function () {
                };
                o.prototype = t.prototype;
                var i = new o, a = t.apply(i, n.concat(j.call(arguments)));
                return Object(a) === a ? a : i
            }
            return t.apply(e, n.concat(j.call(arguments)))
        };
        return r
    }), S.flexbox = function () {
        return c("flexWrap")
    }, S.canvas = function () {
        var e = t.createElement("canvas");
        return !!e.getContext && !!e.getContext("2d")
    }, S.canvastext = function () {
        return !!u.canvas && !!o(t.createElement("canvas").getContext("2d").fillText, "function")
    }, S.webgl = function () {
        return !!e.WebGLRenderingContext
    }, S.touch = function () {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : N(["@media (", y.join("touch-enabled),("), d, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
            n = 9 === e.offsetTop
        }), n
    }, S.geolocation = function () {
        return "geolocation" in navigator
    }, S.postmessage = function () {
        return !!e.postMessage
    }, S.websqldatabase = function () {
        return !!e.openDatabase
    }, S.indexedDB = function () {
        return !!c("indexedDB", e)
    }, S.hashchange = function () {
        return M("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, S.history = function () {
        return !!e.history && !!history.pushState
    }, S.draganddrop = function () {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, S.websockets = function () {
        return "WebSocket" in e || "MozWebSocket" in e
    }, S.rgba = function () {
        return r("background-color:rgba(150,255,150,.5)"), i(m.backgroundColor, "rgba")
    }, S.hsla = function () {
        return r("background-color:hsla(120,40%,100%,.5)"), i(m.backgroundColor, "rgba") || i(m.backgroundColor, "hsla")
    }, S.multiplebgs = function () {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(m.background)
    }, S.backgroundsize = function () {
        return c("backgroundSize")
    }, S.borderimage = function () {
        return c("borderImage")
    }, S.borderradius = function () {
        return c("borderRadius")
    }, S.boxshadow = function () {
        return c("boxShadow")
    }, S.textshadow = function () {
        return "" === t.createElement("div").style.textShadow
    }, S.opacity = function () {
        return e = "opacity:.55", r(y.join(e + ";") + (t || "")), /^0.55$/.test(m.opacity);
        var e, t
    }, S.cssanimations = function () {
        return c("animationName")
    }, S.csscolumns = function () {
        return c("columnCount")
    }, S.cssgradients = function () {
        var e = "background-image:";
        return r((e + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + e) + y.join("linear-gradient(left top,#9f9, white);" + e)).slice(0, -e.length)), i(m.backgroundImage, "gradient")
    }, S.cssreflections = function () {
        return c("boxReflect")
    }, S.csstransforms = function () {
        return !!c("transform")
    }, S.csstransforms3d = function () {
        var e = !!c("perspective");
        return e && "webkitPerspective" in f.style && N("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t, n) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight
        }), e
    }, S.csstransitions = function () {
        return c("transition")
    }, S.fontface = function () {
        var e;
        return N('@font-face {font-family:"font";src:url("https://")}', function (n, r) {
            var o = t.getElementById("smodernizr"), i = o.sheet || o.styleSheet,
                a = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "";
            e = /src/i.test(a) && 0 === a.indexOf(r.split(" ")[0])
        }), e
    }, S.generatedcontent = function () {
        var e;
        return N(["#", d, "{font:0/0 a}#", d, ':after{content:"', g, '";visibility:hidden;font:3px/1 a}'].join(""), function (t) {
            e = t.offsetHeight >= 3
        }), e
    }, S.video = function () {
        var e = t.createElement("video"), n = !1;
        try {
            (n = !!e.canPlayType) && ((n = new Boolean(n)).ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (e) {
        }
        return n
    }, S.audio = function () {
        var e = t.createElement("audio"), n = !1;
        try {
            (n = !!e.canPlayType) && ((n = new Boolean(n)).ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (e) {
        }
        return n
    }, S.localstorage = function () {
        try {
            return localStorage.setItem(d, d), localStorage.removeItem(d), !0
        } catch (e) {
            return !1
        }
    }, S.sessionstorage = function () {
        try {
            return sessionStorage.setItem(d, d), sessionStorage.removeItem(d), !0
        } catch (e) {
            return !1
        }
    }, S.webworkers = function () {
        return !!e.Worker
    }, S.applicationcache = function () {
        return !!e.applicationCache
    }, S.svg = function () {
        return !!t.createElementNS && !!t.createElementNS(x, "svg").createSVGRect
    }, S.inlinesvg = function () {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == x
    }, S.smil = function () {
        return !!t.createElementNS && /SVGAnimate/.test(v.call(t.createElementNS(x, "animate")))
    }, S.svgclippaths = function () {
        return !!t.createElementNS && /SVGClipPath/.test(v.call(t.createElementNS(x, "clipPath")))
    };
    for (var A in S) l(S, A) && (s = A.toLowerCase(), u[s] = S[A](), T.push((u[s] ? "" : "no-") + s));
    return u.input || (u.input = function (n) {
        for (var r = 0, o = n.length; r < o; r++) k[n[r]] = n[r] in h;
        return k.list && (k.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), k
    }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), u.inputtypes = function (e) {
        for (var r, o, i, a = 0, c = e.length; a < c; a++) h.setAttribute("type", o = e[a]), r = "text" !== h.type, r && (h.value = g, h.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && h.style.WebkitAppearance !== n ? (f.appendChild(h), i = t.defaultView, r = i.getComputedStyle && "textfield" !== i.getComputedStyle(h, null).WebkitAppearance && 0 !== h.offsetHeight, f.removeChild(h)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? h.checkValidity && !1 === h.checkValidity() : h.value != g)), C[e[a]] = !!r;
        return C
    }("search tel url email datetime date month week time datetime-local number range color".split(" "))), u.addTest = function (e, t) {
        if ("object" == typeof e)
            for (var r in e) l(e, r) && u.addTest(r, e[r]); else {
            if (e = e.toLowerCase(), u[e] !== n) return u;
            t = "function" == typeof t ? t() : t, f.className += " " + (t ? "" : "no-") + e, u[e] = t
        }
        return u
    }, r(""), p = h = null, function (e, t) {
        function n() {
            var e = m.elements;
            return "string" == typeof e ? e.split(" ") : e
        }

        function r(e) {
            var t = p[e[f]];
            return t || (t = {}, d++, e[f] = d, p[d] = t), t
        }

        function o(e, n, o) {
            return n || (n = t), c ? n.createElement(e) : (o || (o = r(n)), (i = o.cache[e] ? o.cache[e].cloneNode() : u.test(e) ? (o.cache[e] = o.createElem(e)).cloneNode() : o.createElem(e)).canHaveChildren && !l.test(e) ? o.frag.appendChild(i) : i);
            var i
        }

        function i(e) {
            e || (e = t);
            var i, s, l, u, f, d, p = r(e);
            return m.shivCSS && !a && !p.hasCSS && (p.hasCSS = (u = "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}", f = (l = e).createElement("p"), d = l.getElementsByTagName("head")[0] || l.documentElement, f.innerHTML = "x<style>" + u + "</style>", !!d.insertBefore(f.lastChild, d.firstChild))), c || (i = e, (s = p).cache || (s.cache = {}, s.createElem = i.createElement, s.createFrag = i.createDocumentFragment, s.frag = s.createFrag()), i.createElement = function (e) {
                return m.shivMethods ? o(e, i, s) : s.createElem(e)
            }, i.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/\w+/g, function (e) {
                return s.createElem(e), s.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(m, s.frag)), e
        }

        var a, c, s = e.html5 || {}, l = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            f = "_html5shiv", d = 0, p = {};
        !function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", a = "hidden" in e, c = 1 == e.childNodes.length || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement
                }()
            } catch (e) {
                a = !0, c = !0
            }
        }();
        var m = {
            elements: s.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: !1 !== s.shivCSS,
            supportsUnknownElements: c,
            shivMethods: !1 !== s.shivMethods,
            type: "default",
            shivDocument: i,
            createElement: o,
            createDocumentFragment: function (e, o) {
                if (e || (e = t), c) return e.createDocumentFragment();
                for (var i = (o = o || r(e)).frag.cloneNode(), a = 0, s = n(), l = s.length; a < l; a++) i.createElement(s[a]);
                return i
            }
        };
        e.html5 = m, i(t)
    }(this, t), u._version = "2.6.2", u._prefixes = y, u._domPrefixes = w, u._cssomPrefixes = E, u.mq = function (t) {
        var n, r = e.matchMedia || e.msMatchMedia;
        return r ? r(t).matches : (N("@media " + t + " { #" + d + " { position: absolute; } }", function (t) {
            n = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
        }), n)
    }, u.hasEvent = M, u.testProp = function (e) {
        return a([e])
    }, u.testAllProps = c, u.testStyles = N, u.prefixed = function (e, t, n) {
        return t ? c(e, t, n) : c(e, "pfx")
    }, f.className = f.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + T.join(" "), u
}(this, this.document), function (e, t, n) {
    function r(e) {
        return "[object Function]" == h.call(e)
    }

    function o(e) {
        return "string" == typeof e
    }

    function i() {
    }

    function a(e) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e
    }

    function c() {
        var e = g.shift();
        v = 1, e ? e.t ? p(function () {
            ("c" == e.t ? f.injectCss : f.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
        }, 0) : (e(), c()) : v = 0
    }

    function s(e, n, r, i, s) {
        return v = 0, n = n || "j", o(e) ? function (e, n, r, o, i, s, l) {
            function u(t) {
                if (!h && a(d.readyState) && (w.r = h = 1, !v && c(), d.onload = d.onreadystatechange = null, t)) {
                    "img" != e && p(function () {
                        E.removeChild(d)
                    }, 50);
                    for (var r in k[n]) k[n].hasOwnProperty(r) && k[n][r].onload()
                }
            }

            l = l || f.errorTimeout;
            var d = t.createElement(e), h = 0, y = 0, w = {t: r, s: n, e: i, a: s, x: l};
            1 === k[n] && (y = 1, k[n] = []), "object" == e ? d.data = n : (d.src = n, d.type = e), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function () {
                u.call(this, y)
            }, g.splice(o, 0, w), "img" != e && (y || 2 === k[n] ? (E.insertBefore(d, b ? null : m), p(u, l)) : k[n].push(d))
        }("c" == n ? x : w, e, n, this.i++, r, i, s) : (g.splice(this.i++, 0, e), 1 == g.length && c()), this
    }

    function l() {
        var e = f;
        return e.loader = {load: s, i: 0}, e
    }

    var u, f, d = t.documentElement, p = e.setTimeout, m = t.getElementsByTagName("script")[0], h = {}.toString, g = [],
        v = 0, y = "MozAppearance" in d.style, b = y && !!t.createRange().compareNode, E = b ? d : m.parentNode,
        w = (d = e.opera && "[object Opera]" == h.call(e.opera), d = !!t.attachEvent && !d, y ? "object" : d ? "script" : "img"),
        x = d ? "script" : w, S = Array.isArray || function (e) {
            return "[object Array]" == h.call(e)
        }, C = [], k = {}, T = {
            timeout: function (e, t) {
                return t.length && (e.timeout = t[0]), e
            }
        };
    (f = function (e) {
        function t(e, t, o, i, a) {
            var c = function (e) {
                e = e.split("!");
                var t, n, r, o = C.length, i = e.pop(), a = e.length;
                for (i = {
                    url: i,
                    origUrl: i,
                    prefixes: e
                }, n = 0; n < a; n++) r = e[n].split("="), (t = T[r.shift()]) && (i = t(i, r));
                for (n = 0; n < o; n++) i = C[n](i);
                return i
            }(e), s = c.autoCallback;
            c.url.split(".").pop().split("?").shift(), c.bypass || (t && (t = r(t) ? t : t[e] || t[i] || t[e.split("/").pop().split("?")[0]]), c.instead ? c.instead(e, t, o, i, a) : (k[c.url] ? c.noexec = !0 : k[c.url] = 1, o.load(c.url, c.forceCSS || !c.forceJS && "css" == c.url.split(".").pop().split("?").shift() ? "c" : n, c.noexec, c.attrs, c.timeout), (r(t) || r(s)) && o.load(function () {
                l(), t && t(c.origUrl, a, i), s && s(c.origUrl, a, i), k[c.url] = 2
            })))
        }

        function a(e, n) {
            function a(e, i) {
                if (e) {
                    if (o(e)) i || (f = function () {
                        var e = [].slice.call(arguments);
                        d.apply(this, e), p()
                    }), t(e, f, n, 0, l); else if (Object(e) === e)
                        for (s in c = function () {
                            var t, n = 0;
                            for (t in e) e.hasOwnProperty(t) && n++;
                            return n
                        }(), e) e.hasOwnProperty(s) && (!i && !--c && (r(f) ? f = function () {
                            var e = [].slice.call(arguments);
                            d.apply(this, e), p()
                        } : f[s] = function (e) {
                            return function () {
                                var t = [].slice.call(arguments);
                                e && e.apply(this, t), p()
                            }
                        }(d[s])), t(e[s], f, n, s, l))
                } else !i && p()
            }

            var c, s, l = !!e.test, u = e.load || e.both, f = e.callback || i, d = f, p = e.complete || i;
            a(l ? e.yep : e.nope, !!u), u && a(u)
        }

        var c, s, u = this.yepnope.loader;
        if (o(e)) t(e, 0, u, 0); else if (S(e))
            for (c = 0; c < e.length; c++) s = e[c], o(s) ? t(s, 0, u, 0) : S(s) ? f(s) : Object(s) === s && a(s, u); else Object(e) === e && a(e, u)
    }).addPrefix = function (e, t) {
        T[e] = t
    }, f.addFilter = function (e) {
        C.push(e)
    }, f.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", u = function () {
        t.removeEventListener("DOMContentLoaded", u, 0), t.readyState = "complete"
    }, 0)), e.yepnope = l(), e.yepnope.executeStack = c, e.yepnope.injectJs = function (e, n, r, o, s, l) {
        var u, d, h = t.createElement("script");
        o = o || f.errorTimeout;
        h.src = e;
        for (d in r) h.setAttribute(d, r[d]);
        n = l ? c : n || i, h.onreadystatechange = h.onload = function () {
            !u && a(h.readyState) && (u = 1, n(), h.onload = h.onreadystatechange = null)
        }, p(function () {
            u || (u = 1, n(1))
        }, o), s ? h.onload() : m.parentNode.insertBefore(h, m)
    }, e.yepnope.injectCss = function (e, n, r, o, a, s) {
        var l;
        o = t.createElement("link"), n = s ? c : n || i;
        o.href = e, o.rel = "stylesheet", o.type = "text/css";
        for (l in r) o.setAttribute(l, r[l]);
        a || (m.parentNode.insertBefore(o, m), p(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
;(function ($) {
    var defaults = {
        mode: 'horizontal',
        slideSelector: '',
        infiniteLoop: true,
        hideControlOnEnd: false,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: false,
        captions: false,
        ticker: false,
        tickerHover: false,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        useCSS: true,
        preloadImages: 'visible',
        responsive: true,
        slideZIndex: 50,
        wrapperClass: 'bx-wrapper',
        touchEnabled: true,
        swipeThreshold: 50,
        oneToOneTouch: true,
        preventDefaultSwipeX: true,
        preventDefaultSwipeY: false,
        ariaLive: true,
        ariaHidden: true,
        keyboardEnabled: false,
        pager: true,
        pagerType: 'full',
        pagerShortSeparator: ' / ',
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        nextSelector: null,
        prevSelector: null,
        autoControls: false,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: false,
        autoControlsSelector: null,
        auto: false,
        pause: 4000,
        autoStart: true,
        autoDirection: 'next',
        stopAutoOnClick: false,
        autoHover: false,
        autoDelay: 0,
        autoSlideForOnePage: false,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: false,
        onSliderLoad: function () {
            return true;
        },
        onSlideBefore: function () {
            return true;
        },
        onSlideAfter: function () {
            return true;
        },
        onSlideNext: function () {
            return true;
        },
        onSlidePrev: function () {
            return true;
        },
        onSliderResize: function () {
            return true;
        },
        onAutoChange: function () {
            return true;
        }
    };
    $.fn.bxSlider = function (options) {
        if (this.length === 0) {
            return this;
        }
        if (this.length > 1) {
            this.each(function () {
                $(this).bxSlider(options);
            });
            return this;
        }
        var slider = {}, el = this, windowWidth = $(window).width(), windowHeight = $(window).height();
        if ($(el).data('bxSlider')) {
            return;
        }
        var init = function () {
            if ($(el).data('bxSlider')) {
                return;
            }
            slider.settings = $.extend({}, defaults, options);
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            slider.children = el.children(slider.settings.slideSelector);
            if (slider.children.length < slider.settings.minSlides) {
                slider.settings.minSlides = slider.children.length;
            }
            if (slider.children.length < slider.settings.maxSlides) {
                slider.settings.maxSlides = slider.children.length;
            }
            if (slider.settings.randomStart) {
                slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
            }
            slider.active = {index: slider.settings.startSlide};
            slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
            if (slider.carousel) {
                slider.settings.preloadImages = 'all';
            }
            slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
            slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
            slider.working = false;
            slider.controls = {};
            slider.interval = null;
            slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
            slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function () {
                var div = document.createElement('div'),
                    props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                for (var i = 0; i < props.length; i++) {
                    if (div.style[props[i]] !== undefined) {
                        slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
                        slider.animProp = '-' + slider.cssPrefix + '-transform';
                        return true;
                    }
                }
                return false;
            }());
            if (slider.settings.mode === 'vertical') {
                slider.settings.maxSlides = slider.settings.minSlides;
            }
            el.data('origStyle', el.attr('style'));
            el.children(slider.settings.slideSelector).each(function () {
                $(this).data('origStyle', $(this).attr('style'));
            });
            setup();
        };
        var setup = function () {
            var preloadSelector = slider.children.eq(slider.settings.startSlide);
            el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
            slider.viewport = el.parent();
            if (slider.settings.ariaLive && !slider.settings.ticker) {
                slider.viewport.attr('aria-live', 'polite');
            }
            slider.loader = $('<div class="bx-loading" />');
            slider.viewport.prepend(slider.loader);
            el.css({
                width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
                position: 'relative'
            });
            if (slider.usingCSS && slider.settings.easing) {
                el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
            } else if (!slider.settings.easing) {
                slider.settings.easing = 'swing';
            }
            slider.viewport.css({width: '100%', overflow: 'hidden', position: 'relative'});
            slider.viewport.parent().css({maxWidth: getViewportMaxWidth()});
            slider.children.css({
                'float': slider.settings.mode === 'horizontal' ? 'left' : 'none',
                listStyle: 'none',
                position: 'relative'
            });
            slider.children.css('width', getSlideWidth());
            if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) {
                slider.children.css('marginRight', slider.settings.slideMargin);
            }
            if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) {
                slider.children.css('marginBottom', slider.settings.slideMargin);
            }
            if (slider.settings.mode === 'fade') {
                slider.children.css({position: 'absolute', zIndex: 0, display: 'none'});
                slider.children.eq(slider.settings.startSlide).css({
                    zIndex: slider.settings.slideZIndex,
                    display: 'block'
                });
            }
            slider.controls.el = $('<div class="bx-controls" />');
            if (slider.settings.captions) {
                appendCaptions();
            }
            slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
            if (slider.settings.video) {
                el.fitVids();
            }
            if (slider.settings.preloadImages === 'none') {
                preloadSelector = null;
            }
            else if (slider.settings.preloadImages === 'all' || slider.settings.ticker) {
                preloadSelector = slider.children;
            }
            if (!slider.settings.ticker) {
                if (slider.settings.controls) {
                    appendControls();
                }
                if (slider.settings.auto && slider.settings.autoControls) {
                    appendControlsAuto();
                }
                if (slider.settings.pager) {
                    appendPager();
                }
                if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) {
                    slider.viewport.after(slider.controls.el);
                }
            } else {
                slider.settings.pager = false;
            }
            if (preloadSelector === null) {
                start();
            } else {
                loadElements(preloadSelector, start);
            }
        };
        var loadElements = function (selector, callback) {
            var total = selector.find('img:not([src=""]), iframe').length, count = 0;
            if (total === 0) {
                callback();
                return;
            }
            selector.find('img:not([src=""]), iframe').each(function () {
                $(this).one('load error', function () {
                    if (++count === total) {
                        callback();
                    }
                }).each(function () {
                    if (this.complete || this.src == '') {
                        $(this).trigger('load');
                    }
                });
            });
        };
        var start = function () {
            if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
                var slice = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
                    sliceAppend = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
                    slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
                if (slider.settings.ariaHidden) {
                    sliceAppend.attr('aria-hidden', true);
                    slicePrepend.attr('aria-hidden', true);
                }
                el.append(sliceAppend).prepend(slicePrepend);
            }
            slider.loader.remove();
            setSlidePosition();
            if (slider.settings.mode === 'vertical') {
                slider.settings.adaptiveHeight = true;
            }
            slider.viewport.height(getViewportHeight());
            el.redrawSlider();
            slider.settings.onSliderLoad.call(el, slider.active.index);
            slider.initialized = true;
            if (slider.settings.responsive) {
                $(window).on('resize', resizeWindow);
            }
            if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) {
                initAuto();
            }
            if (slider.settings.ticker) {
                initTicker();
            }
            if (slider.settings.pager) {
                updatePagerActive(slider.settings.startSlide);
            }
            if (slider.settings.controls) {
                updateDirectionControls();
            }
            if (slider.settings.touchEnabled && !slider.settings.ticker) {
                initTouch();
            }
            if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
                $(document).keydown(keyPress);
            }
        };
        var getViewportHeight = function () {
            var height = 0;
            var children = $();
            if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
                children = slider.children;
            } else {
                if (!slider.carousel) {
                    children = slider.children.eq(slider.active.index);
                } else {
                    var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
                    children = slider.children.eq(currentIndex);
                    for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
                        if (currentIndex + i >= slider.children.length) {
                            children = children.add(slider.children.eq(i - 1));
                        } else {
                            children = children.add(slider.children.eq(currentIndex + i));
                        }
                    }
                }
            }
            if (slider.settings.mode === 'vertical') {
                children.each(function (index) {
                    height += $(this).outerHeight();
                });
                if (slider.settings.slideMargin > 0) {
                    height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
                }
            } else {
                height = Math.max.apply(Math, children.map(function () {
                    return $(this).outerHeight(false);
                }).get());
            }
            if (slider.viewport.css('box-sizing') === 'border-box') {
                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
                    parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
            } else if (slider.viewport.css('box-sizing') === 'padding-box') {
                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
            }
            return height;
        };
        var getViewportMaxWidth = function () {
            var width = '100%';
            if (slider.settings.slideWidth > 0) {
                if (slider.settings.mode === 'horizontal') {
                    width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
                } else {
                    width = slider.settings.slideWidth;
                }
            }
            return width;
        };
        var getSlideWidth = function () {
            var newElWidth = slider.settings.slideWidth, wrapWidth = slider.viewport.width();
            if (slider.settings.slideWidth === 0 || (slider.settings.slideWidth > wrapWidth && !slider.carousel) || slider.settings.mode === 'vertical') {
                newElWidth = wrapWidth;
            } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
                if (wrapWidth > slider.maxThreshold) {
                    return newElWidth;
                } else if (wrapWidth < slider.minThreshold) {
                    newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
                } else if (slider.settings.shrinkItems) {
                    newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
                }
            }
            return newElWidth;
        };
        var getNumberSlidesShowing = function () {
            var slidesShowing = 1, childWidth = null;
            if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
                if (slider.viewport.width() < slider.minThreshold) {
                    slidesShowing = slider.settings.minSlides;
                } else if (slider.viewport.width() > slider.maxThreshold) {
                    slidesShowing = slider.settings.maxSlides;
                } else {
                    childWidth = slider.children.first().width() + slider.settings.slideMargin;
                    slidesShowing = Math.floor((slider.viewport.width() +
                        slider.settings.slideMargin) / childWidth) || 1;
                }
            } else if (slider.settings.mode === 'vertical') {
                slidesShowing = slider.settings.minSlides;
            }
            return slidesShowing;
        };
        var getPagerQty = function () {
            var pagerQty = 0, breakPoint = 0, counter = 0;
            if (slider.settings.moveSlides > 0) {
                if (slider.settings.infiniteLoop) {
                    pagerQty = Math.ceil(slider.children.length / getMoveBy());
                } else {
                    while (breakPoint < slider.children.length) {
                        ++pagerQty;
                        breakPoint = counter + getNumberSlidesShowing();
                        counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
                    }
                    return counter;
                }
            } else {
                pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
            }
            return pagerQty;
        };
        var getMoveBy = function () {
            if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
                return slider.settings.moveSlides;
            }
            return getNumberSlidesShowing();
        };
        var setSlidePosition = function () {
            var position, lastChild, lastShowingIndex;
            if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
                if (slider.settings.mode === 'horizontal') {
                    lastChild = slider.children.last();
                    position = lastChild.position();
                    setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
                } else if (slider.settings.mode === 'vertical') {
                    lastShowingIndex = slider.children.length - slider.settings.minSlides;
                    position = slider.children.eq(lastShowingIndex).position();
                    setPositionProperty(-position.top, 'reset', 0);
                }
            } else {
                position = slider.children.eq(slider.active.index * getMoveBy()).position();
                if (slider.active.index === getPagerQty() - 1) {
                    slider.active.last = true;
                }
                if (position !== undefined) {
                    if (slider.settings.mode === 'horizontal') {
                        setPositionProperty(-position.left, 'reset', 0);
                    }
                    else if (slider.settings.mode === 'vertical') {
                        setPositionProperty(-position.top, 'reset', 0);
                    }
                }
            }
        };
        var setPositionProperty = function (value, type, duration, params) {
            var animateObj, propValue;
            if (slider.usingCSS) {
                propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
                el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
                if (type === 'slide') {
                    el.css(slider.animProp, propValue);
                    if (duration !== 0) {
                        el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
                            if (!$(e.target).is(el)) {
                                return;
                            }
                            el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                            updateAfterSlideTransition();
                        });
                    } else {
                        updateAfterSlideTransition();
                    }
                } else if (type === 'reset') {
                    el.css(slider.animProp, propValue);
                } else if (type === 'ticker') {
                    el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
                    el.css(slider.animProp, propValue);
                    if (duration !== 0) {
                        el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
                            if (!$(e.target).is(el)) {
                                return;
                            }
                            el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                            setPositionProperty(params.resetValue, 'reset', 0);
                            tickerLoop();
                        });
                    } else {
                        setPositionProperty(params.resetValue, 'reset', 0);
                        tickerLoop();
                    }
                }
            } else {
                animateObj = {};
                animateObj[slider.animProp] = value;
                if (type === 'slide') {
                    el.animate(animateObj, duration, slider.settings.easing, function () {
                        updateAfterSlideTransition();
                    });
                } else if (type === 'reset') {
                    el.css(slider.animProp, value);
                } else if (type === 'ticker') {
                    el.animate(animateObj, duration, 'linear', function () {
                        setPositionProperty(params.resetValue, 'reset', 0);
                        tickerLoop();
                    });
                }
            }
        };
        var populatePager = function () {
            var pagerHtml = '', linkContent = '', pagerQty = getPagerQty();
            for (var i = 0; i < pagerQty; i++) {
                linkContent = '';
                if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
                    linkContent = slider.settings.buildPager(i);
                    slider.pagerEl.addClass('bx-custom-pager');
                } else {
                    linkContent = i + 1;
                    slider.pagerEl.addClass('bx-default-pager');
                }
                pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
            }
            slider.pagerEl.html(pagerHtml);
        };
        var appendPager = function () {
            if (!slider.settings.pagerCustom) {
                slider.pagerEl = $('<div class="bx-pager" />');
                if (slider.settings.pagerSelector) {
                    $(slider.settings.pagerSelector).html(slider.pagerEl);
                } else {
                    slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
                }
                populatePager();
            } else {
                slider.pagerEl = $(slider.settings.pagerCustom);
            }
            slider.pagerEl.on('click touchend', 'a', clickPagerBind);
        };
        var appendControls = function () {
            slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
            slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
            slider.controls.next.on('click touchend', clickNextBind);
            slider.controls.prev.on('click touchend', clickPrevBind);
            if (slider.settings.nextSelector) {
                $(slider.settings.nextSelector).append(slider.controls.next);
            }
            if (slider.settings.prevSelector) {
                $(slider.settings.prevSelector).append(slider.controls.prev);
            }
            if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
                slider.controls.directionEl = $('<div class="bx-controls-direction" />');
                slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
                slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
            }
        };
        var appendControlsAuto = function () {
            slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
            slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
            slider.controls.autoEl = $('<div class="bx-controls-auto" />');
            slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
            slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
            if (slider.settings.autoControlsCombine) {
                slider.controls.autoEl.append(slider.controls.start);
            } else {
                slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
            }
            if (slider.settings.autoControlsSelector) {
                $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
            } else {
                slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
            }
            updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
        };
        var appendCaptions = function () {
            slider.children.each(function (index) {
                var title = $(this).find('img:first').attr('title');
                if (title !== undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
            });
        };
        var clickNextBind = function (e) {
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) {
                return;
            }
            if (slider.settings.auto && slider.settings.stopAutoOnClick) {
                el.stopAuto();
            }
            el.goToNextSlide();
        };
        var clickPrevBind = function (e) {
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) {
                return;
            }
            if (slider.settings.auto && slider.settings.stopAutoOnClick) {
                el.stopAuto();
            }
            el.goToPrevSlide();
        };
        var clickStartBind = function (e) {
            el.startAuto();
            e.preventDefault();
        };
        var clickStopBind = function (e) {
            el.stopAuto();
            e.preventDefault();
        };
        var clickPagerBind = function (e) {
            var pagerLink, pagerIndex;
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) {
                return;
            }
            if (slider.settings.auto && slider.settings.stopAutoOnClick) {
                el.stopAuto();
            }
            pagerLink = $(e.currentTarget);
            if (pagerLink.attr('data-slide-index') !== undefined) {
                pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
                if (pagerIndex !== slider.active.index) {
                    el.goToSlide(pagerIndex);
                }
            }
        };
        var updatePagerActive = function (slideIndex) {
            var len = slider.children.length;
            if (slider.settings.pagerType === 'short') {
                if (slider.settings.maxSlides > 1) {
                    len = Math.ceil(slider.children.length / slider.settings.maxSlides);
                }
                slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
                return;
            }
            slider.pagerEl.find('a').removeClass('active');
            slider.pagerEl.each(function (i, el) {
                $(el).find('a').eq(slideIndex).addClass('active');
            });
        };
        var updateAfterSlideTransition = function () {
            if (slider.settings.infiniteLoop) {
                var position = '';
                if (slider.active.index === 0) {
                    position = slider.children.eq(0).position();
                } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
                    position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
                } else if (slider.active.index === slider.children.length - 1) {
                    position = slider.children.eq(slider.children.length - 1).position();
                }
                if (position) {
                    if (slider.settings.mode === 'horizontal') {
                        setPositionProperty(-position.left, 'reset', 0);
                    }
                    else if (slider.settings.mode === 'vertical') {
                        setPositionProperty(-position.top, 'reset', 0);
                    }
                }
            }
            slider.working = false;
            slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
        };
        var updateAutoControls = function (state) {
            if (slider.settings.autoControlsCombine) {
                slider.controls.autoEl.html(slider.controls[state]);
            } else {
                slider.controls.autoEl.find('a').removeClass('active');
                slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
            }
        };
        var updateDirectionControls = function () {
            if (getPagerQty() === 1) {
                slider.controls.prev.addClass('disabled');
                slider.controls.next.addClass('disabled');
            } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
                if (slider.active.index === 0) {
                    slider.controls.prev.addClass('disabled');
                    slider.controls.next.removeClass('disabled');
                } else if (slider.active.index === getPagerQty() - 1) {
                    slider.controls.next.addClass('disabled');
                    slider.controls.prev.removeClass('disabled');
                } else {
                    slider.controls.prev.removeClass('disabled');
                    slider.controls.next.removeClass('disabled');
                }
            }
        };
        var windowFocusHandler = function () {
            el.startAuto();
        };
        var windowBlurHandler = function () {
            el.stopAuto();
        };
        var initAuto = function () {
            if (slider.settings.autoDelay > 0) {
                setTimeout(el.startAuto, slider.settings.autoDelay);
            } else {
                el.startAuto();
                $(window).focus(windowFocusHandler).blur(windowBlurHandler);
            }
            if (slider.settings.autoHover) {
                el.hover(function () {
                    if (slider.interval) {
                        el.stopAuto(true);
                        slider.autoPaused = true;
                    }
                }, function () {
                    if (slider.autoPaused) {
                        el.startAuto(true);
                        slider.autoPaused = null;
                    }
                });
            }
        };
        var initTicker = function () {
            var startPosition = 0, position, transform, value, idx, ratio, property, newSpeed, totalDimens;
            if (slider.settings.autoDirection === 'next') {
                el.append(slider.children.clone().addClass('bx-clone'));
            } else {
                el.prepend(slider.children.clone().addClass('bx-clone'));
                position = slider.children.first().position();
                startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
            }
            setPositionProperty(startPosition, 'reset', 0);
            slider.settings.pager = false;
            slider.settings.controls = false;
            slider.settings.autoControls = false;
            if (slider.settings.tickerHover) {
                if (slider.usingCSS) {
                    idx = slider.settings.mode === 'horizontal' ? 4 : 5;
                    slider.viewport.hover(function () {
                        transform = el.css('-' + slider.cssPrefix + '-transform');
                        value = parseFloat(transform.split(',')[idx]);
                        setPositionProperty(value, 'reset', 0);
                    }, function () {
                        totalDimens = 0;
                        slider.children.each(function (index) {
                            totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                        });
                        ratio = slider.settings.speed / totalDimens;
                        property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                        newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
                        tickerLoop(newSpeed);
                    });
                } else {
                    slider.viewport.hover(function () {
                        el.stop();
                    }, function () {
                        totalDimens = 0;
                        slider.children.each(function (index) {
                            totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                        });
                        ratio = slider.settings.speed / totalDimens;
                        property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                        newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
                        tickerLoop(newSpeed);
                    });
                }
            }
            tickerLoop();
        };
        var tickerLoop = function (resumeSpeed) {
            var speed = resumeSpeed ? resumeSpeed : slider.settings.speed, position = {left: 0, top: 0},
                reset = {left: 0, top: 0}, animateProperty, resetValue, params;
            if (slider.settings.autoDirection === 'next') {
                position = el.find('.bx-clone').first().position();
            } else {
                reset = slider.children.first().position();
            }
            animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
            resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
            params = {resetValue: resetValue};
            setPositionProperty(animateProperty, 'ticker', speed, params);
        };
        var isOnScreen = function (el) {
            var win = $(window), viewport = {top: win.scrollTop(), left: win.scrollLeft()}, bounds = el.offset();
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            bounds.right = bounds.left + el.outerWidth();
            bounds.bottom = bounds.top + el.outerHeight();
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        };
        var keyPress = function (e) {
            var activeElementTag = document.activeElement.tagName.toLowerCase(), tagFilters = 'input|textarea',
                p = new RegExp(activeElementTag, ['i']), result = p.exec(tagFilters);
            if (result == null && isOnScreen(el)) {
                if (e.keyCode === 39) {
                    clickNextBind(e);
                    return false;
                } else if (e.keyCode === 37) {
                    clickPrevBind(e);
                    return false;
                }
            }
        };
        var initTouch = function () {
            slider.touch = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
            slider.viewport.on('touchstart MSPointerDown pointerdown', onTouchStart);
            slider.viewport.on('click', '.bxslider a', function (e) {
                // slider.viewport.removeClass('click-disabled');
                if (slider.viewport.hasClass('click-disabled')) {
                    e.preventDefault();
                    slider.viewport.removeClass('click-disabled');
                }
            });
        };
        var onTouchStart = function (e) {
            if (e.type !== 'touchstart' && e.button !== 0) {
                return;
            }
            var lastScrollTop = 0;
            $(window).scroll(function (event) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                } else {
                    e.preventDefault();
                }
            });
            slider.controls.el.addClass('disabled');
            if (slider.working) {
                slider.controls.el.removeClass('disabled');
            } else {
                slider.touch.originalPos = el.position();
                var orig = e.originalEvent,
                    touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
                var chromePointerEvents = typeof PointerEvent === 'function';
                if (chromePointerEvents) {
                    if (orig.pointerId === undefined) {
                        return;
                    }
                }
                slider.touch.start.x = touchPoints[0].pageX;
                slider.touch.start.y = touchPoints[0].pageY;
                if (slider.viewport.get(0).setPointerCapture) {
                    slider.pointerId = orig.pointerId;
                    slider.viewport.get(0).setPointerCapture(slider.pointerId);
                }
                slider.originalClickTarget = orig.originalTarget || orig.target;
                slider.originalClickButton = orig.button;
                slider.originalClickButtons = orig.buttons;
                slider.originalEventType = orig.type;
                slider.hasMove = false;
                slider.viewport.on('touchmove MSPointerMove pointermove', onTouchMove);
                slider.viewport.on('touchend MSPointerUp pointerup', onTouchEnd);
                slider.viewport.on('MSPointerCancel pointercancel', onPointerCancel);
            }
        };
        var onPointerCancel = function (e) {
            e.preventDefault();
            setPositionProperty(slider.touch.originalPos.left, 'reset', 0);
            slider.controls.el.removeClass('disabled');
            slider.viewport.off('MSPointerCancel pointercancel', onPointerCancel);
            slider.viewport.off('touchmove MSPointerMove pointermove', onTouchMove);
            slider.viewport.off('touchend MSPointerUp pointerup', onTouchEnd);
            if (slider.viewport.get(0).releasePointerCapture) {
                slider.viewport.get(0).releasePointerCapture(slider.pointerId);
            }
        };
        var onTouchMove = function (e) {
            var orig = e.originalEvent,
                touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
                xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
                yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y), value = 0, change = 0;
            slider.hasMove = true;
            if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
                e.preventDefault();
            } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
                e.preventDefault();
            }
            if (e.type !== 'touchmove') {
                e.preventDefault();
            }
            if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
                if (slider.settings.mode === 'horizontal') {
                    change = touchPoints[0].pageX - slider.touch.start.x;
                    value = slider.touch.originalPos.left + change;
                } else {
                    change = touchPoints[0].pageY - slider.touch.start.y;
                    value = slider.touch.originalPos.top + change;
                }
                setPositionProperty(value, 'reset', 0);
            }
        };
        var onTouchEnd = function (e) {
            e.preventDefault();
            slider.viewport.off('touchmove MSPointerMove pointermove', onTouchMove);
            slider.controls.el.removeClass('disabled');
            var orig = e.originalEvent,
                touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig], value = 0,
                distance = 0;
            slider.touch.end.x = touchPoints[0].pageX;
            slider.touch.end.y = touchPoints[0].pageY;
            if (slider.settings.mode === 'fade') {
                distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
                if (distance >= slider.settings.swipeThreshold) {
                    if (slider.touch.start.x > slider.touch.end.x) {
                        el.goToNextSlide();
                    } else {
                        el.goToPrevSlide();
                    }
                    el.stopAuto();
                }
            } else {
                if (slider.settings.mode === 'horizontal') {
                    distance = slider.touch.end.x - slider.touch.start.x;
                    value = slider.touch.originalPos.left;
                } else {
                    distance = slider.touch.end.y - slider.touch.start.y;
                    value = slider.touch.originalPos.top;
                }
                if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
                    setPositionProperty(value, 'reset', 200);
                } else {
                    if (Math.abs(distance) >= slider.settings.swipeThreshold) {
                        if (distance < 0) {
                            el.goToNextSlide();
                        } else {
                            el.goToPrevSlide();
                        }
                        el.stopAuto();
                    } else {
                        setPositionProperty(value, 'reset', 200);
                    }
                }
            }
            slider.viewport.off('touchend MSPointerUp pointerup', onTouchEnd);
            if (slider.viewport.get(0).releasePointerCapture) {
                slider.viewport.get(0).releasePointerCapture(slider.pointerId);
            }
            if (slider.hasMove === false && (slider.originalClickButton === 0 || slider.originalEventType === 'touchstart')) {
                $(slider.originalClickTarget).trigger({
                    type: 'click',
                    button: slider.originalClickButton,
                    buttons: slider.originalClickButtons
                });
            }
        };
        var resizeWindow = function (e) {
            if (!slider.initialized) {
                return;
            }
            if (slider.working) {
                window.setTimeout(resizeWindow, 10);
            } else {
                var windowWidthNew = $(window).width(), windowHeightNew = $(window).height();
                if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
                    windowWidth = windowWidthNew;
                    windowHeight = windowHeightNew;
                    el.redrawSlider();
                    slider.settings.onSliderResize.call(el, slider.active.index);
                }
            }
        };
        var applyAriaHiddenAttributes = function (startVisibleIndex) {
            var numberOfSlidesShowing = getNumberSlidesShowing();
            if (slider.settings.ariaHidden && !slider.settings.ticker) {
                slider.children.attr('aria-hidden', 'true');
                slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
            }
        };
        var setSlideIndex = function (slideIndex) {
            if (slideIndex < 0) {
                if (slider.settings.infiniteLoop) {
                    return getPagerQty() - 1;
                } else {
                    return slider.active.index;
                }
            } else if (slideIndex >= getPagerQty()) {
                if (slider.settings.infiniteLoop) {
                    return 0;
                } else {
                    return slider.active.index;
                }
            } else {
                return slideIndex;
            }
        };
        el.goToSlide = function (slideIndex, direction) {
            var performTransition = true, moveBy = 0, position = {left: 0, top: 0}, lastChild = null, lastShowingIndex,
                eq, value, requestEl;
            slider.oldIndex = slider.active.index;
            slider.active.index = setSlideIndex(slideIndex);
            if (slider.working || slider.active.index === slider.oldIndex) {
                return;
            }
            slider.working = true;
            performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
            if (typeof(performTransition) !== 'undefined' && !performTransition) {
                slider.active.index = slider.oldIndex;
                slider.working = false;
                return;
            }
            if (direction === 'next') {
                if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                    performTransition = false;
                }
            } else if (direction === 'prev') {
                if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                    performTransition = false;
                }
            }
            slider.active.last = slider.active.index >= getPagerQty() - 1;
            if (slider.settings.pager || slider.settings.pagerCustom) {
                updatePagerActive(slider.active.index);
            }
            if (slider.settings.controls) {
                updateDirectionControls();
            }
            if (slider.settings.mode === 'fade') {
                if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
                slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function () {
                    $(this).css('zIndex', slider.settings.slideZIndex);
                    updateAfterSlideTransition();
                });
            } else {
                if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
                    if (slider.settings.mode === 'horizontal') {
                        lastChild = slider.children.eq(slider.children.length - 1);
                        position = lastChild.position();
                        moveBy = slider.viewport.width() - lastChild.outerWidth();
                    } else {
                        lastShowingIndex = slider.children.length - slider.settings.minSlides;
                        position = slider.children.eq(lastShowingIndex).position();
                    }
                } else if (slider.carousel && slider.active.last && direction === 'prev') {
                    eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
                    lastChild = el.children('.bx-clone').eq(eq);
                    position = lastChild.position();
                } else if (direction === 'next' && slider.active.index === 0) {
                    position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
                    slider.active.last = false;
                } else if (slideIndex >= 0) {
                    requestEl = slideIndex * parseInt(getMoveBy());
                    position = slider.children.eq(requestEl).position();
                }
                if (typeof(position) !== 'undefined') {
                    value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
                    setPositionProperty(value, 'slide', slider.settings.speed);
                }
                slider.working = false;
            }
            if (slider.settings.ariaHidden) {
                applyAriaHiddenAttributes(slider.active.index * getMoveBy());
            }
        };
        el.goToNextSlide = function () {
            if (!slider.settings.infiniteLoop && slider.active.last) {
                return;
            }
            if (slider.working === true) {
                return;
            }
            var pagerIndex = parseInt(slider.active.index) + 1;
            el.goToSlide(pagerIndex, 'next');
        };
        el.goToPrevSlide = function () {
            if (!slider.settings.infiniteLoop && slider.active.index === 0) {
                return;
            }
            if (slider.working === true) {
                return;
            }
            var pagerIndex = parseInt(slider.active.index) - 1;
            el.goToSlide(pagerIndex, 'prev');
        };
        el.startAuto = function (preventControlUpdate) {
            if (slider.interval) {
                return;
            }
            slider.interval = setInterval(function () {
                if (slider.settings.autoDirection === 'next') {
                    el.goToNextSlide();
                } else {
                    el.goToPrevSlide();
                }
            }, slider.settings.pause);
            slider.settings.onAutoChange.call(el, true);
            if (slider.settings.autoControls && preventControlUpdate !== true) {
                updateAutoControls('stop');
            }
        };
        el.stopAuto = function (preventControlUpdate) {
            if (slider.autoPaused) slider.autoPaused = false;
            if (!slider.interval) {
                return;
            }
            clearInterval(slider.interval);
            slider.interval = null;
            slider.settings.onAutoChange.call(el, false);
            if (slider.settings.autoControls && preventControlUpdate !== true) {
                updateAutoControls('start');
            }
        };
        el.getCurrentSlide = function () {
            return slider.active.index;
        };
        el.getCurrentSlideElement = function () {
            return slider.children.eq(slider.active.index);
        };
        el.getSlideElement = function (index) {
            return slider.children.eq(index);
        };
        el.getSlideCount = function () {
            return slider.children.length;
        };
        el.isWorking = function () {
            return slider.working;
        };
        el.redrawSlider = function () {
            slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
            slider.viewport.css('height', getViewportHeight());
            if (!slider.settings.ticker) {
                setSlidePosition();
            }
            if (slider.active.last) {
                slider.active.index = getPagerQty() - 1;
            }
            if (slider.active.index >= getPagerQty()) {
                slider.active.last = true;
            }
            if (slider.settings.pager && !slider.settings.pagerCustom) {
                populatePager();
                updatePagerActive(slider.active.index);
            }
            if (slider.settings.ariaHidden) {
                applyAriaHiddenAttributes(slider.active.index * getMoveBy());
            }
        };
        el.destroySlider = function () {
            if (!slider.initialized) {
                return;
            }
            slider.initialized = false;
            $('.bx-clone', this).remove();
            slider.children.each(function () {
                if ($(this).data('origStyle') !== undefined) {
                    $(this).attr('style', $(this).data('origStyle'));
                } else {
                    $(this).removeAttr('style');
                }
            });
            if ($(this).data('origStyle') !== undefined) {
                this.attr('style', $(this).data('origStyle'));
            } else {
                $(this).removeAttr('style');
            }
            $(this).unwrap().unwrap();
            if (slider.controls.el) {
                slider.controls.el.remove();
            }
            if (slider.controls.next) {
                slider.controls.next.remove();
            }
            if (slider.controls.prev) {
                slider.controls.prev.remove();
            }
            if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) {
                slider.pagerEl.remove();
            }
            $('.bx-caption', this).remove();
            if (slider.controls.autoEl) {
                slider.controls.autoEl.remove();
            }
            clearInterval(slider.interval);
            if (slider.settings.responsive) {
                $(window).off('resize', resizeWindow);
            }
            if (slider.settings.keyboardEnabled) {
                $(document).off('keydown', keyPress);
            }
            $(this).removeData('bxSlider');
            $(window).off('blur', windowBlurHandler).off('focus', windowFocusHandler);
        };
        el.reloadSlider = function (settings) {
            if (settings !== undefined) {
                options = settings;
            }
            el.destroySlider();
            init();
            $(el).data('bxSlider', this);
        };
        init();
        $(el).data('bxSlider', this);
        return this;
    };
})(jQuery);
(function ($) {
    $(document).ready(function () {
        "use strict";
        $(".featured-slide a.thumbnail-link").attr("target", "_self");
        if ($(window).width() >= 960) {
            var example = $('.sf-menu').superfish({delay: 100, speed: 'fast', autoArrows: false});
        }
        $('#featured-slider .bxslider').bxSlider({
            auto: true,
            preloadImages: 'all',
            pause: '4000',
            autoHover: true,
            adaptiveHeight: true,
            mode: 'fade',
            onSliderLoad: function () {
                $("#featured-slider .bxslider").css("display", "block");
                $('#featured-slider .entry-header').fadeIn("100");
                $(".ribbon").fadeIn('1000');
            }
        });
        $('.gallery-slider').show().bxSlider({
            auto: true,
            preloadImages: 'all',
            pause: '4000',
            autoHover: true,
            adaptiveHeight: true,
            onSliderLoad: function () {
                $(".single #primary .gallery-slider").css("display", "block");
                $(".single #primary .bx-wrapper").css("visibility", "visible");
                $(".sidebar .widget_media_gallery .gallery-slider").css("display", "block");
                $(".sidebar .widget_media_gallery .bx-wrapper").css("visibility", "visible");
            }
        });
        $(window).load(function () {
            $(".custom-share").fadeIn('1000');
            $("#featured-grid .entry-header").fadeIn('1000');
            $(".bottom-right").fadeIn('1000');
            $(".widget_posts_thumbnail .entry-wrap").fadeIn('1000');
            $(".breadcrumbs.is_zhuanti h1").fadeIn('1000');
        });
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.bottom-right #back-top.bottom-icon').css('visibility', 'visible');
                } else {
                    $('.bottom-right #back-top.bottom-icon').css('visibility', 'hidden');
                }
            });
            $('#back-top').click(function () {
                $('body,html').animate({scrollTop: 0}, 400);
                return false;
            });
        });
        $('.widget_ad .widget-title').fadeIn("100");
        $('.slicknav_btn').click(function () {
            $('.header-search').slideUp('fast', function () {
            });
            $('.search-icon > .fa-search').removeClass('active');
            $('.search-icon > .fa-close').removeClass('active');
        });
        $('.search-icon > .fa-search').click(function () {
            $('.header-search').slideDown('fast', function () {
            });
            $('.search-icon > .fa-search').toggleClass('active');
            $('.search-icon > .fa-close').toggleClass('active');
            $('.slicknav_btn').removeClass('slicknav_open');
            $('.slicknav_nav').addClass('slicknav_hidden');
            $('.slicknav_nav').css('display', 'none');
        });
        $('.search-icon > .fa-close').click(function () {
            $('.header-search').slideUp('fast', function () {
            });
            $('.search-icon > .fa-search').toggleClass('active');
            $('.search-icon > .fa-close').toggleClass('active');
            $('.slicknav_btn').removeClass('slicknav_open');
            $('.slicknav_nav').addClass('slicknav_hidden');
            $('.slicknav_nav').css('display', 'none');
        });
    });
})(jQuery);
!function (a, b) {
    "use strict";

    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
                if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
            }
        }
    }

    var d = !1, e = !1;
    if (b.querySelector) if (a.addEventListener) d = !0;
    if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage) if (a.wp.receiveEmbedMessage = function (c) {
        var d = c.data;
        if (d) if (d.secret || d.message || d.value) if (!/[^a-zA-Z0-9]/.test(d.secret)) {
            var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
            for (e = 0; e < k.length; e++) k[e].style.display = "none";
            for (e = 0; e < j.length; e++) if (f = j[e], c.source === f.contentWindow) {
                if (f.removeAttribute("style"), "height" === d.message) {
                    if (g = parseInt(d.value, 10), g > 1e3) g = 1e3; else if (~~g < 200) g = 200;
                    f.height = g
                }
                if ("link" === d.message) if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host) if (b.activeElement === f) a.top.location.href = d.value
            } else ;
        }
    }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.StickySidebar = {})
}(this, function (t) {
    "use strict";
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var e, i, n = (function (t, e) {
            (function (t) {
                Object.defineProperty(t, "__esModule", {value: !0});
                var l, n, e = function () {
                    function n(t, e) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }

                    return function (t, e, i) {
                        return e && n(t.prototype, e), i && n(t, i), t
                    }
                }(), i = (l = ".stickySidebar", n = {
                    topSpacing: 0,
                    bottomSpacing: 0,
                    containerSelector: !1,
                    innerWrapperSelector: ".inner-wrapper-sticky",
                    stickyClass: "is-affixed",
                    resizeSensor: !0,
                    minWidth: !1
                }, function () {
                    function c(t) {
                        var e = this, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        if (function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, c), this.options = c.extend(n, i), this.sidebar = "string" == typeof t ? document.querySelector(t) : t, void 0 === this.sidebar) throw new Error("There is no specific sidebar element.");
                        this.sidebarInner = !1, this.container = this.sidebar.parentElement, this.affixedType = "STATIC", this.direction = "down", this.support = {
                            transform: !1,
                            transform3d: !1
                        }, this._initialized = !1, this._reStyle = !1, this._breakpoint = !1, this.dimensions = {
                            translateY: 0,
                            maxTranslateY: 0,
                            topSpacing: 0,
                            lastTopSpacing: 0,
                            bottomSpacing: 0,
                            lastBottomSpacing: 0,
                            sidebarHeight: 0,
                            sidebarWidth: 0,
                            containerTop: 0,
                            containerHeight: 0,
                            viewportHeight: 0,
                            viewportTop: 0,
                            lastViewportTop: 0
                        }, ["handleEvent"].forEach(function (t) {
                            e[t] = e[t].bind(e)
                        }), this.initialize()
                    }

                    return e(c, [{
                        key: "initialize", value: function () {
                            var i = this;
                            if (this._setSupportFeatures(), this.options.innerWrapperSelector && (this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector), null === this.sidebarInner && (this.sidebarInner = !1)), !this.sidebarInner) {
                                var t = document.createElement("div");
                                for (t.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(t); this.sidebar.firstChild != t;) t.appendChild(this.sidebar.firstChild);
                                this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky")
                            }
                            if (this.options.containerSelector) {
                                var e = document.querySelectorAll(this.options.containerSelector);
                                if ((e = Array.prototype.slice.call(e)).forEach(function (t, e) {
                                    t.contains(i.sidebar) && (i.container = t)
                                }), !e.length) throw new Error("The container does not contains on the sidebar.")
                            }
                            "function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0), "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0), this._widthBreakpoint(), this.calcDimensions(), this.stickyPosition(), this.bindEvents(), this._initialized = !0
                        }
                    }, {
                        key: "bindEvents", value: function () {
                            window.addEventListener("resize", this, {
                                passive: !0,
                                capture: !1
                            }), window.addEventListener("scroll", this, {
                                passive: !0,
                                capture: !1
                            }), this.sidebar.addEventListener("update" + l, this), this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent))
                        }
                    }, {
                        key: "handleEvent", value: function (t) {
                            this.updateSticky(t)
                        }
                    }, {
                        key: "calcDimensions", value: function () {
                            if (!this._breakpoint) {
                                var t = this.dimensions;
                                t.containerTop = c.offsetRelative(this.container).top, t.containerHeight = this.container.clientHeight, t.containerBottom = t.containerTop + t.containerHeight, t.sidebarHeight = this.sidebarInner.offsetHeight, t.sidebarWidth = this.sidebarInner.offsetWidth, t.viewportHeight = window.innerHeight, t.maxTranslateY = t.containerHeight - t.sidebarHeight, this._calcDimensionsWithScroll()
                            }
                        }
                    }, {
                        key: "_calcDimensionsWithScroll", value: function () {
                            var t = this.dimensions;
                            t.sidebarLeft = c.offsetRelative(this.sidebar).left, t.viewportTop = document.documentElement.scrollTop || document.body.scrollTop, t.viewportBottom = t.viewportTop + t.viewportHeight, t.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft, t.topSpacing = this.options.topSpacing, t.bottomSpacing = this.options.bottomSpacing, "function" == typeof t.topSpacing && (t.topSpacing = parseInt(t.topSpacing(this.sidebar)) || 0), "function" == typeof t.bottomSpacing && (t.bottomSpacing = parseInt(t.bottomSpacing(this.sidebar)) || 0), "VIEWPORT-TOP" === this.affixedType ? t.topSpacing < t.lastTopSpacing && (t.translateY += t.lastTopSpacing - t.topSpacing, this._reStyle = !0) : "VIEWPORT-BOTTOM" === this.affixedType && t.bottomSpacing < t.lastBottomSpacing && (t.translateY += t.lastBottomSpacing - t.bottomSpacing, this._reStyle = !0), t.lastTopSpacing = t.topSpacing, t.lastBottomSpacing = t.bottomSpacing
                        }
                    }, {
                        key: "isSidebarFitsViewport", value: function () {
                            var t = this.dimensions,
                                e = "down" === this.scrollDirection ? t.lastBottomSpacing : t.lastTopSpacing;
                            return this.dimensions.sidebarHeight + e < this.dimensions.viewportHeight
                        }
                    }, {
                        key: "observeScrollDir", value: function () {
                            var t = this.dimensions;
                            if (t.lastViewportTop !== t.viewportTop) {
                                var e = "down" === this.direction ? Math.min : Math.max;
                                t.viewportTop === e(t.viewportTop, t.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down")
                            }
                        }
                    }, {
                        key: "getAffixType", value: function () {
                            this._calcDimensionsWithScroll();
                            var t = this.dimensions, e = t.viewportTop + t.topSpacing, i = this.affixedType;
                            return e <= t.containerTop || t.containerHeight <= t.sidebarHeight ? (t.translateY = 0, i = "STATIC") : i = "up" === this.direction ? this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown(), t.translateY = Math.max(0, t.translateY), t.translateY = Math.min(t.containerHeight, t.translateY), t.translateY = Math.round(t.translateY), t.lastViewportTop = t.viewportTop, i
                        }
                    }, {
                        key: "_getAffixTypeScrollingDown", value: function () {
                            var t = this.dimensions, e = t.sidebarHeight + t.containerTop, i = t.viewportTop + t.topSpacing,
                                n = t.viewportBottom - t.bottomSpacing, o = this.affixedType;
                            return this.isSidebarFitsViewport() ? t.sidebarHeight + i >= t.containerBottom ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : i >= t.containerTop && (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : e + t.translateY <= n ? (t.translateY = n - e, o = "VIEWPORT-BOTTOM") : t.containerTop + t.translateY <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                        }
                    }, {
                        key: "_getAffixTypeScrollingUp", value: function () {
                            var t = this.dimensions, e = t.sidebarHeight + t.containerTop, i = t.viewportTop + t.topSpacing,
                                n = t.viewportBottom - t.bottomSpacing, o = this.affixedType;
                            return i <= t.translateY + t.containerTop ? (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : this.isSidebarFitsViewport() || t.containerTop <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                        }
                    }, {
                        key: "_getStyle", value: function (t) {
                            if (void 0 !== t) {
                                var e = {inner: {}, outer: {}}, i = this.dimensions;
                                switch (t) {
                                    case"VIEWPORT-TOP":
                                        e.inner = {
                                            position: "fixed",
                                            top: i.topSpacing,
                                            left: i.sidebarLeft - i.viewportLeft,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case"VIEWPORT-BOTTOM":
                                        e.inner = {
                                            position: "fixed",
                                            top: "auto",
                                            left: i.sidebarLeft,
                                            bottom: i.bottomSpacing,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case"CONTAINER-BOTTOM":
                                    case"VIEWPORT-UNBOTTOM":
                                        var n = this._getTranslate(0, i.translateY + "px");
                                        e.inner = n ? {transform: n} : {
                                            position: "absolute",
                                            top: i.translateY,
                                            width: i.sidebarWidth
                                        }
                                }
                                switch (t) {
                                    case"VIEWPORT-TOP":
                                    case"VIEWPORT-BOTTOM":
                                    case"VIEWPORT-UNBOTTOM":
                                    case"CONTAINER-BOTTOM":
                                        e.outer = {height: i.sidebarHeight, position: "relative"}
                                }
                                return e.outer = c.extend({
                                    height: "",
                                    position: ""
                                }, e.outer), e.inner = c.extend({
                                    position: "relative",
                                    top: "",
                                    left: "",
                                    bottom: "",
                                    width: "",
                                    transform: ""
                                }, e.inner), e
                            }
                        }
                    }, {
                        key: "stickyPosition", value: function (t) {
                            if (!this._breakpoint) {
                                t = this._reStyle || t || !1, this.options.topSpacing, this.options.bottomSpacing;
                                var e = this.getAffixType(), i = this._getStyle(e);
                                if ((this.affixedType != e || t) && e) {
                                    var n = "affix." + e.toLowerCase().replace("viewport-", "") + l;
                                    for (var o in c.eventTrigger(this.sidebar, n), "STATIC" === e ? c.removeClass(this.sidebar, this.options.stickyClass) : c.addClass(this.sidebar, this.options.stickyClass), i.outer) {
                                        var s = "number" == typeof i.outer[o] ? "px" : "";
                                        this.sidebar.style[o] = i.outer[o] + s
                                    }
                                    for (var r in i.inner) {
                                        var a = "number" == typeof i.inner[r] ? "px" : "";
                                        this.sidebarInner.style[r] = i.inner[r] + a
                                    }
                                    var p = "affixed." + e.toLowerCase().replace("viewport-", "") + l;
                                    c.eventTrigger(this.sidebar, p)
                                } else this._initialized && (this.sidebarInner.style.left = i.inner.left);
                                this.affixedType = e
                            }
                        }
                    }, {
                        key: "_widthBreakpoint", value: function () {
                            window.innerWidth <= this.options.minWidth ? (this._breakpoint = !0, this.affixedType = "STATIC", this.sidebar.removeAttribute("style"), c.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style")) : this._breakpoint = !1
                        }
                    }, {
                        key: "updateSticky", value: function () {
                            var t, e = this, i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                            this._running || (this._running = !0, t = i.type, requestAnimationFrame(function () {
                                switch (t) {
                                    case"scroll":
                                        e._calcDimensionsWithScroll(), e.observeScrollDir(), e.stickyPosition();
                                        break;
                                    case"resize":
                                    default:
                                        e._widthBreakpoint(), e.calcDimensions(), e.stickyPosition(!0)
                                }
                                e._running = !1
                            }))
                        }
                    }, {
                        key: "_setSupportFeatures", value: function () {
                            var t = this.support;
                            t.transform = c.supportTransform(), t.transform3d = c.supportTransform(!0)
                        }
                    }, {
                        key: "_getTranslate", value: function () {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                            return this.support.transform3d ? "translate3d(" + t + ", " + e + ", " + i + ")" : !!this.support.translate && "translate(" + t + ", " + e + ")"
                        }
                    }, {
                        key: "destroy", value: function () {
                            window.removeEventListener("resize", this, {capture: !1}), window.removeEventListener("scroll", this, {capture: !1}), this.sidebar.classList.remove(this.options.stickyClass), this.sidebar.style.minHeight = "", this.sidebar.removeEventListener("update" + l, this);
                            var t = {inner: {}, outer: {}};
                            for (var e in t.inner = {
                                position: "",
                                top: "",
                                left: "",
                                bottom: "",
                                width: "",
                                transform: ""
                            }, t.outer = {height: "", position: ""}, t.outer) this.sidebar.style[e] = t.outer[e];
                            for (var i in t.inner) this.sidebarInner.style[i] = t.inner[i];
                            this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent))
                        }
                    }], [{
                        key: "supportTransform", value: function (t) {
                            var i = !1, e = t ? "perspective" : "transform", n = e.charAt(0).toUpperCase() + e.slice(1),
                                o = document.createElement("support").style;
                            return (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ").forEach(function (t, e) {
                                if (void 0 !== o[t]) return i = t, !1
                            }), i
                        }
                    }, {
                        key: "eventTrigger", value: function (t, e, i) {
                            try {
                                var n = new CustomEvent(e, {detail: i})
                            } catch (t) {
                                (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, i)
                            }
                            t.dispatchEvent(n)
                        }
                    }, {
                        key: "extend", value: function (t, e) {
                            var i = {};
                            for (var n in t) void 0 !== e[n] ? i[n] = e[n] : i[n] = t[n];
                            return i
                        }
                    }, {
                        key: "offsetRelative", value: function (t) {
                            var e = {left: 0, top: 0};
                            do {
                                var i = t.offsetTop, n = t.offsetLeft;
                                isNaN(i) || (e.top += i), isNaN(n) || (e.left += n), t = "BODY" === t.tagName ? t.parentElement : t.offsetParent
                            } while (t);
                            return e
                        }
                    }, {
                        key: "addClass", value: function (t, e) {
                            c.hasClass(t, e) || (t.classList ? t.classList.add(e) : t.className += " " + e)
                        }
                    }, {
                        key: "removeClass", value: function (t, e) {
                            c.hasClass(t, e) && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
                        }
                    }, {
                        key: "hasClass", value: function (t, e) {
                            return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
                        }
                    }, {
                        key: "defaults", get: function () {
                            return n
                        }
                    }]), c
                }());
                t.default = i, window.StickySidebar = i
            })(e)
        }(e = {exports: {}}, e.exports), e.exports),
        o = (i = n) && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
    t.default = o, t.__moduleExports = n, Object.defineProperty(t, "__esModule", {value: !0})
});