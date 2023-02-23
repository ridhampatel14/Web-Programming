// Setup server, session and middleware here.
const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req,res, next)=>{
    let str='';
    if(req.session.user){
        str='Authenticated User'
    }else{
        str='Non-Authenticated User'
    }
    console.log('['+new Date().toUTCString()+']: '+req.method+' '+req.originalUrl+' '+str);
    next();
});

app.use('/protected', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('forbiddenAccess',{error:'user is not logged in',title:'forbiddenAccess'});
  } else {
    next();
  }
});


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});