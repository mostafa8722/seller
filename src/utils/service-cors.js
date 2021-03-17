import axios from 'axios'
import {API_BASE_URL} from './constants'
import useErrorHandler from '../components/use/useErrorHandler'
import {computed, watch} from '@vue/composition-api'
import $ from 'jquery'

const service = (requireAuth) => {
    const apiBaseUrl = API_BASE_URL
    const match = computed(()=>{
      return document.cookie.match(new RegExp('(^| )' + 'Golpino_token' + '=([^;]+)'));
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
        },
      }
    if(requireAuth){
        const cookie = computed(()=>{
          return cookieFinder()
        })
        headers.Authorization = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMzViNzM3ODNjZGQ3NGFlN2UzNDdhZWI0ODg3MjMxOGM3N2IyYmYyMzY4YTEwZjY5YzZjNjBhYTMxMjgzZjg0NThmYzM4NGYzMzc5NDkxOTIiLCJpYXQiOiIxNjE1Mzc0OTkxLjc0ODA5MyIsIm5iZiI6IjE2MTUzNzQ5OTEuNzQ4MDk4IiwiZXhwIjoiMTY0NjkxMDk5MS43MzM3NDciLCJzdWIiOiI2MiIsInNjb3BlcyI6W119.jVXbm2QMJHrm9oHwH6uKY-pgOdf5Tfm330bh4whsWS-2-coQxAMGJcVRJiQjVJiRFFXmKbiDZRKTZApjgf3bquRyr0WZ9jLNK44FuqMBD-FSFR-I_7BhBgDEFoPiPBcsC6SAbQF9eDdl83f1-GnC2NP-lq1FI7JMkzGxPTfHYrCVDWAYAXBCEhHjBsyvze9V_D2LURcANShSyg-p-lRCOpz4h7zAERNl6urn8BF8jqWvQsAuQFXtIkDVJpxDGioXmFQ0M5vd0N-wVi4H1wIvGV-IB-0uAbdNbXEhUsz5bGIIEzkarr2l9Qid4e6iYqzUDMQKWtf7gLspzE6_EZyZbTUlqWEtAO1opSk9b3W3m_iPn25vfR3NzVUlPT_fmSY-K1yuqc2Ten08-qBA56bvHRmZpCbaUmezK758hBO2e8AI-gmpZkFHOrg0CNubAtRpLoLhmXruLh4mD2kj3K5XB-Q-7ZXl2qPzDfmLX6HZlVA-JUjI8D93ftZjc-OT4ROtZrcCmtxSctdsYPFYrTMdO59vw9FVYdZsZda4et8FXZu7-A71ETosIBTX0l7xXP959ESDJ99kafEshxdcAESrbxLPcmxI64vYpx7x58NlT4y5_9qLg94olbGr1WWe6eCv3SiWPPyqgNgYs9c_PqgPgKPMcgjK5kKMw_GkQ3mNyVU"
    }
    let myService = axios.create({
        headers: headers,
        baseURL:'https://gol.aminabedi.com/api/'
      })
      
      
      myService.interceptors.request.use(request => {
        console.log({request})
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

      myService.receive = (path, data , mySuccess ,myError) => {
        return myService.get(path ,data).then(
          (response) => mySuccess(response.status, response.data)
        ).catch((e)=> useErrorHandler(e,myError))
      }

      myService.transmit = (path, payload, mySuccess ,myError) => {
        return myService.post(path ,payload).then((response) => mySuccess(response.status, response.data))
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
