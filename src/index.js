import {BasePublisher,BaseSubscriber} from './observe';

class NewsSubscriber extends BaseSubscriber {
    constructor(fn,context){
        super(fn,context);
        this.topic = 'news';
    }
    toString(){
        super.toString();
        console.log('News');
    }
}

const map = new Map();
var publisher = new BasePublisher();
var subscribe = new NewsSubscriber( function () { console.log(this.liz); }, { liz: 'liz' });
subscribe.toString();
var subscribe1 = new NewsSubscriber( function () { console.log(this.liz); }, { liz: 'liz1' });
var handle= publisher.subscribe(subscribe);
publisher.subscribe(subscribe1);
console.log('通过 handle 触发单个 subscribe');
publisher.publish(handle);
console.log("通过 topic 触发一组 subscribe");
publisher.publish('news');
console.log('同 handle unsubscribe 指定 subscribe 然后触发一组');
publisher.unsubscribe(handle);
publisher.publish('news');