import './App.css';
import React, { useState, useEffect } from 'react';
import  {Button, FormControl, InputLabel, Input}  from '@material-ui/core';
import Todo from './Todo';
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads, we need to listen to the database and fetch new todos as they added/removed

  useEffect(() => {
    //this code here fire when the app.js loads

     db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => { //snapshot mean every time database changed or something :v
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))) //docs meaning to every single fucking thing u added into database
     })                                                   //setTodos(snapshot.docs.map(doc => doc.data().todo)) string stuff      
    
  }, []); //if we write input right here then every time input changed it will fire the useEffect
              // if we write it like [] then when we refresh the page it just fire one time and never fire again

  const addTodo = (event) => {
    //this will fire off when we click the button

    event.preventDefault(); //will stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //setTodos([...todos, input]); //keep the old array and push the input value into todos array with the last position
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello Creator</h1>
      <form>

        <FormControl>
          <InputLabel>Write it bitch</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add todo
        </Button>
        
        
        <ul>
          {/* todos is array ---- todo is each item in the array 
          
          so basically the todos.map(todo) do is go through the arrays and take the first item
          of the array and put it in the () after '=>'
          
          */}        
          {todos.map(todo => (
            <Todo todo={todo} /> //because it turn into object that why we need to change that, if not just text={todo}
          ))}
        </ul>
      </form>
      
    </div>
  );
}

export default App;
