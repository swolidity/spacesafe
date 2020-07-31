import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/core";

export default function OffCampusInfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button mb={2} onClick={onOpen}>
        More Info
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={3}>
                Use the following fields to sign in and out of any 1) non-UM
                research facilities or 2) outdoor research sites, such as field
                sites, farms or vessels (e.g,. boats). This pertains to room
                access where you will spend more than 5 minutes alone or any
                time in the presence of other occupants and to any outdoor work
                where individuals are required to apply social distancing.
                Please note that UMSpaceSafe does not take the place of any
                safety policies of off campus facilities or other institutions. 
                Use the "Campus Building" tab for UM research facilities in
                campus buildings.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
