import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/core";
import CheckInForm from "../components/CheckInForm";
import FieldSiteForm from "../components/FieldSiteForm";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { useState } from "react";

export default function CheckInTabs() {
  const [alertState, setAlertState] = useState("open");

  const handleAlertClose = () => {
    setAlertState("close");
  };

  let alertBlock;
  if (alertState === "open") {
    alertBlock = (
      <Alert status="info" my={2}>
        <AlertIcon />
        <AlertTitle mr={1}>
          The CDC recently updated its guidance for what constitutes a contact
          for COVID tracing to include the cumulative amount of time interacting
          with an infected individiual over the course of a given day (15
          minutes total, not just 15 minutes at once), so we strongly encourage
          you to document even short term contacts with other individuals you
          might encounter repeatedly throughout your day.
        </AlertTitle>
        <CloseButton onClick={handleAlertClose} />
      </Alert>
    );
  } else {
    alertBlock = null;
  }

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>UM/UMM Building</Tab>
          <Tab>Off Campus Site</Tab>
        </TabList>
        {alertBlock}
        <TabPanels>
          <TabPanel>
            <CheckInForm />
          </TabPanel>
          <TabPanel>
            <FieldSiteForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
