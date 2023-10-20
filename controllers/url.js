const shortid=require('shortid');
const URL=require('../models/url.js')
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"Url is required"});
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        
    })

    return res.json({id:shortID});
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (result) {
        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } else {
        return res.status(404).json({ error: "Short URL not found" });
    }
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}