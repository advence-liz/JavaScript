"use strict";

define(["msf.ecrm.commonUtil/msf.ecrm.commonTools.tools"], function (tools) {
    //extend
    Function.prototype.method = function (name, fun) {
        !this.prototype[name] ? this.prototype[name] = fun : null;
        return this;
    };
    /*
    Clear input value and specifyStr
    */
    (function (ko) {
        ko.bindingHandlers.clearOther = {
            //init: function (element, valueAccessor, allBindings) {
            //    var defaultSpecifyStr ="Please Specify";
            //    var self = $(element);
            //    !ko.utils.unwrapObservable(valueAccessor()) && self.val('');
            //    // Add Specify
            //    var allbings = allBindings();
            //    allBindings.specify = ko.utils.unwrapObservable(allBindings.specify);
            //    allBindings.specify ? self.attr('placeholder', allBindings.specify) : self.attr('placeholder', defaultSpecifyStr);
               
            //},

            update: function (element, valueAccessor, allBindings) {
                var defaultSpecifyStr = "Please Specify";
                var self = $(element);
                allBindings = allBindings();
                !ko.utils.unwrapObservable(valueAccessor())&&allBindings.value&&ko.isObservable(allBindings.value)&& allBindings.value('');//clear other text
                // Add Specify
                allBindings.specify = ko.utils.unwrapObservable(allBindings.specify);
                allBindings.specify ? self.attr('placeholder', allBindings.specify) : self.attr('placeholder', defaultSpecifyStr);
                //callBack
                // allBindings.callBack && allBindings.callBack();
               
            }
        };

    })(ko);
    //
    //
    function setValue(target,value) {
        target = value;
    }
      
    //  Listing: A memorization method for functions.
    Function.prototype.memoized = function (key) {
        this._values = this._values || {};
        return this._values[key] !== undefined ?
        this._values[key] :
        this._values[key] = this.apply(this, arguments);
    };

    Function.prototype.memoize = function () {
        var fn = this; //#1
        return function () { //#2
            return fn.memoized.apply(fn, arguments);
        }
    }
    //warp
    function wrap(object, method, wrapper) {
        var fn = object[method]; //#1
        return object[method] = function () { //#2
            return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)));
        }
    }
    // Example adapted from Prototype
    //if (Prototype.Browser.Opera) { //#3
    //    wrap(Element.Methods, "readAttribute",
    //    function (original, elem, attr) {
    //        return attr == 'title' ? elem.title : original(elem, attr);
    //    })
    //}

    //one base(func) |prototype(obj)
    //two base(func) constructor(func) |base(func) prototype
    //three base(func) prototype(obj)  constructor
    function createObject(arg1,arg2,arg3) {
        var argsLength = arguments.length, base, prototype, constructor;
        argsLength == 1 && $.type(arg1) == "function" ? prototype = Object.prototype : null;//one parameters and the first is function = createClass（base,Object.prototype) one parameters and the sencond is object createClass（prototype）原方法可以处理唯一参数当作prototype的情况。
        argsLength == 2 && $.type(arg2) == "function" ? constructor = arg2 : prototype = arg2;//俩个参数第二个为constructor时相当于 createClass(base,null,constructor) 俩个参数第二个为对象相当于 createClass（base，prototype) 原方法的正常用法。
        base = arg1; constructor = arg3;
        return createClass(base, prototype, constructor);
    }
  
    //one prototype
    //two base prototype
    //three base prototype constructor
    createClass.noop = $.noop;
    function createClass(base, prototype,constructor) {
        var basePrototype,constructor, proxiedPrototype = {};
        if (!prototype) {//if no prototype use default base
            prototype = base;
            base = createClass.noop;
        }
        basePrototype = new base();

        $.each(prototype, function (prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function () {
                var _super = function () {
                    return base.prototype[prop].apply(this, arguments);
                },
                    _superApply = function (args) {
                        return base.prototype[prop].apply(this, args);
                    };
                return function () {          
                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;

                    this._super = _super;
                    this._superApply = _superApply;

                    returnValue = value.apply(this, arguments);

                    this._super = __super;//remove this._super
                    this._superApply = __superApply;//remove this._superApply

                    return returnValue;
                };
            })();
        });
        constructor = constructor || createClass.noop;
        constructor.prototype = $.extend(basePrototype, proxiedPrototype);
        return new constructor();

    }

    //function parent() { };
    //parent.prototype.say = function () { console.log("this is parent") };
    //function son() { };
    //son.prototype.say = function () {
    //    console.log("this is son");
    //    this._super();
    //};
    //var obj = createClass(parent, son.prototype);

    /* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
    // Inspired by base2 and Prototype
    (function () {
        var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;//1判断函数是否可以序列化2判断函数中是否引用_super

        // The base Class implementation (does nothing)
        window.Class = function () { };

        // Create a new Class that inherits from this class
        Class.extend = function extend (prop) {//当前方法当作父类  传入当作子类原型
            var _super = this.prototype;//base.prototype   

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            var prototype = new this();//base.prototype
            initializing = false;

            // Copy the properties over onto the new prototype
            for (var name in prop) {
                // Check if we're overwriting an existing function
                prototype[name] = typeof prop[name] == "function" &&
                  typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                  (function (name, fn) {
                      return function () {//
                          var tmp = this._super;//此处_super 为undefined 跟下面配合阅后即焚 不给子类对象添加多余属性

                          // Add a new ._super() method that is the same method
                          // but on the super-class
                          this._super = _super[name];//此处_super为上面定义

                          // The method only need to be bound temporarily, so we
                          // remove it when we're done executing
                          var ret = fn.apply(this, arguments);
                          this._super = tmp;

                          return ret;
                      };
                  })(name, prop[name]) :
                  prop[name];
            }

            // The dummy class constructor
            function Class() {
                // All construction is actually done in the init method
                if (!initializing && this.init)
                    this.init.apply(this, arguments);
            }

            // Populate our constructed prototype object
            Class.prototype = prototype;

            // Enforce the constructor to be what we expect
            Class.prototype.constructor = Class;

            // And make this class extendable
            Class.extend = extend;

            return Class;
        };
    })();

    //var Person = Class.extend({
    //    init: function (isDancing) {
    //        this.dancing = isDancing;
    //    }
    //});

    //var Ninja = Person.extend({
    //    init: function () {
    //        this._super(false);
    //    }
    //});

    //var p = new Person(true);
    //p.dancing; // => true

    //var n = new Ninja();
    //n.dancing; // => false

    function selectWidget() {
        var self = this;
        self.itemsSource = ko.observableArray([]);
        self.selectedIndex = ko.observable(0);
        self.selectedItem = ko.computed(function () {
            if (self.itemsSource().length > 0) {
                return self.itemsSource()[self.selectedIndex()];
            } else {
                return {};
            }
        });
        self.selectChanged = function (n, e, d) {

        };
        self.setIndexByValue = function (value) {
            if (value != null && value != '') {
                for (var i = 0; i < self.itemsSource().length; i++) {
                    if (self.itemsSource()[i].Value == value) {
                        return self.selectedIndex(i);
                    }
                }
            }
            return self.selectedIndex(0);
        };
        self.init = function (code) {
            if ('Value' in code) {
                self.setIndexByValue(code.Value);
                return;
            }
            if (code.Label) {
                code.Options[0].Label = '[select' + code.Label + ']';
            }
            self.itemsSource(code.Options);


        }

    };



    /*
      get Default Select Advance Base Model
      <div id="" class="afui-row afui-date-picker" data-bind="with: dateModel">
                        <div class="afui-col-4">
                            <div class="aui-select aui-select-wide aui-select-advance" data-toggle="aui-select-advance" data-bind="selectAdvance: dayModel">
                                <input type="text" role="combobox" autocomplete="off" tabindex="0" aria-expanded="false"
                                    aria-disabled="false" aria-readonly="false" aria-autocomplete="both" aria-busy="false" data-bind="attr: { placeholder: dayModel.placeholderText }" />
                                <span class="afui-icon-triangle-down"></span>
                            </div>
                        </div>
                        <div class="afui-col-4">
                            <div class="aui-select aui-select-wide aui-select-advance" data-toggle="aui-select-advance" data-bind="selectAdvance: monthModel">
                                <input type="text" role="combobox" autocomplete="off" tabindex="0" aria-expanded="false"
                                    aria-disabled="false" aria-readonly="false" aria-autocomplete="both" aria-busy="false" data-bind="attr: { placeholder: monthModel.placeholderText }" />
                                <span class="afui-icon-triangle-down"></span>
                            </div>
                        </div>
                        <div class="afui-col-4">
                            <div class="aui-select aui-select-wide aui-select-advance" data-toggle="aui-select-advance" data-bind="selectAdvance: yearModel">
                                <input type="text" role="combobox" autocomplete="off" tabindex="0" aria-expanded="false"
                                    aria-disabled="false" aria-readonly="false" aria-autocomplete="both" aria-busy="false" data-bind="attr: { placeholder: yearModel.placeholderText }" />
                                <span class="afui-icon-triangle-down"></span>
                            </div>
                        </div>
                    </div>
      */
    function getYear() {
        // var years = haveNullOption ? [{ Label: '[YYYY]', Value: 0 }] : [];
        var years = [];
        for (var i = new Date().getFullYear() ; i > 1899 ; i--) {
            years.push({
                Label: i.toString(),
                Value: i.toString(),
            });
        }
        return years;
    }
    //opt.type opt.optionList
    function initSelectModel(opt) {
        var option = {
            placeholderText: "please select an item!",
            isNotSort: true,
            callFunction: null,
            haveNullOption: false,
        }
        $.extend(option, opt);
        if (option.type == 'year') {
            option.placeholderText = "[YYYY]";
            option.optionList = getYear();
            return tools.getInitSelectAdvanceBaseModel(option.optionList, option.placeholderText, option.callFunction, option.isNotSort);
        }
        if (option.type == 'month') {
            option.placeholderText = "[MMM]";
            option.optionList = tools.getShortMonthList(false);
            return tools.getInitSelectAdvanceBaseModel(option.optionList, option.placeholderText, option.callFunction, option.isNotSort);
        }
        if (option.type == 'day') {
            option.placeholderText = "[DD]";
            option.optionList = tools.getDayList(31, option.haveNullOption);
            return tools.getInitSelectAdvanceBaseModel(option.optionList, option.placeholderText, option.callFunction, option.isNotSort);
        }
        else {
            if (option.optionList) {
                return tools.getInitSelectAdvanceBaseModel(option.optionList, option.placeholderText, option.callFunction, option.isNotSort);
            }
        }
    }
    // one optionList
    //two  optionList,placeholder || optionList ,isNotSort
    //three optionList,placeholder,isNotSort
    function createSelect(optionList, placeholder, isNotSort, callFunction) {
       
        var option = {
            placeholderText: "please select an item!",
            isNotSort: true,
            callFunction: null,
            haveNullOption: false,
        }
        option.optionList = optionList;
        placeholder && setValue(option.placeholderText, placeholder);
        return tools.getInitSelectAdvanceBaseModel(option.optionList, option.placeholderText, option.callFunction, option.isNotSort);
    }
    vesTools.prototype = tools;
    function DatePicker() {
        var self = this;
        var now = new Date();
        var getDateArray = function () {// Label =Value =selectedIndex+1 typeof Label,Value is String  typeof selectedIndex is number
            var count = new Date(self.yearModel.getSelectDataValue(), self.monthModel.getSelectDataValue(), 0).getDate();
            if (!!!count) {
                return;
            } else {
                var index = self.dayModel.selectedIndex();
                self.dayModel.itemsSource(tools.getDayList.memoized(count, false));
                while (index + 1 > count) {
                    index--;
                }
                self.dayModel.selectedIndex(index);
            }


        }
        this.dayModel = initSelectModel({ type: 'day' });
        this.monthModel = initSelectModel({ type: 'month' });
        this.yearModel = initSelectModel({ type: 'year' });
        this.monthModel.selectedIndex.subscribe(getDateArray, self);
        this.yearModel.selectedIndex.subscribe(getDateArray, self);
        // Tools function
        self.validation = ko.computed(function () {
            return self.yearModel.getSelectDataValue() != '' && self.monthModel.getSelectDataValue != '' && self.dayModel.getSelectDataValue() != '';
        });
        self.lateValidation = ko.computed(function () {
            if (self.validation() && self.selectedDate()) {
                return now.getTime() > self.selectedDate().getTime();
            }
        },self);
        self.dateStr = function (type) {
            if (!type) {
                return self.dayModel.getSelectDataFormatValue() + " " + self.monthModel.getSelectDataFormatValue() + "," + self.yearModel.getSelectDataFormatValue();
            }
        }
        self.selectedDate = ko.computed({
            read: function () {
                if (!self.validation()) { return; }
                return new Date(this.yearModel.getSelectDataValue(),
                     this.monthModel.getSelectDataValue()-1,
                     this.dayModel.getSelectDataValue());
            },
            write: function (date) {

                if (typeof date == "string" && date.match(/Date\(([-+]?\d+)([-+]?\d+)?\)/)) {
                    date = msf.dateParser.parseDateFromMSDateString(date);
                    self.yearModel.selectedIndex(now.getFullYear() - date.getFullYear());
                    self.monthModel.selectedIndex(date.getMonth());
                    getDateArray();
                    self.dayModel.selectedIndex(date.getDate() - 1);
                }
                else if (date instanceof Date && date.toString() != "Invalid Date") {
                    self.yearModel.selectedIndex(now.getFullYear() - date.getFullYear());
                    self.monthModel.selectedIndex(date.getMonth());
                    getDateArray();
                    self.dayModel.selectedIndex(date.getDate() - 1);
                }
                else {
                    self.dayModel.selectedIndex(-1);
                    self.monthModel.selectedIndex(-1);
                    self.yearModel.selectedIndex(-1);
                }
            }
        },self);
        self.age = ko.computed(function () {
            if (!self.validation()) { return; }
            if (now.getFullYear() == self.selectedDate().getFullYear() || now.getFullYear() > self.selectedDate().getFullYear() && now.getMonth() > self.selectedDate().getMonth() || now.getFullYear() > self.selectedDate().getFullYear() && now.getMonth() == self.selectedDate().getMonth() && now.getDate() >= self.selectedDate().getDate()) {
                return now.getFullYear() - self.selectedDate().getFullYear();
            } else {
                return now.getFullYear() - self.selectedDate().getFullYear() - 1;
            }
        });
        self.selectedYearMonth = ko.computed(function () {
            return new Date(this.yearModel.getSelectDataValue(),
                this.yearModel.getSelectDataValue()-1, 15);
        },self);
    }


    //widget
    function initStatusWidget() {//7.12 secondr

        $.widget("VES.status", {
            options: {
                value: 20,
                status: true,
                titleS: 'Successfully ',
                titleF: 'Failed'
            },
            _create: function () {
                var ele = this.element;
                this.elecache = {};
                var html = $.parseHTML('<div ></div><span class="text-size-aware" tabindex="0"></span><button class="afui-icon-close" aria-label="Close"></button>');
                var icon = $(html[0]);
                this.elecache.icon = icon;//cache jQuery Object icon
                this.options.status ?
                this.element.addClass("successPanel afui-panel-success") && icon.addClass("afui-icon-successful") :
                this.element.addClass("errorPanel afui-panel-error") && icon.addClass("afui-icon-error");
                ele.append(html);
                var title = $(html[1]);//title
                this.elecache.title = title;//cache jQuery Object title
                var button = $(html[2]);//button
                button.click(function () {
                    ele.hide();
                })
                ele.hide();
            },
            _init: function () {

                this.options.status ?
                this._setClass("successPanel afui-panel-success") && this._setClass("afui-icon-successful",this.elecache.icon) && this.elecache.title.text(this.options.titleS) :
                this._setClass("errorPanel afui-panel-error") &&this._setClass("afui-icon-error",this.elecache.icon)  && this.elecache.title.text(this.options.titleF);
            },
            yes: function () {
                this._setOption('status', true);
                this._init();
                this.show();
            },
            no: function () {
                this._setOption('status', false);
                this._init();
                this.show();
            },
            show: function () {
                this.element.show();
            },
            hide: function () {
                this.element.hide();
            },
            _setClass: function (str,ele) {
                if (!ele) {
                    this.element.get(0).className = str;
                  
                }
                else {
                    ele[0].className = str;
                   
                }
                return true;
            }

        });
    }
    function vesTools() {
        var self = this;
        this.initDatePickerAdvanceModel = function () { return new DatePicker(); };
        this.initStatusWidget = initStatusWidget;
      
    }
    return new vesTools();
    
});