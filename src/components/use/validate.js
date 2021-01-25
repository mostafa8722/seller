export default function useValidate(target,kind){
    if(kind == 'regex'){
        let x =target.regex 
        return x.test(target.value)
    }
}