//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const re_for_uppercase=/[A-Z]/;
const re_for_numbers=/\d/;

function validate_user(username){
    if(typeof username!= 'string') throw 'username is not valid';
    username=username.trim();
    if(username.trim().length==0 ) throw 'username must not be empty string';
    if(username.includes(' ')) throw 'username can not contain spaces';
    if(re_for_specialcharacter.test(username)) throw 'invalid username';
    if(username.length<4) throw 'userame is too short!';
    username=username.toLowerCase();
    return username;
}

function validate_password(password){
    if(typeof password!= 'string') throw 'password is not valid';
    password=password;
    if(password.trim().length==0) throw 'password must not be empty string';
    if(password.includes(' ')) throw 'password can not contain spaces';
    if(password.length<6) throw 'password is too short!';
    if(!re_for_numbers.test(password)) throw 'password does not contain any number in it';
    if(!re_for_uppercase.test(password)) throw 'password does not contain uppercase letter';
    if(!re_for_specialcharacter.test(password)) throw 'password does not contain special character';
    return password;
}

module.exports = {
    validate_password,
    validate_user
};