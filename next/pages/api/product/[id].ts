import nc from 'next-connect';
import multer from "multer";
import path from "path";
import type { NextApiRequest, NextApiResponse } from 'next'
const db = require('../../../src/db/db')
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";

export const config = {
    api:{
        bodyParser:false
    }
}

interface MulterRequest extends NextApiRequest{
    file:any
}

const n = nc();
const storage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null, 'public/product')
    },
    filename:function(req, file, callback){
        callback(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})

const uploadFile = upload.single('file');
n.use(uploadFile)

n.post(async (req:MulterRequest,res:NextApiResponse)=>{
    console.log("req.file", req.file);
    console.log(req.body)
    try{
        const data = JSON.parse(req.body.data)
        const option = JSON.parse(req.body.option)
    }catch (err){
        console.log(err)
    }
    // const sql = `INSERT INTO
    //                 products(product_name,brand_name,product_title,product_price,product_img,discount_rate,category_id)
    //                 VALUE()`
    // db.query("")
})

export default n