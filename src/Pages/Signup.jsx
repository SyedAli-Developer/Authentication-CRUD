import React, { useState } from 'react';
import { supabase } from '../config/supabase/supabase.js';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import karein

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); // Initialize karein

    async function handleSignUp(e) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Success! Please check your email for the confirmation link.");
            // Signup ke baad login page par bhejne ke liye:
            navigate('/login'); 
        }
    }

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form className="auth-form" onSubmit={handleSignUp}>
                <input 
                    type="email" 
                    placeholder="Enter Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Choose Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit" className="auth-button">Register</button>
            </form>
        </div>
    );
}

export default SignUp;