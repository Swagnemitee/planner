import '../styles/Task.scss';
import { TaskType, UserType } from '../types/types';
import { Draggable } from 'react-beautiful-dnd';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  task: TaskType;
  index: number;
}

export default function Task({
  userState, setUserState, task, index, saveData
}: props) {

  const doTask = (id: string) => {
    const newUserState = {...userState};

    const done = newUserState.tasks.get(id)!.done;
    const count = newUserState.tasks.get(id)!.count;

    if (count <= done) return;

    newUserState.tasks.get(id)!.done++;
    setUserState(newUserState);
    saveData();
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div className={"Task" + (task.count <= task.done ? " completed" : "")}
          onClick={() => doTask(task.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{task.name}</p>
          <p>{task.done}/{task.count}</p>
        </div>
      )}
    </Draggable>
  );
}