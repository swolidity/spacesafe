import { FielderProvider, useForm } from "fielder";
import CheckInFormContent from "../components/CheckInFormContent";

export default () => {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <CheckInFormContent />
    </FielderProvider>
  );
};
