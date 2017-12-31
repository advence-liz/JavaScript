//import fetch from "./fetchWarp";
import fetchMock from'fetch-mock';
  const  Mock = require('mockjs');



function FetchMock(matcher,response) {
    fetchMock.mock(matcher, response)
}
fetchMock.catch(function(e){
  console.error(`unhandle uri ${e}`)
   /// fetchMock.spy(e)
 
})

export {Mock,FetchMock as default}