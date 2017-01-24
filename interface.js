// JavaScript source code
+function(liz){
var decompile = function (str) {
    var functionStr = str;
    var tmpFunction = Function(functionStr);
    return tmpFunction;
}

liz.interface=function interface(name, methods) {
    if (!interface.interfaces) {//缓存interface 定义
        interface.interfaces = [];
    }
    else if (interface.interfaces[name]) {//如果已经定义过直接返回
        return interface.interfaces[name]
    } 
    
//dsdsd
    if (!methods) {
        throw new Error("methods does not define");
    }
    function instance() {

    }

    for (var i=0, max = methods.length; i < max; i++) {//在要返回的inastce 中添加interface 中定义的method
        var consturctStr, funName = methods[i];
        if (typeof (funName) == "string") {
            consturctStr = "throw new Error('" + methods[i] + "must override')";
            instance.prototype[funName] = decompile(consturctStr);
        }
    }
    var result = new instance();
   
    interface.interfaces.push(result);
    return result;


}

}(window.liz);
//child inherit  interface person
liz.interface('person',['say','run']);
function Child(){
this.say=function(){};
this.run=function(){};
}
child.prototype=liz.interface['person'];
var child=new Child;
