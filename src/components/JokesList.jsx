import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JokesList = () => {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJokes = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${BACKEND_URL}/api/jokes`);
            setJokes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading jokes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="jokes-container">
            <h2>Programming Jokes</h2>
            <button onClick={fetchJokes} className="fetch-button">
                Get Jokes
            </button>
            <div className="jokes-list">
                {jokes.map((joke) => (
                    <div key={joke.id} className="joke-card">
                        <h3>{joke.setup}</h3>
                        <p>{joke.punchline}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JokesList;
