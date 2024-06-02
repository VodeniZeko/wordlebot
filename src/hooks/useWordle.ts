import { useState, useEffect } from "react";
import axios from "axios";

import { WordleRequestItem, WordleResponse } from "../utils/types";
import { API_URL } from "../utils/constants";

const useWordle = () => {
    const [guesses, setGuesses] = useState<WordleRequestItem[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [clue, setClue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSolved, setIsSolved] = useState<boolean>(false);
    const [targetWord, setTargetWord] = useState<string>("");
    const [isTargetWordSet, setIsTargetWordSet] = useState<boolean>(false);

    useEffect(() => {
        if (isTargetWordSet) {
            fetchInitialGuess();
        }
    }, [isTargetWordSet]);

    const fetchInitialGuess = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post<WordleResponse>(API_URL, []);
            setCurrentGuess(response.data.guess);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.response?.data);
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
            setError(error.response?.data);
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
        guesses,
        currentGuess,
        clue,
        isLoading,
        isSubmitting,
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
