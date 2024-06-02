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

export { generateClue, getBackgroundColor };
