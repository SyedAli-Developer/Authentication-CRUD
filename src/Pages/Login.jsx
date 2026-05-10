import React, { useState } from 'react';
import { supabase } from '../config/supabase/supabase';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import pehle se hai

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 1. useNavigate ko initialize karein
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Login Failed: " + error.message);
        } else {
            // 2. Success hone par navigate karein
            // hum { replace: true } use kar rahe hain taake user back karke wapas login par na aaye
            navigate('/dashboard', { replace: true });
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit" className="auth-button">Sign In</button>
            </form>
        </div>
    );
}

export default Login;