require('dotenv').config();

const puppet = require('./Puppeteer/ligayugioh');
const express = require('express');
const mongoose = require('mongoose');

//ENV VARIABLES
const PORT: string = process.env.PORT || '3000';
const DB_URI: string = process.env.DB_URI || '';

const app = express();


app.get('/', async (req: Request, res: Response) => {
    const data = await puppet.getLigaYugiohData('https://www.ligayugioh.com.br/?view=cards/card&card=D/D/D%20Zero%20Doom%20Queen%20Machinex');
    console.log(data);
    res.json(data);
});


app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT} 😎`);

    mongoose.connect(DB_URI).then(() => {
        console.log('Connected to MongoDB 🎲');
    }).catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

    
})

