import '../styles/Task.scss';
import { TaskType, UserType } from '../types/types';
import { Draggable } from 'react-beautiful-dnd';

type props = {
  user: UserType;
  task: TaskType;
  index: number;
}

export default function Task({
  user,
  task,
  index,
}: props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div className="Task" 
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