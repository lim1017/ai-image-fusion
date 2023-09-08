import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={clsx(
          "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none",
          error && "border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
