import '../styles/TaskGroup.scss';
import { TaskGroupType, UserType } from '../types/types';
import { Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

type props = {
  user: UserType;
  group: TaskGroupType;
}

export default function TaskGroup({
  user, group
}: props) {
  return (
    <div className="TaskGroup">
      <div className="TaskGroup-title">
        <h2>{group.name}</h2>
        <img src="icons/more.png" alt="More"/>
      </div>
      <Droppable droppableId={group.id} type="list">
        {(provided) => 
          <div 
            className="TaskList-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              group.listIDs.map((id, listIndex) => 
                <TaskList
                  key={id}
                  user={user}
                  list={user.lists.get(id)!}
                  listIndex={listIndex}
                />
              )
            }
            {provided.placeholder}
          </div>
        }  
        </Droppable>
    </div>
  );
}