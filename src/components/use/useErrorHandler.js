import global from "../../state/global"
export default function (error,errorHandler) {
    console.log("err",error)
    if(error.message == 'Network Error' || error.message.includes('timeout')){
        global.alertToggle('خطا در برقراری ارتباط')
        errorHandler(true,error)
    }
    else if(error.response){
        if(error.response.status == 400){
        
            errorHandler(false,error)
        }
        else if(error.response.status == 500){
            
            errorHandler(true,error)
        }
        else if(error.response.status == 401){
            
            errorHandler(false,error)
        }
    }
    else{
        global.alertToggle('خطا در برقراری ارتباط')
    }
}