const connection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const movieData=require('./movies');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const re_for_specialcharacter_and_number=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId) throw 'all paramerers are not passed';
  if (!reviewTitle) throw 'all paramerers are not passed';
  if (!reviewerName) throw 'all paramerers are not passed';
  if (!review) throw 'all paramerers are not passed';
  if (!rating) throw 'all paramerers are not passed';

  if (typeof movieId!== 'string') throw 'movieId must be a string';
  if (typeof reviewTitle!== 'string') throw 'reviewTitle must be a string';
  if (typeof reviewerName!== 'string') throw 'reviewerName must be a string';
  if (typeof review!== 'string') throw 'review must be a string';

  if (movieId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';
  if (reviewTitle.trim().length === 0) throw 'reviewTitle cannot be an empty string or string with just spaces';
  if (reviewerName.trim().length === 0) throw 'reviewerName cannot be an empty string or string with just spaces';
  if (review.trim().length === 0) throw 'review cannot be an empty string or string with just spaces';

  movieId=movieId.trim();
  reviewTitle=reviewTitle.trim();
  reviewerName=reviewerName.trim();
  review=review.trim();

  movieId=helpers.checkId(movieId,'ID');

  rating=helpers.checkReviewRating(rating);

  let movieByID=await movieData.getMovieById(movieId);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  if(mm<10) 
  {
      mm='0'+mm;
  } 
  date = mm+'/'+dd+'/'+yyyy;
  const moviescollection=await movies();
 
  const newReview={
    _id:ObjectId(),
    reviewTitle:reviewTitle,
    reviewDate:date,
    reviewerName:reviewerName,
    review:review,
    rating:rating,
  };

  try {

    //inserting review
    const insertinfo=await moviescollection.updateOne(
      {_id:ObjectId(movieId)},
      {$addToSet: {reviews:newReview}}
    );

    if(!insertinfo.matchedCount || !insertinfo.modifiedCount){
      throw 'could not add review';
    }

    //getting movie back by id
    const movie=await movieData.getMovieById(movieId);

    //updating movie with new overall rating
    let new_overall_rating=0;
    movie.reviews.forEach((element) => {
      new_overall_rating=new_overall_rating + element.rating;
    });
    new_overall_rating=new_overall_rating/(movie.reviews.length);
    new_overall_rating=Number(new_overall_rating.toFixed(1));

    let updatedmovie_data={
      reviews:movie.reviews,
      overallRating:new_overall_rating
    };

    const updateInfo=await moviescollection.updateOne(
      {_id: ObjectId(movieId)},
        {$set: updatedmovie_data}
    );
  
    if(!updateInfo.matchedCount || !updateInfo.modifiedCount){
      throw 'could not update overall rating';
    }
  
    const new_movie=await movieData.getMovieById(id);
    return new_movie;

  } catch (e) {
    console.log(e);
  }
};

const getAllReviews = async (movieId) => {
  if (!movieId) throw 'all paramerers are not passed';

  if (typeof movieId!== 'string') throw 'movieId must be a string';

  if (movieId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';

  movieId=movieId.trim();

  movieId=helpers.checkId(movieId,'ID');

  const movieByID=await movieData.getMovieById(movieId);

  return movieByID.reviews;
};

const getReview = async (reviewId) => {
  if (!reviewId) throw 'all paramerers are not passed';

  if (typeof reviewId!== 'string') throw 'movieId must be a string';

  if (reviewId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';

  reviewId=reviewId.trim();

  reviewId=helpers.checkId(reviewId,'ID');

  const moviescollection=await movies();

  // let review=await moviescollection
  // .findOne(
  //   {},
  //   {projection: {reviews: {$elemMatch:{_id: reviewId }},_id:0}});

  let review=await moviescollection.findOne(
    {'reviews._id':reviewId},
    {projection:{_id:0,title:0,plot:0,genres:0 ,rating:0,studio:0,director:0,castMembers:0,dateReleased:0,
    runtime:0,reviews:{$elemMatch:{_id: reviewId}},overallRating:0}}
  );


  if(review==null){
    throw 'No review found with this id';
  }
  return review.reviews[0];
};

const removeReview = async (reviewId) => {
  if (!reviewId) throw 'all paramerers are not passed';

  if (typeof reviewId!== 'string') throw 'movieId must be a string';

  if (reviewId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';

  reviewId=reviewId.trim();

  reviewId=helpers.checkId(reviewId,'ID');

  const moviescollection=await movies();

  let review=await moviescollection.findOne(
    {'reviews._id':reviewId},
    {projection:{_id:1,title:0,plot:0,genres:0 ,rating:0,studio:0,director:0,castMembers:0,dateReleased:0,
    runtime:0,reviews:{$elemMatch:{_id: reviewId}},overallRating:0}}
  );

  if(review==null){
    throw 'No review found with this id';
  }

  const movieID=review._id.toString();

  const deleteInfo=await moviescollection.updateOne({_id: ObjectId(movieID)}, {$pull: {reviews: {_id: reviewId}}});

  if(!deleteInfo.matchedCount || !deleteInfo.modifiedCount){
    throw 'could not delete review';
  }

  const movie=await movieData.getMovieById(movieID);
  let new_overall_rating=0;
  if(movie.reviews.length!=0){
      //updating movie with new overall rating
      movie.reviews.forEach((element) => {
        new_overall_rating=new_overall_rating + element.rating;
      });
      new_overall_rating=new_overall_rating/(movie.reviews.length);
      new_overall_rating=Number(new_overall_rating.toFixed(1));
    }
  
      let updatedmovie_data={
        reviews:movie.reviews,
        overallRating:new_overall_rating
      };
  
      const updateInfo=await moviescollection.updateOne(
        {_id: ObjectId(movieID)},
          {$set: updatedmovie_data}
      );
    
      if(!updateInfo.matchedCount || !updateInfo.modifiedCount){
        throw 'could not update overall rating';
      }
    
      const new_movie=await movieData.getMovieById(movieID);
      return new_movie;

};

module.exports = { 
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
