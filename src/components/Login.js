import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button, Container} from '@mui/material';

const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {username, password});
      if (response.data.message === '注册成功') {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('注册失败，请稍后重试');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {username, password});
      if (response.data.message === '登录成功') {
        onLogin();
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('登录失败，请稍后重试');
    }
  };

  return (
    <Container>
      <h1>用户登录</h1>
      <div>
        <TextField label="用户名" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <TextField label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleRegister}>注册</Button>
        <Button variant="contained" color="primary" onClick={handleLogin}>登录</Button>
      </div>
      <div>{message}</div>
    </Container>
  );
};

export default Login;
