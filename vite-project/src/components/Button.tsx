import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const buttonClasses = cva(
  [
    "font-bold",
    "transition",
    "duration-200",
    "ease-in-out",
    "font-medium",
    "rounded-xl",
    "cursor-pointer",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-300",
    "hover:scale-110",
    "disabled:scale-100",
    "active:scale-100",
  ],
  {
    variants: {
      intent: {
        action: [
          "text-white",
          "bg-green-700",
          "border-transparent",
          "hover:bg-green-800",
        ],
        primary: [
          "bg-violet-500",
          "text-white",
          "border-transparent",
          "hover:bg-violet-600",
        ],
        secondary: [
          "bg-gray-300",
          "text-black",
          "border-transparent",
          "hover:bg-gray-400",
        ],
        alt: [
          "bg-yellow-400",
          "text-black",
          "border-transparent",
          "hover:bg-yellow-300",
        ],
        error: [
          "bg-red-600",
          "text-white",
          "border-transparent",
          "hover:bg-red-600",
        ],
        text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
