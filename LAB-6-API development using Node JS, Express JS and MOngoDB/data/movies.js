const connection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');
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

  title=helpers.checkMovieTitle(title);
  
  studio=helpers.checkMovieStudio(studio);
  
  director=helpers.checkMovieDirector(director);

  rating=helpers.checkMovieRating(rating);

  genres=helpers.checkMovieGeneres(genres);

  castMembers=helpers.checkCastMembers(castMembers);

  plot=plot.trim();

  dateReleased=dateReleased.trim()
  if(!helpers.validateDate(dateReleased.trim())) throw 'date is invalid';
  
  runtime=runtime.trim()
  if(!helpers.validate_runtime(runtime.trim())) throw 'runtime is not valid';

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
    runtime: runtime,
    reviews:[],
    overallRating:0
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
  
  const all_movies=await moviescollection.find({},{projection: {_id:1, title:1 }}).toArray();

  if(!all_movies){
    throw "can't fetch all movies";
  }

  all_movies.forEach(element => {
    element._id=element._id.toString();
  });

  return all_movies;
};

const getMovieById = async (movieId) => {
  id=helpers.checkId(movieId,'ID');

  const moviescollection=await movies();
  const movie_by_id= await moviescollection.findOne({_id: ObjectId(id)});

  if(movie_by_id==null){
    throw 'No movie found with this id'
  }

  movie_by_id._id=movie_by_id._id.toString();
  movie_by_id.reviews.forEach((element,index) => {
    movie_by_id.reviews[index]._id=element._id.toString();
  });
  return movie_by_id;
};

const removeMovie = async (movieId) => {

  id=helpers.checkId(movieId,'ID');
  
  const moviescollection=await movies();
  
  old_movie=await getMovieById(id);

  const deleted_movie = await moviescollection.deleteOne({_id: ObjectId(id)});

    if (deleted_movie.deletedCount === 0) {
      throw 'Could not delete movie';
    }

  return old_movie.title+' has been successfully deleted!';
};

const updateMovie = async (
  movieId,
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

  title=helpers.checkMovieTitle(title);
  
  studio=helpers.checkMovieStudio(studio);
  
  director=helpers.checkMovieDirector(director);

  rating=helpers.checkMovieRating(rating);

  genres=helpers.checkMovieGeneres(genres);

  castMembers=helpers.checkCastMembers(castMembers);

  plot=plot.trim();

  dateReleased=dateReleased.trim()
  if(!helpers.validateDate(dateReleased.trim())) throw 'date is invalid';
  
  runtime=runtime.trim()
  if(!helpers.validate_runtime(runtime.trim())) throw 'runtime is not valid';

  id=helpers.checkId(movieId,'ID');

  let old_movie=await getMovieById(id);

  //validation done 

  const moviescollection=await movies();
  if(old_movie.title==title 
    && old_movie.plot==plot 
    && JSON.stringify(old_movie.genres)==JSON.stringify(genres)
    && old_movie.rating==rating 
    && old_movie.studio==studio 
    && old_movie.director==director 
    && JSON.stringify(old_movie.castMembers)==JSON.stringify(castMembers) 
    && old_movie.dateReleased==dateReleased
    && old_movie.runtime==runtime){
      throw 'the data is same as old movie';
  }

  let updatedmovie={
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews:old_movie.reviews,
    overallRating:old_movie.overallRating
  };

  const updateInfo=await moviescollection.updateOne(
    {_id: ObjectId(id)},
      {$set: updatedmovie}
  );

  if(!updateInfo.matchedCount || !updateInfo.modifiedCount){
    throw 'could not update movie';
  }

  const movie=await getMovieById(id);
  return movie;
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
};


// const main=async()=>{
//   const db = await connection.dbConnection();


//   console.log('********************* 9 update movie **********************************')

//   try{
//       let movie1=await updateMovie("6355c71c79d3350b55a576d4","ridham",
//       "it is very good movie", 
//       ["action","Drama"], "R", "Universal Pictures","dev patel",
//       ["Judd Nelson","Molly Ringwald","Ally Sheedy"],
//       "02/07/2015", "2h 10min");
//       console.log(movie1);
//   }catch(e){
//      console.log(e); 
//   }

//   await connection.closeConnection();
//   console.log('Done!');
// }

// main();
