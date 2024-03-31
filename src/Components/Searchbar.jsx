import { useState } from 'react'

function Searchbar({ onCityChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onCityChange(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex relative bg-black pt-10 justify-center z-101">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-58 px-4 py-3 text-gray-800  focus:outline-none"
        placeholder="Type something..."
      />
      <button
        onClick={handleSubmit}
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
    </div>
  );
}

export default Searchbar
