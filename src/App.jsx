import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';


const App = () => {
    const [totalLikes, setTotalLikes] = useState(0);

    // Function to increment total likes
    const incrementTotalLikes = () => {
        setTotalLikes(prev => prev + 1);
    };

    return (
        <div className="app">
            <Header totalLikes={totalLikes} />
            <Body onLike={incrementTotalLikes} />
            <Footer / >
        </div>
    );
};

export default App;
