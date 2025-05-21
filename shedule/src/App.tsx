/* eslint-disable @typescript-eslint/no-unused-expressions */
import './App.css'
import './Schedule';
import Schedule from './Schedule';
import GroupEditor from './GroupEditor';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom'


"use client";

function App() {
    return (
        <Router>
            <div style={{ width: '100%' }}>
                <header style={{ width: '100%', paddingTop: '50px' }}>
                    <nav className='nav-container'>
                        <Link to="/" className='nav-element-container'>
                            <div className='nav-element-container__element'>Регистрация</div>
                        </Link>

                        <Link to="/login" className='nav-element-container'>
                            <div className='nav-element-container__element'>Вход</div>
                        </Link>

                        <Link to="/reset" className='nav-element-container'>
                            <div className='nav-element-container__element'>Смена пароля</div>
                        </Link>

                        <Link to="/scheduleEditor" className='nav-element-container'>
                            <div className='nav-element-container__element'>Редактор расписания</div>
                        </Link>

                        <Link to="/groupEditor" className='nav-element-container'>
                            <div className='nav-element-container__element'>Редактор групп</div>
                        </Link>
                    </nav>
                </header>


                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset" element={<PasswordReset />} />
                    <Route
                        path="/scheduleEditor"
                        element={
                            <div id="weeks" className="flex justify-center items-center min-h-screen" >
                                <Schedule></Schedule>
                            </div>
                        }
                    />
                    <Route path="/groupEditor" element={
                        <GroupEditor />
                    }>
                    </Route>
                </Routes>
            </div>
        </Router>

    );
}

function Home() {
    return (
            < div >
                <h2>Home</h2>
        </div>
    )
}

function Login() {
    return (
        <div>
            <h2>Login</h2>
        </div>
    );
}

function PasswordReset() {
    return (
        <div>
            <h2>Password Reset</h2>
        </div>
    );
}
export default App