require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const authroutes = require('./routes/authroutes')
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// routes 
app.use('/api/user',authroutes);
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log('connected to database and listening on port ', process.env.PORT)
    }) 
})
.catch((error)=> {
    console.log(error)

})



