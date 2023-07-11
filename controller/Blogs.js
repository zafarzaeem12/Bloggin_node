const Blog = require('../model/Blogs')


const Create_New_Blog = async (req,res) => {
    try{
        console.log('!!!!object' , req.file.path)
        const filename = req.file.path;
        console.log(filename)
        const images = `${filename}`.replace("public","");

        // const videoname = req.file.path;
        // const videos = `${videoname}`.replace("public","");

        console.log('object$$$$' , images)

        const newBlog = new Blog({
           // images : `${images}`.replace(/\\/g, "/"),
           // videos : `${videos}`.replace(/\\/g, "/"),
            description : req.body.description,
            points : req.body.points,
            Post_creater : req.body.Post_creater,
            user : req.body.user ,
        })

        console.log('object',newBlog)
        const Register = await newBlog.save();
        res.send({
            message:`New Blog created Successfully`,
            status:201,
            data: Register
        })
    }catch(err){
        res.send({
            message:`No Blogs Created`,
            status:404
        })
    }
}



module.exports = {
    Create_New_Blog
}
