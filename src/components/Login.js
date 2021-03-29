import React, { useState }from 'react'
import "../Login.css"
import {Link, useHistory} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from 'react-bootstrap';
import db from '../firebase'

function Login() {
    const [email, setEmail] = useState('');
    const history = useHistory('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const [loading, setLoading] = useState(false);

    async function signIn(e) {
        e.preventDefault()
    
        try {
          setError("");
          setLoading(true);
          const auth = await login(email, password);
          console.log(auth);
          history.push("/");
        } catch {
          setError("Failed to log in");
        }
    
        setLoading(false);
    }

    async function register(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            const auth = await signup(email, password);
            if (auth.user) {
                db.collection('users').doc(auth.user.uid).set({
                    emailAdd: email,
                    subtotal: 0,
                    noItems: 0
                })
                .then((s) => {
                    history.push("/");
                })
            }
          } catch {
            setError("Failed to create an account");
          }
      
          setLoading(false);
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                alt="Amazon logo"
                className="login_logo"
                src="https://assets1.csnews.com/files/styles/content_sm/s3/2017-12/amazon%20logo-TEASER_0.jpg?itok=XZfXEEbA"
                />
            </Link>
            <div className="login_container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button 
                        disabled={loading}
                        type="submit" 
                        onClick={signIn}
                        className="login_signInButton">
                        Sign In
                    </button>
                    {error && <Alert variant="danger">{error}</Alert>}
                </form>
                <p>
                    By signing-in you agree to the Famista Conditions
                    of Use & Sale, Please see our Privacy Notice, our Cookies
                    and out Interest-Based Ads Notice.
                </p>
                <button 
                    disabled={loading}
                    onClick={register}
                    className="login_registerButton">
                    Create your Amazon account
                </button>
            </div>
            
        </div>
    )
}

export default Login
