import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass1, setPass1]= useState('')
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                email,
                password: pass,
                confirmpassword: pass1, 
            };

            const { data } = await axios.post('/register', requestData);

            if (data.error) {
                toast.error(data.error);
            } else {
               
                setEmail('');
                setPass('');
                setPass1('');
                toast.success("Registered Successfully.");
                navigate('/Login');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Sign In</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />

                <label htmlFor="password">Password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />

                <label htmlFor="password1">Confirm password</label>
                <input
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password1"
                    name="password1"
                />
                <button type="submit">Sign In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? <span>Login here</span></button>
        </div>
    )
}
