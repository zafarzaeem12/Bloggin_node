const User = require('../model/Users');
const Blog = require('../model/Blogs');
var mongoose = require('mongoose');
const Report = require('../model/Report');
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
            message:`New User ${Register?.name} created Successfully`,
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

const Get_Reported_Blogs = async (req,res,next) => {
    const report = req.query.report;
    const user = req.query.user
    const id = mongoose.Types.ObjectId(report);
    try{

      const data =   [
            {
            '$unset': 'user_id'
          },
            {
              '$match': {
                'blog_id': id
              }
            }, {
              '$lookup': {
                'from': 'blogs', 
                'localField': 'blog_id', 
                'foreignField': '_id', 
                'as': 'blogs'
              }
            }, {
              '$unwind': {
                'path': '$blogs'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'blogs.user', 
                'foreignField': '_id', 
                'as': 'blog_creater'
              }
            }, {
              '$unwind': {
                'path': '$blog_creater'
              }
            }
          ]

        const reports = await Report.aggregate(data);
        
        const users = await User.findOne({_id : user }).select(' -password ')

        const blogs = await Blog.findOne({ _id : report }).populate('user').select(' _id user ')

       
        if(blogs?.user?._id.toString() === users?._id.toString()) {
          
            const all = await Promise.all([reports , users , blogs ]);
            const [ reportss , ...others ] = all
            res.send({
                message: `${users?.name} your ${reports?.length} Blogs have been Reported`,
                status :200,
                data : reportss
            })

        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    Register_New_User,
    LoginRegisteredUser,
    VerifyRegisteredUser,
    Get_Reported_Blogs
}
