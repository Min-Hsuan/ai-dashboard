import { useState }from 'react'


export default function Signup(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function signupHandler(){
        const response = await fetch('/api/signup',{
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({email, password})
        })
        console.log(response)
    }
    return(
        <div>
            <h2>Signup</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password" 
            >Password</label>
            <input type="password" id="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={signupHandler}>signup</button>
        </div>
    )
}