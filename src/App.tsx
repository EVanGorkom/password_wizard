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
    <div className="bg">
      <div className="bg-black">
        <div className="box-border">
          <img src={wizardLogo} height="100" className="logo" alt="Password Wizard logo" />
        </div>

        <h1>Password Wizard</h1>

        <div className="intro">
          <Intro />
        </div>

        <div className="password-options">
          <PasswordOptions setPasswordType={setPasswordType} />
        </div>

        <div>
          <div className="password_option_button">
            {passwordType === "simple" && <SimplePassword />}
          </div>
          <div className="password_option_button">
            {passwordType === "balanced" && <BalancedPassword />}
          </div>
          <div className="password_option_button">
            {passwordType === "strong" && <StrongPassword />}
          </div>
          <div className="password_option_button">
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
    </div>
  );
}

export default App;