const router = require('express').Router();
const auth = require('../middleware/Authentication');
const { 
    Register_New_User ,
    LoginRegisteredUser , 
    VerifyRegisteredUser
} = require('../controller/Users')

router.post('/create_new_User' , Register_New_User);
router.post('/login' , LoginRegisteredUser);
router.post('/welcome' ,auth ,VerifyRegisteredUser );

module.exports = router