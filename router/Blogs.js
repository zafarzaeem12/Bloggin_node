const router = require('express').Router();
const MultipleImages = require('../middleware/multiImages')
const MultipleVideos = require('../middleware/multivideos')
const auth = require('../middleware/Authentication');
const { 
    Create_New_Blog ,
    Delete_Blog
} = require('../controller/Blogs')

router.post('/create_new_Blog' ,auth , MultipleImages.upload   ,  Create_New_Blog);

router.delete('/delete' , Delete_Blog)

module.exports = router