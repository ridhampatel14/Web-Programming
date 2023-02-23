//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const {ObjectId} = require('mongodb');
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const re_for_specialcharacter_and_number=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

function checkId(id, varName){
    if (!id) throw 'You must provide a ID';
    if (typeof id !== 'string') throw 'ID must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'ID cannot be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    return id;
}

function checkMovieTitle(title){
    title=title.trim();
    if(title.trim().length<2) throw 'title must be at least two characters ';
    if(re_for_specialcharacter.test(title)) throw 'you can not include special characters in title';
    return title;
}

function checkMovieStudio(studio){
    studio=studio.trim();
  if(studio.trim().length<5) throw 'studio must be at least five characters';
  if(re_for_specialcharacter_and_number.test(studio)) throw 'you can not include special characters or numbers in studio';
  return studio;
}

function checkMovieDirector(director){
    director=director.trim()
    if(re_for_specialcharacter_and_number.test(director)) throw 'only use of letters is allowed in director';
    if(director.split(' ').length>2 || director.split(' ').length<2) throw 'director must contain firstname and lastname only';
    director.split(' ').forEach(element =>{
        if(element.trim().length<3){
        throw 'the length of first name or last name is less than 3';
        }
    });
    return director;
}

function checkMovieRating(rating){
    rating=rating.trim();
    const ratings=['G','PG','PG-13','R','NC-17'];
    if(!ratings.includes(rating)){
        throw 'invalid rating';
    }
    return rating;
}

function checkMovieGeneres(genres){
    if(!Array.isArray(genres)) throw 'genres must be an array';
    if(genres.length<1) throw 'genres must contain atleast one string'
    for (const i in genres) {
      if(typeof genres[i] !== 'string' || genres[i].trim().length===0){
        throw 'One or more genres is not a string or is an empty string'
      }
      genres[i]=genres[i].trim();
    }
    for (const i in genres){
      if(genres[i].length<5 || re_for_specialcharacter_and_number.test(genres[i])){
        throw 'invalid length or geners contains number or special characters'
      }
    }
    return genres;
}

function checkCastMembers(castMembers){
    if(!Array.isArray(castMembers)) throw 'castMembers must be an array';
    if(castMembers.length<1) throw 'castMembers must contain atleast one string'
    for (const i in castMembers) {
      if(typeof castMembers[i] !== 'string' || castMembers[i].trim().length===0){
        throw 'One or more castMembers is not a string or is an empty string'
      }
      castMembers[i]=castMembers[i].trim();
    }
    for(const i in castMembers){
      if(castMembers[i].split(' ').length>2 || castMembers[i].split(' ').length<2) throw 'castMembers must contain firstname and lastname only';
      castMembers[i].split(' ').forEach(element =>{
        if(element.trim().length<3 ||  re_for_specialcharacter_and_number.test(element)){
          throw 'the length of name is invalid or contains special characters or numbers'
        }
      });
    }
    return castMembers;
}

function validateDate(date){
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    date=date.trim();
    var c_year = new Date().getFullYear();  
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    arr=date.split('/');
    if(arr.length !== 3){
        return false;
    }

    month=arr[0];
    day=arr[1];
    year=arr[2];

    if(month.length!==2 || day.length!==2 || year.length!==4){
        return false;
    }


    if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
        return false;
    }

    month= Number(month);
    day= Number(day);
    year= Number(year);


    if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
        return false;
    }


    if(year<1900 || year> (c_year+2) ){
        return false;
    }
    if(month<0 || month>12){
        return false;
    }
    if(month==2){
        if(day>28){
            return false;
        }
    }
    if(day>ListofDays[month-1]){
        return false;
    }
    return true;
}

function validate_runtime(runtime){
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    runtime=runtime.trim();
    if(re_for_specialcharacter.test(runtime)){
        return false;
    }
    arr=runtime.split(' ');
    if(arr.length!=2){
        return false;
    };
    hour=String(arr[0]);
    min=String(arr[1]);
    hour=hour.replace('h','');
    min=min.replace('min','');
    if(hour.length>2 || hour.length<1){
        return false;
    }
    if(min.length>2 || min.length<1){
        return false;
    }
    hour=Number(hour);
    min=Number(min);
    if(!Number.isInteger(hour)){
        return false;
    }
    if(!Number.isInteger(min)){
        return false;
    }
    if(hour<1){
        return false;
    }
    if(min<0 || min>59){
        return false;
    }
    return true;
}

function checkReviewRating(rating){
    if(!rating){
        throw 'must provide rating';
    }
    if(typeof rating!=='number'){
        throw 'rating must be a number';
    }

    if(Number.isNaN(rating)){
        throw 'rating must be a number';
    }

    rating=rating.toString();
    if(rating[0]=='0'){
        throw 'invalid rating'
    }
    if(re_for_specialcharacter.test(rating)){
        let arr=rating.split('.');
        if(arr==null){
            throw 'invalid rating';
        }
        if(!arr[0] || !arr[1] ||arr[0].length>1 || arr[1].length>1){
            throw 'invalid rating';
        }
        rating=Number(rating);
        if(rating<1.0 || rating>5.0){
            throw 'invalid rating';
        }
        return rating;
    }
    rating=Number(rating);
    if(rating<1 || rating>5){
        throw 'invalid rating';
    }
    return rating;
}

// try {
//     console.log(checkReviewRating(4.00000));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(null));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(undefined));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating([1,2,3]));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(0));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(1));//true
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(01));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(2.4));//true
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(2.));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(4.04));//false
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(4.7));//true
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(4));//true
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(000004));//true
// } catch (e) {
//     console.log(e);
// }
// try {
//     console.log(checkReviewRating(4.0000));//true
// } catch (e) {
//     console.log(e);
// }
module.exports = {
    validateDate,
    validate_runtime,
    checkId,
    checkMovieTitle,
    checkMovieStudio,
    checkMovieDirector,
    checkMovieRating,
    checkMovieGeneres,
    checkCastMembers,
    checkReviewRating
}