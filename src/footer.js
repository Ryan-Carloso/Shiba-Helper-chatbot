import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    navBar: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: `${windowHeight * 0.04}px`,
      fontWeight: 'bold',
      marginLeft: '2rem',
      marginRight: '2rem',
      marginTop: '1rem',
    },
    navLinks: {
      display: 'flex',
      gap: '1rem',
      marginLeft: '2rem',
      marginRight: '2rem',
      marginTop: '1rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.3s ease',
      fontSize: `${windowHeight * 0.02}px`,
    },
    linkHover: {
      backgroundColor: '#555',
    },
  };

  return (
    <nav style={styles.navBar}>
      <div style={styles.logo}>Shiba Helper</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.link}>
          Home
        </a>
        <a href="#" style={styles.link}>
          About
        </a>
        <a href="#" style={styles.link}>
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Footer;
