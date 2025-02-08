import { useState } from "react";
import wizardLogo from "./assets/password_wizard_logo_2.png";
import copy_icon from "./assets/copy-icon.png"
import "./App.css";
import { Intro } from "./components/Intro/intro.tsx";
import { SimplePassword } from "./components/SimplePassword/simplePassword.tsx";
import { BalancedPassword } from "./components/BalancedPassword/balancedPassword.tsx";
import { StrongPassword } from "./components/StrongPassword/strongPassword.tsx";
import { CustomPassword } from "./components/CustomPassword/customPassword.tsx";


function App() {
  const [mode, setMode] = useState<"random" | "custom">("random");
  const [passwordType, setPasswordType] = useState<
    "simple" | "balanced" | "strong" | "custom"
  >("simple");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generateTrigger, setGenerateTrigger] = useState(0);
  const [passwordBank, setPasswordBank] = useState<string[]>([]); 


  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      alert("Password copied to clipboard!");
    }
  };

  const handleSavePassword = () => {
    if (generatedPassword && !passwordBank.includes(generatedPassword)) {
      setPasswordBank((prev) => [...prev, generatedPassword]);
    }
  };

  const handleDownloadWordBank = () => {
    const blob = new Blob([passwordBank.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "password_wizard_bank.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGeneratePassword = () => {
    setGenerateTrigger((prev) => prev + 1);
  };

  const renderPasswordComponent = () => {
    if (mode === "custom") {
      return (
        <CustomPassword
          onPasswordGenerate={setGeneratedPassword}
          triggerGenerate={generateTrigger}
        />
      );
    } else {
      switch (passwordType) {
        case "simple":
          return (
            <SimplePassword
              onPasswordGenerate={setGeneratedPassword}
              triggerGenerate={generateTrigger}
            />
          );
        case "balanced":
          return (
            <BalancedPassword
              onPasswordGenerate={setGeneratedPassword}
              triggerGenerate={generateTrigger}
            />
          );
        case "strong":
          return (
            <StrongPassword
              onPasswordGenerate={setGeneratedPassword}
              triggerGenerate={generateTrigger}
            />
          );
        default:
          return (
            <SimplePassword
              onPasswordGenerate={setGeneratedPassword}
              triggerGenerate={generateTrigger}
            />
          );
      }
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

        {/* <h1>Password Wizard</h1> */}

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
              setPasswordType(mode === "random" ? "custom" : "simple");
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
            </>
          )}
        </div>

        {/* Dynamically Rendered Password Component */}
        <div className="password-output-box">{renderPasswordComponent()}</div>
        <div className="password-row">
          <button className="btn" onClick={handleGeneratePassword}>
            Generate
          </button>
          <div className="password-display">{generatedPassword}</div>
          <button className="btn" onClick={handleCopyToClipboard}>
            <img src={copy_icon} height="17px" />
          </button>
          <button className="btn" onClick={handleSavePassword}>
            Save
          </button>
        </div>

        {/* Word Bank */}
        {passwordBank.length > 0 && (
          <div className="password-bank">
            <hr/>
            <h3>Saved Passwords:</h3>
            <textarea
              readOnly
              className="password-bank-textarea"
              value={passwordBank.join("\n")}
            />
            <button
              className="download-button"
              onClick={handleDownloadWordBank}
            >
              Download Word Bank
            </button>
          </div>
        )}
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
