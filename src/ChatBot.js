import React, { useState, useRef, useEffect } from 'react';
import imageSrc from './logophoto.jpg'; // Importe seu arquivo de imagem
import Nav from "./navbar";
import Footer from "./footer";

const ChatBot = ({ uid, handleLogout }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const apiKey = process.env.REACT_APP_CHATGPT_KEY;



  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const summarize = async (userInput) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `help me coding` },
        { role: 'user', content: userInput }
      ]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const summary = result.choices[0].message.content;

    return summary;
  };

  const saveMessage = async (message) => {
    // Simulando o salvamento assíncrono de mensagens, você deve substituir isso pela sua lógica de salvamento real
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Salve a mensagem
        console.log('Message saved:', message);
        resolve();
      }, 1000); // Simular atraso de 1 segundo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Defina a mensagem do usuário no estado
    const userMessage = { text: inputText, isUser: true };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Salve a mensagem do usuário de forma assíncrona
    await saveMessage(userMessage);

    // Chame a função summarize e atualize o estado das mensagens com a resposta
    const botResponse = await summarize(inputText);
    const botMessage = { text: botResponse, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Salve a mensagem do bot de forma assíncrona
    await saveMessage(botMessage);
  };

  useEffect(() => {
    // Função para enviar a mensagem inicial da AI quando o componente for montado
    const sendInitialMessage = async () => {
      const initialMessage = `you need to help me in my code, respond in small text `;
      const botResponse = await summarize(initialMessage);
      const botMessage = { text: botResponse, isUser: false };
      setMessages([botMessage]);
      // Salve a mensagem inicial aqui se necessário
    };

    // Chame a função para enviar a mensagem inicial
    sendInitialMessage();
  }, []);

  const styles = {
    container: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    chatBox: {
      maxWidth: '55vh',
      margin: 'auto',
      padding: '1rem',
      backgroundColor: '#e5e7eb',
      borderRadius: '0.5rem',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: "2rem",
      minHeight: "65vh",
    },
    message: {
      padding: '10px', // Adicionar padding ao contêiner de mensagens
      marginBottom: 50,
    },
    messageItem: {
      marginBottom: '0.5rem',
      display: 'flex',
    },
    messageBubble: {
      maxWidth: '20rem',
      margin: 'auto',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
    },
    userMessage: {
      backgroundColor: '#059669',
      color: '#ffffff',
      alignItems: 'flex-end',
    },
    otherMessage: {
      backgroundColor: '#d1d5db',
      color: '#000000',
    },
    inputContainer: {
      bottom: "3rem",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed"
    },
    inputContainer1: {
      backgroundColor: '#e5e7eb',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      justifyContent: "center",
      alignItems: "center",
      minWidth: "55vh",
      padding: '1rem',
    },
    inputField: {
      border: '1px solid #9ca3af',
      borderRadius: '0.5rem',
      minWidth: "40vh",
      alignItems: 'center',
      padding: "2vh",
    },
    sendButton: {
      padding: "2vh",
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      marginLeft: "1vh",
    },
    yourMessage: {
      backgroundColor: '#059669',
      color: '#ffffff',
      marginRight: "0rem"
    },
    theirMessage: {
      backgroundColor: '#d1d5db',
      color: '#000000',
      marginLeft: "0rem"
    },
    imageher: {
      width: '2.5rem',
      height: '2.5rem',
      marginLeft: "0rem",
      justifyContent: "center",
      alignItems: "center",
      border: '1px solid #9ca3af',
      borderRadius: '0.5rem',
      margin: "0.2rem",
    },
    messageContainer: {
      marginBottom: "auto",
    },
    logoutButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      padding: '10px',
      backgroundColor: '#dc2626',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    // Desabilita o comportamento padrão de rolagem
    document.body.style.overflow = 'auto';
    return () => {
      // Reabilita o comportamento padrão de rolagem quando o componente é desmontado
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={styles.container}>
      <Nav />
      <div style={{ ...styles.chatBox, ...styles.messageContainer }}>
        <div style={styles.message}>
          {messages.map((message, index) => (
            <div key={index} style={{ ...styles.messageItem, justifyContent: message.isUser ? 'flex-end' : 'flex-start' }}>
              {!message.isUser && <img style={styles.imageher} src={imageSrc} alt="Logo" />}
              <div style={{ ...styles.messageBubble, ...(message.isUser ? styles.yourMessage : styles.theirMessage) }}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1vh" }}>
        <form onSubmit={handleSubmit} style={styles.inputContainer1}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={styles.inputField}
          />
          <button type="submit" style={styles.sendButton}>Send</button>
        </form>
      </div>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> {/* Botão de Logout */}
      <Footer />
    </div>
  );
};

export default ChatBot;
