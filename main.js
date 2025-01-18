import {connectmongodb} from "./db/connectdb.js"
import app from "./app.js"
connectmongodb()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`App listening at port ${process.env.PORT}`)
    })
}
)
.catch((error)=>{
    console.error({meassage:"MONGODB connection failed",error})
}
)
