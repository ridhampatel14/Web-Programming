const connection = require('./config/mongoConnection');
const movieData=require('./data/movies');
const reviewData=require('./data/reviews');



const main=async()=>{
  const db = await connection.dbConnection();
  await db.dropDatabase();

  let movie1=undefined;
  let movie2=undefined;
  let movie3=undefined;
  let review1=undefined;
  let review2=undefined;

  //console.log("******************************** 1 & 2 create movie1 and show it********************************************");
  try{
      movie1=await movieData.createMovie("Hackers",
       "Hackers are blamed for making a virus that will capsize five oil tankers.", 
       ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
       ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
       "09/15/1995", "1h 45min");
      //console.log(movie1);
  }catch(e){
      console.log(e);
  }

  //console.log("******************************** 3 create movie2********************************************");
  try{
      movie2=await movieData.createMovie("42",
       "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", 
       ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", 
       ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], 
       "04/09/2013", "2h 8min");
      //console.log(movie2);
  }catch(e){
      console.log(e);
  }

  //console.log("******************************** 4 show all movies ********************************************");


  try{
      all_movies=await movieData.getAllMovies();
      //console.log(all_movies);
  }catch(e){
      console.log(e);
  }

  //console.log("******************************** 5 & 6 create movie3 and show it ********************************************");


  try{
      movie3=await movieData.createMovie( "The Breakfast Club",
       "Hackers are blamed for making a virus that will capsize five oil tankers.", 
       ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", 
       ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], 
       "02/07/1985", "1h 37min");
      //console.log(movie3);
  }catch(e){
      console.log(e);
  }


  //console.log('********************* 9 delete movie **********************************')

  try{
      deleted=await movieData.removeMovie(movie2._id);
      //console.log(deleted);
  }catch(e){
     console.log(e); 
  }


  //console.log('********************* 9 update movie **********************************')

  try{
      movie1=await movieData.updateMovie(movie1._id,"updated Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.", 
      ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
      "09/15/1995", "1h 45min");
      //console.log(updated);
  }catch(e){
     console.log(e); 
  }

  //console.log("******************************** 1 add review********************************************");

  try{
      review1=await reviewData.createReview(movie1._id,"Meh...",'ridham','it is good',2.7);
      //console.log(movie1);
  }catch(e){
      console.log(e);
  }
  
  //console.log("******************************** 2 add review********************************************");
  try{
      review2=await reviewData.createReview(movie1._id,"new review",'dev','it is bad',3.4);
      //console.log(movie2);
  }catch(e){
      console.log(e);
  }

  await connection.closeConnection();
  console.log('Done!');
}

main();