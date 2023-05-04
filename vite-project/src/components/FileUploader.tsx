import { useCallback, useState } from "react";
import clsx from "clsx";

interface FileUploadProps {
  accept?: string;
  className?: string;
  onError?: (error: Error) => void;
  onFileSelect: (file: File) => void;
}

const FileUpload = ({
  accept,
  className,
  onError,
  onFileSelect,
}: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);

      const file = event.dataTransfer.files[0];

      if (accept && !file.type.includes(accept)) {
        setError(`Invalid file type. Must be ${accept}`);
        return;
      }

      setError("");

      onFileSelect(file);
    },
    [accept, onFileSelect]
  );

  const handleFileSelect = useCallback(
    (event) => {
      const file = event.target.files[0];

      if (accept && !file.type.includes(accept)) {
        setError(`Invalid file type. Must be ${accept}`);
        return;
      }

      setError("");

      onFileSelect(file);
    },
    [accept, onFileSelect]
  );

  return (
    <div
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none",
        dragOver && "border-dashed border-blue-500",
        error && "border-red-500",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
      />
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-gray-400">
          {dragOver
            ? "Drop file here"
            : "Drag and drop file here or click to select file"}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
