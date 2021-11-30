import '../styles/TaskList.scss';
import { TaskListType, UserType } from '../types/types';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type props = {
  user: UserType;
  list: TaskListType;
  listIndex: number;
}

export default function TaskList({
  user,
  list,
  listIndex,
}: props) {
  return (
    <Draggable draggableId={list.id} index={listIndex}>
      {(provided) =>
        <div className="TaskList"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="TaskList-title"
            {...provided.dragHandleProps}
          >
            <h3>{list.name}</h3>
            <img src="icons/more.png" alt="More"/>
          </div>
          <Droppable droppableId={list.id} type="task">
            {provided => (
              <div
                className="Task-wrapper"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  list.taskIDs.map((id, taskIndex) => 
                    <Task
                      key={id}
                      user={user}
                      task={user.tasks.get(id)!}
                      index={taskIndex}
                    />
                  )
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      }
    </Draggable>
  );
}