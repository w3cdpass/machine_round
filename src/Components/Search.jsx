import { useState } from "react";

function InputField() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    priority: 'low',
    createdBy: "68b67c54773ba9750b06efea",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTask = () => {
    fetch(`${import.meta.env.VITE_API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task Created", data);
        setFormData("");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="inputCont">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTask();
          }}
        >
          <label form="title">Title: </label>
          <input
            type="text"
            title="InputField"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label form="des">Description: </label>
          <input
            type="text"
            title="InputField"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
          <button type="submit" className="addTask">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}

export default InputField;
