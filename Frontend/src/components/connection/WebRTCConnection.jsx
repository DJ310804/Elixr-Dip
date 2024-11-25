import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Peer from 'simple-peer';

const WebRTCConnection = ({ matchedUsers }) => {
    const [peer, setPeer] = useState(null);
    const [callId, setCallId] = useState(null);
    const [sdpOffer, setSdpOffer] = useState(null);
    const [sdpAnswer, setSdpAnswer] = useState(null);
    const [iceCandidates, setIceCandidates] = useState([]);
    
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        const initializePeerConnection = async () => {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = localStream;

            const peerInstance = new Peer({
                initiator: true,
                trickle: false,
                stream: localStream,
            });

            peerInstance.on('signal', (data) => {
                setSdpOffer(data); // Save SDP offer
            });

            peerInstance.on('stream', (stream) => {
                remoteVideoRef.current.srcObject = stream;
            });

            setPeer(peerInstance);

            // Make API call to create the connection offer
            const response = await axios.post('http://127.0.0.1:8000/api/connect/webrtc-signaling/', {
                callee_id: matchedUsers[1],  // Assuming matchedUsers[0] is the caller
                sdp_offer: JSON.stringify(data),
            });
            setCallId(response.data.call_id);
        };

        initializePeerConnection();

        // Cleanup on unmount
        return () => {
            peer?.destroy();
        };
    }, [matchedUsers]);

    const handleAnswer = async (sdpAnswer) => {
        const response = await axios.patch(`http://127.0.0.1:8000/api/connect/webrtc-signaling/${callId}/`, {
            sdp_answer: JSON.stringify(sdpAnswer),
        });
        setSdpAnswer(sdpAnswer); // Save SDP answer
    };

    const handleIceCandidate = async (candidate) => {
        await axios.post('http://127.0.0.1:8000/api/connect/add-ice-candidate/', {
            call_id: callId,
            candidate: candidate,
        });
    };

    const handleGetIceCandidates = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/connect/get-ice-candidates/${callId}/`);
        setIceCandidates(response.data.candidates);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">WebRTC Call with {matchedUsers[1]}</h2>
            <div className="space-x-4">
                <video ref={localVideoRef} className="w-1/2" autoPlay muted></video>
                <video ref={remoteVideoRef} className="w-1/2" autoPlay></video>
            </div>
            {sdpOffer && (
                <button onClick={() => handleAnswer(sdpAnswer)} className="btn btn-success w-full">
                    Answer Call
                </button>
            )}
            <button onClick={handleGetIceCandidates} className="btn btn-secondary w-full">
                Get ICE Candidates
            </button>
        </div>
    );
};

export default WebRTCConnection;
