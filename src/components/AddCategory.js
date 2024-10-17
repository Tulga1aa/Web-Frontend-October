import { IoClose } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

const AddCategory = (props) => {
  const { onCloseModal } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [borderColor, setBorderColor] = useState("#D1D5DB");

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleAdd = async () => {
    if (name === "") {
      setMessage("Category must have name");
      setMessageColor("#F54949");
      setBorderColor("#F54949");
      setDescription("");
    } else {
      await axios
        .post("http://localhost:8000/category", {
          name: name,
          description: description,
        })
        .then(function (response) {
          setTimeout(() => {
            console.log("delaying");
          }, 1000);
          onCloseModal();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex flex-col w-[500px] rounded-lg bg-white">
      <div className="flex justify-between py-5 px-6 border-b border-[#E2E8F0]">
        <p className="font-semibold text-xl text-[#0F172A]">Add Category</p>
        <IoClose size={24} onClick={onCloseModal} />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <input
          onChange={handleName}
          value={name}
          placeholder="Name"
          className={`px-4 py-3 w-full h-full bg-[#F9FAFB] rounded-lg border`}
          style={{ border: `2px solid ${borderColor}` }}
        />
        <p className="font-medium text-lg text-[#0F172A]">Description</p>
        <textarea
          onChange={handleDescription}
          value={description}
          placeholder="write here"
          className="bg-[#F3F4F6] pt-4 pl-4 border border-[#D1D5DB] w-full h-[200px]"
        />
        <p className="text-sm font-bold" style={{ color: messageColor }}>
          {message}
        </p>

        <button
          onClick={handleAdd}
          className="py-2 flex justify-center items-center text-[#F9FAFB] bg-[#16A34A] w-full rounded-3xl"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
