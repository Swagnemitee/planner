import '../styles/TaskGroup.scss';
import { TaskGroupType, UserType } from '../types/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  group: TaskGroupType;
  groupIndex: number;
}

export default function TaskGroup({
  userState, setUserState, group, groupIndex, saveData
}: props) {
  const newList = (groupID: string): void => {
    // TODO: Create new list
    setUserState(userState);
    saveData();
    console.log("New List");
  }

  const showMore = (groupID: string): void => {
    // TODO: Group more menu
    setUserState(userState);
    saveData();
    console.log("Show More");
  }

  return (
    <Draggable draggableId={group.id} index={groupIndex}>
      {(provided) => 
        <div className="TaskGroup"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="TaskGroup-title"
            {...provided.dragHandleProps}
          >
            <h2>{group.name}</h2>
            <div className="divider"></div>
            <img src="icons/add.png" alt="Add"
              onClick={() => newList(group.id)}
            />
            <img src="icons/more.png" alt="More"
              onClick={() => showMore(group.id)}
            />
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
                      userState={userState}
                      setUserState={setUserState}
                      saveData = {saveData}
                      list={userState.lists.get(id)!}
                      listIndex={listIndex}
                    />
                  )
                }
                {provided.placeholder}
              </div>
            }  
            </Droppable>
        </div>
      }
    </Draggable>
  );
}