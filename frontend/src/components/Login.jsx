import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [authMode, setAuthMode] = useState('login')

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login')
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            if (response.ok) {
                setMessage('Login successful!')
            } else {
                setMessage(data.message || 'Login failed.')
            }

        } catch (error) {
            console.error('Login error:', error)
            setMessage('Something went wrong.')
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(email)

        try {
            const res = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            })

            const data = await res.json();
            if(res.ok){
                setMessage('Registration successful')
            } else {
                setMessage(data.message || 'Registration failed.')
            }
        } catch(error){
            console.error('Registration error:', error)
            setMessage('Something went wrong.')
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    {authMode === 'login' ? (
                        <form onSubmit={handleLogin} action="">
                            <h1>Login</h1>
                            <input className="user" type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                            <input className="pass" type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" name="remember" />
                                    Remember Me
                                </label>
                                <a>Forgot Password?</a>
                            </div>
                            {message && <p>{message}</p>}
                            <button type="submit">Log In</button>
                            <p>Don't have an account? <a onClick={toggleAuthMode}>Register</a></p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} action="">
                            <h1>Register</h1>
                            <input className="email" type="text" name="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            <input className="user" type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                            <input className="pass" type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" name="remember" />
                                    Remember Me
                                </label>
                                <a>Forgot Password?</a>
                            </div>
                            {message && <p>{message}</p>}
                            <button type="submit">Register</button>
                            <p>Already have an account? <a onClick={toggleAuthMode}>Login</a></p>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
export default Login