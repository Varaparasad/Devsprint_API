import express, { json, response } from "express"
import cors from "cors"
const app=express()
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')


//route imports
import userrouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import { getmusic } from "./controllers/music.controller.js";
import { getmovies,gettv,getcast } from "./controllers/movie.controller.js";
import {router} from "./routes/articles.js";
app.use('/articles',router)


//using imported routes
app.use("/user",userrouter)

app.get('/landing',(req,res)=>{
  res.render('landing.ejs')
})

app.get('/music',getmusic)


app.get('/movies',getmovies)
app.get('/tv',gettv)
app.get('/cast/:movieid',getcast)
// app.get('/movies/:year',(req,res)=>{res.send("helo")})

app.get('/login-signup',(req,res)=>{
  res.render('login-signup',{foo:'foo'});
});


  

export default app