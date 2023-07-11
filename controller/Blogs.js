const User = require('../model/Users')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const Register_New_User = async (req,res) => {
    try{
        const newUser = new User({
            name : req.body.name ,
            username : req.body.username,
            email : req.body.email,
            password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
            country : req.body.country
        })
        const Register = await newUser.save();
        res.send({
            message:`New User ${Register.name} created Successfully`,
            status:201,
            data: Register
        })
    }catch(err){
        res.send({
            message:`No User Created`,
            status:404
        })
    }
}

const LoginRegisteredUser = async (req,res,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        const LoginUser = await User.findOne({ email : email });
        const gen_password = CryptoJS.AES.decrypt(LoginUser?.password , process.env.SECRET_KEY);
        const original_password = gen_password.toString(CryptoJS.enc.Utf8);
    
        if(email !== LoginUser?.email ){
            res.send({ message:"Email Not Matched" })
        }else if (password !== original_password){
            res.send({ message:"Password Not Matched" })
        }else{
          const token =  jwt.sign({
                id : LoginUser._id
            }, process.env.SECRET_KEY , { expiresIn: '1h' } )
            res.send({
                 message:"Login Successful",
                 status:200,
                 data:{ token}
                })
        }
    }catch(err){
        res.send({
            message:"Login Failed",
            status:404
           })
    }

}

const VerifyRegisteredUser = async (req,res) => {
    try{
        const Id =  req.id
        const verified_User = await User.findById(Id);
        const { password  , ...details } = verified_User._doc
        res.send({
            message:`${details?.name} Logged in Successfully`,
            status:200,
            data : {...details}
        })
    }catch(err){
        res.send({
            message:"Login Failed!",
            status:404
        })
    }
}


module.exports = {
    Register_New_User,
    LoginRegisteredUser,
    VerifyRegisteredUser
}
