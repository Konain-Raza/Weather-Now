import { useState } from 'react'
import useStore from "./store"
import "./styles.css";

function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const {city, updateCity} = useStore((state)=>({
    city:state.city,
    updateCity: state.updateCity
  }))

  const handleform =(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const value = data.get("city").trim();
    updateCity(value);
    setInputValue("")
  }

  return (
    <form className="flex justify-center items-center" onSubmit={handleform}>
    <div
      className="flex items-center max-w-md mx-auto rounded-lg absolute top-5 z-100"
      x-data="{ search: '' }"
    >
      <div className=" flex">
        <input
        name='city'
          type="text"
          className="w-full px-4 py-3 rounded-lg rounded-r-none text-gray-800  focus:outline-none"
          placeholder="Enter any city"
        />

        <button
          type="submit"
          className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <div></div>
      </div>
    </div>
  </form>

  );
}

export default Searchbar
