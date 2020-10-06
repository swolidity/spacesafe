import { useState, useCallback } from "react";
import useSWR from "swr";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useToast,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import Datetime from "react-datetime";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function EditPage() {
  const router = useRouter();
  const { data, loading, error } = useSWR(
    () => (router.query.id ? `/api/edit?id=${router.query.id}` : null),
    fetcher
  );
  const [form, setForm] = useState({});

  const toast = useToast();

  const handleSubmit = useCallback(
    async (e) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/api/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data?.checkIn?.id, ...form }),
      });

      if (!res.ok) {
        toast({
          title: "Error saving.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

      const resData = await res.json();

      toast({
        title: "Saved.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    [form]
  );

  if (loading || !data) return <div></div>;

  return (
    <Box p={6}>
      Edit Check In
      <Heading>{data.checkIn.location.name}</Heading>
      <FormControl>
        <FormLabel>Check-In Time</FormLabel>
        <Datetime
          initialValue={new Date(data.checkIn.checkIn)}
          onChange={(value) => setForm({ ...form, checkIn: value.toString() })}
        />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Check-Out Time</FormLabel>
        <Datetime
          initialValue={new Date(data.checkIn.checkOut)}
          onChange={(value) => setForm({ ...form, checkOut: value.toString() })}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
