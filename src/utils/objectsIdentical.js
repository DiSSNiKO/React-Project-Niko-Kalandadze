function objectsIdentical(object1, object2){
    let identical = true;
    Object.keys(object1).forEach(key => {
        if(object1[key]!=object2[key]){
            identical = false;
        }
    });
    return identical;
}
export default objectsIdentical;