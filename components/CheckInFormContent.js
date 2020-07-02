import { useCallback, useEffect } from "react";
import { useField, useFormContext } from "fielder";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const { data, error } = useSWR("/api/admin/locations", fetcher);
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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <form>
      <select {...locationProps}>
        {data.locations.map((location) => (
          <option value={location.id}>{location.name}</option>
        ))}
      </select>

      <input type="number" {...roomNumberProps} />

      <button onClick={handleSubmit}>Check In</button>
    </form>
  );
};
