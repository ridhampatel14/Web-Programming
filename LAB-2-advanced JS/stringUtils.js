/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function check_pal(str){
      const middle_point=(parseInt(str.length)/2);
      for (let index = 0; index < middle_point; index++) {
        if(str[index]!=str[str.length-index-1]){
          return false;
        }
      }
      return true;  
}

let palindromes = (string) => {
      if (string == undefined) {throw 'no parameters passed';}
      if(typeof string != 'string'){throw 'the passed parameter is not string';}
      if(string.trim().length == 0){throw 'you passed an empty string';}
      result=[]
      let f_string=string.replace(/[!&\/\\#,-=_^@~`/;|+()$~%.'":*?<>{}]/g,'').toLowerCase();
      splited_str_arr=f_string.split(' ');
      splited_str_arr.forEach(element => {
        if(check_pal(element)==true){
          result.push(element);
        }
      });
      return result;
};

let replaceChar = (string) => {
      if (string == undefined) {throw 'no parameters passed';}
      if(typeof string != 'string'){throw 'the passed parameter is not string';}
      if(string.trim().length == 0){throw 'you passed an empty string';}
      str_arr=Array.from(string);
      let str_flag=true;
      for (const i in str_arr){
        if(i%2!==0){
          if(str_flag==true){
            str_arr[i]='*'
            str_flag=false
          }
          else{
            str_arr[i]='$'
            str_flag=true
          }
        }
      }
      f_str=str_arr.join('');
      return f_str;
};

let charSwap = (string1, string2) => {
      if (string1 == undefined|| string2==undefined) {throw 'you must pass 2 parameters';}
      if(typeof string1!= 'string'||typeof string2!= 'string'){throw 'the passed parameters are not string';}
      if(string1.trim().length ==0 || string2.trim().length ==0){throw 'any of the string is empty';}
      if(string1.length < 4 || string2.length < 4){throw 'both string must be of minimum length 4';}
      str1_arr=Array.from(string1);
      str2_arr=Array.from(string2);
      for (let index = 0; index < 4; index++) {
        temp=str1_arr[index];
        str1_arr[index]=str2_arr[index];
        str2_arr[index]=temp;
      }
      f_str1=str1_arr.join('');
      f_str2=str2_arr.join('');
      return f_str1+' '+f_str2;
};


module.exports = {
      palindromes,
      replaceChar,
      charSwap
}
