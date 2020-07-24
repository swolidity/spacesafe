import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/core";
import { FielderProvider, useForm } from "fielder";
import FieldSiteFormContent from "../components/FieldSiteFormContent";

export default function FieldSiteForm() {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <FieldSiteFormContent />
    </FielderProvider>
  );
}
