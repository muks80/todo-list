import './Task.css';

export interface TaskInt {
    name: string;
    task: string;
    urgent: boolean;
    deleteTask: () => void;
}

const User: React.FC<TaskInt> = ({name, task, urgent, deleteTask}) => {
    return (
        <div className="card">
            <div className="row">
                <h2>Task Name: </h2>
                <p>{name}</p>
            </div>
            <hr />
            <div className="row">
                <h2>Description: </h2>
                <p>{task}</p>
            </div>
            <hr />
            {urgent ?
                <div>
                    <div className="row">
                        <h2 className="urgent">Urgent!!!</h2>
                    </div>
                    <hr />
                </div>
            : ''
            }
            
            
            <button className="deleteBtn" onClick={deleteTask}>Delete Task</button>
        </div>
    )
}

export default User;