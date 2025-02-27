import {supabase} from "@/lib/supabase"
import { NextApiRequest, NextApiResponse } from "@/node_modules/next/types"

// 定義型別
interface Product {
    name: string;
    price: number;
}


// Api 處理函式
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).json({message: "Method Not Allowed"})
    const {name, price} = req.body as Product

    if(!name || !price || typeof price !== "number" ) return res.status(400).json({message: "Invalid input data"})

    const {data, error} = await supabase.from("products").insert([{name,price}])

    if(error) return res.status(500).json({message: "Failed to add product",data: error.message})
    res.status(200).json({message: "Product added", data})   
}