import express from'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import api from './route/api';
import connectDB from './config/connectDB';
const cors=require('cors');
const session=require("express-session");
const cookieParser = require('cookie-parser')

require('dotenv').config();

let app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(async(req,res,next)=>{
  if(req.session.isAuthenticated===null){
    req.session.isAuthenticated=false;
  }
  res.locals.lcIsAuthenticated=req.session.isAuthenticated;
  res.locals.isError=req.session.isError;
  res.locals.lcAuthUser=req.session.authUser;
  next();
})
app.use(cookieParser())
api(app);
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})