import React, { useState } from 'react'
import { useHistory } from 'react-router';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpasssword: "" });
    let history = useHistory();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Enter valid details", "danger");
        }
    }
    return (
        <div className="container mt-5 form-style-5">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend><span className="number">1</span>Full Name</legend>
                    <input type="text" onChange={onChange} name="name" required placeholder="Your Full Name" />
                </fieldset>
                <fieldset>
                    <legend><span className="number">2</span>Credentials</legend>
                    <input type="email" onChange={onChange} name="email" required placeholder="Your Email" />
                    <input type="password" onChange={onChange} name="password" required minLength={6} placeholder="Your Password (min 6 character)" />
                    <input type="password" onChange={onChange} name="cpassword" required minLength={6} placeholder="Confirm Password" />
                </fieldset>
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default SignUp
