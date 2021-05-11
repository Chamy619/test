const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chamy:aa9506@wiki.phe87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



app.get('/', (req,res,next) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));