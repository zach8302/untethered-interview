import Todo from "./interfaces"

interface TodoProps {
    todo : Todo;
    deleteFunction : (todo : Todo) => void;
    updateFunction : (todo : Todo) => void;
}

function TodoItem(props:TodoProps) {
    return (
        <div className="flex justify-between space-x-2 bg-gray-50 shadow-md py-4 px-2">
            <span className="text-lg">{props.todo.description}</span>
            <div>
                <label className="flex flex-col">
                    Completed  
                </label>
                <input id="todoCheck" type="checkbox" className="ml-2" checked={props.todo.completed} onChange={() => props.updateFunction(props.todo)}></input>
            </div>
            <button className="bg-red-600 text-white rounded-md w-32" onClick={() => props.deleteFunction(props.todo)}>Delete</button>
        </div>
    )
}

export default TodoItem;