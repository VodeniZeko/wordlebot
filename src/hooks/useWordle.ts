import { useState, useEffect } from "react";
import axios from "axios";

import { mapErrorMessage, isLastMessage } from "../utils/helpers";
import { WordleRequestItem, WordleResponse } from "../utils/types";
import { API_URL } from "../utils/constants";

const useWordle = () => {
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [guesses, setGuesses] = useState<WordleRequestItem[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [clue, setClue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSolved, setIsSolved] = useState<boolean>(false);
    const [targetWord, setTargetWord] = useState<string>("");
    const [isTargetWordSet, setIsTargetWordSet] = useState<boolean>(false);

    useEffect(() => {
        if (isTargetWordSet) {
            fetchInitialGuess();
        } else setIsPopupVisible(true);
    }, [isTargetWordSet]);

    const closePopup = () => setIsPopupVisible(false);

    const fetchInitialGuess = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post<WordleResponse>(API_URL, []);
            setCurrentGuess(response.data.guess);
            setIsLoading(false);
        } catch (error: any) {
            const errMessage = mapErrorMessage(error.response?.data);
            setError(errMessage);
            setIsFailed(isLastMessage(errMessage));
            setIsLoading(false);
        }
    };

    const handleSubmitClue = async () => {
        if (clue.length !== 5 || !/^[gyxGYX]{5}$/.test(clue)) {
            setError("Clue must be 5 characters long and contain only g, y, or x.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const newGuesses = [...guesses, { word: currentGuess, clue }];
        try {
            const response = await axios.post<WordleResponse>(API_URL, newGuesses);
            const nextGuess = response.data.guess;
            setCurrentGuess(nextGuess);
            setClue("");
            setGuesses(newGuesses);
            setIsSubmitting(false);
            checkGameStatus(newGuesses);
        } catch (error: any) {
            const errMessage = mapErrorMessage(error.response?.data);
            setError(errMessage);
            setIsFailed(isLastMessage(errMessage));
            setIsSubmitting(false);
        }
    };

    const checkGameStatus = (guesses: WordleRequestItem[]) => {
        const lastClue = guesses[guesses.length - 1].clue.toLowerCase();
        if (lastClue === "ggggg") {
            setIsSolved(true);
        } else if (guesses.length === 5) {
            setError("All attempts used. Game over!");
        }
    };

    return {
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
        checkGameStatus,
        setError,
    };
};

export default useWordle;
