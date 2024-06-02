import { Container, Box } from "@mui/material";

import Layout from "./components/Layout";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMsg";
import MainContent from "./components/MainContent";
import Popup from "./components/Popup";

import useWordle from "./hooks/useWordle";

function App() {
    const {
        isPopupVisible,
        closePopup,
        guesses,
        currentGuess,
        clue,
        isLoading,
        isSubmitting,
        isFailed,
        error,
        isSolved,
        targetWord,
        isTargetWordSet,
        setClue,
        setTargetWord,
        setIsTargetWordSet,
        handleSubmitClue,
        setError,
    } = useWordle();

    const handleClueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClue(e.target.value);
    };

    const handleTargetWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetWord(e.target.value);
    };

    const handleSetTargetWord = () => {
        if (targetWord.length !== 5 || !/^[a-zA-Z]{5}$/.test(targetWord)) {
            setError(
                "Target word must be 5 characters long and contain only alphabetic characters."
            );
            return;
        }
        setIsTargetWordSet(true);
        setError(null);
    };

    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <MainContent
                        isSubmitting={isSubmitting}
                        isTargetWordSet={isTargetWordSet}
                        targetWord={targetWord}
                        currentGuess={currentGuess}
                        clue={clue}
                        isSolved={isSolved}
                        isFailed={isFailed}
                        guesses={guesses}
                        handleClueChange={handleClueChange}
                        handleSubmitClue={handleSubmitClue}
                        handleTargetWordChange={handleTargetWordChange}
                        handleSetTargetWord={handleSetTargetWord}
                    />
                )}
                <hr />
                {isSolved && (
                    <Box marginTop={2} display="flex" flexDirection="column" alignItems="center">
                        Yay! All Done
                    </Box>
                )}
                <ErrorMessage message={error} />
                <Popup open={isPopupVisible} onClose={closePopup} />
            </Container>
        </Layout>
    );
}

export default App;
