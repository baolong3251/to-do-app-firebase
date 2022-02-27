import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import "./Todo.css";
import { DeleteForever } from "@material-ui/icons"
import db from "./firebase"
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo.todo);

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });

        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >        
            <div className={classes.paper}>
                <h1>I am something</h1>
                <input value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>

        </Modal>
        <div className="List">
            <div className="ListItem">
                <List>
                    <ListItem>
                        <ListItemAvatar>
                        </ListItemAvatar>
                        <ListItemText primary={props.todo.todo} secondary="Bruh :v" /> {/*Firt todo is the object and second todo is textfield, still if string only then just props.text*/}
                    </ListItem>                                                                                                                                   
                </List>
            </div>
            <div>
                <Button onClick={e => setOpen(true)}>Edit</Button>
                <DeleteForever onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
            </div>
        </div>
        </>
    )
}

export default Todo
