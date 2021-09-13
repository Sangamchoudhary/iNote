import React, { useState } from 'react'
import { useHistory } from 'react-router';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Logged in successfully", "success");
        } else {
            props.showAlert("Enter Valid credentials", "danger");
        }
    }
    return (
        <div className="container form-style-5 mt-5">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Enter your Credentials</legend>
                    <input type="email" onChange={onChange} value={credentials.email} id="email" name="email" placeholder="Your Email *" />
                    <input type="password" onChange={onChange} value={credentials.password} name="password" placeholder="Your Password (min 6 character) *" />
                </fieldset>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login
