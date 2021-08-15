const express =require('express');
const morgan =require('morgan');
const multer =require('multer');
const path = require('path');
const exphbs =require('express-handlebars');




const app = express();

app.set('port',4000);
app.set('views'.path.join(__dirname,'views')); //direcciono en donde esta la carpeta views
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:('.hbs')
}));

app.set('views engine','.hbs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

 const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename:(req,callback,file) =>{
        callback(null, new Date().getTime()+path.extname(file.originalname));
    }
})

app.use(multer({storage:storage}).single('image'));

