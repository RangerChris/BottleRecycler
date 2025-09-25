import { Typography, Box, Button, Modal } from "@mui/material";
import { Component } from "react";

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.main',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface InstructionsState {
    open: boolean;
}

class InstructionsComponent extends Component<object, InstructionsState> {
    state: InstructionsState = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                    <Button variant="contained" color="info" onClick={this.handleOpen}>Instructions</Button>
                </Box>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Instructions
                        </Typography>
                        <Box id="modal-modal-description" sx={{ mt: 2 }}>
                            <Typography paragraph>
                                The purpose of this game is to simulate a bottle recycling system.
                            </Typography>

                            <Typography paragraph>
                                You start with a certain amount of money and can hire recyclers to process bottles brought in by customers.
                                Each recycler can handle one customer at a time, and customers arrive randomly.
                                The more recyclers you have, the faster you can process bottles and earn money.
                            </Typography>

                            <Typography>
                                However, each recycler costs money to hire, so you need to balance your workforce with your budget.
                                The goal is to maximize your profits by efficiently managing your recyclers and handling customer demand.
                            </Typography>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default InstructionsComponent;
