import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {TextField, Button, Container, List, ListItem, ListItemText} from '@mui/material';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user_info');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', {username, password});
      setMessage('注册成功');
      setUsername('');
      setPassword('');
      fetchUsers();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login', {username, password});
      setMessage('登录成功');
      setUsername('');
      setPassword('');
      fetchUsers();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <h1>用户管理系统</h1>
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
      <h2>用户列表</h2>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={`用户名: ${user.username}, 密码: ${user.password}`}/>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
