// JavaScript source code
window.liz = null;
window.liz = new Object;
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
    //两种调用方式
    //var template1 = "我是{0}，今年{1}了";
    //var template2 = "我是{name}，今年{age}了";
    //var result1 = template1.format("loogn", 22);
    //var result2 = template2.format({ name: "loogn", age: 22 });

};
///
(function (liz) {
    liz.List = List;
    liz.type = function is(obj, type) {
        if (type) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas.toLowerCase() === type.toLowerCase();
        }
        else {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return clas.toLocaleLowerCase();
        }
    }

    liz.print = function (arg) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        document.writeln(arg+'<br/>');
    }

    liz.decompile = function (str) {
        var functionStr = "return"+" " + str;
        var tmpFunction = Function(functionStr);
        return tmpFunction();
    }
// List
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
        this.clear = clear;
        this.find = find;
        this.toString = toString;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.getElement = getElement;
        this.length = length;
    }

    function append(element) {
        this.dataStore[this.listSize++] = element;
    }

    function find(element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return i;
            }
        }
        return -1;
    }

    function remove(element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    }

    function toString() {
        return this.dataStore;
    }

    //no

    function clear() {
        delete this.dataStore;
        this.dataStore.length = 0;
        this.listSize = this.pos = 0;
    }

    function insert(element, after) {
        var insertPos = this.find(after);
        if(insertPos>-1){
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    };
    function front() { }
    function end() { };
    function prev() { };
    function next() { };
    function length() {
        return this.listSize;
    };
    function currPos() { };
    function monveTo() { };
    function getElement() { };


})(window.liz);
//

(function (liz) {
    liz.Stack = Stack;
    function Stack() {
        this.dataStore = [];
        this.top = 0;
        this.push = push;
        this.pop = pop;
        this.peek = peek;
        this.length = length;
        this.clear = clear;
    }
   
    function push(ele) {
        this.dataStore[this.top++] = ele;
    }
    function pop() {
        return this.dataStore[--this.top];
    }
    function peek() {
        return this.dataStore[this.top - 1];
    }
    function length() {
        return this.top;
    }
    function clear() {
        this.top = 0;
    }
})(window.liz);

with (window.liz) {
    var names = new List();
    names.append("Cynthia");
    names.append("Raymond");
    names.append("Barbara");
    print(names.toString());
    names.remove("Raymond");
    print(names.toString());

}
