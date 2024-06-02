// src/components/TargetWordInput.tsx
import { Box, TextField, Button } from "@mui/material";

interface TargetWordInputProps {
    targetWord: string;
    handleTargetWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSetTargetWord: () => void;
}

const TargetWordInput: React.FC<TargetWordInputProps> = ({
    targetWord,
    handleTargetWordChange,
    handleSetTargetWord,
}) => (
    <Box marginBottom={2} display="flex" alignItems="baseline">
        <TextField
            type="text"
            value={targetWord}
            onChange={handleTargetWordChange}
            sx={{ marginRight: 1 }}
            inputProps={{ maxLength: 5 }}
            helperText="Enter target word"
        />
        <Button variant="contained" onClick={handleSetTargetWord}>
            Set Target Word
        </Button>
    </Box>
);

export default TargetWordInput;
