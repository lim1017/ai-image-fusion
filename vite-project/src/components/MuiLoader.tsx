import { CircularProgress } from "@mui/material";

type Props = {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  size?: number;
  thickness?: number;
};

export default function MuiLoader({
  color = "primary",
  size = 18,
  thickness = 8,
}: Props) {
  return <CircularProgress color={color} size={size} thickness={thickness} />;
}
