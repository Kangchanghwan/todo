import React, {useState, useEffect} from 'react';
import {FormDialog} from './FormDialog';
import {TodoItem} from "./TodoItem";
import {ToolBar} from './ToolBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {indigo, pink} from '@mui/material/colors';
import { SideBar } from './SideBar';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';
import * as localforage from "localforage";
import {isTodos} from'./lib/isTodos'
// 훅사용을 위한 임포트

// 테마 만들기

const theme = createTheme({

    palette: {

        primary: {

            main: indigo[500],

            light: '#757de8',

            dark: '#002984',

        },

// 보조색상도 v4로
        secondary: {
            main: pink[500],

            light: '#ff6090',

            dark: '#b0003a',

        },

    },

});
// Todo 타입을 선언 해당 타입은
//  string type을 가지는 value와
// number type을 가지는 id를 가진다.
export const App = ():JSX.Element=> {
  
    
    const [alertOpen, setAlertOpen] = useState(false);
    const [qrOpen,setQrOpen] = useState(false);
    const [filter, setFilter] = useState<Filter>('all');
    const [drawerOpen,setDrawerOpen] = useState(false);
    const [text, setText] = useState('');
    const [dialogOpen,setDialogOpen] = useState(false);
    //hook 사용
    // 메모리에 값을 저장하는 기능이며 객체를 따로 선언하지 않고 위와 같이 간단한 선언으로
    // setText를 사용할 수 있다.
    const [todos, setTodos] = useState<Todo[]>([]);
    // todo[] 을 가지는 hook선언
    /*
  * 키명 'todo-20210101'의 데이터 얻기
  *      제 2인수 배열이 비어있기 때문에 컴포넌트 마운트할때만 실행됨
  * */
    useEffect(() => {
        localforage
            .getItem('todo-20210101')
            .then((values) => isTodos(values) && (setTodos(values)))
            .catch((err) => console.error(err));
    }, []);
    /**

     * todos 상태가 업데이트되면 해당 값 저장

     */
    useEffect(() => {
        localforage
            .setItem('todo-20210101', todos)
            .catch((err) => console.error(err));
    }, [todos]);
    const onToggleAlert= () => setAlertOpen(!alertOpen);
    const onToggleDialog = () =>{
        setDialogOpen(!dialogOpen); 
        setText('')};
    const onToggleQR = () => setQrOpen(!qrOpen);
    const onToggleDrawer = () => setDrawerOpen(!drawerOpen);
    const handleOnSort = (filter : Filter) => {
        setFilter(filter);
    }
    const handleOnEmpty = () => {
        //앏은 복사
        const newTodos = todos.filter((todo: Todo) => {
            return !todo.removed
        })
        setTodos(newTodos);
    };
    const handleOnCheck = (id: number, checked: boolean) => {
        const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
        const newTodos = deepCopy.map((todo) => {
            if (todo.id === id) {
                todo.checked = !checked;
            }
            return todo;
        })
        setTodos(newTodos);
    }
    const filteredTodos = todos.filter((todo: Todo) => {
        switch (filter) {
            case 'all':
                //삭제되지 않은 모든 할일
                return !todo.removed;
            case 'checked':
                //완료됨 및 삭제 되지 않은 항목;
                return todo.checked && !todo.removed;
            case 'unchecked':
                // 미완료 및 삭제되지 않은 할일 항목
                return !todo.checked && !todo.removed;
            case 'removed':
                return todo.removed;
            default:
                todo;
        }
    })
    const handleOnRemove = (id: number, removed: boolean) => {
        const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
        const newTodos = deepCopy.map((todo) => {
            if (todo.id === id) {
                todo.removed = !removed;
            }
            return todo;
        })
        setTodos(newTodos);
    }

    const handleOnEdit = (id: number, value: string) => {
        // 콜백 함수 id와 value를 인수로 가진다.
        let deepCopy: Todo[];
                deepCopy = JSON.parse(JSON.stringify(todos));

        const newTodos = deepCopy.map((e: Todo) => {
            // map은 새로 객체를 할당해주믄 불변함수디ㅏ.
            if (e.id === id) {
                e.value = value;
            } // Todos 의 요소들의 id와 매개변수로 받은 id 값을 비교하여
            // 해당 요소의 값을 매개변수로 받은 값으로 변경한다.
            return e;
            // 해당 매개 변수를 반환.
        });
        console.log('=====Original todos====');
        todos.map((todo: Todo) => console.log(`id: ${todo.id}, value: ${todo.value} checked : ${todo.checked}`))
        setTodos(newTodos);
        // map을 통하여 새로 만들어진 Todos를 훅을 통하여 값을 변경시킨다
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const handleOnSubmit = () => {
        if (!text) {
            setDialogOpen(false);
            return;
        }
        
        const newTodo: Todo = {
            value: text,
            id: new Date().getTime(),
            checked: false,
            removed: false
        };
        setTodos([newTodo, ...todos]);
        setText('');
        setDialogOpen(false);
    };
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{body: {margin: 0, padding: 0}}}/>
            <ToolBar filter={filter} onToggleDrawer={onToggleDrawer}/>
            <SideBar drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} onSort={(filter : Filter) => handleOnSort(filter)} onToggleQR={onToggleQR}/>
            <FormDialog
                text={text} 
                onChange={(e) => handleOnChange(e)} 
                onSubmit={handleOnSubmit}
                dialogOpen={dialogOpen}
                onToggleDialog={onToggleDialog}
                
            />
            <AlertDialog
                alertOpen={alertOpen}
                onEmpty={handleOnEmpty}
                onToggleAlert={onToggleAlert}

            />
            <QR open={qrOpen} onClose={onToggleQR}/>
            <TodoItem todos={todos}
                      filter={filter} 
                      onEdit={handleOnEdit}
                      onCheck={handleOnCheck}
                      onRemove={handleOnRemove}/>
            <ActionButton
                todos={todos}
                filter={filter}
                alertOpen={alertOpen}
                dialogOpen={dialogOpen}
                onToggleAlert={onToggleAlert}
                onToggleDialog={onToggleDialog}
            />
        </ThemeProvider>
    )
        ;
};