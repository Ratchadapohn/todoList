import React from "react";
import { ITask } from "../interface";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  editTask(oldTaskName: string, newTaskName: string): void;
  submitTask(index: number): void;
  index: number;
}

const TodoTask: React.FC<Props> = ({
  task,
  completeTask,
  editTask,
  submitTask,
  index,
}) => {
  const handleDelete = (): void => {
    completeTask(task.taskName);
  };

  const handleEdit = (): void => {
    const newTaskName = prompt("Enter new task name:");
    if (newTaskName) {
      editTask(task.taskName, newTaskName);
    }
  };

  const handleSubmit = (): void => {
    submitTask(index);
  };

  return (
    <div className="flex justify-between font-serif m-[10px] bg-yellow-100 rounded-[10px] p-[8px] gap-[15x] shadow-md shadow-gray-500 hover:bg-rose-200">
      <div className="bg-white shadow-gray-200 flex translate-y-[15%] justify-center shadow-sm h-[50px] w-[50px] p-[10px] rounded-[100%]">
        <span className="text-blue-800 font-bold pt-[3px]">task</span>
      </div>

      <div className="block justify-between p-[2px] gap-[5px]">
        <div className="pl-[3px] pr-[3px] block justify-between">
          <div className="text-blue-700 font-bold text-[17px]">
            {task.taskName}
          </div>
          <div className="text-blue-500 flex justify-between font-bold font-mono">
            <span className="">{task.description}</span>
          </div>
        </div>

        <div className="grid justify-center text-blue-800 font-bold">
          <div className="flex justify-center bg-white shadow-gray-300 shadow-sm rounded-[25px] pr-[25px] pl-[25px]">
            <div>in</div>
            <div className="text-yellow-600 pr-[10px] pl-[10px]">
              {task.deadline}
            </div>
            <div>days</div>
          </div>
        </div>
      </div>
      <div className="text-[25px] text-blue-800 grid mr-[5px]">
        <div className="flex">
          <button onClick={handleDelete} className="hover:text-blue-500">
            <RiDeleteBin5Fill />
          </button>
          <button onClick={handleEdit} className="hover:text-blue-500">
            <MdEditSquare />
          </button>
        </div>
        <div className="bg-white rounded-[100%] shadow-sm shadow-gray-300 h-[40px] w-[42px] mt-[5px] text-[8px]">
          <button onClick={handleSubmit} className="hover:text-blue-500">
            <div className="translate-y-[14px]">complete</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoTask;
