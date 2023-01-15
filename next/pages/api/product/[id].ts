import nc from 'next-connect';
import multer from "multer";
import path from "path";
import type { NextApiRequest, NextApiResponse } from 'next'
const db = require('../../../src/db/db')
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import {RowDataPacket} from "mysql2";

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
    try{
        const data = JSON.parse(req.body.data)
        // for(const key in data)
        // {
        //     switch (key)
        //     {
        //         case 'title':
        //             if(data[key] === '') throw Error('null error: value null')
        //             break;
        //         case 'brand':
        //             if(data[key] === '') throw Error('null error: value null')
        //             break;
        //         case 'sub':
        //             if(data[key] === '') throw Error('null error: value null')
        //             break;
        //         case 'price':
        //             if(!/^[0-9,]*$/.test(data[key])) throw Error('type error:only number type')
        //             else if(data[key] === '') throw Error('null error: value null')
        //             break;
        //         case 'sale':
        //             if(!/^[0-9]*$/.test(data[key])) throw Error('type error:only number type')
        //             else if(data[key] === '') throw Error('null error: value null')
        //             break;
        //         case 'category':
        //             if(!/^[0-9]*$/.test(data[key])) throw Error('category error:only number type')
        //             else if(data[key] === '') throw Error('null error: value null')
        //             break;
        //     }
        // }
        const option = JSON.parse(req.body.option)
        const arr = data.price.split(',')
        const price = arr[0]+arr[1]+arr[2];
        data.price = parseInt(price)
        const src = `/product/${req.file.filename}`
        const sql = `INSERT INTO products(product_name,brand_name,product_title,product_price,product_img,discount_rate,category_id) 
                                VALUE('${data.title}','${data.brand}','${data.sub}','${data.price}','${src}','${data.sale}','${data.category}')`

        db.query(sql,async (err:ErrorHandler,result:RowDataPacket)=>{
            if(err !== null) {throw err;}
            const sql = `INSERT INTO product_option(po_name,po_content,po_described,po_order,product_id)`
            interface item{
                name:string
                content:string
                described:string
            }
            let sql2 = ``
            option.map((item:item,index:number)=>{
                if(index === 0) sql2 += `VALUES`
                sql2 += `('${item.name}','${item.content}','${item.described}','${index+1}','${result.insertId}')`
                index === option.length-1 ? sql2 += `;` : sql2 += `,`
            })
            db.query(sql+sql2,async (err:ErrorHandler)=>{
                if(err !== null) {throw err;}
            })
        })
        return res.status(200).json({msg:'완료'})
    }catch (err){
        console.log(`${err} in catch`)
        res.status(500).send(err)
    }
})

export default n