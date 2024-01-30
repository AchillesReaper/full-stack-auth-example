import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { LoginUser } from './interfaces';



function App() {
  const secretAPI = 'http://localhost:3100/api/secret'
  const loginAPI = 'http://localhost:3100/api/login'
  const loginURL = 'http://localhost:3100/login'

  const [isAuth , setIsAuth] = useState<boolean|undefined>(undefined)

  const [user, setUser] = useState<LoginUser>({
    username: '',
    password: ''
  })

  // const login = async () => {
  //   const res = await axios.get(loginURL)

  //   console.log(res.data);

  //   console.log(res.status);
  //   console.log(res.statusText);
  // }

  const apiLogin = async () => {
    const res = await axios.post(loginAPI, {
      username: user.username,
      password: user.password
    })
    console.log(`response => ${JSON.stringify(res)}`);
    console.log(res.data.message);
    if (res.data.message === 'login_success'){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }


  //content to show
  let logedinPage = 
    <div>
      <h1>login success</h1>
    </div>

  let loginForm =
    <div>
      <form action="">
        <label htmlFor="username">
          email:
          <input type="text"
            name='username'
            value={user.username}
            onChange={(e) => {
              setUser({
                ...user,
                username: e.target.value
              })
            }} />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input type="password"
            name='password'
            value={user.password}
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value
              })
            }} />
        </label>
        <br />
      </form>
      <button onClick={apiLogin}>Login</button>

    </div>

  

  return (
    <div className="App">
      {isAuth? logedinPage :loginForm}


    </div>
  );
}

export default App;
