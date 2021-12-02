import { useState } from "react";
export const baseUrl = "http://localhost:4000/api";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const reset = () => {
    setValue(initialValue);
  };
  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };
  return [value, bind, reset];
};

export default useInput;
