const getmusic=async(req,res)=>{
    const a= await fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay')
    const response=await a.json()
    .then(response => {
      console.log("helo");
      res.send(response);
    })
    .catch(error => {
      console.error(error);
    });
  }


  export {getmusic}