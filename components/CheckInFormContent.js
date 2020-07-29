import { useCallback, useEffect } from "react";
import { useField, useFormContext } from "fielder";
import useSWR, { mutate } from "swr";
import {
  Flex,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/core";

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

  const [notesProps] = useField({
    name: "notes",
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const transformed = Object.entries(fields).reduce(
        (acc, [key, field]) => ({ ...acc, [key]: field.value }),
        {}
      );

      mutate(
        "/api/check/in",
        async (data) => {
          const checkInRes = await fetch(
            `${process.env.NEXT_PUBLIC_SITE}/api/check/in`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transformed),
            }
          );

          const checkIn = await checkInRes.json();

          return { ...data, checkIns: [...data.checkIns, checkIn] };
        },
        false
      );
    },
    [fields]
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <form>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Select {...locationProps} placeholder="Select location">
          {data.locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Room Number</FormLabel>
        <Input type="number" {...roomNumberProps} placeholder="Room number" />
      </FormControl>

      <FormControl>
        <FormLabel>Notes</FormLabel>

        <Textarea
          plceholder="Add any additional information here..."
          {...notesProps}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Check In
      </Button>
    </form>
  );
};
