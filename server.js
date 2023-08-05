const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');



const port = process.env.PORT || 4959;



mongoose.connect('mongodb+srv://shalinisai9195:PhXgrzQ9O5psk3kQ@cluster0.mcsnlyc.mongodb.net/',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/', async(req, res) =>{

    const shortUrls = await shortUrl.find()
    res.render('index', { shortUrls : shortUrls});
})

app.post('/shorturls', async(req, res) =>{
   await shortUrl.create({full : req.body.fullUrl})
   res.redirect('/')
})

app.get('/:shorturl', async (req, res) =>{
    const shortUrls = await shortUrl.findOne({short : req.params.shorturl})
  
   if(shortUrls == null){
    return res.sendStatus(400)
   }

   shortUrls.clicks++
   shortUrls.save()

   res.redirect(shortUrls.full)
})

app.listen(port, () =>{
    console.log('server conneted',port)
})