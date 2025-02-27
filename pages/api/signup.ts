import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
    email: string;
    password: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed"})
        const { email, password} = req.body as User
    if( !email || !password) return res.status(400).json({ message: "Invalid input data"})
    const { data, error} = await supabase.auth.signUp({email, password})
    if (error) return res.status(500).json({message: "Failed to register the membership" , data: error.message})
    res.status(200).json({ message: "Registered successfully", data})
}