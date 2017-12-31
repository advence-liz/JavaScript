import fetch from "./fetchWarp";
//import fetchMok,{Mock} from "./fetchMockWarp";
const fetchMock = require("fetch-mock");
fetchMock.mock("http://www.baidu.com",{liz:1});
fetchMock.spy();
//fetch("http://www.baidu.com");
// fetch("http://www.baid",function(){
//     debugger;
// });
//fetchMock.restore();
fetch("http://cn.bing.com/")