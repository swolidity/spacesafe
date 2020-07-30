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
  ListIcon,
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

      toast({
        title: "Successfully checked in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

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

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  if (error) return <div>failed to load</div>;

  const locations = data ? data.locations : [];

  return (
    <div>
      <FormControl mb={2}>
        <FormLabel>Field Site</FormLabel>

        <div {...getComboboxProps()}>
          <Input
            placeholder="Search for a field site..."
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

        <Textarea
          placeholder="Add any additional information here..."
          {...notesProps}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Check In
      </Button>
    </div>
  );
}
