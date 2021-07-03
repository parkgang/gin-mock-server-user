import { useState, Dispatch, SetStateAction } from "react";

export default function useKeyword(
  init: string = ""
): [string, Dispatch<SetStateAction<string>>, (e: any) => void] {
  const [value, setValue] = useState<string>(init);

  function handlerOnChange(e: any): void {
    const result = e.target.value;
    setValue(result);
  }

  return [value, setValue, handlerOnChange];
}
