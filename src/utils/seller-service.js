import axios from 'axios'
import {API_BASE_URL} from './constants'
import useErrorHandler from '../components/use/useErrorHandler'
import {computed, watch} from '@vue/composition-api'
import $ from 'jquery'

const service = (requireAuth) => {
    const apiBaseUrl = API_BASE_URL
    const match = computed(()=>{
      return document.cookie.match(new RegExp('(^| )' + 'Golpino_seller' + '=([^;]+)'));
    })
    const cookieFinder = () =>
              {           
                if (match.value) {
                 return match.value[2]
                }
                else{
                    return 'no-auth'
                }
            }

    let headers = {
      common:{
        "Accept":'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
          
          // "Access-Control-Allow-Origin": '*',
          // "accept-language":'en',
          // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin",
          // "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
          // 'Content-Type': 'application/x-www-form-urlencoded'
          // 'X-PINGOTHER':'pingpong',
          

      }
      
    if(requireAuth){
        const cookie = computed(()=>{
          return cookieFinder()
        })
        headers.Authorization = "Bearer " + cookie.value
    }
    let myService = axios.create({
        baseURL: apiBaseUrl,
        headers: headers,
        // withCredentials: false,
      })
      
      myService.interceptors.request.use(request => {
        if(request.data && request.data.get){
          if(request.data.get('mobile')){
            let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
            let arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
            let fixNumbers = function (str)
            {
              if(typeof str === 'string')
              {
                for(var i=0; i<10; i++)
                {
                  str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
              }
              return str;
            };
            let fixed = fixNumbers(request.data.get('mobile')+"")
            request.data.set('mobile',fixed)
          }
        }
        return request
      })
      // myService.defaults.timeout = 5000
    
      // myService.interceptors.response.use(handleSuccess);

      // const handleSuccess = (response) => {
      //   console.log("THIS IS THE RESPONSE" , response)
      //   return response;
      // }      
      
      
      myService.receive = (path, data , mySuccess ,myError) => {

        return myService.get(path , data).then(
          (response) => mySuccess(response.status, response.data)
        ).catch((e)=> useErrorHandler(e,myError))
      }

      myService.transmit = (path, payload, mySuccess ,myError) => {
        return myService.post(path , payload).then((response) => mySuccess(response.status, response.data))
        .catch((e) => useErrorHandler(e,myError))
      }
      
      myService.remove = (path , payload , mySuccess ,myError) => {
        return myService.delete(path).then((response) => mySuccess(response.status, response.data))
        .catch((e)=> useErrorHandler(e,myError))
      }

      myService.update = (path , payload , mySuccess ,myError) => {
          return myService.patch(path , payload ).then((response) => mySuccess(response.status, response.data))
          .catch((e)=> useErrorHandler(e,myError))
      }

      return myService;

}

export default service
// "Content-Type": "application/json",

        // Accept: "*/*",
        // 'Content-Type': '*/*',
      //   'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      // 'Access-Control-Request-Headers': 'content-type',
      // 'crossDomain': true,
      // 'X-Requested-With':'XMLHttpRequest'
        // // 'Access-Control-Allow-Credentials':true,
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Methods':'POST,GET',
        // 'Access-Control-Allow-Headers':'X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization, Application, Accept'


        // https://github.com/axios/axios/issues/891#issuecomment-340760222