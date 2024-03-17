"use client";
import { useFormState } from "react-dom";
import { createNewCandidate } from "./actions";
import React from "react";

const initialState = {
  url: "",
  errors: {},
};

function Errors({ errors }: { readonly errors?: readonly string[] }) {
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
      {state.url && <input type="text" name="url" value={state.url} disabled />}
      <form ref={formRef} action={formAction}>
        <fieldset>
          <label htmlFor="technology">Technology:</label>
          <select name="technology" id="technology">
            <option value="react">React</option>
            <option value="nextjs">Vue</option>
            <option value="typescript">Svelte</option>
            <option value="python">Nextjs</option>
          </select>
          <Errors errors={state.errors?.technology} />
        </fieldset>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <Errors errors={state.errors?.name} />
        </fieldset>
        <fieldset>
          <label htmlFor="cv">CV:</label>
          <input type="file" name="cv" accept=".pdf" id="cv" />
          <Errors errors={state.errors?.cv} />
        </fieldset>
        <input type="submit" value="Generar prueba" />
      </form>
    </>
  );
}
