import { useState } from 'react';
import wizardLogo from './assets/password_wizard_logo_2.png';
import './App.css';
import { Intro } from './components/Intro/intro.tsx'
import { PasswordOutput } from './components/PasswordOutput/passwordOutput';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={wizardLogo} className="logo" alt="Password Wizard logo" />
      </div>
      <h1>Password Wizard</h1>
      <div className="intro">
        <Intro />
      </div>
      <div className="password-output">
        <PasswordOutput />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
