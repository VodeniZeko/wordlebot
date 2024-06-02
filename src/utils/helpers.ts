import { errorMessageMapping } from "./errorMessages";

const generateClue = (guess: string, target: string) => {
    return guess
        .split("")
        .map((letter, index) => {
            if (letter === target[index]) {
                return "g";
            } else if (target.includes(letter)) {
                return "y";
            } else {
                return "x";
            }
        })
        .join("");
};

const getBackgroundColor = (clue: string) => {
    switch (clue) {
        case "g":
            return "green";
        case "y":
            return "yellow";
        case "x":
            return "white";
        default:
            return "white";
    }
};

const mapErrorMessage = (apiErrorMessage: string) => {
    if (errorMessageMapping.hasOwnProperty(apiErrorMessage)) {
        return errorMessageMapping[apiErrorMessage];
    }
    return apiErrorMessage;
};

const isLastMessage = (message: string): boolean => {
    const keys = Object.keys(errorMessageMapping);
    const lastKey = keys[keys.length - 1];
    return errorMessageMapping[lastKey] === message;
};

export { generateClue, getBackgroundColor, mapErrorMessage, isLastMessage };
