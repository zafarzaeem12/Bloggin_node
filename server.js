const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRouter = require('./router/Users')
const BloggingRouter = require('./router/Blogs')
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(cors());


app.use('/UserAPI/', UserRouter);
app.use('/BlogAPI/' , BloggingRouter );

dotenv.config();

const port = process.env.PORT


mongoose.set('strictQuery' , true)
mongoose
.connect(process.env.DATABASE_URL)
.then(res => console.log(`Database connected successfully`))
.catch(err => console.log(`Database not connected`)) 

app.listen(port , ()=>{
    console.log(`Server is running on ${port} Port`)
})