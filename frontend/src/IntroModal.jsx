import { useEffect, useState } from "react"
import './IntroModal.css'

const IntroModal = ({ onPlayGuest, onLogin }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("modalSelected") || localStorage.getItem("modalSelected")==="false") {
            setShowModal(true);
            localStorage.setItem("modalSelected", "false")
        }
    }, []);

    const handleGuest = () => {
        console.log("handle guest called")
        setShowModal(false);
        localStorage.setItem("modalSelected", "true")
        onPlayGuest();
    };

    const handleLogin = () => {
        setShowModal(false);
        localStorage.setItem("modalSelected", "true")
        onLogin();
    }

    if (!showModal || localStorage.getItem("modalSelected")==="true") return null;


    return (<div id="introModal" class="modal">
        <div className="modal-content">
            <h2>Welcome to Roguelite Jamboree!</h2>
            <p>Play as a guest or log in to save your progress and compete on the leaderboard.</p>
            <button onClick={handleGuest}>Play as a Guest</button>
            <button onClick={handleLogin}>Log In/Sign Up</button>
        </div>
    </div>)



};



export default IntroModal