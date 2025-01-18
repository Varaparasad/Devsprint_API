
const getmovies=async(req,res)=>{
  const year=req.query.year;
  const pageno=req.query.page || 1;
  var url;
  if(year){
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageno}&sort_by=popularity.desc&year=${year}`;
  }else{
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageno}&sort_by=popularity.desc`;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjUyYzIwYTU5NzNkNWNlMGIzMWQ4NmE3MDI1ZDk4YyIsIm5iZiI6MTczNzEzMTk1MS45NTM5OTk4LCJzdWIiOiI2NzhhODdhZmMyNDcwZmM2MGJhZDExNTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bWSeIkYXjhGpQyqQTS9oyiXv8O-wrNlPqMTDqOeRQlI'
    }
  };
  
  fetch(url, options)
    .then(res1 => res1.json())
    .then(json => {
      if(!json){
        res.render('movies1',{data:{},text:"No results found",tp:data.total_pages,cp:pageno})
      }else{
        res.render('movies1',{data:json.results,text:"result found",tp:json.total_pages,cp:pageno})
      }
    })
    .catch(err => console.error(err));
}

const gettv=async(req,res)=>{
  const year=req.query.year;
  const pageno=req.query.page || 1;
  var url;
  if(year){
    url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageno}&sort_by=popularity.desc&year=${year}`;
  }else{
    url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageno}&sort_by=popularity.desc`;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjUyYzIwYTU5NzNkNWNlMGIzMWQ4NmE3MDI1ZDk4YyIsIm5iZiI6MTczNzEzMTk1MS45NTM5OTk4LCJzdWIiOiI2NzhhODdhZmMyNDcwZmM2MGJhZDExNTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bWSeIkYXjhGpQyqQTS9oyiXv8O-wrNlPqMTDqOeRQlI'
    }
  };
  
  fetch(url, options)
    .then(res1 => res1.json())
    .then(json => {
      if(!json){
        res.render('movies1',{data:{},text:"No results found",tp:data.total_pages,cp:pageno})
      }else{
        res.render('movies1',{data:json.results,text:"result found",tp:json.total_pages,cp:pageno})
      }
    })
    .catch(err => console.error(err));
}

const getcast=async(req,res)=>{
  const movieid=req.params.movieid;
  const url = `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjUyYzIwYTU5NzNkNWNlMGIzMWQ4NmE3MDI1ZDk4YyIsIm5iZiI6MTczNzEzMTk1MS45NTM5OTk4LCJzdWIiOiI2NzhhODdhZmMyNDcwZmM2MGJhZDExNTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bWSeIkYXjhGpQyqQTS9oyiXv8O-wrNlPqMTDqOeRQlI'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {if(!json){
    res.render('cast1',{data:{},text:"No results found"})
  }else{
    res.render('cast1',{data:json.cast,text:"Results found"})
  }
})
  .catch(err => console.error(err));
}










export {getmovies,gettv,getcast}