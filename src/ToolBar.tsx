import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
    filter: Filter;
    onToggleDrawer: () => void;
}

export const ToolBar = (props: Props) => {

    const translator = (arg: Filter) => {
        switch (arg) {
            case 'all':
                return '모든 할일';
            case 'unchecked':
                return '현재 할일';
            case 'checked':
                return '완료된 할일';
            case 'removed':
                return '휴지통';
            default : 
                return '할일';
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={props.onToggleDrawer}
                        >
                        <MenuIcon/>
                    </IconButton>
                    <Typography>{translator(props.filter)}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};