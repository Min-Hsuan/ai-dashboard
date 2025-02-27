import { NextApiRequest, NextApiResponse } from "next";

type MethodHandler = {
    GET?: (req: NextApiRequest, res: NextApiResponse)=> Promise<void>
    POST?: (req: NextApiRequest, res: NextApiResponse)=> Promise<void>
    PUT?: (req: NextApiRequest, res: NextApiResponse)=> Promise<void>
    DELETE?: (req: NextApiRequest, res: NextApiResponse)=> Promise<void>
}

export const apiHandler=(handlers: MethodHandler)=>{
    return async ( req: NextApiRequest, res: NextApiResponse)=>{
        const handler = handlers[req.method as keyof MethodHandler]
        if (!handler) return res.status(405).json({error: "Method Not Allowed"})
        try{
            await handler(req, res)
        }catch(error){
            res.status(500).json({error: "Internal Server Error"})
        }
    }
}