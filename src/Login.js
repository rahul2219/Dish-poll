import { useState } from 'react'
import './Login.css'

export function Login(logged){
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const[incorrectPassword,setIncorrectPassword] = useState("");

    const handlesetPassword=(e)=>{
        setPassword(e.target.value);
    }
    const handlesetUsername=(e)=>{
        setUserName(e.target.value);
    }
    const handleLogin=()=>{
        const users = [{"id": 1,"username": "amar","password": "amar123"},{"id": 2,"username": "akbar","password": "akbar123"},{
              "id": 3,
              "username": "antony",
              "password": "antony123"
            },
            {
              "id": 4,
              "username": "john",
              "password": "john123"
            },
            {
              "id": 5,
              "username": "paul",
              "password": "paul123"
            }
          ]
        
        for(var i=0;i<users.length;i++){
            if(users[i].username === username && users[i].password === password){
                logged.setLogged(true);
            }
            else{
                setIncorrectPassword(true);
            }
        }
    }

    return(
        <div class="login-box">
            <h1>Login</h1>
            <div class="textbox">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" onChange={handlesetUsername}/>
            </div>
            <div class="textbox">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" onChange={handlesetPassword}/>
            </div>
            {incorrectPassword&&<div style={{color:"red"}}>Invalid UserName or Password</div>}
            <input type="button" class="btn" value="Sign in" onClick={()=>handleLogin()}/>
        </div>
    )
}