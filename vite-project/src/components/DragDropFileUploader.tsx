import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import clsx from "clsx";

const validFormats = ["mp3", "mp4", "wav", "mpeg"];
//todo max size
interface DragDropProps {
  handleUpload: (file: File) => void;
}

const DragDropFileUploader = ({ handleUpload }: DragDropProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[1];
      console.log(fileType);
      if (validFormats.includes(fileType)) {
        setSelectedFile(file);
        setError(null);
      } else {
        setSelectedFile(null);
        setError("Invalid file type, please select an audio file.");
      }
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor="audioUpload"
        className={clsx(
          "cursor-pointer border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none",
          error && "border-red-500"
        )}
      >
        {selectedFile ? (
          <span>{selectedFile.name}</span>
        ) : (
          <span>
            <HiOutlineCloudUpload className="inline-block mr-2" />
            Select Audio File
          </span>
        )}
      </label>
      <input
        type="file"
        id="audioUpload"
        accept=".mp3,.mp4"
        className="hidden"
        onChange={handleFileSelect}
        onClick={(event) => {
          // Clear the selected file input field when clicked
          event.currentTarget.value = "";
        }}
        multiple={false}
      />
      <button
        type="button"
        disabled={!selectedFile}
        onClick={handleUploadClick}
        className={clsx(
          "bg-violet-500 text-white font-medium py-2 px-6 rounded-3xl cursor-pointer disabled:opacity-50 disabled:bg-gray-400",
          !selectedFile && "opacity-50 bg-gray-400 cursor-not-allowed"
        )}
      >
        Upload
      </button>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default DragDropFileUploader;
