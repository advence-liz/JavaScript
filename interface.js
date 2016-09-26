// JavaScript source code
var decompile = function (str) {
    var functionStr = str;
    var tmpFunction = Function(functionStr);
    return tmpFunction;
}

function interface(name, methods) {
    if (!interface.interfaces) {
        interface.interfaces = [];
    }
    else if (interface.interfaces[name]) {
        return interface.interfaces[name]
    } 
    
//dsdsd
    if (!methods) {
        throw new Error("methods does not define");
    }
    function instance() {

    }

    for (var i=0, max = methods.length; i < max; i++) {
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
