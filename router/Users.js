const router = require('express').Router();
const auth = require('../middleware/Authentication');
const { 
    Register_New_User ,
    LoginRegisteredUser , 
    VerifyRegisteredUser , 
    Get_Reported_Blogs
} = require('../controller/Users')

router.post('/create_new_User' , Register_New_User);
router.post('/login' , LoginRegisteredUser);
router.post('/welcome' ,auth ,VerifyRegisteredUser );

router.get('/get_reported_blogs' , Get_Reported_Blogs );


module.exports = router