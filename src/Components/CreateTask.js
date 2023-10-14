import React from "react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const CreateTask = ({ data, setData }) => {
  console.log("The data in createTask is: ", data[0]);
  const [input, setInput] = useState("");
  //   const [modifiedData, setModifiedData] = useState(data);
  //   console.log("the modified data now is: ", modifiedData);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    console.log("The value of the input is: ", input);
    if (data.length === 0) {
      return toast.error("please create a task board");
    }
    if (input.length < 3) {
      return toast.error("The task must have more than 3 characters");
    }
    if (input.length > 50) {
      return toast.error("The task must not be more than 30");
    }

    const addedTask = data;
    addedTask[0].data.push({ taskId: uuidv4(), name: input });
    console.log("added task data is: ", addedTask);
    try {
      const resp = await axios.put(
        `http://localhost:8080/taskBoard/${addedTask[0].data.id}`,
        data
      );
      console.log("The response from post is: ", resp);
    } catch (err) {
      console.log("couldn't able to get the request ", err);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col items-center pt-3 gap-20 mt-20 h-full mb-20">
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          className=" border relative border-solid w-80 rounded-lg border-gray-400 py-2.5 pe-10 shadow-sm sm:text-sm pl-4"
          placeholder="task name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button
          type="submit"
          className="m-4 px-4 py-2 bg-blue-200 rounded-md hover:shadow-lg focus:outline-none focus:ring"
        >
          Create task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
