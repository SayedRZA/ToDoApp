import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';

const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The best time to plant a tree was twenty years ago. The second best time is now. – Chinese Proverb",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
    "In the middle of every difficulty lies opportunity. – Albert Einstein",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
    "Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "Act as if what you do makes a difference. It does. – William James",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau"
];


const QuoteGenerator = () => {
    const [quote, setQuote] = useState('');

    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    useEffect(() => {
        generateQuote(); // Generate a quote on initial render
    }, []);

    return (
        <div >
            <button className="generate-button" onClick={generateQuote}>
            <h3>Random Quote</h3>
            <p className="quote">{quote}</p>
            </button>
        </div>
    );
};

export default QuoteGenerator;

