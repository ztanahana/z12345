// Creates an array of elements split into groups the length of size. 
// If array can't be split evenly, the final chunk will be the remaining elements.
function chunk(arr, size = 1) {
    let result = [];
    let tmpArr = [];
    let indx = 0;
    let indxS = 0;
    for (let i = 0; i < arr.length; i++) {
        tmpArr[indx] = arr[i];
        indx += 1;
        if ( ( i + 1) % size === 0 ) {
            result[indxS] = tmpArr;
            indxS += 1;
            tmpArr = [];             
            indx = 0;
        }
    } 
    if (tmpArr.length !== 0) {
        result[indxS] = tmpArr;
    }    

    return result;
}

// Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
function compact(arr) {
    let result = [];
    let indx = 0;
    for (let i = 0; i < arr.length; i++) {
        if (Boolean(arr[i]) === true) {
            result[indx] = arr[i];
            indx += 1;
        }
    } 
    
    return result;
}

// Creates a slice of array with n elements dropped from the beginning.
function drop(arr, position = 1) {
    let result = [];
    let indx = 0;
    for (let i = 0; i < arr.length; i++) {
        if (( i + 1 ) > position) {
            result[indx] = arr[i];
            indx += 1;
        }
    } 
    
    return result;
}

// Creates a slice of array excluding elements dropped from the beginning. 
// Elements are dropped until predicate returns falsey. The predicate is 
// invoked with three arguments: (value, index, array).
function dropWhile(arr, predicate) {
    let result = [];
    let indx = 0;
    let indxI = 0;

    if (typeof(predicate)!='function'){
        throw new Error("Predicate is not a function");
    }

    for (let i = 0; i < arr.length; ++i){
        if (!predicate(arr[i], i, arr)){
            indxI = i;
            break;
        }
    }

    for (let j = indxI; j < arr.length; j++){
        result[indx] = arr[j];
        indx += 1;
    }
    
    return result;   
}

// Creates a slice of array with n elements taken from the beginning.
function take(arr, position = 1) {
    let result = [];
    let indx = 0;
    for (let i = 0; i < arr.length; i++) {
        if ( i < position) {
            result[indx] = arr[i];
            indx += 1;
        }
    } 
    
    return result;
}

// Iterates over elements of collection, returning an array of all elements 
// predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
function filter(arr, predicate) {
    let result = [];
    let indx = 0;

    if (typeof(predicate)!='function'){
        throw new Error("Predicate is not a function");
    }

    for (let i = 0; i < arr.length; ++i)
    if (predicate(arr[i], i, arr)){
        result[indx] = arr[i];
        indx += 1;
    }
 
  return result;   
}

// Iterates over elements of collection, returning the first element 
// predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
function find(arr, predicate, fromIndex = 0) {
    let result = [];

    if (typeof(predicate)!='function'){
        throw new Error("Predicate is not a function");
    }

    for (let i = fromIndex; i < arr.length; ++i)
    if (predicate(arr[i], i, arr)){
        result[0] = arr[i];
        break;
    }
 
  return result;   
}

// Checks if value is in collection. If collection is a string, 
// it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons. 
// If fromIndex is negative, it's used as the offset from the end of collection.
function includes(collection, value, fromIndex = 0){
 
    let zfromIndex = 0;
    let result =[];

    if (fromIndex < 0){
        zfromIndex = collection.length - fromIndex;
    } else zfromIndex = fromIndex;

    switch(typeof(collection)){
        case 'object':
            if (collection[0] !== undefined){
                result = drop(collection, zfromIndex);
            } else {
                result = collection;
            }    
            
            for (key in result) {
                if ( result[key] === value) {
                    return true;
                }
            }            
            return false;

        case 'string':
            if (collection.indexOf(value, zfromIndex) < 0) {
                return false;
            }   
            return true; 
    }
       
}

//Creates an array of values by running each element in collection thru iteratee. 
// The iteratee is invoked with three arguments: (value, index|key, collection). 
function map(collection, iterateFunc){
    let result = [];

    for (key in collection) {
        result[key] = iterateFunc(collection[key]);
    }      
    return result;
}

// Creates an array of grouped elements, the first of which contains the first elements 
// of the given arrays, the second of which contains the second elements of the given arrays, and so on.
function zip(){
    let result = [];
    let maxLen = 0;

    for (let k = 0; k < arguments.length; k++){
        if (maxLen < arguments[k].length){
            maxLen = arguments[k].length;
        }
    }

    for (let k = 0; k < maxLen; k++) {
        result[k] = new Array(arguments.length);
    }
        
    for (let j = 0; j < maxLen; j++){
        for (let i = 0; i < arguments.length; i++){
            let arg = [];
            arg = arguments[i];
            result[j][i] = arg[j];
        }
    }
    
    return result;
}

//------------------------------------------------------------------------------------
// This method is like _.assign except that it recursively merges own and inherited 
// enumerable string keyed properties of source objects into the destination object. 
// Source properties that resolve to undefined are skipped if a destination value exists. 
// Array and plain object properties are merged recursively. Other objects and value types 
// are overridden by assignment. Source objects are applied from left to right. Subsequent 
// sources overwrite property assignments of previous sources.
function isObject(item){
    return (item && typeof(item) === 'object' && !(item instanceof Array));
}
function merge(obj, source){
    for (let i = 1; i < arguments.length; i++){

        if (isObject(arguments[i]) && isObject(obj)) {

            for (keys in arguments[i]){
                let args = arguments[i];    
            if (isObject(args[keys])) {
               if (!(keys in obj)){
                    obj[keys] = args[keys];
                }
                else{
                obj[keys] = merge(obj[keys], args[keys]);}

            } else {
                    for (key in obj[keys]){
                        obj[keys][key] = {...obj[keys][key], ...args[keys][key]};
                    }
                    if (!(keys in obj)){
                        obj[keys] = args[keys];
                    }    
            }
            }

        }

    }
    return obj;
}

// This method creates an object composed of the own and 
// inherited enumerable property paths of object that are not omitted.
function omit(obj, path){
    let resObj = {};
    
    for (keys in obj){
        let found = false;
        for(let i = 0; i < path.length; i++){
            if (path[i] === keys){
               found = true; 
               break;
            }
        }
        if (found === false){
            resObj[keys] = obj[keys];
        } else{
            found === false;
        }
    }

    return resObj;
}

// This method creates an object composed of the own 
// and inherited enumerable string keyed properties of object that predicate doesn't 
// return truthy for. The predicate is invoked with two arguments: (value, key).
function omitBy(obj, predicate){
    let resObj = {};
    
    for (keys in obj){
        if (!predicate(obj[keys], keys)){
            resObj[keys] = obj[keys];
        }
    }

    return resObj;
}

// Creates an object composed of the picked object properties.
function pick(obj, pattern){
    let resObj = {};
    
    for (keys in obj){
        for(let i = 0; i < pattern.length; i++){
            if (pattern[i] === keys){
                resObj[keys] = obj[keys];
                break;
            }
        }
    }
    return resObj;
}

// Creates an object composed of the object properties predicate returns truthy for. 
//The predicate is invoked with two arguments: (value, key).
function pickBy(obj, predicate){
    let resObj = {};
    
    for (keys in obj){
        if (predicate(obj[keys], keys)){
            resObj[keys] = obj[keys];
        }
    }
    return resObj;
}

// Creates an array of own enumerable string keyed-value pairs for object which 
// can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
function toPairs(obj){
    let result = [];
    let indx = 0;
    
    for (key in obj){
       if (hasOwnProperty(obj, key)){    
            let resultMid = [];
            resultMid[0] = key;
            resultMid[1] = obj[key];
            result[indx] = resultMid;
            indx++;
        }         
    }

    return result;
}

function hasOwnProperty(obj, prop) {
    let proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
}
