const express = require('express');
const bodyParser = require('body-parser');
const MULTER_CONFIG = require('./ultis/multer-config');
const userRoute = require('./routers/user.route');
const session = require('express-session')
const app = express();
const PORT = 4000;
const sessionRoute = require('./routers/demo-session');


app.use(bodyParser.urlencoded({ extended: false }));

//SET VIEW ENGINE
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public/'));

//middle ware sesstion
app.use(session({
    secret: 'tom97dev',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : 6000 }
}))


//ROUTE USER MIDLLEWARE
app.use('/user', userRoute);
app.use('/session', sessionRoute);



app.get('/', (req, res) => res.json( { message : 'Home Page'}))



/**
 * ROUTE : GET
 * DES : GET PAGE IUPLOAD IMAGE
 */
app.get('/upload-image', (req, res )=> {
    res.render('upload-image');
})

/**
 * ROUTE : POST
 * DES : UPLOAD IMAGE 
 */
app.post('/upload-image', MULTER_CONFIG.single('avatar')  ,(req, res )=> {
    // let file = req.file;
    res.json( { message : 'Upload Success' } );
})

/**
 * GET
 * 
 */
app.get('/upload-multi-image', (req, res )=> {
    res.render('upload-image');
})

/**
 * ROUTE : POST
 * DES : UPLOAD MULTI IMAGE 
 */
app.post('/upload-multi-image', MULTER_CONFIG.single('avatar')  ,(req, res )=> {
    // let file = req.file;
    res.json( { message : 'Upload Success' } );
})

//route test sesstion
app.g

app.listen(PORT, () => console.log('Server start port ' + PORT));