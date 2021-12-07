import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';

import {styled} from '@mui/material/styles';

type Props = {
    alertOpen: boolean;
    onEmpty: () => void;
    onToggleAlert: () => void;
}
const Alert = styled(Dialog)(() => ({

    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',

}));

export const AlertDialog = (props: Props) => {

    return (

        <Alert open={props.alertOpen} onClose={props.onToggleAlert}>

            <DialogTitle>경고</DialogTitle>

            <DialogContent>

                <DialogContentText>

                    휴지통을 완전히 비우시겠습니까?

                </DialogContentText>

                <DialogContentText>이를 실행시 취소할 수 없습니다.</DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={props.onToggleAlert}

                    color="primary"

                    aria-label="cancel"

                >

                    취소

                </Button>

                <Button

                    onClick={() => {

                        props.onToggleAlert();

                        props.onEmpty();

                    }}

                    color="secondary"

                    aria-label="ok"

                    autoFocus

                >

                    확인

                </Button>

            </DialogActions>
        </Alert>

    );

};