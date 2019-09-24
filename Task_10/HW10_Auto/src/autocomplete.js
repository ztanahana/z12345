exports.createAutoComplete =
function(arr) {
  
  function createFunc(name){
    let retArr = [];
    if (name != undefined && name != '') {	
      let newName = name.toLowerCase();
      for (var i = 0; i < arr.length; i++) {
        let newArrIt = arr[i];
        newArrIt = newArrIt.toString();
        newArrIt = newArrIt.toLowerCase();
      
        let indA = newArrIt.indexOf(newName);
        if (indA === 0) {
         retArr.push(arr[i]);
        }
 
      }
    }
    return retArr; // array
  }	

  return createFunc; // func
}
