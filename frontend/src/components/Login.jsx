import './Login.css'

function Login() {
    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <form action="">
                        <h1>Login</h1>
                        <input className="user" type="text" name="username" placeholder="Username" required></input>
                        <input className="pass" type="text" name="password" placeholder="Password" required></input>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" name="remember"/>
                                Remember Me
                            </label>
                            <a>Forgot Password?</a>
                        </div>
                        <button type="submit">Log In</button>
                        <p>Don't have an account? <a>Register</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login