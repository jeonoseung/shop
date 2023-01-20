import {NextApiResponse} from "next";

class ResponseClass{
    static BadRequest204(res:NextApiResponse,data:string,msg:string){
        res.status(400).send({data,msg})
    }
    static BadRequest400(res:NextApiResponse,data:string,err:string,msg:string){
        res.status(400).send({data,err,msg})
    }
}
export default ResponseClass