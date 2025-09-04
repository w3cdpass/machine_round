import { useState } from "react";

function InputField() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    priority: "low",
    createdBy: "68b67c54773ba9750b06efea",
  });

  
  const handleTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.log("Error while creating task", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="inputCont">
        <form onSubmit={handleTask}>
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
