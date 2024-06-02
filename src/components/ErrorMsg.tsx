import { Box } from "@mui/material";

interface ErrorMessageProps {
    message: string | null;
}

const errStyles = {
    color: "red",
    fontSize: "14px",
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Box
            marginTop={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={errStyles}
        >
            {message}
        </Box>
    );
};

export default ErrorMessage;
