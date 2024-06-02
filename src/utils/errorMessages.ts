export const errorMessageMapping: { [key: string]: string } = {
    "Invalid request: must have a valid state object as the HTTP body": "Empty request body",
    "Invalid request: state must be an array": "Request is not an array",
    "Invalid request: state must be an array with 0-5 items in it":
        "Passing in too many items (6 or more",
    "Invalid request: state item at index 0 is not a valid object": "Array entry is not an object",
    "Invalid request: state item at index 0 does not have a 'word' string property that is 5 characters long":
        "Array entry is missing 'word' field OR 'word' field is not a string OR 'word' field is not 5 characters long",
    "Invalid request: state item at index 0 has a 'word' string property with invalid characters":
        "'word' field is not 5 alpha (a-z, A-Z) characters",
    "Invalid request: state item at index 0 does not have a 'clue' string property that is 5 characters long":
        "Array entry is missing 'clue' field OR 'clue' field is not a string OR 'clue' field is not 5 characters long	",
    "Invalid request: state item at index 0 has a 'clue' string property with invalid characters":
        "'clue' field is not 5 clue (g, G, y, Y, x, X) characters",
    "Invalid request: state leaves no remaining words in the dictionary":
        "The requested items eliminates all the words in the dictionary (i.e. not solvable)",
};
