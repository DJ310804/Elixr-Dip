import React, { useState } from 'react';
import axios from 'axios';

const MatchUsers = ({ onMatch }) => {
    const [loading, setLoading] = useState(false);

    const handleMatch = async () => {
        setLoading(true);

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/connect/match-users/');
            const users = response.data.users;
            if (users && users.length === 2) {
                onMatch(users); // Notify parent with matched users
            } else {
                alert("No match found. Please try again.");
            }
        } catch (err) {
            console.error("Error matching users:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Find a Match</h2>
            <button
                onClick={handleMatch}
                className={`btn w-full ${loading ? 'btn-disabled' : 'btn-primary'}`}
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Find Match'}
            </button>
        </div>
    );
};

export default MatchUsers;
