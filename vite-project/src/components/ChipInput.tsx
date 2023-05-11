import React, { useState } from "react";

import { Chip } from "@mui/material";
import Input from "./Input";
import Countdown from "./Countdown";
import MuiLoader from "./MuiLoader";

interface ChipInputProps {
  labelName: string;
  name: string;
  placeholder: string;
  chips: string[];
  gptLoading: boolean;
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
  gptLoading,
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(0);
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleBtnClickWrapper = () => {
    setTimer(10);
    setTimeout(() => {
      setTimer(0);
    }, 10000);
    handleBtnClick();
  };

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        <button
          disabled={chips.length === 0 || timer !== 0}
          type="button"
          onClick={handleBtnClickWrapper}
          className="font-semibold text-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-black disabled:opacity-50 disabled:bg-gray-300"
        >
          {gptLoading ? (
            <MuiLoader size={12} thickness={4} />
          ) : (
            <Countdown seconds={timer}>Ask Gpt</Countdown>
          )}
        </button>
      </div>

      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        className="mt-2"
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
