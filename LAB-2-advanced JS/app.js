/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

const arrayU=require('./arrayUtils');
const stringU=require('./stringUtils');
const objectU=require('./objectUtils');

//this is 1st of arrayUtils****************************************


try{
    console.log(arrayU.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20])); 
    // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
}catch(e){
    console.log(e)
}

try{
    console.log(arrayU.arrayStats([]) ) ;// throws an error 
}catch(e){
    console.log(e)
}


//this is 2nd of arrayUtils***********************************************

  try{
    console.log(arrayU.makeObjects(["foo", "bar"], [5, "John"]))// returns {foo:'bar', '5': "John"}
  }catch(e){
    console.log(e)
  }
  
  try{
    console.log(arrayU.makeObjects([1,2,3],4))
     // throws error
  }catch(e){
    console.log(e)
  }
  


//this is 3rd of arrayUtils********************************************************

const arr1 = [5, 7]; 
const arr2 = [20, 5]; 
const arr3 = [true, 5, 'Patrick']; 
const arr4 = ["CS-546", 'Patrick']; 
const arr5 = [67.7, 'Patrick', true]; 
const arr6 = [true, 5, 'Patrick']; 
const arr7 = [undefined, 5, 'Patrick']; 
const arr8 = [null, undefined, true];
const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
const arr10= [["foo", "bar"], true, "String", 10]
  
  try{
    console.log(arrayU.commonElements(arr3,arr4,arr5)); // returns ['Patrick']
  }catch(e){
    console.log(e);
  }
    
  try{
    console.log(arrayU.commonElements([1,2,"nope"])); // throws error
  }catch(e){
    console.log(e)
  }
  
//this is 1st of stringUtils***********************************************************

  try{
    console.log(stringU.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake")); // Returns: ["mom", "noon", "kayak"]
  }catch(e){
     console.log(e)
  }
  
  
  try{
    console.log(stringU.palindromes("    ")); //  throws error
  }catch(e){
     console.log(e)
  }
  

//this is 2nd of stringUtils*****************************************************8


  
  try{
    console.log(stringU.replaceChar("Hello, How are you? I hope you are well")); // Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
  }catch(e){
     console.log(e)
  }
  
  try{
    console.log(stringU.replaceChar(123)); //throws error
  }catch(e){
     console.log(e)
  }
  

//this is 3rd stringUtills************************************************************



  try{
    console.log(stringU.charSwap("Patrick", "Hill")); //Returns "Hillick Patr"
  }catch(e){
     console.log(e)
  }
  
  
  try{
    console.log(stringU.charSwap("Patrick", "")); //Throws error
  }catch(e){
     console.log(e)
  }
  
  
//this is 1st in object utils*********************************************************

const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try{
  console.log(objectU.deepEquality(forth, fifth)); // true
}catch(e){
  console.log(e);
}

try{
  console.log(objectU.deepEquality(first, second)); // false
}catch(e){
  console.log(e);
}



//this is 2nd in object utils************************************************
const first1 = {name: {first: "Patrick", last: "Hill"}, age: 46};
const second1 = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third1 = {a: 2, b: {c: true, d: false}};
const forth1 = {b: {c: true, d: false}, foo: "bar"};

try{
  console.log(objectU.commonKeysValues(first1, second1)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
}catch(e){
   console.log(e);
}

try{
  console.log(objectU.commonKeysValues([1,2,3], [1,2,3])); // throws error 
}catch(e){
   console.log(e);
} 


//this is 3rd in object utils************************************************

try{
  console.log(objectU.calculateObject({ a: 3, b: 7, c: 5 },n => n * 2));
  // Returns: {a: 2.45, b: 3.74, c: 3.16}

}catch(e){
  console.log(e);
}


 try{
   console.log(objectU.calculateObject({}, n => n * 2));
 }catch(e){
   console.log(e);
 }



  
  
  
  

  
  
  
  
  
  


