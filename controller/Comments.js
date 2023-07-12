const Comment = require('../model/Comments')


const Create_New_Comments = async (req,res) => {
    try{
      
      
        const newComments = new Comment({
            comments : req.body.comments,
            isLiked : req.body.isLiked,
            blog_id : req.body.blog_id,
            user_id : req.body.user_id ,
        })
        const Register = await newComments.save();
        res.send({
            message:`New Comments on Blog`,
            status:201,
            data: Register
        })
    }catch(err){
        res.send({
            message:`No Comments`,
            status:404
        })
    }
}

const Updated_Like = async (req,res,next) => {
    try{
        const id = req.params.commentid;
        const blog = req.params.blogid;
      
            const UpdatedLiked = await Comment.findByIdAndUpdate(
                { _id : id , blog_id : blog } ,
                {
                    $set:{
                        isLiked: req.body.isLiked
                    }
                },
                { new : true }
                )
                res.send({
                    message:'Like Update Successfully',
                    status:201,
                    data : UpdatedLiked
                })

        

    }catch(err){
        res.send({
            message:'Like does not exists',
            status:404
        })
    }
}

const Get_Comments_On_Blogs = async (req,res,next) => {
    const id = req.params.blogid;

    try{
        //const Comments_on_Blogs = await Comment.find({ $and : [{ blog_id : id} ,{isLiked : isLiked } ] }).populate({path:'blog_id' })

        const Comments_on_Blogs = await Comment.find({ blog_id : id  }).populate({path:'blog_id' })

        res.send({
            totalComments: Comments_on_Blogs.map((data) => data ? data.comments : null ).length,
            totalLikes : Comments_on_Blogs.reduce((acc , data) => { return acc + Number(data.isLiked) },0), 
            message:`you have ${Comments_on_Blogs?.length} comments on this blog`,
            status:200,
            data : Comments_on_Blogs
        })
    }catch(err){
        res.send({

            message:`No Comments found`,
            status:404,
            
        })
    }
}

module.exports = {
    Create_New_Comments,
    Updated_Like,
    Get_Comments_On_Blogs
}
