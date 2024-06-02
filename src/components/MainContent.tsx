import { Box } from "@mui/material";

import MainContentBody from "./MainContentBody";
import TargetWordInput from "./TargetWordInput";
import { WordleRequestItem } from "../utils/types";

interface MainContentProps {
    isSubmitting: boolean;
    isTargetWordSet: boolean;
    targetWord: string;
    currentGuess: string;
    clue: string;
    isSolved: boolean;
    guesses: WordleRequestItem[];
    handleClueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitClue: () => void;
    handleTargetWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSetTargetWord: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
    isSubmitting,
    isTargetWordSet,
    targetWord,
    currentGuess,
    clue,
    isSolved,
    guesses,
    handleClueChange,
    handleSubmitClue,
    handleTargetWordChange,
    handleSetTargetWord,
}) => (
    <Box display="flex" flexDirection="column" alignItems="center">
        <>
            {!isTargetWordSet ? (
                <TargetWordInput
                    targetWord={targetWord}
                    handleTargetWordChange={handleTargetWordChange}
                    handleSetTargetWord={handleSetTargetWord}
                />
            ) : (
                <MainContentBody
                    isSubmitting={isSubmitting}
                    targetWord={targetWord}
                    currentGuess={currentGuess}
                    clue={clue}
                    isSolved={isSolved}
                    guesses={guesses}
                    handleClueChange={handleClueChange}
                    handleSubmitClue={handleSubmitClue}
                />
            )}
        </>
    </Box>
);

export default MainContent;
