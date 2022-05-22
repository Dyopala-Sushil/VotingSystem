const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,process.cwd()+'/uploads')
    },
    filename:(req,file,cb)=>{
        filename = Date.now()+file.originalname;
        cb(null,filename);
    }
})

const imageFilter = (req,file,cb)=>{
    type = file.mimetype.split('/')[0]
    if(type==='image'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
})

module.exports = upload;