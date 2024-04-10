import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Button, List, ListItem, ListItemText} from '@mui/material';


const Home = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    if (showUserInfo) {
      fetchUserInfo();
    }
  }, [showUserInfo]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user_info');
      setUserInfo(response.data.users);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setError('获取用户信息失败，请稍后重试');
    }
  };

  return (
    <Container>
      <h1>欢迎来到主页</h1>
      <Button variant="contained" color="primary" onClick={() => setShowUserInfo(true)}>显示用户信息</Button>
      {error && <div>{error}</div>}
      {showUserInfo && (
        <List>
          {userInfo.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={`用户名: ${user.username}, 密码: ${user.password}`}/>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;
