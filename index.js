const express=require('express');
const mongoose=require('mongoose');
const urlRoute=require('./routes/url.js')
//const {connectToMongoDB}=require('./connect.js')
const URL=require('./models//url.js');

const app=express();
const PORT=8001;
app.use(express.json())


// connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
// .then("Database connected successfully !!")

mongoose.connect("mongodb://127.0.0.1:27017/short_url")
.then( ()=>{
    console.log("Database connection successfull !!")
})
.catch((error)=>{
    console.log(error)
})

app.use('/url',urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    res.redirect(entry.redirectURL);
});


app.listen(PORT, ()=>{
    console.log(`Server started at port : ${PORT}`)
})