import mongoose from "mongoose";
const bookSchema= mongoose.Schema({
    "name":String,
    "title":String,
    "price":Number,
    "category":String,
    "image":String
})

const Book=mongoose.model("Book",bookSchema);

export default Book;