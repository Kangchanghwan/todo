import Typography from '@mui/material/Typography';

import {styled} from '@mui/material/styles';

import {lightBlue, pink, grey} from '@mui/material/colors';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import CheckIcon from '@mui/icons-material/CheckCircleOutline';

import UndoIcon from '@mui/icons-material/Undo';

import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

type Props = {
    todos: Todo[];
    filter: Filter;
    onEdit: (id: number, text: string) => void;
    onCheck: (id: number, checked: boolean) => void;
    onRemove: (id: number, removed: boolean) => void;
};

const Container = styled('div')({

    margin: '0 auto',

    maxWidth: '640px',

    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',

});

const TodoCard = styled(Card)(({theme}) => ({

    marginTop: theme.spacing(1),

    marginLeft: theme.spacing(2),

    marginRight: theme.spacing(2),

    padding: theme.spacing(1),

    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',

}));

const Form = styled('div')(({theme}) => ({

    marginTop: theme.spacing(1),

    marginLeft: theme.spacing(1),

    marginRight: theme.spacing(1),

    fontSize: '16px',

}));

const ButtonContainer = styled('div')(({theme}) => ({

    marginTop: theme.spacing(1),

    display: 'flex',

    flexDirection: 'row',

    justifyContent: 'space-between',

}));

const Button = styled('button')(() => ({

    display: 'flex',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    background: 'none',

    border: 'none',

    cursor: 'pointer',

    outline: 'none',

}));

const Trash = styled('button')(() => ({

    background: 'none',

    border: 'none',

    cursor: 'pointer',

    outline: 'none',

}));

export const TodoItem = (props: Props) => {
    const filteredTodos = props.todos.filter((todo) => {
        switch (props.filter) {
            case 'all':
                return !todo.removed;
            case 'checked':
                return todo.checked && !todo.removed;
            case 'unchecked':
                return !todo.checked && !todo.removed;
            case 'removed':
                return todo.removed;
            default:
                return todo;
        }
    });
    return (
        <Container>
            {filteredTodos.map((todo) => {
                return (
                    <TodoCard key={todo.id}>
                        <Form>
                            <TextField
                                fullWidth
                                variant="standard"
                                value={todo.value}
                                onChange={(e) => props.onEdit(todo.id, e.target.value)}
                                disabled={todo.checked || todo.removed}
                            />
                        </Form>
                        <ButtonContainer>
                            <Button
                                onClick={() => props.onCheck(todo.id, todo.checked)}
                                disabled={props.filter === 'removed'}
                                aria-label="check"
                            >
                                {todo.checked ? (
                                    <CheckIcon
                                        style={{
                                            color: props.filter !== 'removed' ? pink.A200 : grey[500],
                                        }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedIcon
                                        style={{
                                            color:
                                                props.filter !== 'removed' ? lightBlue[500] : grey[500],
                                        }}
                                    />
                                )}
                                <Typography
                                    style={{
                                        userSelect: 'none', color:
                                            todo.checked && props.filter !== 'removed'
                                                ? pink.A200
                                                : grey[500],
                                    }}
                                >
                                    완료
                                </Typography>
                            </Button>
                            <Trash
                                onClick={() => props.onRemove(todo.id, todo.removed)}
                                aria-label="trash"
                            >
                                {todo.removed ? (
                                    <UndoIcon style={{color: lightBlue[500]}}/>
                                ) : (
                                    <DeleteIcon style={{color: grey[500]}}/>
                                )}
                            </Trash>
                        </ButtonContainer>
                    </TodoCard>
                );
            })}
        </Container>);
};