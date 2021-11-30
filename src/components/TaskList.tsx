import '../styles/TaskList.scss';
import { TaskListType, UserType } from '../types/types';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type props = {
  user: UserType;
  list: TaskListType;
  index: number;
}

export default function TaskList({
  user,
  list,
  index,
}: props) {
  return (
    
        <div className="TaskList"
          
        >
          <div className="TaskList-title"
            
          >
            <h3>{list.name}</h3>
            <img src="icons/more.png" alt="More"/>
          </div>
          <Droppable droppableId={list.id} type="task">
            {provided => (
              <div className="Task-wrapper"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  list.taskIDs.map((id, index) => 
                    <Task
                      key={id}
                      user={user}
                      task={user.tasks.get(id)!}
                      index={index}
                    />
                  )
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

  );
}