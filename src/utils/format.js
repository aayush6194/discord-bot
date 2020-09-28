const format = (str) =>  {
    if(!str)"";
    return  str.trim().toLowerCase();
}
const removeStr = (str, toRemoves ) => {
    for(let i = 0; i < toRemoves.length; i++){
        str =  str.replace(toRemoves[i], '')
    }   
    return str
}

const includes = (str, strs ) =>  strs.reduce((acc, curr)=> str.includes(curr) || acc, false)


module.exports = {
    removeStr,
    format, 
    includes
}