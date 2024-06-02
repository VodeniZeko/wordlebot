import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

interface PopupProps {
    open: boolean;
    onClose: () => void;
}

const howToImage = require("../assets/how-to.jpg");

const Popup: React.FC<PopupProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <img src={howToImage} alt="image_with_tips" />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
