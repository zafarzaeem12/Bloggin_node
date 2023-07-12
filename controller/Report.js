const Report = require('../model/Report')


const Report_Blogs = async (req,res) => {
    try{
      
      
        const newReported = new Report({
            description : req.body.description,
            isReported : req.body.isReported,
            blog_id : req.body.blog_id,
            user_id : req.body.user_id ,
        })
        const Register = await newReported.save();
        res.send({
            message:`Blog Reported`,
            status:201,
            data: Register
        })
    }catch(err){
        res.send({
            message:`Not found`,
            status:404
        })
    }
}



module.exports = {
    Report_Blogs
}
