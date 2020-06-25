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
    async (e) => {
      e.preventDefault();

      console.log(fields);

      const transformed = await Object.entries(fields).reduce(
        (p, [key, field]) => ({ [key]: field.value }),
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
        <option value="MurrayHall">Murray Hall</option>
        <option value="BoardmanHall">Boardman Hall</option>
      </select>

      <input type="number" {...roomNumberProps} />

      <button onClick={handleSubmit}>Check In</button>
    </form>
  );
};
