import '../styles/TaskGroup.scss';
import { TaskGroupType, UserType } from '../types/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  setEditGroup: React.Dispatch<React.SetStateAction<boolean>>;
  setAddList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditList: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  group: TaskGroupType;
  groupIndex: number;
}

export default function TaskGroup({
  userState, setUserState, group, groupIndex, saveData, setAddList, setEditGroup, setSelectedID, setAddTask, setEditList, setEditTask
}: props) {
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
              onClick={() =>{ setAddList(true); setSelectedID(group.id)}}
            />
            <img src="icons/more.png" alt="More"
              onClick={() => {setEditGroup(true); setSelectedID(group.id)}}
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
                      setSelectedID={setSelectedID}
                      setEditList={setEditList}
                      setAddTask={setAddTask}
                      setEditTask={setEditTask}
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