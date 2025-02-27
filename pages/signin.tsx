import {useState} from 'react'


export default function Signin(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    async function signinHandler (){
        const response = await fetch('/api/auth/login',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email,password})
        })
        const {message, token} = await response.json()
        console.log(message,token)
    }
    return (
        <div>
            <h2>Sign In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password"
            >Password</label>
            <input type="password" id="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={signinHandler}>signup</button>
        </div>

    )

}