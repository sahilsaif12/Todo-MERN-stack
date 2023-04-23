import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";


export default function AppState(props) {
  const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('userData')))
  const [todos, settodos] = useState([])
  const [inProgressTodos, setinProgressTodos] = useState([])
  const [doneTodos, setdoneTodos] = useState([])
  let navigate = useNavigate()
  let host = "http://localhost:5000/api"

  useEffect(() => {
    getTodos()
    getInProgressTodos()
    getDoneTodos()
  }, [])


  let signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)

      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setcurrentUser(user)
        localStorage.setItem('userData', JSON.stringify(user));
        // IdP data available using getAdditionalUserInfo(result)

        navigate('/')

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const getTodos = async () => {
    //Api call
    const response = await fetch(`${host}/todos/fetchtodos/${currentUser.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let todos = await response.json();
    todos.sort((a, b)=> {
      let p1 = a.position, p2 = b.position;
      return p1-p2
    });
    settodos(todos)
  }

  const getInProgressTodos = async () => {
    //Api call
    const response = await fetch(`${host}/todos/inProgressTodos/${currentUser.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    let todos = await response.json();
    todos.sort((a, b)=> {
      let p1 = a.position, p2 = b.position;
      return p1-p2
    });
    setinProgressTodos(todos)
  }

  const getDoneTodos = async () => {
    //Api call
    const response = await fetch(`${host}/todos/donetodos/${currentUser.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let todos = await response.json();
    todos.sort((a, b)=> {
      let p1 = a.position, p2 = b.position;
      return p1-p2
    });
    setdoneTodos(todos)
  }


  const addTodo = async (text, inProgress, done, position, date) => {
    //Api call
    const response = await fetch(`${host}/todos/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ user: currentUser.uid, text, inProgress, done, position, date })
    });

    let todo = await response.json();
    settodos(prev=>{
      return [todo,...prev]
    })
    // getTodos()
    // settodos(todo.concat(todos))
    // settodos(todos[0]=todo)
    // settodos(todos.unshift(todo))
  }

  const updateTodo = async (data, id) => {
    //Api call
    const response = await fetch(`${host}/todos/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)

    });
    let updatedTodo = await response.json();
      getTodos()
      getInProgressTodos()
      getDoneTodos()
  }

  const updatePosition = async (data, id) => {
    //Api call
    const response = await fetch(`${host}/todos/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)

    });
    let updatedTodo = await response.json();
  }


  const deleteTodo = async (id) => {
    //Api call
    const response = await fetch(`${host}/todos/deletetodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user:currentUser.uid})
    });
    getTodos()
    getInProgressTodos()
    getDoneTodos()
  }
  return (
    <AppContext.Provider value={{ signIn, currentUser, setcurrentUser, addTodo, getTodos, getInProgressTodos, getDoneTodos, todos, inProgressTodos, doneTodos, updateTodo,deleteTodo,updatePosition ,settodos}}>
      {props.children}
    </AppContext.Provider>
  )
}
