import { useState } from 'react';
import wizardLogo from './assets/password_wizard_logo_2.png';
import './App.css';
import { Intro } from './components/Intro/intro.tsx'
import { PasswordOptions } from './components/PasswordOption/passwordOption.tsx';
import { SimplePassword } from './components/SimplePassword/simplePassword.tsx';
import { BalancedPassword } from './components/BalancedPassword/balancedPassword.tsx';
import { StrongPassword } from './components/StrongPassword/strongPassword.tsx';
import { CipherPassword } from './components/CipherPassword/cipherPassword.tsx';


function App() {
  const [passwordType, setPasswordType] = useState<"simple" | "balanced" | "strong" | "cipher">("simple");
  const [cipherInput, setCipherInput] = useState("");

  const handleCipherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCipherInput(event.target.value);
  };

  return (
    <div className="app">
      <div className="min-h-screen bg-gradient-to-b from-purple-700 to-indigo-950">
        <div>
          <img src={wizardLogo} className="logo" alt="Password Wizard logo" />
        </div>

        <h1>Password Wizard</h1>

        <div className="intro">
          <Intro />
        </div>

        <div className="password-options">
          <PasswordOptions setPasswordType={setPasswordType} />
        </div>

        <div className="password-output">
          {passwordType === "simple" && <SimplePassword />}
          {passwordType === "balanced" && <BalancedPassword />}
          {passwordType === "strong" && <StrongPassword />}
          {passwordType === "cipher" && (
            <div>
              <input
                type="text"
                placeholder="Enter text to cipher"
                value={cipherInput}
                onChange={handleCipherInputChange}
                className="cipher-input"
              />
              <CipherPassword userInput={cipherInput} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;