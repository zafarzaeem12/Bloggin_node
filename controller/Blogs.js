const Blog = require('../model/Blogs')
var cron = require('node-cron');

const Create_New_Blog = async (req,res) => {
    try{
       const arrimages = req.files.images.map((data) => data?.path?.replace(/\\/g, "/"))
       const arrvideos = req.files.videos.map((data) => data?.path?.replace(/\\/g, "/"))
      
        const newBlog = new Blog({
           images : arrimages,
           videos : arrvideos,
            description : req.body.description,
            points : req.body.points,
            Post_creater : req.body.Post_creater,
            user : req.body.user ,
        })
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

const Delete_Blog = () => {

}


var task = cron.schedule('0 0 0/24 * * *', () =>  {
   Delete_Blog()
  });
  
  task.stop();


module.exports = {
    Create_New_Blog,
    Delete_Blog
}
