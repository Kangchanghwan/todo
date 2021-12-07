import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

type Props = {
    text: string;
    dialogOpen: boolean;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onToggleDialog: () => void;
};
export const FormDialog = (props: Props) => {

    return (

        <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    props.onSubmit();
                }}
            >
                <div style={{margin: '1em'}}>
                    <TextField
                        variant="standard"
                        style={{
                            width: '100%',

                            fontSize: '16px',
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',

                        }}

                        label="할일 입력..."

                        onChange={(e) => props.onChange(e)}

                        value={props.text}

                        autoFocus

                    />

                    <DialogActions>
                        <Button color="secondary"
                                onClick={props.onSubmit} aria-label="add">
                            추가
                        </Button>
                    </DialogActions>
                </div>
            </form>
        </Dialog>
    );

};