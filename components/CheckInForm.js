import { FielderProvider, useForm } from "fielder";
import CheckInFormContent from "../components/CheckInFormContent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

export default ({ locations }) => {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <Tabs>
        <TabList>
          <Tab>Building</Tab>
          <Tab>Field Site</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CheckInFormContent />
          </TabPanel>
          <TabPanel>Field Sites</TabPanel>
        </TabPanels>
      </Tabs>
    </FielderProvider>
  );
};
