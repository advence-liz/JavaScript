"use strict";


    /**
 * ADS Library Initial Starting Point
 * http://advanceddomscripting.com/chapter1/ADS-start.js
 */
/******************************** */
    (function (window) {

        //The ADS namespace
        window['ADS'] = {};
        var self = window['ADS'];
        function isCompatible(other) { };
        window['ADS']['isCompatible'] = isCompatible;

        function $() {

            var elements = new Array();

            for (var i = 0; i < arguments.length; i++) {

                var element = arguments[i];

                if (typeof element == 'string')

                    element = document.getElementById(element);
                //如果只提供一个参数立即返回这个元素
                if (arguments.length == 1)

                    return element;

                elements.push(element);

            }

            return elements;

        }
       
        function toggle(obj,value) {

            var el = document.getElementById(obj);

            if (el.style.display != 'none') {

                el.style.display = 'none';

            }

            else {

                el.style.display =value|| '';

            }

        }
        function addEvent( obj, type, fn ) {
            if ( obj.attachEvent ) {
                obj['e'+type+fn] = fn;
                obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
                obj.attachEvent( 'on'+type, obj[type+fn] );
            } else
                obj.addEventListener( type, fn, false );
        }
        function removeEvent( obj, type, fn ) {
            if ( obj.detachEvent ) {
                obj.detachEvent( 'on'+type, obj[type+fn] );
                obj[type+fn] = null;
            } else
                obj.removeEventListener( type, fn, false );
        }
        function getElementsByClass(searchClass, node, tag) {

            var classElements = new Array();

            if (node == null)

                node = document;

            if (tag == null)

                tag = '*';

            var els = node.getElementsByTagName(tag);

            var elsLen = els.length;

            var pattern = new RegExp('(^|\\\\s)' + searchClass + '(\\\\s|$)');

            for (i = 0, j = 0; i < elsLen; i++) {

                if (pattern.test(els[i].className)) {

                    classElements[j] = els[i];

                    j++;

                }

            }

            return classElements;

        }
        function insertAfter(parent, node, referenceNode) {

            parent.insertBefore(node, referenceNode.nextSibling);

        }
        function extend (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }

            return target;
        };
        window['ADS']['$'] = $;
        window['ADS']['addEvent'] = addEvent;
        window['ADS']['extend'] = extend;
    //    window['ADS']['getElementsByClassName'] = getElementsByClassName;
       // self.extend
      
        window['ADS']['toggle'] = toggle;

        function insertAfter(node, referenceNode) { };
        window['ADS']['insertAfter'] = insertAfter;

        function removeChildren(parent) { };
        window['ADS']['removeChildren'] = removeChildren;

        function prependChild(parent, newChild) { };
        window['ADS']['prependChild'] = prependChild;

    })(window);

    
    var State = function () {

    };

    State.prototype.download = function () {
        throw new Error("该方法必须被重载!");
    };

    State.prototype.pause = function () {
        throw new Error("该方法必须被重载!");
    };

    State.prototype.fail = function () {
        throw new Error("该方法必须被重载!");
    };

    State.prototype.finish = function () {
        throw new Error("该方法必须被重载!");
    };


    var ReadyState = function (oDownload) {
        State.apply(this);
        this.oDownload = oDownload;
    };

    ReadyState.prototype = new State();

    ReadyState.prototype.download = function () {
        this.oDownload.setState(this.oDownload.getDownloadingState());
        // Ready以后，可以开始下载，所以设置了Download函数里的状态获取方法
        console.log("Start Download!");
    };

    ReadyState.prototype.pause = function () {
        throw new Error("还没开始下载，不能暂停!");
    };

    ReadyState.prototype.fail = function () {
        throw new Error("文件还没开始下载，怎么能说失败呢!");
    };

    ReadyState.prototype.finish = function () {
        throw new Error("文件还没开始下载，当然也不能结束了!");
    };


    var Download = function () {
        this.oState = new ReadyState(this);
    };
    var oDownload = new Download();