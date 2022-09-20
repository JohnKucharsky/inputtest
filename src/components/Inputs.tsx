import { SyntheticEvent, useEffect, useState } from "react";
import SingleInput from "./SingleInput";

const arrayWithKeys = [1, 2, 3, 4, 5];
export default function Inputs() {
  const [showInputValue, setShowInputValue] = useState("");
  const [multipleInputsValue, setMultipleInputsValue] = useState<
    { input: string; key: number }[]
  >([]);
  const [showMultipleInputsValue, setShowMultipleInputsValue] = useState<
    { input: string; key: number }[]
  >([]);
  const [resetInputFields, setResetInputFields] = useState(false);

  function handleSendFact(e: SyntheticEvent, fact: string, id: number) {
    e.preventDefault();
    const exists = multipleInputsValue.find((v) => v.key === id);
    if (exists) {
      const filteredArray = multipleInputsValue.filter((f) => f.key !== id);
      setMultipleInputsValue([...filteredArray]);
    }
    setShowInputValue(fact);
  }

  function handleSendFactMultiple(e: SyntheticEvent) {
    e.preventDefault();
    setShowMultipleInputsValue(multipleInputsValue);
    setResetInputFields((prev) => !prev);
    setMultipleInputsValue([]);
  }
  useEffect(() => {
    setMultipleInputsValue(multipleInputsValue.filter((v) => v.input !== ""));
  }, [multipleInputsValue]);

  return (
    <div>
      {multipleInputsValue.length > 1 && (
        <button onClick={handleSendFactMultiple}>
          Send({multipleInputsValue.length})
        </button>
      )}
      {arrayWithKeys.map((v) => (
        <SingleInput
          key={v}
          handleSendFact={handleSendFact}
          setMultipleInputsValue={setMultipleInputsValue}
          multipleInputsValue={multipleInputsValue}
          resetInputFields={resetInputFields}
          setResetInputFields={setResetInputFields}
          uniqueId={v}
        />
      ))}
      <p>Single Input Value {showInputValue}</p>
      <p>Multiple Inputs Value </p>
      {showMultipleInputsValue.map((v) => (
        <p key={v.input}>{v.input}</p>
      ))}
    </div>
  );
}
