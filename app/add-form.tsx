"use client";
import { useFormState } from "react-dom";
import { createNewCandidate } from "./actions";
import React from "react";

const initialState = {
  message: "",
  errors: {},
};

// TODO: Pending refactor
function Errors({ errors }: { errors?: string[] }) {
  if (!errors) return null;
  return <span style={{ color: "red" }}>{errors[0]}</span>;
}

export default function CreateNewCandidateForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createNewCandidate, initialState);

  React.useEffect(() => {
    if (!state.errors) {
      formRef.current?.reset();
    }
  }, [state.errors]);

  return (
    <>
      {state.message && (
        <input type="text" name="url" value={state.message} disabled />
      )}
      <form ref={formRef} action={formAction}>
        <label>
          Technology:
          <select name="technology">
            <option value="react">React</option>
            <option value="nextjs">Vue</option>
            <option value="typescript">Svelte</option>
            <option value="python">Nextjs</option>
          </select>
          <Errors errors={state.errors?.technology} />
        </label>
        <label>
          Name:
          <input type="text" name="name" />
          <Errors errors={state.errors?.name} />
        </label>
        <label>
          CV:
          <input type="file" name="cv" accept=".pdf" />
          <Errors errors={state.errors?.cv} />
        </label>
        <input type="submit" value="Generar prueba" />
      </form>
    </>
  );
}
