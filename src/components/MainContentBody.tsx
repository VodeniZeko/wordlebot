import { Box, TextField, Button, CircularProgress } from "@mui/material";

import LetterButton from "./LetterButton";

import { generateClue, getBackgroundColor } from "../utils/helpers";
import { WordleRequestItem } from "../utils/types";

interface ContentProps {
    isSubmitting: boolean;
    targetWord: string;
    currentGuess: string;
    clue: string;
    isSolved: boolean;
    isFailed: boolean;
    guesses: WordleRequestItem[];
    handleClueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitClue: () => void;
}

const wordStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
};

const WordDisplay: React.FC<{ word: string; clue: string }> = ({ word, clue }) => (
    <div style={wordStyles}>
        {word.split("").map((letter, i) => (
            <LetterButton
                key={i}
                letter={letter}
                backgroundColor={i < clue.length ? getBackgroundColor(clue[i]) : "transparent"}
            />
        ))}
    </div>
);

const MainContentBody: React.FC<ContentProps> = ({
    isSubmitting,
    targetWord,
    currentGuess,
    clue,
    isSolved,
    isFailed,
    guesses,
    handleClueChange,
    handleSubmitClue,
}) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isSubmitting && !isSolved) {
            handleSubmitClue();
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box marginBottom={2}>
                <p>Word to Guess: {targetWord}</p>
            </Box>

            <Box marginBottom={2} display="flex" alignItems="baseline">
                <TextField
                    required
                    type="text"
                    value={clue}
                    onKeyPress={handleKeyPress}
                    onChange={handleClueChange}
                    placeholder="Enter clue (e.g., gxyxx)"
                    inputProps={{ maxLength: 5 }}
                    disabled={isSolved || guesses.length === 6 || isFailed}
                    helperText="Enter clue (e.g., gxyxx)"
                    sx={{ marginRight: 1 }}
                />
                <Button
                    onClick={handleSubmitClue}
                    variant="contained"
                    startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
                    disabled={isSubmitting || isSolved || isFailed}
                >
                    {!isSubmitting ? "Submit Clue" : "Submitting"}
                </Button>
            </Box>

            <Box marginBottom={2} display="flex" justifyContent="center">
                {generateClue(currentGuess, targetWord)
                    .split("")
                    .map((clueChar, index) => (
                        <LetterButton
                            key={index}
                            letter={currentGuess[index]}
                            backgroundColor={getBackgroundColor(clueChar)}
                        />
                    ))}
            </Box>

            <div>
                {[...guesses, { word: currentGuess, clue }]
                    .slice(0, -1)
                    .reverse()
                    .map((guess, index) => (
                        <WordDisplay key={index} word={guess.word} clue={guess.clue} />
                    ))}
            </div>
        </Box>
    );
};

export default MainContentBody;
