import React, { useState } from 'react';
import axios from 'axios';

const SavePreferences = ({ onSave }) => {
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/api/connect/save-preferences/', {
                userId: user.id,
                location,
                language,
            });
            onSave(); 
        } catch (err) {
            console.error("Error saving preferences:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Set Your Preferences</h2>
            <div className="form-control">
                <label className="label">Location</label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">Language</label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-full">Save Preferences</button>
        </form>
    );
};

export default SavePreferences;
