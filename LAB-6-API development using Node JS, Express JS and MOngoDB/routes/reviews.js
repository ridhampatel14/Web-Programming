//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const moviesData = data.movies;
const helpers = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    try {
      if(!req.params.movieId) throw 'you must provide movieID';
      req.params.movieId = helpers.checkId(req.params.movieId, 'ID');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let reviews = await reviewsData.getAllReviews(req.params.movieId);
      if(reviews.length==0) throw 'no reviews found';
      res.json(reviews);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    try {
      if(!req.params.movieId) throw 'you must provide movieID';
      req.params.movieId = helpers.checkId(req.params.movieId, 'ID');
    } catch (e) {
      res.status(400).json({error: e});
    }

    try {
      movieByID=await moviesData.getMovieById(req.params.movieId);
    } catch (e) {
      res.status(404).json({error: e});
    }

    let reviewInfo=req.body;
    try {
      if (!req.params.movieId) throw 'all paramerers are not passed';
      if (!reviewInfo.reviewTitle) throw 'all paramerers are not passed';
      if (!reviewInfo.reviewerName) throw 'all paramerers are not passed';
      if (!reviewInfo.review) throw 'all paramerers are not passed';
      if (!reviewInfo.rating) throw 'all paramerers are not passed';

      if (typeof req.params.movieId!== 'string') throw 'movieId must be a string';
      if (typeof reviewInfo.reviewTitle!== 'string') throw 'reviewTitle must be a string';
      if (typeof reviewInfo.reviewerName!== 'string') throw 'reviewerName must be a string';
      if (typeof reviewInfo.review!== 'string') throw 'review must be a string';

      if (req.params.movieId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';
      if (reviewInfo.reviewTitle.trim().length === 0) throw 'reviewTitle cannot be an empty string or string with just spaces';
      if (reviewInfo.reviewerName.trim().length === 0) throw 'reviewerName cannot be an empty string or string with just spaces';
      if (reviewInfo.review.trim().length === 0) throw 'review cannot be an empty string or string with just spaces';

      req.params.movieId=req.params.movieId.trim();
      reviewInfo.reviewTitle=reviewInfo.reviewTitle.trim();
      reviewInfo.reviewerName=reviewInfo.reviewerName.trim();
      reviewInfo.review=reviewInfo.review.trim();
      
      reviewInfo.rating=helpers.checkReviewRating(reviewInfo.rating);

      const reviewAddedMovie=await reviewsData.createReview(
        req.params.movieId,
        reviewInfo.reviewTitle,
        reviewInfo.reviewerName,
        reviewInfo.review,
        reviewInfo.rating);
      res.json(reviewAddedMovie);

    } catch (e) {
      res.status(400).json({error: e});
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try {
      if(!req.params.reviewId) throw 'you must provide movieID';
      if (typeof req.params.reviewId!== 'string') throw 'movieId must be a string';
      if (req.params.reviewId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';
      req.params.reviewId=req.params.reviewId.trim();
      req.params.reviewId = helpers.checkId(req.params.reviewId, 'ID');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let review = await reviewsData.getReview(req.params.reviewId);
      if(review.length==0) throw 'no review found';
      res.json(review);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    try {
      if(!req.params.reviewId) throw 'you must provide movieID';
      if (typeof req.params.reviewId!== 'string') throw 'movieId must be a string';
      if (req.params.reviewId.trim().length === 0) throw 'movieId cannot be an empty string or string with just spaces';
      req.params.reviewId=req.params.reviewId.trim();
      req.params.reviewId = helpers.checkId(req.params.reviewId, 'ID');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let review = await reviewsData.removeReview(req.params.reviewId);
      if(review.length==0) throw 'no review found';
      res.json(review);
    } catch (e) {
      res.status(404).json({error:e});
    }
  });
  module.exports = router;