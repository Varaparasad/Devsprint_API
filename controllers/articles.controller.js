import apierr from "../utils/apierror.js";
import asynchandler from "../utils/asynchandler.js";


const home= asynchandler(async (req, res) => {
    try {
        const page = req.params.page || 1; // Default to 1 if 'page' is not provided
        const category = req.params.category || 'general'; // Default to 'all' if 'category' is not provided
        console.log(category)
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=5bcaaeb575d74ef3a3a9e63f4532eb8f`);
        
      if (!response.ok) {
    throw new apierr('500',"failed")
      }else{
      const data=await response.json()

      const arr=data.articles
      const filtered=arr.filter(arr=>arr.title&&arr.urlToImage)
      res.render('articles.ejs',{data:filtered}); // Pass data to the view
    } }catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).send('Failed to fetch articles.');
    }
  });
  

const year=asynchandler(async(req,res)=>{

    console.log(req.body)
})



export {home,year}