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
     
          <div 
            className="TaskList-wrapper"
            
          >
            {
              group.listIDs.map((id, index) => 
                <TaskList
                  key={id}
                  user={user}
                  list={user.lists.get(id)!}
                  index={index}
                />
              )
            }
            
          </div>

    </div>
  );
}