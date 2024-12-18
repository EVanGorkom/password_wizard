import { useState } from "react";
import wizardLogo from "./assets/password_wizard_logo_2.png";
import "./App.css";
import { Intro } from "./components/Intro/intro.tsx";
import { SimplePassword } from "./components/SimplePassword/simplePassword.tsx";
import { BalancedPassword } from "./components/BalancedPassword/balancedPassword.tsx";
import { StrongPassword } from "./components/StrongPassword/strongPassword.tsx";
import { CipherPassword } from "./components/CipherPassword/cipherPassword.tsx";

function App() {
  const [passwordType, setPasswordType] = useState<
    "simple" | "balanced" | "strong" | "cipher"
  >("simple");
  const [cipherInput, setCipherInput] = useState("");

  const handleCipherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCipherInput(event.target.value);
  };

  const renderPasswordComponent = () => {
    switch (passwordType) {
      case "simple":
        return <SimplePassword />;
      case "balanced":
        return <BalancedPassword />;
      case "strong":
        return <StrongPassword />;
      case "cipher":
        return (
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
        );
      default:
        return <SimplePassword />;
    }
  };

  return (
    <div className="bg">
      <div className="bg-black">
        <div className="box-border">
          <img
            src={wizardLogo}
            height="100"
            className="logo"
            alt="Password Wizard logo"
          />
        </div>

        <h1>Password Wizard</h1>

        <div className="intro">
          <Intro />
        </div>

        <div className="password-options">
          <button
            onClick={() => setPasswordType("simple")}
            className={`password-button ${
              passwordType === "simple" ? "active" : ""
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setPasswordType("balanced")}
            className={`password-button ${
              passwordType === "balanced" ? "active" : ""
            }`}
          >
            Balanced
          </button>
          <button
            onClick={() => setPasswordType("strong")}
            className={`password-button ${
              passwordType === "strong" ? "active" : ""
            }`}
          >
            Strong
          </button>
          <button
            onClick={() => setPasswordType("cipher")}
            className={`password-button ${
              passwordType === "cipher" ? "active" : ""
            }`}
          >
            Cipher
          </button>
        </div>

        <div className="password-output">{renderPasswordComponent()}</div>
      </div>
    </div>
  );
}

export default App;