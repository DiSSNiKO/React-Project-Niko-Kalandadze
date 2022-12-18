function objectToString(object){
    let str = '';
    Object.values(object).forEach((value)=>{
        str+=value.toString();
    });
    return str;
}
export default objectToString;