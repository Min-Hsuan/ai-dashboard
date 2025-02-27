import { apiHandler } from "@/lib/apiHandler";
import { supabase } from "@/lib/supabase";

interface User {
    email: string,
    password: string
}

export default apiHandler({
    POST: async(req, res)=>{
        const {email, password} = req.body as User
        const {data, error} = await supabase.auth.signUp({email,password})
        if(!email || !password) {
            return res.status(400).json({message: "Invalid input data"})
        }
        if (error){
            return res.status(500).json({
                message: "Failed to register the membership",
                data: error.message
            })
        }
        console.log(res)
        res.status(201).json({ message: "Registered successfully", data})
    }
})