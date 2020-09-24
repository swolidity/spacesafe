import { useCallback, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
  List,
  ListItem,
  FormHelperText,
  Box,
} from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import useSWR, { mutate } from "swr";
import { useCombobox } from "downshift";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FieldSiteFormContent() {
  const [searchTerm, setSearchTerm] = React.useState(null);
  const { data, error } = useSWR(
    `/api/admin/locations?fieldSite=true&searchTerm=${searchTerm}`,
    fetcher
  );
  const { fields } = useFormContext();

  const [locationProps] = useField({
    name: "location",
  });

  const [notesProps] = useField({
    name: "notes",
  });

  const toast = useToast();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: data?.locations.length ? data?.locations : [],
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue);
    },
    itemToString: (item) => item.name,
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const transformed = Object.entries(fields).reduce(
        (acc, [key, field]) => ({ ...acc, [key]: field.value }),
        {}
      );

      transformed.location = searchTerm;

      if (!transformed.location)
        return alert("Please enter or select an Off Campus Site.");

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

          if (!checkInRes.ok) {
            toast({
              title:
                "Error checking in. Make sure you have selected an Off Campus Site.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }

          const checkIn = await checkInRes.json();

          toast({
            title: "Successfully checked in.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          return { ...data, checkIns: [...data.checkIns, checkIn] };
        },
        false
      );
    },
    [fields, searchTerm]
  );

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  if (error) return <div>failed to load</div>;

  const locations = data ? data.locations : [];

  return (
    <Box shadow="sm" padding={5} backgroundColor="white">
      <FormControl mb={2}>
        <FormLabel>Off Campus Site</FormLabel>

        <FormHelperText mb={1}>
          Search for off campus site and click to select from dropdown. If off
          campus site is not found enter full name in to create a new record in
          the database.
        </FormHelperText>

        <div {...getComboboxProps()}>
          <Input
            isRequired
            placeholder="Search for a off campus site..."
            {...getInputProps()}
          />

          <List {...getMenuProps()}>
            {isOpen &&
              locations.map((item, index) => (
                <ListItem
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.name}
                </ListItem>
              ))}
          </List>
        </div>
      </FormControl>

      <FormControl>
        <FormLabel>Notes</FormLabel>
        <FormHelperText mb={1}>
          Provide other info as needed (e.g., UM/UMM or Non-UM personnel unable
          to access UMSpaceSafe, COVID safety concerns)
        </FormHelperText>

        <Textarea
          placeholder="Add any additional information here..."
          {...notesProps}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit} my={3}>
        Check In
      </Button>
    </Box>
  );
}
