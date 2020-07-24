import { useCallback } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import useSWR, { mutate } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FieldSiteFormContent() {
  const { data, error } = useSWR(
    "/api/admin/locations?fieldSite=true",
    fetcher
  );
  const { fields } = useFormContext();

  const [locationProps] = useField({
    name: "location",
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
            `${process.env.NEXT_PUBLIC_SITE}/api/check/in?fieldSite=true`,
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
    <div>
      <FormControl mb={2}>
        <FormLabel>Field Site</FormLabel>
        <Input placeholder="Field Site" {...locationProps} />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Check In
      </Button>
    </div>
  );
}
