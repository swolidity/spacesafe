import { FielderProvider, useForm } from "fielder";
import CheckInFormContent from "../components/CheckInFormContent";
import { Text } from "@chakra-ui/core";

export default ({ locations }) => {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <Text mb={2}>
        Use the following fields to sign in and out of any research space (lab,
        computer room, meeting area) where you will spend more than 5 minutes
        alone or any time in the presence of other occupants.  You do not need
        to document quick access (less than 5 minutes) of unoccupied spaces when
        wearing face coverings.  Use the "field work" tab for off-campus
        research, including field sites or buildings/spaces at other
        institutions.
      </Text>
      <CheckInFormContent />
    </FielderProvider>
  );
};
