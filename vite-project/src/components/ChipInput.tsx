import React, { useState } from "react";

import { Chip } from "@mui/material";
interface ChipInputProps {
  labelName: string;
  name: string;
  placeholder: string;
  chips: string[];
  // handleChange: (newValue: string[]) => void;
  handleChange: any;
  handleBtnClick: () => void;
}

const ChipInput = ({
  labelName,
  name,
  placeholder,
  chips = [],
  handleChange,
  handleBtnClick,
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (inputValue.trim()) {
        // handleChange(inputValue.trim());
        handleChange([...chips, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete: string) => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    handleChange(newChips);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        <button
          type="button"
          onClick={handleBtnClick}
          className="font-semibold text-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-black"
        >
          Ask Gpt
        </button>
      </div>

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
        id={name}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        required
      />
      <div className="mt-2 flex justify-start">
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => handleDeleteChip(chip)}
            className="mr-2 my-1"
          />
        ))}
      </div>
    </div>
  );
};

export default ChipInput;
