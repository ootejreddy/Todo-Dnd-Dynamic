import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const TaskCard = ({
  content,
  sectionIndex,
  taskIndex,
  id,
  boardId,
  setData,
  setCards,
  card,
}) => {
  const [input, setInput] = useState(card.taskName);
  console.log("The id of taskcard is: ", id);

  console.log("The input is: ", input);
  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const updateDataBase = debounce(async (input) => {
    card.taskName = input;
    console.log("The card is: ", card);
    const updateResponse = await axios.put(
      `http://localhost:8080/updateTask/${id}`,
      card
    );
    console.log("the updated response is: ", updateResponse);
  });

  const updateTaskHandler = (event) => {
    setInput(event.target.value);
    console.log("the input is: ", input);
    updateDataBase(event.target.value);
  };

  const handleDelete = async (boardId, id) => {
    console.log("The id is: ", id);
    const deleteResp = await axios.delete(`http://localhost:8080/task/${id}`);
    axios
      .get("http://localhost:8080/taskBoards")
      .then((res) => {
        // console.log("The response of get data is: ", res.data);
        setData(res.data);
        setCards(res.data[sectionIndex].taskList);
      })
      .catch((err) => console.log("error fetching data", err));
    return;
  };

  return (
    <div className="relative p-4 mt-5 shadow-md rounded-md cursor-grab bg-blue-300">
      <input
        type="text"
        value={input}
        className={`font-semibold  border-none  text-black outline-none bg-blue-300`}
        placeholder="Enter task here"
        onChange={updateTaskHandler}
      ></input>
      <button
        className="absolute bottom-1 right-1"
        onClick={() => handleDelete(boardId, id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskCard;
