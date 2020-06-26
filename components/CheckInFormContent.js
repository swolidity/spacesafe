import { useCallback } from "react";
import { useField, useFormContext } from "fielder";

export default () => {
  const { fields } = useFormContext();

  const [locationProps] = useField({
    name: "location",
  });

  const [roomNumberProps] = useField({
    name: "roomNumber",
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const transformed = Object.entries(fields).reduce(
        (acc, [key, field]) => ({ ...acc, [key]: field.value }),
        {}
      );

      fetch("http://localhost:3000/api/check/in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformed),
      });
    },
    [fields]
  );

  return (
    <form>
      <select {...locationProps}>
        <option value="Murray Hall">Murray Hall</option>
        <option value="Boardman Hall">Boardman Hall</option>
      </select>

      <input type="number" {...roomNumberProps} />

      <button onClick={handleSubmit}>Check In</button>
    </form>
  );
};
