import React from "react";
import { getBackgroundColor } from "../utils/helpers";

interface LetterButtonProps {
    letter: string;
    backgroundColor: string;
}

const buttonStyles = {
    padding: "15px",
    margin: "5px",
    border: "none",
    cursor: "pointer",
    outline: "none",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
};

const LetterButton: React.FC<LetterButtonProps> = ({ letter, backgroundColor }) => {
    return <button style={{ ...buttonStyles, backgroundColor }}>{letter}</button>;
};

export default LetterButton;
