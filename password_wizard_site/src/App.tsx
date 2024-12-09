import { useState } from 'react';
import wizardLogo from './assets/password_wizard_logo_2.png';
import './App.css';
import { Intro } from './components/Intro/intro.tsx'
import { PasswordOptions } from './components/PasswordOption/passwordOption.tsx';
import { SimplePassword } from './components/SimplePassword/simplePassword.tsx';
import { CipherPassword } from './components/CipherPassword/cipherPassword.tsx';


function App() {
  const [passwordType, setPasswordType] = useState<"simple" | "cipher">(
    "simple"
  );
  const [cipherInput, setCipherInput] = useState("");

  const handleCipherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCipherInput(event.target.value);
  };

  return (
    <div className="app">
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
        {passwordType === "simple" ? (
          <SimplePassword />
        ) : (
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
  );
}

export default App;