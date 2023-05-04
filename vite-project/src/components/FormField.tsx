// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Input from "./Input";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  ...rest
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-black"
          >
            Get Random Prompt
          </button>
        )}
      </div>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        {...rest}
      />
    </div>
  );
};
export default FormField;
