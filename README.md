# Mock
测试 mock
## tip
- 利于同构，isomorphic-fetch 是对 whatwg-fetch和node-fetch的一种封装，你一份代码就可以在两种环境下跑起来了
- whatwg-fetch  github 上工程就叫 fetch  npm 上叫 whatwg-fetch  莫非名字被占用了囧（实地验证了一下果然是这个原因）
  超文本应用技术工作组(Web Hypertext Application Technology Working Group) whatwg 竟然是这个意思
## snippets
```Setting up your mock
The commonest use case is fetchMock.mock(matcher, response), where matcher is a string or regex to match and response is a statusCode, string or object literal. You can also use fetchMock.once(url ...) to limit to a single call or fetchMock.get(), fetchMock.post() etc. to limit to a method. All these methods are chainable so you can easily define several mocks in a single test.

Analysing calls to your mock
fetchMock.called(matcher) reports if any calls matched your mock (or leave matcher out if you just want to check fetch was called at all). fetchMock.lastCall(), fetchMock.lastUrl() or fetchMock.lastOptions() give you access to the parameters last passed in to fetch. fetchMock.done() will tell you if fetch was called the expected number of times.

Tearing down your mock
fetchMock.reset() resets the call history. fetchMock.restore() will also restore fetch() to its native implementation
``
- fetch
```js
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
   
  function parseJSON(response) {
    return response.json()
  }
   
  fetch('/users')
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      console.log('request succeeded with JSON response', data)
    }).catch(function(error) {
      console.log('request failed', error)
    })
```
    
## REF
- <a href="https://jex.im/regulex/#!embed=false&flags=&re=%5E(a%7Cb)*%3F%24">正则</a>
- [fetch-mock](https://github.com/wheresrhys/fetch-mock)
- [Mock](https://github.com/nuysoft/Mock)
- [nock](https://github.com/node-nock/nock)
- [whatwg-fetch源码分析](http://www.cnblogs.com/cloud-/p/7305857.html)


