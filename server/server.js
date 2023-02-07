const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload')
const path = require('path');
const app = express();
const port = 8000
const public_path = path.join(__dirname, '../public');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true
}))
app.set('view engine', 'pug')
app.use('/static',express.static(public_path))
app.set('views', path.join(public_path,"views"));
app.use('/',require(path.join(__dirname,"../routes/loginroutes.js")))
app.use('/articles',require(path.join(__dirname,"../routes/articles.js")))
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})  

