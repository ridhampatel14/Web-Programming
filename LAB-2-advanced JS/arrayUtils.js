/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function check_for_numbers(arr) {
  return arr.every(element => {
    return typeof element === 'number';
  });
}

function sort_arr(array){
  sorted=array.sort(function(a, b){return a - b});
  return sorted;
}

function find_median(array){
  len=array.length;
  if(len%2==0){
    return (array[len / 2 - 1] + array[len / 2]) / 2;
  }
  return array[(len - 1) / 2];
}

function find_mode(array){
  max_occ=0
  mode_obj={}
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(mode_obj[element]){
      mode_obj[element]++;
    }else{
      mode_obj[element]=1
    }
    if(max_occ < mode_obj[element]){
      max_occ=mode_obj[element]
    }
  }
  if(max_occ==1){
    return 0;
  }
  var key = Object.keys(mode_obj).filter(function(key) {return mode_obj[key] === max_occ});
  var final_output=[];
  key.forEach( element => final_output.push(parseInt(element)));
  if(final_output.length==1){
    return final_output[0]
  }
  return final_output;
}

function common_in_two(array1,array2){
  result=[];
  for (let index = 0; index < array1.length; index++) {
    array2.forEach((Element) => {
      // if(Element.toString() == array1[index].toString()){
      //   result.push(array1[index]);
      // }
      if(String(Element) == String(array1[index])){
        result.push(array1[index]);
      }
    });
  };
  return result;
}

let arrayStats = (array) => {
  if (array == undefined) {throw 'no parameters passed';}
  if(Array.isArray(array)==false){throw 'the passed parameter is not array'}
  if(array.length==0){throw 'array length is 0'}
  if(check_for_numbers(array) == false ){throw 'all array elements are not number'}
  f_arr=sort_arr(array);
  count=f_arr.length;
  sum = f_arr.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  result={
    'mean':Number((sum/count).toFixed(1)),"median":find_median(f_arr),"mode":find_mode(f_arr),"range":(f_arr[count-1]-f_arr[0]),"minimum":f_arr[0],'maximum':f_arr[count-1],"count":count,"sum": Number(sum.toFixed(1)),  
  }
  return result;
  
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  f_obj={};
  if (arrays.length==0) {throw 'no parameters passed';}
  for (let index = 0; index < arrays.length; index++) {
    if(Array.isArray(arrays[index])==false){throw 'the passed parameters are not array'}
  }
  for (let index = 0; index < arrays.length; index++) {
    if(arrays[index].length!=2){throw 'there must be 2 parameters only in each array'}
  }
  for (let index = 0; index < arrays.length; index++) {
    f_obj[arrays[index][0]]=arrays[index][1];
  }
  return f_obj
};

let commonElements = (...arrays) => {
    //this function takes in a variable number of arrays that's what the ...arrays signifies
    if (arrays.length==0) {throw 'no parameters passed';}
    for (let index = 0; index < arrays.length; index++) {
      if(Array.isArray(arrays[index])==false){throw 'the passed parameters are not array'}
    }
    if (arrays.length<2) {throw 'you must pass atleast 2 arrays';}
    for (let index = 0; index < arrays.length; index++) {
      if(arrays[index].length<=0){throw 'you cant pass empty array'}
    }
    f_result=arrays[0];
    for (let index = 1; index < arrays.length; index++) {
      f_result=common_in_two(f_result,arrays[index]);
    }
    return f_result;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
}