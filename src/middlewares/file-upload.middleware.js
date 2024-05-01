import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename : (req,file,cb)=>{
        let name = new Date().toISOString().replace(/:/g,"_") + file.originalname;
        cb(null,name);
    }
})

export const upload = multer({storage : storageConfig});