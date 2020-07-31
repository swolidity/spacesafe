import { FielderProvider, useForm } from "fielder";
import FieldSiteFormContent from "../components/FieldSiteFormContent";
import OffCampusInfoModal from "./OffCampusInfoModal";

export default function FieldSiteForm() {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <OffCampusInfoModal />
      <FieldSiteFormContent />
    </FielderProvider>
  );
}
