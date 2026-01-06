import React, { useState } from 'react';


function ToDoList(){

    const [tasks, setTasks] = useState(["Get a haircut", "Go to the gym", "Feed the Goldfish"]);
    const [newTask, setNewTask] = useState("");
    const [edited, setEdited] = useState(false);
    const [edit, setEdit] = useState("");
    const [id, setId] = useState();
    
    //handles the input change while a new task is being inputed
    function handleInputChange(event){
        if(!edited){
           setNewTask(event.target.value);
        }
    }

    //Add a new task
    function addTask(){
        if(newTask.trim() !== "")
        {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
        
    }

    //Set the mode to edit mode and grab the position and text of the task being edited
    function editTask(index){
        setEdited(true);
        setId(index);
        setEdit(tasks[index]);
    }

    //handles the input change when a task is being edited
    function editingTask(event){
        setEdit(event.target.value);
    }

    //Gets out of edit mode and adds the new changes to the original list
    function editDone(){
        const updatedTasks = [...tasks];
        updatedTasks[id] = edit;
        setTasks(updatedTasks);
        setEdited(false);
    }

    //deletes a task
    function deleteTask(index){

        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    //Moves a task up
    function moveTaskUp(index){
        if(index > 0)
        {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index -1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    //Moves a task down
    function moveTaskDown(index){
        if(index < tasks.length - 1)
        {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = 
            [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }


    if(edited)
    {
        return(
            <div className='to-do-list'>
                <h1>To-do List</h1>

                <div>
                    <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange}/>
                    <button className="add-button">Add</button>
                </div>

                <ol>
                    {tasks.map((task, index) => 
                    <li key={index}>
                    {index === id?(<input type="text" value={edit} onChange={editingTask}/>) :  
                                            (<span className="text">{task}</span>)}
                   
                    
                    {index === id?(<button className="edit-button" onClick = {editDone}>Finish</button>) :
                    (<button className="edit-button">Edit</button>)}
                    
                    <button className="delete-button" >Delete</button>
                    <button className="move-button">☝️</button>
                    <button className="move-button">👇</button>
                    </li>)}
                </ol>

            </div>
        );
    }
    else{
        return(
            <div className='to-do-list'>
                <h1>To-do List</h1>

                <div>
                <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange}/>
                <button className="add-button" onClick={addTask}>Add</button>
                </div>

                <ol>
                    {tasks.map((task, index) => 
                    <li key={index}>
                    <span className="text">{task}</span>
                    
                    <button className="edit-button" onClick = {() => editTask(index)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="move-button" onClick={() => moveTaskUp(index)}>☝️</button>
                    <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
                    </li>)}
                </ol>

            </div>
        );
    }
   
}

export default ToDoList;