import { Text } from "@chakra-ui/core";
import { FielderProvider, useForm } from "fielder";
import FieldSiteFormContent from "../components/FieldSiteFormContent";

export default function FieldSiteForm() {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <Text mb={3}>
        Use the following fields to sign in and out of any research field site
        or off campus facilities, including research vessels (e.g,. boats) or
        spaces accessed for research at non-UM facilities.  Again, this pertains
        to access where you will spend more than 5 minutes alone or any time in
        the presence of other occupants.  You do not need to document quick
        access (less than 5 minutes) of unoccupied spaces when wearing face
        coverings. Please note that UMSpaceSafe does not take the place of any
        safety policies of other institutions.  Use the "Building" tab for
        on-campus research facilities
      </Text>
      <FieldSiteFormContent />
    </FielderProvider>
  );
}
