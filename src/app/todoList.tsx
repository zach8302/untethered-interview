"use client"

import Todo from "./interfaces";
import TodoItem from "./todoItem";
import { useEffect, useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoDescription, setTodoDescription] = useState<string>("")

    useEffect(() =>
        {
            let cached = localStorage.getItem("todos")
            if (cached) {
                let parsedTodos:Todo[] = JSON.parse(cached)
                setTodos(parsedTodos)
            }
        }, []
    )

    function deleteTodo(todo : Todo) {
        let updatedTodos = todos.filter(t => t.id !== todo.id)
        setTodos(updatedTodos)
        saveLocal()
    }

    function updateTodo(todo : Todo) {
        let updatedTodos = todos.filter(t => t.id !== todo.id)
        todo.completed = ! todo.completed
        setTodos([...updatedTodos, todo])
        saveLocal()
    }

    function updateDescription(event:any) {
        setTodoDescription(event.target.value)
    }

    function createTask(){
        let newTodo:Todo = {description : todoDescription, completed : false, id : crypto.randomUUID()}
        setTodos([...todos, newTodo])
        saveLocal()
    }

    function saveLocal() {
        let serial = JSON.stringify(todos)
        localStorage.setItem("todos", serial)
    }


    return (
        <div className="flex justify-center items-center">
            {/* Create task div */}
            <div className="flex flex-col justify-center w-1/3 px-4 space-y-4">
                <h1 className="text-lg">Create Task</h1>
                <label className="block mb-4">
                    Task Description
                    <input className="border-2 rounded-sm block" type="text" value={todoDescription} onChange={(e) => updateDescription(e)}></input>
                </label>
                <button className="bg-blue-400 text-white rounded-md w-32" onClick={createTask}>Create</button>
            </div>
            {/* View task div */}
            <div className="flex w-2/3">
                <h1>Tasks</h1>
                {todos.map(t => <TodoItem key={t.id} todo={t} deleteFunction={deleteTodo} updateFunction={updateTodo}></TodoItem>)}
            </div>
        </div>
    )

}

export default TodoList;