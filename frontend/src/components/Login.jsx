import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [authMode, setAuthMode] = useState('login')
    const [feedback, setFeedback] = useState('')
    const [strongPassword, setStrongPassword] = useState(false)
    const [rj_data, setRj_Data] = useState(() => {
        if (localStorage.getItem("rj_guest_data")) {
            return JSON.parse(localStorage.getItem("rj_guest_data"))
        } else {
            return {
                pachinkoHighscore: 0,
                pachinkoPoints: 0,
                pachinkoGameState: {
                    bfNum: 0.5,
                    multiplier: ["x2", "x1", "x1", "x1", "x.5"],
                    coins: 1,
                    pegHits: 1,
                    maxWorldHeight: 1200,
                    pegRows: 3,
                    round: 1,
                    rounds: 5,
                    ammo: 2,
                    maxAmmo: 2,
                    totalScore: 0,
                    score: 0,
                },
                ownedUpgrades: [],
            }
        }
    })
    const navigate = useNavigate()

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login')
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            if (response.ok) {
                setMessage('Login successful!')
                console.log(data.username)
                setUser(data.username);
                navigate('/')
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
                body: JSON.stringify({ email, username, password, rj_data })
            })

            const data = await res.json();
            if (res.ok) {
                handleLogin()
            } else {
                setMessage(data.message || 'Registration failed.')
            }
        } catch (error) {
            console.error('Registration error:', error)
            setMessage('Something went wrong.')
        }
    }

    const handleChange = (e) => {
        const newPwd = e.target.value
        setPassword(newPwd)
        validatePassword(newPwd)
    }

    const validatePassword = (pwd) => {
        const errors = []
        if (pwd.length < 8) errors.push("at least 8 characters")
        if (!/[a-z]/.test(pwd)) errors.push("a lowercase letter")
        if (!/[A-Z]/.test(pwd)) errors.push("a uppercase letter")
        if (!/[1-9]/.test(pwd)) errors.push("a number")
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) errors.push("a symbol")

        if (errors.length === 0) {
            setFeedback("Strong password!")
            setStrongPassword(false)
        } else {
            setFeedback("Needs: " + errors.join(", "))
            setStrongPassword(true)
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
                            <input className="pass" type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
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
                            <input className="email" type="email" name="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            <input className="user" type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                            <input className="pass" type="password" name="password" placeholder="password" value={password} onChange={handleChange} required></input>
                            <p className={strongPassword ? "feedback" : "good-feedback"}>{feedback}</p>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" name="remember" />
                                    Remember Me
                                </label>
                                <a>Forgot Password?</a>
                            </div>
                            {message && <p>{message}</p>}
                            <button type="submit" disabled={strongPassword}>Register</button>
                            <p>Already have an account? <a onClick={toggleAuthMode}>Login</a></p>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
export default Login