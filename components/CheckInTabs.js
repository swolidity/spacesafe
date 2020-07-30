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
