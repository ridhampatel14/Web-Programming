const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helpers= require('../helpers');
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const re_for_specialcharacter_and_number=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (!title) throw 'all paramerers are not passed';
  if (!plot) throw 'all paramerers are not passed';
  if (!genres) throw 'all paramerers are not passed';
  if (!rating) throw 'all paramerers are not passed';
  if (!studio) throw 'all paramerers are not passed';
  if (!director) throw 'all paramerers are not passed';
  if (!castMembers) throw 'all paramerers are not passed';
  if (!dateReleased) throw 'all paramerers are not passed';
  if (!runtime) throw 'all paramerers are not passed';

  if (typeof title !== 'string') throw 'title must be a string';
  if (typeof plot !== 'string') throw 'plot must be a string';
  if (typeof rating !== 'string') throw 'rating must be a string';
  if (typeof studio!== 'string') throw 'studio must be a string';
  if (typeof director !== 'string') throw 'director must be a string';
  if (typeof dateReleased !== 'string') throw 'dateReleased must be a string';
  if (typeof runtime !== 'string') throw 'runtime must be a string';

  if (title.trim().length === 0) throw 'Title cannot be an empty string or string with just spaces';
  if (plot.trim().length === 0) throw 'plot cannot be an empty string or string with just spaces';
  if (rating.trim().length === 0) throw 'rating cannot be an empty string or string with just spaces';
  if (studio.trim().length === 0) throw 'studio cannot be an empty string or string with just spaces';
  if (director.trim().length === 0) throw 'director cannot be an empty string or string with just spaces';
  if (dateReleased.trim().length === 0) throw 'datereleased cannot be an empty string or string with just spaces';
  if (runtime.trim().length === 0) throw 'runtime cannot be an empty string or string with just spaces';

  title=title.trim();
  if(title.trim().length<2) throw 'title must be at least two characters ';
  if(re_for_specialcharacter.test(title)) throw 'you can not include special characters in title';
  

  studio=studio.trim();
  if(studio.trim().length<5) throw 'studio must be at least five characters';
  if(re_for_specialcharacter_and_number.test(studio)) throw 'you can not include special characters or numbers in studio';
  
  
  director=director.trim()
  if(re_for_specialcharacter_and_number.test(director)) throw 'only use of letters is allowed in director';
  if(director.split(' ').length>2 || director.split(' ').length<2) throw 'director must contain firstname and lastname only';
  director.split(' ').forEach(element =>{
    if(element.trim().length<3){
      throw 'the length of first name or last name is less than 3';
    }
  });
  

  rating=rating.trim();
  const ratings=['G','PG','PG-13','R','NC-17'];
  if(!ratings.includes(rating)){
    throw 'invalid rating';
  }
  

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

  dateReleased=dateReleased.trim()
  if(!helpers.validateDate(dateReleased.trim())) throw 'date is invalid';
  

  runtime=runtime.trim()
  if(!helpers.validate_runtime(runtime.trim())) throw 'runtime not valid';
  

//validation done 


  const moviescollection=await movies();

  let newmovie={
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  const insertInfo=await moviescollection.insertOne(newmovie);

  if(!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'could not add movie';
  }

  const newID= insertInfo.insertedId.toString();
  const movie=await getMovieById(newID);
  return movie;
};

const getAllMovies = async () => {
  const moviescollection=await movies();
  
  const all_movies=await moviescollection.find({}).toArray();

  if(!all_movies){
    throw "can't fetch all movies";
  }

  all_movies.forEach(element => {
    element._id=element._id.toString();
  });
  return all_movies;
};

const getMovieById = async (id) => {
  if(!id){
    throw 'no id provided'
  }
  if(typeof id!=='string'){
    throw 'id must be string'
  }
  if(id.trim().length==0){
    throw 'the provided id is empty string'
  }

  id=id.trim();

  if(!ObjectId.isValid(id)){
    throw 'invalid id passed'
  }

  //validation done
  
  const moviescollection=await movies();

  const movie_by_id= await moviescollection.findOne({_id: ObjectId(id)});

  if(movie_by_id==null){
    throw 'No movie found with this id'
  }

  movie_by_id._id=movie_by_id._id.toString();
  return movie_by_id;
};

const removeMovie = async (id) => {
  if(!id){
    throw 'no id provided'
  }
  if(typeof id!=='string'){
    throw 'id must be string'
  }

  if(id.trim().length==0){
    throw 'the provided id is empty string'
  }

  id=id.trim();

  if(!ObjectId.isValid(id)){
    throw 'invalid id passed'
  }


  //validation done
  
  const moviescollection=await movies();


  old_movie=await getMovieById(id);


  const deleted_movie = await moviescollection.deleteOne({_id: ObjectId(id)});

    if (deleted_movie.deletedCount === 0) {
      throw 'Could not delete movie with id of ${id}';
    }

    return old_movie.title+' has been successfully deleted!';
};

const renameMovie = async (id, newName) => {
  if(!id){
    throw 'no id provided'
  }
  if(typeof id!=='string'){
    throw 'id must be string'
  }
  if(id.trim().length==0){
    throw 'the provided id is empty string'
  }

  id=id.trim();

  if(!ObjectId.isValid(id)){
    throw 'invalid id passed'
  }

  
  if (!newName) throw 'You must provide a name to update movie title';
  if (typeof newName !== 'string') throw 'new title must be a string';
  if (newName.trim().length === 0)
    throw 'new title cannot be an empty string or string with just spaces';
  if(newName.trim().length<2) throw 'new title must be at least two characters ';
  if(re_for_specialcharacter.test(newName)) throw 'you can not include special characters in new title';
  newName=newName.trim();

  old_movie=await getMovieById(id);
  if(old_movie.title.toLowerCase()==newName.toLowerCase()){
    throw 'new title is same as old one'
  }
  
  //validation done
  const moviescollection=await movies();

  const updated_movie={
    title: newName
  }

  const updatedmovie=await moviescollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updated_movie}
  );

  if (updatedmovie.modifiedCount === 0){
    throw 'could not update movie successfully';
  }

  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};



