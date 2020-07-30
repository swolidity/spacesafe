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

export default function CheckInTabs() {
  return (
    <Box>
      <Text p={4}>
        Use the following fields to sign in and out of any research space (lab,
        computer room, meeting area). Use the field work tab for off-campus
        research.
      </Text>
      <Tabs>
        <TabList>
          <Tab>UM Building</Tab>
          <Tab>Off Campus Site</Tab>
        </TabList>

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
