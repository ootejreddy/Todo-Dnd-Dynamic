import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TaskCard from "./TaskCard";
import axios from "axios";

const Section = ({ id, name, index, boardData, data, setData, setMount }) => {
  // console.log("section component rendered");
  // console.log("The index is: ", index);
  // const id = data[index].boardId;
  const sectionIndex = index;
  let taskBoard;
  const [cards, setCards] = useState(data[index].taskList);
  let text = name;
  let bg = "bg-purple-500";
  let BoardData = boardData;
  const addTaskCard = async () => {
    // console.log("The index is: ", index);
    console.log("The id is: ", id);
    const task = {
      taskName: "",
    };
    // const modifiedData = data[index];
    // modifiedData.data.push(newCard);
    // console.log("The modified data is: ", modifiedData);
    let resp = await axios.put(`http://localhost:8080/setTask/${id}`, task);
    console.log("The response from update is: ", resp);
    resp = await axios.get("http://localhost:8080/taskBoards");
    console.log("The response from get is: ", resp.data);
    // const getRespData = resp.data;
    setData(resp.data);
    taskBoard = resp.data.filter((board) => id === board.boardId);
    // console.log("The taskBoard is: ", taskBoard);
    const tasks = taskBoard[0].taskList;
    setCards(tasks);
    // console.log("The tasks are: ", tasks);

    // setCards((prevState) => [...prevState, newCard]);
    // setCount(count + 1);
    return;
  };

  return (
    <div
      className={`bg-slate-100 w-[300px]  text-sm  h-auto rounded-xl text-center  shadow-xl`}
    >
      <Header
        text={text}
        bg={bg}
        boardId={id}
        count={BoardData.length}
        setData={setData}
        setMount={setMount}
      ></Header>
      {cards.map((card, index) => (
        <div key={card.taskId} index={index}>
          <TaskCard
            sectionIndex={sectionIndex}
            taskIndex={index}
            id={card.taskId}
            boardId={id}
            content={card.taskName}
            setData={setData}
            setCards={setCards}
            card={card}
          ></TaskCard>
        </div>
      ))}
      <button
        className="w-full px-4 py-2 mt-12 h-15 bg-blue-500 hover:shadow-lg rounded-md text-lg focus:outline-none focus:ring text-white"
        onClick={addTaskCard}
      >
        add task
      </button>
    </div>
  );
};

//* This displays the Board name
const Header = ({ text, bg, count, boardId, setData, setMount }) => {
  const handleDeleteBoard = async (boardId) => {
    // console.log("The boardId is: ", boardId);
    axios
      .delete(`http://localhost:8080/taskBoard/${boardId}`)
      .then((res) => {
        console.log("The response of put data is: ", res.data);
        setMount(true);
      })
      .catch((err) => console.log("error fetching data", err));
  };
  return (
    <div
      className={`${bg} rounded-md flex items-center justify-center text-lg uppercase text-white h-12 `}
    >
      {text}{" "}
      <div className="ml-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
        {count}
      </div>
      <button
        className="relative bottom-1 right-1 ml-20"
        onClick={() => handleDeleteBoard(boardId)}
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

export default Section;
