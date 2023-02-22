import fs from "fs";

export const removeFile = async (src:string) =>{
    await fs.unlink(`./public${src}`,(err)=>{
        if(err) throw err
    })
}