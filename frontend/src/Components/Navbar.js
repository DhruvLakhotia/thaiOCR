import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
//
const navigate = useNavigate();

  const navigateResults = () => {
    navigate('/result');
  };

  const navigateHome = () => {
    navigate('/');
  };
//




  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <button style={styles.button} onClick={navigateHome}>Home</button>
        <button style={styles.button} onClick={navigateResults}>View History</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#333',
    padding: '10px 0',
    color: '#fff',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'start',
    maxWidth: '800px',
    margin: '0 40px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '20px',
    padding: '5px 10px',
    textDecoration: 'none',
    outline: 'none',
  },
};

export default Navbar;
