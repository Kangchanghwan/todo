import List from '@mui/material/List';

import Avatar from '@mui/material/Avatar';

import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';

import ListItemText from '@mui/material/ListItemText';

import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

import SubjectIcon from '@mui/icons-material/Subject';

import CreateIcon from '@mui/icons-material/CreateRounded';

import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import {styled} from '@mui/material/styles';

import {indigo, lightBlue, pink} from '@mui/material/colors';

import pjson from '../package.json';

type Props = {
    drawerOpen: boolean;
    onToggleDrawer: () => void;
    onSort: (filter: Filter) => void;
    onToggleQR :() => void;
};

const DrawerList = styled('div')(() => ({

    width: 250,

}));

const DrawerHeader = styled('div')(() => ({

    height: 150,

    display: 'flex',

    flexDirection: 'column',

    justifyContent: 'center',

    alignItems: 'center',

    padding: '1em',

    backgroundColor: indigo[500],

    color: '#ffffff',

    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',

}));

const DrawerAvatar = styled(Avatar)(({theme}) => ({

    backgroundColor: pink[500],

    width: theme.spacing(6),

    height: theme.spacing(6),

}));

const IconUnChecked = styled(RadioButtonUncheckedIcon)(() => ({

    color: lightBlue[500],

}));

const IconCompleted = styled(CheckCircleIcon)(() => ({

    color: pink.A200,

}));

export const SideBar = (props: Props) => {

    return (<Drawer

            variant="temporary"

            open={props.drawerOpen}

            onClose={props.onToggleDrawer}

        ><DrawerList role="presentation" onClick={props.onToggleDrawer}>

            <DrawerHeader>

                <DrawerAvatar>

                    <CreateIcon/>

                </DrawerAvatar>

                <p>할일 v{pjson.version}</p>

            </DrawerHeader>

            <List>

                <ListItem button onClick={() => props.onSort('all')} aria-label="all">

                    <ListItemIcon>

                        <SubjectIcon/>

                    </ListItemIcon>

                    <ListItemText secondary="모든 할일"/>

                </ListItem>

                <ListItem

                    button

                    onClick={() => props.onSort('unchecked')}

                    aria-label="incomplete"

                >

                    <ListItemIcon>

                        <IconUnChecked/>

                    </ListItemIcon>

                    <ListItemText secondary="현재 할일"/>

                </ListItem>

                <ListItem

                    button

                    onClick={() => props.onSort('checked')}

                    aria-label="complete" // 요소 식별자..
                >

                    <ListItemIcon>

                        <IconCompleted/>

                    </ListItemIcon>

                    <ListItemText secondary="완료된 할일"/>

                </ListItem>

                <ListItem

                    button

                    onClick={() => props.onSort('removed')}

                    aria-label="removed"

                ><ListItemIcon>

                    <DeleteIcon/>

                </ListItemIcon>

                    <ListItemText secondary="휴지통"/>

                </ListItem>
                
                
                <Divider/>
                <ListItem

                    button

                    onClick={props.onToggleQR}

                    aria-label="share"

                ><ListItemIcon>

                    <ShareIcon/>

                </ListItemIcon>

                    <ListItemText secondary="이 앱 공유하기"/>

                </ListItem>
            </List>

        </DrawerList>

        </Drawer>

    );

};

    