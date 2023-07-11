const router = require('express').Router();
const MultipleImages = require('../middleware/multiImages')
const MultipleVideos = require('../middleware/multivideos')
const auth = require('../middleware/Authentication');
const { 
    Create_New_Blog ,
  
} = require('../controller/Blogs')

router.post('/create_new_Blog' , MultipleImages.upload   ,  Create_New_Blog);


module.exports = router