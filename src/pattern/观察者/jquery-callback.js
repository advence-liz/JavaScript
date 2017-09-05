class Callback{
/**
 * es6 类的实例属性和静态属性都没定义，只有静态方法
 * 进而也无法生成私有属性
 */
//    prop: 2
//    static prop: 2  

   constructor(){
       this.CallbackList=[];
   }
    fire (){

    }
    add (){

    }
    remove (){

    }
    static showVersion (){

    }
}

var topics = {};
 
jQuery.Topic = function( id ) {
  var callbacks, method,
    topic = id && topics[ id ];
 
  if ( !topic ) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if ( id ) {
      topics[ id ] = topic;
    }
  }
  return topic;
};
// Subscribers
$.Topic( "mailArrived" ).subscribe( fn1 );
$.Topic( "mailArrived" ).subscribe( fn2 );
$.Topic( "mailSent" ).subscribe( fn1 );
 
// Publisher
$.Topic( "mailArrived" ).publish( "hello world!" );
$.Topic( "mailSent" ).publish( "woo! mail!" );
 
// Here, "hello world!" gets pushed to fn1 and fn2
// when the "mailArrived" notification is published
// with "woo! mail!" also being pushed to fn1 when
// the "mailSent" notification is published.
 
/*
output:
hello world!
fn2 says: hello world!
woo! mail!
*/