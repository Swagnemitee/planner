import '../styles/TaskList.scss';
import { TaskListType, UserType } from '../types/types';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setEditList: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  list: TaskListType;
  listIndex: number;
}

export default function TaskList({
  userState, setUserState, list, listIndex, saveData, setAddTask, setEditList, setSelectedID
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
            <div className="divider"></div>
            <img src="icons/add.png" alt="Add"
              onClick={() =>{ setAddTask(true); setSelectedID(list.id)}}
            />
            <img src="icons/more.png" alt="More"
              onClick={() => {setAddTask(true); setSelectedID(list.id)}}
            />
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
                      userState={userState}
                      setUserState={setUserState}
                      saveData = {saveData}
                      task={userState.tasks.get(id)!}
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