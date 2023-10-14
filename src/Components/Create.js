import { useState, useRef } from "react";
import toast from "react-hot-toast";
import TaskBoard from "./TaskBoard";
import axios from "axios";
//* The component to create task board
const Create = ({ setMount, data, setData }) => {
  const [input, setInput] = useState("");
  const inputData = useRef();
  // console.log("The local task is: ", task);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length < 3) {
      return toast.error("The board name must have more than 3 characters");
    }
    if (input.length > 50) {
      return toast.error("The board name must not be more than 30");
    }
    if (data.length === 3) {
      return toast.error("Too many task boards");
    }
    const Data = { boardName: input };
    // console.log("The Data is: ", Data);
    try {
      const resp = await axios.post("http://localhost:8080/saveBoard", Data);
      console.log("The response from post is: ", resp);
    } catch (err) {
      console.log("couldn't able to get the request ", err);
    }
    setMount(true);
  };

  return (
    <div className="flex flex-col items-center pt-3 gap-20 mt-20 h-full mb-20">
      <form onSubmit={handleSubmit}>
        <div className="space-x-5">
          <input
            type="text"
            className=" border relative border-solid w-80 rounded-lg border-gray-400 py-2.5 pe-10 shadow-sm sm:text-sm pl-4"
            placeholder="task board name"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button
            type="submit"
            className="m-4 px-4 py-2 bg-blue-200 rounded-md hover:shadow-lg focus:outline-none focus:ring"
          >
            Create Board
          </button>
        </div>
      </form>
      {data.length > 0 && (
        <TaskBoard
          data={data}
          setData={setData}
          setMount={setMount}
        ></TaskBoard>
      )}
    </div>
  );
};

export default Create;
