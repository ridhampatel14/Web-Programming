/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      if(obj1 == undefined || obj2==undefined){throw 'you must pass two parameters';}
      if(typeof obj1!= 'object' || typeof obj2!= 'object' || Array.isArray(obj1) || Array.isArray(obj2)){throw 'the passed parameters are not object';}
      let deepEquality2 = (obj1,obj2) => {
            if(obj1 == undefined || obj2==undefined){throw 'you must pass two parameters';}
            if(obj1 === obj2){
                  return true;
            }
            if(JSON.stringify(obj1) === JSON.stringify(obj2)){
                  return true;
            }
            if(obj1,obj2,typeof obj1== 'object',typeof obj2== 'object'){
                  if(Object.keys(obj1).length == Object.keys(obj2).length && obj1 && obj2){
                  for(const key in obj1){
                        if(key in obj2){
                              if(deepEquality2(obj1[key],obj2[key])==false){
                              return false;
                              }
                        }else{
                              return false;
                        }
                  }
                  return true;
                  }
            }
            return false;
      }
      return deepEquality2(obj1,obj2);
};

let return_all_eles= (obj) => {
      result={}
       if(typeof obj!= 'object' || Array.isArray(obj)){
           return;
       }
      for (let index in obj) {
          result[index]=obj[index];
          result={
              ...result,
              ...return_all_eles(obj[index])
          }
      }
      return result;
  }
  

let commonKeysValues = (obj1, obj2) => {
      if(obj1 == undefined || obj2==undefined){throw 'you must pass two parameters';}
      if(typeof obj1!= 'object' || typeof obj2!= 'object' || Array.isArray(obj1) || Array.isArray(obj2)){throw 'the passed parameters are not object';}
      res1=return_all_eles(obj1);
      res2=return_all_eles(obj2);
      keys=[]
      for(let i in res1){
          if(i in res2){
              if(JSON.stringify(res1[i])==JSON.stringify(res2[i])){
                  keys.push(i);
              }
          }
      }
      result1={}
      keys.forEach(element => {
          //temp={}
          //temp[element]=res1[element];
          //console.log(temp);
          result1[element]=res1[element];
      });
      return result1;   
};

let calculateObject = (object, func) => {
      if(object == undefined || func==undefined){throw 'you must pass two parameters';}
      if(typeof func != 'function' || typeof object != 'object'){throw 'the passed parameter is not right';}
      if(Object.keys(object).length == 0){throw 'the object is empty'};
      for(i in object){
          if(typeof object[i] != 'number'){
              throw 'all the object values in not a number';
          }
      }
      for(i in object){
          object[i]=Number(Math.sqrt(func(object[i])).toFixed(2));
      }
      return object;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
}
