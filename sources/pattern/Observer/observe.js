"use strict"
class Handle {
    constructor(topic, uuid) {
        this.topic = topic;
        this.uuid = uuid;
    }
}

class BasePublisher {
    constructor() {
        this.topics = {};
        //this.uuid = -1;
    }
    subscribe(subscribe) {
        /**
         * @var {String} subscribes 当前subscribe topic 容器数组
         */
        let subscribes;
        if (!this.topics[subscribe.topic]) {
            this.topics[subscribe.topic] = [];
            this.topics[subscribe.topic].uuid = -1;
        }
        subscribes = this.topics[subscribe.topic];
        subscribes.push(subscribe);
        subscribes.uuid++;

        return new Handle(subscribe.topic, subscribes.uuid);

    }
    /**
     *  取消订阅 
     * @param {Handle} handle 取消订阅句柄
     */
    unsubscribe(handle) {
       let subscribes = this.topics[handle.topic];
       subscribes.splice(handle.uuid,1);
    }
    /**
     * 获取我可以传一个 handle 触发特定 topic 下特定 subscribe
     * @param {String|Handle} topic topic
     * @desc 允许传一些其他自定义参数呢感觉不需要
     */
    publish(topic) {
        let subscribes, subscribe;
        if (topic.constructor === String) {
            subscribes = this.topics[topic];
            subscribes.every(function (subscribe) {
                console.assert(subscribe.topic,'subscribe.topic can not be null',[subscribe.subscribe])
                subscribe.exec();
                // setTimeout(function(){
                //     subscribe.exec();
                // })
                return true;//只是想把所有的subscribe exec 跑一遍 故 return true
            })
        } else {

            subscribe = this.topics[topic.topic][topic.uuid];
            subscribe.exec();
        }

    }
}




class BaseSubscriber {
    /**
     * 或许topic 通过继承基类的方式，一个子类一个更面向对象
     * @param {*} fn fn
     * @param {*} context context
     * @param {String} topic topic
     */
    constructor(fn, context,topic) {
        this.fn = fn;
        this.context = context;
        this.topic = topic;
    }
    exec() {
        this.fn.call(this.context);
    }
    toString(){
        console.log('base class of Subscriber');
    }
}

export { BasePublisher,BaseSubscriber};