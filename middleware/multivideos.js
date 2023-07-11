const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/Videos')
    },
    filename: function (req, file, cb) {
      const videoname = file.originalname.split(' ').join('-')
      console.log('videoname',videoname)
      cb(null,`${videoname}`)
    }
  })
  
const upload = multer({
    storage: storage
}).array('videos' , 10)

module.exports ={ upload}