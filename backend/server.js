require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const authroutes = require('./routes/authroutes')
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')
const app = express();
const path = require("path")  //for buid project

app.use(cors(
    {
        origin: ["https://talha-yaseen-ecommerce-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials:true
    }
));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

app.get("/", (req,res) => {
    res.json("salam")
})
// routes 
app.use('/api/user',authroutes);
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log('connected to database and listening ')
    }) 
})
.catch((error)=> {
    console.log(error)

})



