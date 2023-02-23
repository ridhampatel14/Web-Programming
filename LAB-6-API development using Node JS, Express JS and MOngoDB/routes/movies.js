//require express and express router as shown in lecture code

const express = require('express');
const { movies } = require('../data');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const helpers = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    try{
      let moviesList = await moviesData.getAllMovies();
      res.json(moviesList);
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let movieInfo=req.body;
    try{
      if (!movieInfo.title) throw 'all paramerers are not passed';
      if (!movieInfo.plot) throw 'all paramerers are not passed';
      if (!movieInfo.genres) throw 'all paramerers are not passed';
      if (!movieInfo.rating) throw 'all paramerers are not passed';
      if (!movieInfo.studio) throw 'all paramerers are not passed';
      if (!movieInfo.director) throw 'all paramerers are not passed';
      if (!movieInfo.castMembers) throw 'all paramerers are not passed';
      if (!movieInfo.dateReleased) throw 'all paramerers are not passed';
      if (!movieInfo.runtime) throw 'all paramerers are not passed';
    
      if (typeof movieInfo.title !== 'string') throw 'title must be a string';
      if (typeof movieInfo.plot !== 'string') throw 'plot must be a string';
      if (typeof movieInfo.rating !== 'string') throw 'rating must be a string';
      if (typeof movieInfo.studio!== 'string') throw 'studio must be a string';
      if (typeof movieInfo.director !== 'string') throw 'director must be a string';
      if (typeof movieInfo.dateReleased !== 'string') throw 'dateReleased must be a string';
      if (typeof movieInfo.runtime !== 'string') throw 'runtime must be a string';
    
      if (movieInfo.title.trim().length === 0) throw 'Title cannot be an empty string or string with just spaces';
      if (movieInfo.plot.trim().length === 0) throw 'plot cannot be an empty string or string with just spaces';
      if (movieInfo.rating.trim().length === 0) throw 'rating cannot be an empty string or string with just spaces';
      if (movieInfo.studio.trim().length === 0) throw 'studio cannot be an empty string or string with just spaces';
      if (movieInfo.director.trim().length === 0) throw 'director cannot be an empty string or string with just spaces';
      if (movieInfo.dateReleased.trim().length === 0) throw 'datereleased cannot be an empty string or string with just spaces';
      if (movieInfo.runtime.trim().length === 0) throw 'runtime cannot be an empty string or string with just spaces';

      movieInfo.title=helpers.checkMovieTitle(movieInfo.title);
  
      movieInfo.studio=helpers.checkMovieStudio(movieInfo.studio);
      
      movieInfo.director=helpers.checkMovieDirector(movieInfo.director);

      movieInfo.rating=helpers.checkMovieRating(movieInfo.rating);

      movieInfo.genres=helpers.checkMovieGeneres(movieInfo.genres);

      movieInfo.castMembers=helpers.checkCastMembers(movieInfo.castMembers);

      movieInfo.plot=movieInfo.plot.trim();

      movieInfo.dateReleased=movieInfo.dateReleased.trim()
      if(!helpers.validateDate(movieInfo.dateReleased.trim())) throw 'date is invalid';
      
      movieInfo.runtime=movieInfo.runtime.trim()
      if(!helpers.validate_runtime(movieInfo.runtime.trim())) throw 'runtime is not valid';
    }catch(e){
      return res.status(400).json({error: e});
    }
    
    try {
      const newMovie= await moviesData.createMovie(
        movieInfo.title,
        movieInfo.plot,
        movieInfo.genres,
        movieInfo.rating,
        movieInfo.studio,
        movieInfo.director,
        movieInfo.castMembers,
        movieInfo.dateReleased,
        movieInfo.runtime
      );
      res.json(newMovie);
    } catch (e) {
      res.sendStatus(500);
    }
  });

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
      let user = await moviesData.getMovieById(req.params.movieId);
      res.json(user);
    } catch (e) {
      res.status(404).json({error: 'Movie not found'});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.movieId = helpers.checkId(req.params.movieId, 'ID');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      await moviesData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'Movie not found'});
    }

    try {
      const deleted=await moviesData.removeMovie(req.params.movieId);
      res.json({"movieId": req.params.movieId,"deleted":true});
    } catch (e) {
      res.status(500).send('Internal Server Error');
    }

  })
  .put(async (req, res) => {
    try {
      req.params.movieId = helpers.checkId(req.params.movieId, 'ID');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      movieByID=await moviesData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'Movie not found'});
    }

    let movieInfo=req.body;
    try{
      if (!movieInfo.title) throw 'all paramerers are not passed';
      if (!movieInfo.plot) throw 'all paramerers are not passed';
      if (!movieInfo.genres) throw 'all paramerers are not passed';
      if (!movieInfo.rating) throw 'all paramerers are not passed';
      if (!movieInfo.studio) throw 'all paramerers are not passed';
      if (!movieInfo.director) throw 'all paramerers are not passed';
      if (!movieInfo.castMembers) throw 'all paramerers are not passed';
      if (!movieInfo.dateReleased) throw 'all paramerers are not passed';
      if (!movieInfo.runtime) throw 'all paramerers are not passed';
    
      if (typeof movieInfo.title !== 'string') throw 'title must be a string';
      if (typeof movieInfo.plot !== 'string') throw 'plot must be a string';
      if (typeof movieInfo.rating !== 'string') throw 'rating must be a string';
      if (typeof movieInfo.studio!== 'string') throw 'studio must be a string';
      if (typeof movieInfo.director !== 'string') throw 'director must be a string';
      if (typeof movieInfo.dateReleased !== 'string') throw 'dateReleased must be a string';
      if (typeof movieInfo.runtime !== 'string') throw 'runtime must be a string';
    
      if (movieInfo.title.trim().length === 0) throw 'Title cannot be an empty string or string with just spaces';
      if (movieInfo.plot.trim().length === 0) throw 'plot cannot be an empty string or string with just spaces';
      if (movieInfo.rating.trim().length === 0) throw 'rating cannot be an empty string or string with just spaces';
      if (movieInfo.studio.trim().length === 0) throw 'studio cannot be an empty string or string with just spaces';
      if (movieInfo.director.trim().length === 0) throw 'director cannot be an empty string or string with just spaces';
      if (movieInfo.dateReleased.trim().length === 0) throw 'datereleased cannot be an empty string or string with just spaces';
      if (movieInfo.runtime.trim().length === 0) throw 'runtime cannot be an empty string or string with just spaces';

      movieInfo.title=helpers.checkMovieTitle(movieInfo.title);
  
      movieInfo.studio=helpers.checkMovieStudio(movieInfo.studio);
      
      movieInfo.director=helpers.checkMovieDirector(movieInfo.director);

      movieInfo.rating=helpers.checkMovieRating(movieInfo.rating);

      movieInfo.genres=helpers.checkMovieGeneres(movieInfo.genres);

      movieInfo.castMembers=helpers.checkCastMembers(movieInfo.castMembers);

      movieInfo.plot=movieInfo.plot.trim();

      movieInfo.dateReleased=movieInfo.dateReleased.trim()
      if(!helpers.validateDate(movieInfo.dateReleased.trim())) throw 'date is invalid';
      
      movieInfo.runtime=movieInfo.runtime.trim()
      if(!helpers.validate_runtime(movieInfo.runtime.trim())) throw 'runtime is not valid';

      req.params.movieId=req.params.movieId.trim();
    }catch(e){
      return res.status(400).json({error: e});
    }

    try {
      const updatedMovie=await moviesData.updateMovie(req.params.movieId,movieInfo.title,movieInfo.plot,
        movieInfo.genres,movieInfo.rating,movieInfo.studio,movieInfo.director,movieInfo.castMembers,
        movieInfo.dateReleased,movieInfo.runtime);
      res.json(updatedMovie);
    } catch (e) {
      res.status(400).send(e);
    }
  });


  module.exports = router;