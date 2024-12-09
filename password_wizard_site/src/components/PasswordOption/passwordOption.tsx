import React from "react";

interface PasswordOptionsProps {
    setPasswordType: (type: string) => void;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({
    setPasswordType,
    }) => {
    const handleOptionChange = (type: string) => {
        setPasswordType(type);
    };

    return (
        <div className="password-options">
            <button
                onClick={() => handleOptionChange("simple")}
                className="option-button"
            >
                Create Simple Password
            </button>
            <button
                onClick={() => handleOptionChange("jumble")}
                className="option-button"
            >
                Jumble My Password
            </button>
        </div>
    );
};

export default PasswordOptions;
