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
  useToast,
  toast,
  FormHelperText,
} from "@chakra-ui/core";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const { data, error } = useSWR(
    "/api/admin/locations?fieldSite=false",
    fetcher
  );
  const { fields } = useFormContext();
  const toast = useToast();

  const [locationProps] = useField({
    name: "location",
  });

  const [roomNumberProps] = useField({
    name: "roomNumber",
  });

  const [guestsProps] = useField({
    name: "guests",
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

          if (!checkInRes.ok) {
            toast({
              title: "Error checking in.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Successfully checked in.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }

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
    <Box shadow="sm" padding={5} backgroundColor="white">
      <form>
        <FormControl mb={2}>
          <FormLabel>Location</FormLabel>
          <FormHelperText mb={1}>Select building from dropdown.</FormHelperText>
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

          <FormHelperText mb={1}>
            Enter complete room number (e.g., 313b)
          </FormHelperText>

          <Input {...roomNumberProps} placeholder="Room number" />
        </FormControl>

        <FormControl>
          <FormLabel>Guest Info</FormLabel>

          <FormHelperText mb={1}>
            Enter name and contact info (email or phone) of guests or other
            individuals unable to log their own space use. Separate multiple
            guests with commas.
          </FormHelperText>

          <Textarea placeholder="Guest info..." {...guestsProps} />
        </FormControl>

        <FormControl>
          <FormLabel>Notes</FormLabel>

          <FormHelperText mb={1}>
            Provide other info as needed (e.g., room for building not in list,
            UM/UMM or Non-UM personnel unable to access UMSpaceSafe, COVID
            safety concerns)
          </FormHelperText>

          <Textarea
            placeholder="Add any additional information here..."
            {...notesProps}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit} my={3}>
          Check In
        </Button>
      </form>
    </Box>
  );
};
