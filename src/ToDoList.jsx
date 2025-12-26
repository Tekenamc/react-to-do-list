import React, { useState } from 'react';


function ToDoList(){

    const [tasks, setTasks] = useState(["Get a haircut", "Go to the gym", "Feed the Goldfish"])
    const [newTask, setNewTask] = useState("");
    const [edited, setEdited] = useState(false)
    const [edit, setEdit] = useState("")
    const [id, setId] = useState();

    function handleInputChange(event){
        if(!edited){
           setNewTask(event.target.value);
        }
    }

    function addTask(){
        if(newTask.trim() !== "")
        {
            console.log("This is the "+newTask+" it's not empty");
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
        
    }

    function editTask(index){
        console.log("Edit in progress..",index);
        setEdited(true);
        setId(index);
        setEdit(tasks[index]);
    }

    function editingTask(event){
        setEdit(event.target.value);
    }

    function editDone(){
        const updatedTasks = [...tasks];
        updatedTasks[id] = edit;
        setTasks(updatedTasks);
        setEdited(false);
    }

    function deleteTask(index){

        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0)
        {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index -1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

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