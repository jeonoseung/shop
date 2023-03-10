import fs from "fs";

/** 파일 삭제 */
export const removeFile = async (src:string) =>{
    await fs.unlink(`./public${src}`,(err)=>{
        if(err) throw err
    })
}