const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Images')
    },
    filename: function (req, file, cb) {
      const filename = file.originalname.split(' ').join('-')
      cb(null,`${filename}`)
    }
  })

const upload = multer({
    storage: storage,
    limits : {
        fieldSize : 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Please error coming! '));
        }
        cb(undefined , true);
    }
}).array('images' , 4)

module.exports ={ upload }