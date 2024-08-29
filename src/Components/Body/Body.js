import React from 'react';
import './Body.css';

const Body = () => {
  return (
    <main className="body">
      <section className="hero">
        <h1>Welcome to Our Website</h1>
        <p>Your one-stop solution for all your needs.</p>
        <button className="body__cta">Get Started</button>
      </section>
      <section className="content">
        <div className="content__item">
          <h2>Feature 1</h2>
          <p>Description of feature 1.</p>
        </div>
        <div className="content__item">
          <h2>Feature 2</h2>
          <p>Description of feature 2.</p>
        </div>
        <div className="content__item">
          <h2>Feature 3</h2>
          <p>Description of feature 3.</p>
        </div>
      </section>
    </main>
  );
};

export default Body;
