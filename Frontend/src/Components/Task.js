import React, { useContext, useRef, useState } from 'react'
import appContext from '../Context/AppContext'

export const Task = ({title,id,inProgress,done,date}) => {
const [disable, setdisable] = useState(true)
const [text, settext] = useState(title)
const [progressCheck, setprogressCheck] = useState(inProgress)
const [doneCheck, setdoneCheck] = useState(done)
const ref = useRef(null)
    const {updateTodo,currentUser,deleteTodo} = useContext(appContext)

    let startEditing=()=>{
        setdisable(false)
        ref.current.focus()
    }
    let updatingDone=()=>{
        
        if (done) {
            updateTodo({user:currentUser.uid,done:"false",inProgress:"false"},id)
        }else {
            updateTodo({user:currentUser.uid,done:"true",inProgress:"false"},id)
        }
    }
    let updatingInProgress=()=>{
        
        if (inProgress) {
            updateTodo({user:currentUser.uid,inProgress:"false",done:"false"},id)
        }else {
            updateTodo({user:currentUser.uid,inProgress:"true",done:"false"},id)
        }
    }

    let updatingText=(e)=>{
        e.preventDefault();
        updateTodo({user:currentUser.uid,text:text},id)
        setdisable(true)
    }
    return (
        <div draggable   className=' teal darken-3 my-1 p-1 rounded justify-content-start' style={{border:"2px solid #363636"}} >
        <form onSubmit={updatingText}>
            <input type="text" disabled={disable} ref={ref}  value={text} onChange={(e)=>settext(e.target.value)}  id="todoText" style={{background:"transparent",border:"none",outline:"none"}} class="form-contrl white-text text-left h5  mb-2"/>
        </form>

            {/* <div className='' >{title}</div> */}
            
            <div className='d-flex justify-content-around' >
                <div class="custom-control custom-checkbox"  onClick={updatingInProgress}>
                    <input checked={progressCheck} onChange={()=>setprogressCheck(!progressCheck)} type="checkbox" class="custom-control-input" id={`in_process${id}`} />
                    <label class="custom-control-label " for={`in_process${id}`}>In process</label>
                </div>
                <div class="custom-control custom-checkbox" onClick={updatingDone}>
                    <input  checked={doneCheck}  onChange={()=>setdoneCheck(!doneCheck)} type="checkbox" class="custom-control-input" id={`done${id}`} />
                    <label class="custom-control-label" for={`done${id}`}>Done</label>
                </div>
                <div style={{cursor:"pointer"}}>
                <ion-icon name="create-outline" onClick={startEditing}  ></ion-icon>
                </div>
                    
                <div style={{cursor:"pointer"}}>
                <ion-icon name="trash-outline" onClick={() => deleteTodo(id)}></ion-icon>
                </div>
                    
            </div>
        </div>
    )
}
