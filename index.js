const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Crypto = require('./models/crypto.model');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/assets',express.static('assets'));

app.get('/', async (req, res) => {
    
    try {
        const result = await fetch('https://api.wazirx.com/api/v2/tickers').then(resp=>resp.json());
        const keys = Object.keys(result);

        await mongoose.connect("mongodb://127.0.0.1:27017/test")
            .then(()=>console.log("DB connected"))
            .catch((err)=>console.log(err));

        await Crypto.deleteMany({});

        for(let i=0;i<10;i++){
            await Crypto.findOneAndUpdate(
                {key:keys[i]},
                {
                    key:keys[i],
                    name:result[keys[i]]['name'],
                    last:result[keys[i]]['last'],
                    buy:result[keys[i]]['buy'],
                    sell:result[keys[i]]['sell'],
                    volume:result[keys[i]]['volume'],
                    base_unit:result[keys[i]]['base_unit'],
                },
                {upsert:true},
            );
        }
        const data =await Crypto.find({});

        res.render('index',{
                // data: JSON.stringify(result),
                keys:keys,
                data: data,
            });
        
    } catch (error) {
        console.error("Eror: ",error);
    }
    
    // res.render('index',{
    //     // data: JSON.stringify(result),
    //     keys:keys,
    //     data: result,
    // });
});

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});