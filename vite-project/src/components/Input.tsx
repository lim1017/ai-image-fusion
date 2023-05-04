import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none",
        error && "border-red-500",
        className
      )}
      {...props}
    />
  );
};

export default Input;
