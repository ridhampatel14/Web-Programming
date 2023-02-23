const movies=require("./data/movies");
const connection = require('./config/mongoConnection');

/*
1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.
*/


const main=async()=>{
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let movie1=undefined;
    let movie2=undefined;
    let movie3=undefined;



    //console.log("******************************** 1 & 2 create movie1 and show it********************************************");
    try{
        movie1=await movies.createMovie("Hackers",
         "Hackers are blamed for making a virus that will capsize five oil tankers.", 
         ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
         ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
         "09/15/1995", "1h 45min");
        console.log(movie1);
    }catch(e){
        console.log(e);
    }

    //console.log("******************************** 3 create movie2********************************************");
    try{
        movie2=await movies.createMovie("42",
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
        all_movies=await movies.getAllMovies();
        console.log(all_movies);
    }catch(e){
        console.log(e);
    }

    //console.log("******************************** 5 & 6 create movie3 and show it ********************************************");


    try{
        movie3=await movies.createMovie( "The Breakfast Club",
         "Hackers are blamed for making a virus that will capsize five oil tankers.", 
         ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", 
         ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], 
         "02/07/1985", "1h 37min");
        console.log(movie3);
    }catch(e){
        console.log(e);
    }

    //console.log('********************** 7 & 8 rename movie 1st ***************************')

    try{
        movie1=await movies.renameMovie(movie1._id,'ridham');
        console.log(movie1);
    }catch(e){
        console.log(e);
    }

    //console.log('********************* 9 delete movie **********************************')

    try{
        deleted=await movies.removeMovie(movie2._id);
        console.log(deleted);
    }catch(e){
       console.log(e); 
    }

    //console.log("******************************** 10 show all movies ***********************************");


    try{
        all_movies=await movies.getAllMovies();
        console.log(all_movies);
    }catch(e){
        console.log(e);
    }


    //console.log('********************* 11 error case create movie **********************************')
    try{
        movie1=await movies.createMovie("Hackers!",
         "Hackers are blamed for making a virus that will capsize five oil tankers.", 
         ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
         ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
         "09/15/1995", "1h 45min");
        console.log(movie1);
    }catch(e){
        console.log(e);
    }



    //console.log('********************* 12 remove movie that does not exist **********************************')

    try{
        movie1=await movies.removeMovie(movie2._id);
        console.log(movie1);
    }catch(e){
        console.log(e);
    }


    //console.log('********************* 13 rename movie that does not exist **********************************')
    try{
        movie1=await movies.renameMovie(movie2._id,'RIDHAM');
        console.log(movie1);
    }catch(e){
        console.log(e);
    }

    //console.log('********************* 14 rename movie with wrong name format *****************************')
    try{
        movie1=await movies.renameMovie(movie2._id,'RIDam!');
        console.log(movie1);
    }catch(e){
        console.log(e);
    }

    //console.log('********************* 15 get movie by id that does not exist *****************************')
    try{
        movie2=await movies.getMovieById(movie2._id);
        console.log(movie2);
    }catch(e){
        console.log(e);
    }
  




    await connection.closeConnection();
    console.log('Done!');
}

main();

