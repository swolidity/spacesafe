import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import CheckInForm from "../components/CheckInForm";
import FieldSiteForm from "../components/FieldSiteForm";

export default function CheckInTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>Building</Tab>
        <Tab>Field Site</Tab>
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
  );
}
