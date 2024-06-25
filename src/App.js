import React, { useState } from 'react';
import axios from 'axios';
import ChatBot from './ChatBot'; // Importe seu componente ChatBot aqui

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [uid, setUid] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: email,
          displayName: name,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log(response.data);
      setLoggedIn(true);
      setMessage('Registration successful!');
      setUid(response.data.localId);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log(response.data);
      setLoggedIn(true);
      setMessage('Login successful!');
      setUid(response.data.localId);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMessage('');
    setUid(null);
  };

  const styles = {
    container: {
      backgroundColor: '#000',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    formContainer: {
      textAlign: 'center',
    },
    input: {
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      outline: 'none',
      width: '300px',
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: '#fff',
      fontWeight: 'bold',
      marginRight: '10px',
    },
    message: {
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {!loggedIn ? (
        <div style={styles.formContainer}>
          <h2 style={{ marginBottom: '20px' }}>Register / Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <br />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
          <button onClick={handleRegister} style={styles.button}>
            Register
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      ) : (
        <ChatBot handleLogout={handleLogout} uid={uid} />
      )}
    </div>
  );
}

export default App;
