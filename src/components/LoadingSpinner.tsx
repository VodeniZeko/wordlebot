import { CircularProgress } from "@mui/material";

const spinnerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
};

const LoadingSpinner = () => {
    return (
        <div style={spinnerStyles}>
            <CircularProgress color="primary" />
        </div>
    );
};

export default LoadingSpinner;
