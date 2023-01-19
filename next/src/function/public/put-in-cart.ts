

export const PutCart = async (pid:string, count:number)=>{
    const data : string | null = localStorage.getItem("cart");
    interface cart{
        id:number,
        product:string,
        count:number
    }
    let cart:cart[];
    if(data === null)
    {
        cart = [
            {id:1,product:pid,count:count}
        ]
    }
    else
    {
        cart = JSON.parse(data);
        let check = 0;
        cart.map((item)=>{
            if(item.product === pid)
            {
                item.count += count;
                check++;
                return false
            }
        })
        if(check === 0)
        {
            cart[cart.length] = {id:cart.length+1,product:pid,count:count}
        }
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    console.log(cart)
}