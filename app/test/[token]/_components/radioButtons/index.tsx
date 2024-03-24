"use client";

export default function RadioButtonGroup({
  options,
}: {
  options: { value: string }[];
}) {
  return (
    <>
      {options.map((option, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={option.value}
              name="answer"
              value={option.value}
              onClick={() => {
                console.log(`Selected: ${option.value}`);
              }}
            />
            <label htmlFor={option.value}>{option.value}</label>
          </div>
        );
      })}
    </>
  );
}
