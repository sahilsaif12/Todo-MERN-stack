import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Task } from './Task'
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid'
import appContext from '../Context/AppContext';
export const Home = () => {
    const {addTodo,getTodos,getInProgressTodos,getDoneTodos,todos,settodos,inProgressTodos,doneTodos,updateTodo,updatePosition,currentUser} = useContext(appContext)

    useEffect(() => {
        //   getTodos()
    //   getInProgressTodos()
    //   getDoneTodos()
    
      
    }, [])
    
  
    let initial = {
        todo: {
            title: 'ToDo',
            items: todos
        },
        inProcess: {
            title: 'In Process',
            items: inProgressTodos
        },
        done: {
            title: 'Completed',
            items: doneTodos
        }
    }
    const [state, setstate] = useState(initial)
    const [text, settext] = useState('')

    let headingColor = (title) => {
        switch (title) {
            case "ToDo":
                return "grey"
                break;
            case "In Process":
                return "purple"
                break;
            case "Completed":
                return "green"
                break;

            default:
                break;
        }
    }

    let handleDragEnd = ({ destination, source ,draggableId}) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        if ( destination.droppableId !== source.droppableId) {
            switch (destination.droppableId) {
                case "todo":
                    updateTodo({user:currentUser.uid,inProgress:"false",done:"false"},draggableId)
                    break;
                case "inProcess":
                    updateTodo({user:currentUser.uid,inProgress:"true",done:"false"},draggableId)
                    break;
                case "done":
                    updateTodo({user:currentUser.uid,inProgress:"false",done:"true"},draggableId)
                    break;
    
                default:
                    break;
        }
    }
        // Creating a copy of item before removing it from state
        const itemCopy = { ...state[source.droppableId].items[source.index] }
        setstate(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)
            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            return prev
        })
        state[destination.droppableId].items.map((item,index)=>{
            updatePosition({user:currentUser.uid,position:index+1},item._id)
        })

    }

    let addingTodo=(e) => {
        e.preventDefault()
        setstate(prev=>{
            return{
                ...prev,
                todo:{
                    title:"ToDo",
                    items:[
                        {
                            _id:v4(),
                            text:text,
                            inProgress:false,
                            done:false,
                        },
                        ...prev.todo.items
                    ]
                }
            }
        })

        let date=Date()
        addTodo(text,false,false,1,date)
        settext('')
    }
    return (
        <div>
            <Navbar />
            <div className="container center pt-4 flex-column">
                <form className="w-50 center" onSubmit={addingTodo}>
                    <input class="form-control border border-info" type="text" value={text} onChange={(e) => settext(e.target.value)}  placeholder="Add a ToDo" />
                    <button type="button" onClick={addingTodo} class="btn btn-sm rounded btn-info" style={{ fontSize: "16px", textTransform: "capitalize" }}>Create</button>
                </form>

                <div className='row w-100 pt-4 justify-content-center text-white'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {
                            _.map(state, (data, key) => {
                                return (
                                    <div className="col-md-3 mx-1 rounded-lg  ">
                                        <div className={`${headingColor(data.title)} p-2 h6 w-100 rounded-lg`}>{data.title}</div>
                                        <Droppable
                                            droppableId={key}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div className="scrollbar" ref={provided.innerRef} {...provided.droppableProps} style={{ height: "75vh", overflow: "scroll" }}>
                                                        {
                                                            data.items.map((item, index) => {
                                                                return (
                                                                    <Draggable key={item._id}
                                                                        index={index}
                                                                        draggableId={item._id}>
                                                                        {
                                                                            (provided, snapshot) => {
                                                                                return (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}>
                                                                                        <Task title={item.text} id={item._id} inProgress={item.inProgress} done={item.done} date={item.date}  />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Draggable>
                                                                )
                                                            })
                                                        }
                                                        {provided.placeholder}
                                                    </div>
                                                )
                                            }}
                                        </Droppable>
                                    </div>
                                )
                            })
                        }
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}
