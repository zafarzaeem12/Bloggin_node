const router = require('express').Router();

const auth = require('../middleware/Authentication');
const { 
    Create_New_Comments ,
    Updated_Like,
    Get_Comments_On_Blogs
  
} = require('../controller/Comments')

router.post('/create_comments'   , auth ,  Create_New_Comments);
router.put('/isLike/:commentid/blogid/:blogid' ,auth , Updated_Like);

router.get('/getComments/:blogid' , auth , Get_Comments_On_Blogs)
module.exports = router