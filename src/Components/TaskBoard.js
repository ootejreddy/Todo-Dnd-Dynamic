import React from "react";
import Section from "./Section";

const TaskBoard = ({ data, setData, setMount }) => {
  //   console.log("The task board name is: ", board.boardName);
  //   const count = board.data.length;
  //   const text = board.boardName;
  //   const bgColor = "bg-purple-500";
  return (
    <div
      className={`flex justify-center w-full space-x-10 h-full mt-30 flex-wrap`}
    >
      {data.map((board, index) => (
        <Section
          data={data}
          setData={setData}
          id={board.boardId}
          index={index}
          name={board.boardName}
          boardData={board.taskList}
          setMount={setMount}
        ></Section>
      ))}
    </div>
  );
};
export default TaskBoard;
