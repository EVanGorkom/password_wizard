import { useState } from "react";
import wizardLogo from "./assets/password_wizard_logo_2.png";
import "./App.css";
import { Intro } from "./components/Intro/intro.tsx";
import { SimplePassword } from "./components/SimplePassword/simplePassword.tsx";
import { BalancedPassword } from "./components/BalancedPassword/balancedPassword.tsx";
import { StrongPassword } from "./components/StrongPassword/strongPassword.tsx";
import { CipherPassword } from "./components/CipherPassword/cipherPassword.tsx";

function App() {
  const [mode, setMode] = useState<"random" | "custom">("random");
  const [passwordType, setPasswordType] = useState<
    "simple" | "balanced" | "strong" | "cipher"
  >("simple");
  const [cipherInput, setCipherInput] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generateTrigger, setGenerateTrigger] = useState(false);

  const handleCipherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCipherInput(event.target.value);
  };

  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      alert("Password copied to clipboard!");
    }
  };

  const handleSavePassword = () => {
    // Implement save logic here
  };

  const renderPasswordComponent = () => {
    switch (passwordType) {
      case "simple":
        return <SimplePassword 
          onPasswordGenerate={setGeneratedPassword} 
          triggerGenerate={generateTrigger}
        />;
      case "balanced":
        return <BalancedPassword onPasswordGenerate={setGeneratedPassword} />;
      case "strong":
        return <StrongPassword onPasswordGenerate={setGeneratedPassword} />;
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
            <CipherPassword
              userInput={cipherInput}
              onPasswordGenerate={setGeneratedPassword}
            />
          </div>
        );
      default:
        return <SimplePassword onPasswordGenerate={setGeneratedPassword} />;
    }
  };

  const handleGeneratePassword = () => {
    setGenerateTrigger((prev) => prev + 1);
    // switch (passwordType) {
    //   case "simple":
    //   case "balanced":
    //   case "strong":
    //   case "cipher":
    //     // The `onPasswordGenerate` function in each component will handle generation
    //     break;
    //   default:
    //     console.error("Unknown password type");
    // }
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

        {/* Toggle Switch */}
        <div className="toggle-container">
          <span className="toggle-label">Random</span>
          <button
            className={`toggle-btn ${mode === "random" ? "random" : "custom"}`}
            onClick={() => {
              setMode(mode === "random" ? "custom" : "random");
              setPasswordType(mode === "random" ? "cipher" : "simple");
            }}
          >
            <div className="thumb"></div>
          </button>
          <span className="toggle-label">Custom</span>
        </div>

        {/* Button Group */}
        <div className="password-options">
          {mode === "random" && (
            <>
              <button
                onClick={() => setPasswordType("simple")}
                className={`password-button-rdm ${
                  passwordType === "simple" ? "active" : ""
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setPasswordType("balanced")}
                className={`password-button-rdm ${
                  passwordType === "balanced" ? "active" : ""
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => setPasswordType("strong")}
                className={`password-button-rdm ${
                  passwordType === "strong" ? "active" : ""
                }`}
              >
                Strong
              </button>
            </>
          )}
          {mode === "custom" && (
            <button
              onClick={() => setPasswordType("cipher")}
              className={`password-button-custom ${
                passwordType === "cipher" ? "active" : ""
              }`}
            >
              Cipher
            </button>
          )}
        </div>

        {/* Dynamically Rendered Password Component */}
        {/* <div className="password-output-box">{renderPasswordComponent()}</div> */}
        <div className="password-output-box">{renderPasswordComponent()}</div>
        <div className="password-row">
          <button className="generate-button" onClick={handleGeneratePassword}>
            Generate
          </button>
          <div className="password-display">{generatedPassword}</div>
        </div>

        {/* Button and Password Output Row */}
        {/* <div className="password-row">
          <button className="generate-button" onClick={handleGeneratePassword}>
            Generate
          </button>
          <div className="password-display">{generatedPassword}</div> */}
          <button className="copy-button" onClick={handleCopyToClipboard}>
            Copy
          </button>
          <button className="save-button" onClick={handleSavePassword}>
            Save
          </button>
        </div>
      </div>
    // </div>
  );
}

export default App;
