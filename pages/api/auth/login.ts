import { apiHandler } from "@/lib/apiHandler"
import { supabase } from "@/lib/supabase"

interface User{
    email: string,
    password: string
}

export default apiHandler({
    "POST": async(req,res)=>{
        const {email,password} = req.body as User
        if(!email || !password) return res.status(400).json({ message: "Invalid input"})
        const {data, error} = await supabase.auth.signInWithPassword({email,password})
        if(error){
            return res.status(401).json({ message: error.message})
        }
        res.setHeader("Set-Cookie",`token=${data.session?.access_token} ;Path=/; HttpOnly`)
        return res.status(200).json({ message: "login successfully", token: data.session?.access_token})
    }
})