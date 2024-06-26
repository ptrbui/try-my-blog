import {useContext, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {setUserInfo} = useContext(UserContext);

    const location = useLocation();
    const successMessage = location.state?.successMessage;

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('https://the-fufu-blog.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            {successMessage && <p className="successMessage">{successMessage}</p>}
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <button>Login</button>
        </form>
    )
}