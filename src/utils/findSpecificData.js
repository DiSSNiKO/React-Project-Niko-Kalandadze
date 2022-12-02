function findSpecificData(array) {
    for (const nestedarray of array) {
        if (nestedarray[0] === window.location.pathname.slice(9)) {
            return nestedarray[1];
        }
    }
}
export default findSpecificData;