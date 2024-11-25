import React, { useState } from 'react';
import SavePreferences from './SavePreferences';
import MatchUsers from './MatchUsers';
import WebRTCConnection from './WebRTCConnection';

const ConnectionPage = () => {
    const [preferencesSaved, setPreferencesSaved] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState(null);

    const handlePreferencesSaved = () => {
        setPreferencesSaved(true);
    };

    const handleMatch = (users) => {
        setMatchedUsers(users);
    };

    return (
        <div className="container mx-auto p-4">
            {!preferencesSaved ? (
                <SavePreferences onSave={handlePreferencesSaved} />
            ) : (
                <>
                    <MatchUsers onMatch={handleMatch} />
                    {matchedUsers && (
                        <WebRTCConnection matchedUsers={matchedUsers} />
                    )}
                </>
            )}
        </div>
    );
};

export default ConnectionPage;
