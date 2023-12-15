import React from 'react';
import Dashboard from './Dashboard.js';
import './book.css';

const MainLayout = () => {
  return (
    <div> <Dashboard />
    <div className="bgad" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
     
      <br />
      <div style={{ maxWidth: '900px', textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ color: '#004ba0', marginBottom: '20px', fontSize: '36px' }}>Welcome to Our Book Store</h1>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
          We believe in the transformative power of books. Our carefully curated collection focuses on quality over quantity,
          offering you a selection of exceptional reads that leave a lasting impact on your soul.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
          Each book in our store has been handpicked to inspire, enlighten, and entertain. Explore captivating
          stories, delve into thrilling adventures, and embrace the wisdom of great minds through the pages of
          our thoughtfully chosen books.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
          Whether you're an avid reader or just starting, we welcome you to be part of our community of book
          lovers. Let us be your trusted companions as you embark on literary adventures that enrich your life
          one page at a time.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>Discover the joy of quality books at our store. Happy reading!</p>
      </div>

      <footer style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#004ba0', color: '#fff', padding: '10px', width: '50%' }}>
        Developed with love by CGian
      </footer>
    </div>
    </div>
  );
};

export default MainLayout;
