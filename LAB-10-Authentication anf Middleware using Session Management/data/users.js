const connection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const user_collection= mongoCollections.user_collection;
const {ObjectId} = require('mongodb');
const helpers = require('../helper');
const bcrypt=require('bcrypt');
const saltRounds=8;


const createUser = async (
  username, password
) => {
  if(!username || !password) throw 'username or password is not provided';

  username=helpers.validate_user(username);

  const user_col = await user_collection();

  const find_user= await user_col.findOne({username: username});

  if(find_user) throw 'there is already a user with that username';

  password=helpers.validate_password(password);

  const hash=await bcrypt.hash(password,saltRounds);

  let userInfo={
    username:username,
    password:hash
  }

  const insertInfo=await user_col.insertOne(userInfo);

  if(!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'could not add user';
  }

  return {userInserted: true};

};

const checkUser = async (username, password) => {
  if(!username || !password) throw 'username or password is not provided';

  username=helpers.validate_user(username);

  const user_col = await user_collection();

  const find_user= await user_col.findOne({username: username});

  if(!find_user) throw 'Either the username or password is invalid';

  const user_pass=find_user.password;

  password=helpers.validate_password(password);

  let compare=false;

  compare=await bcrypt.compare(password,user_pass);

  if(!compare) throw 'Either the username or password is invalid';

  return {authenticatedUser: true};

};

const getUserByID = async (userID) => {
  if(!userID) throw 'no userID provided';

  userID=validation.ch
}

module.exports = {
  createUser,
  checkUser
};

