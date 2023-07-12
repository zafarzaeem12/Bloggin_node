
const router = require('express').Router();
const auth = require('../middleware/Authentication');

const { 
    Report_Blogs,
    Get_Reported_Blogs
  
} = require('../controller/Report')

router.post('/create_reported' ,auth ,  Report_Blogs);



module.exports = router