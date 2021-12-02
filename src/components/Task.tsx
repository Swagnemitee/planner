import '../styles/Task.scss';
import { TaskType, UserType } from '../types/types';
import { Draggable } from 'react-beautiful-dnd';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedParentID: React.Dispatch<React.SetStateAction<string>>;
  parentID: string;
  task: TaskType;
  index: number;
}

export default function Task({
  userState, setUserState, task, index, saveData, setEditTask, setSelectedID, parentID, setSelectedParentID
}: props) {

  const doTask = (id: string): void => {
    const newUserState = {...userState};

    const done = newUserState.tasks[id].done;
    const count = newUserState.tasks[id].count;

    if (count <= done) return;

    newUserState.tasks[id].done++;
    setUserState(newUserState);
    saveData();
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div className={"Task" + (task.count <= task.done ? " completed" : "")}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p
            onClick={() => {setEditTask(true); setSelectedID(task.id); setSelectedParentID(parentID)}}
          >{task.name}</p>
          <div className="divider"></div>
          <p
            onClick={() => doTask(task.id)}
          >{task.done}/{task.count}</p>
        </div>
      )}
    </Draggable>
  );
}