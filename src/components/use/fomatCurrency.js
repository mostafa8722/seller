const currencyFormatter = (theString) => {
    let result = ""
    if(theString.length <= 3){
        result = theString
    }
    else if(theString.length >= 4){
        let temp = [...theString]
        for (let index = 0; index < temp.length; index++) {
            if((index) % 3 == 0 && index != 0){
                result =  temp[temp.length - index -1] + ',' + result
            }
            else{
                result =  temp[temp.length - index -1] + result
            }
        }
    }
    return result
}

export default currencyFormatter