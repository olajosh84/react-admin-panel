import { useState } from "react";
import todos from "../assets/js/todo";
import randomId from "../assets/js/randomid";

const Todo = () => {
    const [todoList, setTodoList] = useState(todos);
    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState("");
    const [editInfo, setEditInfo] = useState({editing: false, editedTask:"", editId: null});
   
    const completedTask = (e) => {
        e.target.parentElement.classList.toggle("completed");
    }
    const defaultFormSettings = () => {
        setShowForm(false);
        setTask("");
        setEditInfo({editing: false, editId: null});
    }
    const submitTask = (e) => {
        e.preventDefault();
        if(editInfo.editing && editInfo.editId){
            let updatedTodoList = todoList.map(todo => {
                if(todo.id === editInfo.editId){
                    todo.task = task;
                }
                return todo;
            });
            setTodoList(updatedTodoList);
        }else{
           const newTask = {id: randomId(), task: task, time: "Just now"};
            setTodoList(prevTodoList => {
                return [
                    ...prevTodoList,
                    newTask
                ]
                    
                
            }) 
        }
        
        defaultFormSettings();
        
    }
    const editTask = (e) => {
        const id = e.target.parentElement.id;
        const item = todoList.find(todo => todo.id === id);
        setTask(item.task);
        setEditInfo({editing: true, editId: id});
        setShowForm(true);
        
    }
    
    const deleteTask = (e) => {
        const taskId = e.target.parentElement.id;
        setTodoList(prevTodoList => {
            return prevTodoList.filter(todo => todo.id !== taskId)
        })
        
    }
    
    return (
        
        <div className="todo-section">
            <div className="title">
                <h2>todo list</h2>
            </div>
            <div className="todos">
                {
                    todoList.map(todo => {
                        const {id, task, time} = todo;
                        return <div className="todo" key={id}>
                                    <div className="todo-info">
                                        <input type="checkbox" onClick={completedTask} />
                                        <p>{task}</p>
                                        <button className="btn btn-blue">
                                            <i className="fas fa-clock"></i>
                                            {time}
                                        </button>
                                    </div>
                                    <div className="todo-action" id={id}>
                                        <i className="fa fa-edit" onClick={editTask}></i>
                                        <i className="fa fa-trash-alt" onClick={deleteTask}></i>
                                    </div>
                                </div>
                    })
                }
                
                
                <div className="todo-footer">
                    {!showForm && <button className="add-btn" onClick={() => setShowForm(true)}>
                        <i className="fas fa-plus"></i>
                        add item
                    </button>}
                    
                    {showForm && <form onSubmit={submitTask}>
                        <div className="todo-input">
                            <input type="text" placeholder="Add new item" autoFocus value={task} onChange={(e) => {setTask(e.target.value)}} required />
                            <button>{editInfo.editing ? 'edit' : 'submit'}</button>
                        </div>
                    </form>}
                    
                </div>
            </div>
        </div>
        
   ) 
}

export default Todo;