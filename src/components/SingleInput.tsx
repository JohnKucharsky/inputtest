import React, { SyntheticEvent, useEffect, useState } from "react";

interface singleInputProps {
  handleSendFact: (e: SyntheticEvent, fact: string, id: number) => void;
  setMultipleInputsValue: React.Dispatch<
    React.SetStateAction<{ input: string; key: number }[]>
  >;
  multipleInputsValue: {
    input: string;
    key: number;
  }[];
  uniqueId: number;
  setResetInputFields: React.Dispatch<React.SetStateAction<boolean>>;
  resetInputFields: boolean;
}

export default function SingleInput(p: singleInputProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (p.resetInputFields) {
      setInputValue("");
    }
    p.setResetInputFields(false);
  }, [p.resetInputFields]);

  function handleChangeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);

    const exists = p.multipleInputsValue.find((v) => v.key === p.uniqueId);
    if (exists) {
      const filteredArray = p.multipleInputsValue.filter(
        (f) => f.key !== p.uniqueId,
      );
      p.setMultipleInputsValue([
        ...filteredArray,
        { input: e.target.value, key: p.uniqueId },
      ]);
    } else {
      p.setMultipleInputsValue((prev) => [
        ...prev,
        { input: e.target.value, key: p.uniqueId },
      ]);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        p.handleSendFact(e, inputValue, p.uniqueId);
        setInputValue("");
      }}>
      <input
        type="number"
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <button style={{ display: "none" }}></button>
    </form>
  );
}
