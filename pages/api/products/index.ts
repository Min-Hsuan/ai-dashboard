import { apiHandler } from "@/lib/apiHandler"
import { supabase } from "@/lib/supabase" 

interface Product{
    name: string,
    price: number
}

export default  apiHandler({

    GET: async(req, res)=>{
        const {data, error} = await supabase.from('products').select("*")
        if (error) return res.status(500).json({ message: error.message})
            res.status(200).json(data)
    },
    POST: async(req,res)=>{
        const {name, price} = req.body as Product
        const { data, error} = await supabase.from('products').insert([{ name, price}])
        if(error) 
            return res.status(500).json({
            message: "Failed to add Product",
            data: error.message
            })
        res.status(201).json({ message: "Product added", data})
    }
})