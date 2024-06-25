import React, { FC, useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import TodoTask from "./components/todoTask";
import { ITask } from "./interface";
import image1 from "./assets/17e14b79df28afd24f0e9044766307c2.jpg";
import {
  BsChatRightDotsFill,
  BsCheckCircleFill,
  BsFillBookmarkPlusFill,
  BsFillCalendar2EventFill,
  BsHeartFill,
} from "react-icons/bs";

const taskInitialState = { taskName: "", deadline: 0, description: "" };

const App: FC = () => {
  const [task, setTask] = useState<ITask>(taskInitialState);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [completeTodo, setCompleteTodo] = useState<ITask[]>([]);

  useEffect(() => {
    const months: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = months[now.getMonth()];
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentDateTime(`${hours}:${minutes}\n${day} ${month} ${year}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const addTask = (): void => {
    setTodoList([...todoList, task]);
    setTask(taskInitialState);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  const editTask = (firstTaskName: string, secondTaskName: string): void => {
    setTodoList(
      todoList.map((task) =>
        task.taskName === firstTaskName
          ? { ...task, taskName: secondTaskName }
          : task
      )
    );
  };

  const submitTask = (index: number): void => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${day}/${month}/${year}  (${hours}:${minutes})`;
    const filterTodo = { ...todoList[index], time };
    setCompleteTodo([...completeTodo, filterTodo]);
    setTask(taskInitialState);
  };
  const resetTask = (): void => {
    setTask(taskInitialState);
    setCompleteTodo([]);
  };

  return (
    <div className="bg-blue-800 h-[700px] shadow-sm shadow-gray-700 w-[400px] border-white rounded-[45px]">
      <div className="text-white flex justify-around font-serif text-[40px] pt-[20px] pl-[3px] pb-[5px] font-bold">
        <h1 className="hover:text-yellow-100">Todo List </h1>
        <span className="p-[15px] pr-[5px] text-[25px] text-bold hover:text-rose-300 hover:text-[30px]">
          <BsHeartFill />
        </span>
      </div>

      <div className="grid grid-col-3 justify-center ml-[50px] rounded-[20px] p-[18px] pb-[10px] w-[300px] gap-[3px] h-[170px] shadow-md shadow-gray-500 bg-rose-200 m-[15px]">
        <div className="p-[7px] h-[28px] shadow-xxl hover:shadow-yellow-900 flex justify-center rounded-[20px] bg-white shadow-sm shadow-gray-400">
          <div className="text-[15px] pr-[5px] text-slate-400">
            <BsChatRightDotsFill />
          </div>
          <input
            className="text-[15px] text-slate-400"
            type="text"
            placeholder="Add Task"
            name="taskName"
            value={task.taskName}
            onChange={handleChange}
          />
        </div>
        <div className="p-[10px] pr-[30px] pl-[30px]  h-[28px] hover:shadow-yellow-900 flex justify-center shadow-sm shadow-gray-400 rounded-[20px] bg-white">
          <div className="text-[15px] text-slate-400 pr-[7px]">
            <BsFillCalendar2EventFill />
          </div>
          <input
            className="text-[15px] text-slate-400"
            type="number"
            placeholder="Deadline in days"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
          />
        </div>
        <div className="p-[5px] h-[28px] pr-[30px] hover:shadow-yellow-900 pl-[30px] shadow-sm shadow-gray-400 flex justify-center rounded-[20px] bg-white">
          <div className="text-[18px] text-slate-400 pr-[7px]">
            <BsFillBookmarkPlusFill />
          </div>
          <input
            className="text-[15px] text-slate-400"
            type="text"
            placeholder="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={addTask}
          className="text-white flex justify-center pt-[10px] text-[30px]"
        >
          <span className="hover:text-blue-800">
            <BsCheckCircleFill />
          </span>
        </button>
      </div>

      <div className="overflow-scroll m-[20px] h-40 w-70">
        {todoList.map((task: ITask, index: number) => (
          <TodoTask
            key={index}
            task={task}
            completeTask={completeTask}
            editTask={editTask}
            submitTask={submitTask}
            index={index}
          />
        ))}
      </div>

      <div className="bg-white h-[120px] shadow-sm shadow-gray-600 w-[80%] rounded-[10px] ml-[40px] mt-[20px] pt-[20px]">
        <div className="overflow-scroll h-20 w-70 mb-[5px]">
          <div className="font-serif  text-[20px] grid justify-start  pl-[25px]">
            {completeTodo.map((task, index) => (
              <div className="flex gap-[20px] " key={index}>
                <p className="font-bold text-blue-700"> {task.taskName}</p>
                <p className="text-[10px] pt-[10px] text-blue-500">
                  {task.time}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={resetTask}
          className="bg-rose-200 shadow-sm shadow-gray-400 rounded-[100%] h-[40px] w-[40px]
          translate-y-[-65px] translate-x-[120px] hover:bg-yellow-300"
        >
          <p className="text-blue-600 text-[9px]">clear</p>
        </button>
        <img
          className="h-[110px] ml-[95px] translate-y-[-70px] hover:h-[105px]"
          src="/pngwing.com.png"
          alt="otter"
        />
      </div>

      <div className="text-white flex translate-y-[13px] justify-around font-serif text-[15px] pt-[5px] m-[20px] mb-[5px] pb-[1px] font-bold hover:text-rose-300">
        <h1>follow your dream</h1>
      </div>

      <div className="datetime text-white hover:text-yellow-200 text-[6px] p-[4px] font-serif font-extrabold rounded-[5px] flex justify-center">
        <span className="align-center p-[5px]"></span>
        <span className="text-[12px]">{currentDateTime}</span>
      </div>
    </div>
  );
};

export default App;
