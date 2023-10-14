import { useState, useEffect } from "react";
import "./App.css";
import Create from "./Components/Create";
import toast, { Toaster } from "react-hot-toast";
import TaskBoard from "./Components/TaskBoard";
import axios from "axios";
import CreateTask from "./Components/CreateTask";
function App() {
  const [data, setData] = useState([]);
  const [mount, setMount] = useState();
  const url = "http://localhost:8080/taskBoards";
  useEffect(() => {
    setMount(false);
    axios
      .get(url)
      .then((res) => {
        // console.log("The response of get data is: ", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error fetching data", err));
  }, [mount]);
  console.log("The data is: ", data);
  return (
    <div className="App">
      <Toaster />

      <Create setMount={setMount} data={data} setData={setData}></Create>
      {/* {data.length > 0 && (
        <CreateTask data={data} setData={setData}></CreateTask>
      )} */}
    </div>
  );
}

export default App;
