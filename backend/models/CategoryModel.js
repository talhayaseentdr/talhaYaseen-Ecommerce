const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        lowercase: true
    }
},{timestamps:true})

const Category = mongoose.model("Category", CategorySchema);

module.exports = {Category}