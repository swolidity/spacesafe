import { FielderProvider, useForm } from "fielder";
import CheckInFormContent from "../components/CheckInFormContent";
import UMBuildingInfoModal from "./UMBuildingInfoModal";

export default ({ locations }) => {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <UMBuildingInfoModal />
      <CheckInFormContent />
    </FielderProvider>
  );
};
