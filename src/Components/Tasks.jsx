import { useEffect, useMemo, useState } from "react";

function TaskCard({ _id, index, title, desc, priority, status }) {
  const [patching, setPatching] = useState({
    _id: _id || '',
    title: title || '',
    desc : desc || '',
    priority: priority || '',
    status : status || ''
  });
  const [model, setModel] = useState(false)
  const handleChange = (e) => {
    setPatching({ ...patching, [e.target.name]: e.target.value });
  };
  function openModel() {
    setModel(true)
  }

  function closeModel() {
    setModel(false)
  }
  async function patchSomeField(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/tasks/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patching)
    })
    const data = await response.json()
    } catch (error) {
      console.log("error", error)
    }

  }
  return (
    <div>
      <p>{index}</p>
      <p>{title}</p>
      <p>{desc}</p>
      <p>{priority}</p>
      <p>{status}</p>
      <button onClick={() => openModel()}>Update</button>
      {model && (
        <form onSubmit={patchSomeField}>
          <input name="title" value={patching.title} onChange={handleChange} />
          <input name="desc" value={patching.desc} onChange={handleChange} />
          <input name="priority" value={patching.priority} onChange={handleChange} />
          <input name="status" value={patching.status} onChange={handleChange} />
          <button onClick={() => closeModel()}>Close</button>
          <button type="submit">save</button>
        </form>
      )}
    </div>
  );
}
function SearchItem({ title, desc }) {
  return (
    <div>
      <p>{title}</p>
      <p>{desc}</p>
    </div>
  );
}
function debounce(fnc, delay) {
  let timeOut;
  return function (...args) {
    const context = this;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      fnc.apply(context, args);
    }, delay);
  };
}
function higheOrder(Componenet) {
  return function NewCom() {
    const [apiData, setApiData] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setApiData(data?.tasks);
          setLoad(false);
        })
        .catch(() => console.log("error while fetchin data"));
    }, []);
    if (load) return <p>Loading......</p>;
    return (
      <>
        {apiData.map((task, index) => (
          <Componenet key={index} {...task} />
        ))}
      </>
    );
  };
}

const AllTasks = higheOrder(TaskCard);
function Tasks() {
  const [allTask, setAllTask] = useState([]);
  const [onSearch, setOnSearch] = useState("");

   const handleSearch = debounce((value) => {
    setOnSearch(value);
  }, 500);
  const filterData = useMemo(() => {
    const searchTerm = onSearch.toLowerCase().trim()
    return allTask.filter((search) => search?.title.toLowerCase().includes(searchTerm) || search?.desc.toLowerCase().includes(searchTerm))
  }, [allTask, onSearch])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setAllTask(data?.tasks))
      .catch(() => console.log("Failed to fetch data"));
  }, []);
  return (
    <>
      <input type="search" onChange={(e) => handleSearch(e.target.value)} />
      {onSearch.length === 0 ? "" : filterData.map((search, index) => (
        <SearchItem {...search} key={index}/>
      ))}
      <AllTasks />
    </>
  );
}
export default Tasks;
