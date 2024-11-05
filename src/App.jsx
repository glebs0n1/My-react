import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import Modal from './Components/Modal/Modal'; // Adjust the path based on your structure

const App = () => {
    const [totalLikes, setTotalLikes] = useState(0);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    // Function to increment total likes
    const incrementTotalLikes = () => {
        setTotalLikes(prev => prev + 1);
    };

    // Functions to control the login modal
    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    // Functions to control the registration modal
    const openRegister = () => setRegisterOpen(true);
    const closeRegister = () => setRegisterOpen(false);

    return (
        <div className="app">
            <Header totalLikes={totalLikes} />
            <Body onLike={incrementTotalLikes} openLogin={openLogin} openRegister={openRegister} />
            <Footer />

            {/* Login Modal */}
            <Modal isOpen={isLoginOpen} onClose={closeLogin}>
                <h2>Login</h2>
                <form>
                    <label htmlFor="login-email">Email:</label>
                    <input type="email" id="login-email" required />
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" id="login-password" required />
                    <button type="submit" className="button">Login</button>
                </form>
            </Modal>

            {/* Registration Modal */}
            <Modal isOpen={isRegisterOpen} onClose={closeRegister}>
                <h2>Register</h2>
                <form>
                    <label htmlFor="register-username">Username:</label>
                    <input type="text" id="register-username" required />
                    <label htmlFor="register-email">Email:</label>
                    <input type="email" id="register-email" required />
                    <label htmlFor="register-password">Password:</label>
                    <input type="password" id="register-password" required />
                    <button type="submit" className="button">Register</button>
                </form>
            </Modal>
        </div>
    );
};

export default App;
