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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={3}>
                Use the following fields to sign in and out of any research
                field site or off campus facilities, including research vessels
                (e.g,. boats) or spaces accessed for research at non-UM
                facilities.  Again, this pertains to access where you will spend
                more than 5 minutes alone or any time in the presence of
                other occupants.  You do not need to document quick access (less
                than 5 minutes) of unoccupied spaces when wearing face
                coverings. Please note that UMSpaceSafe does not take the place
                of any safety policies of other institutions.  Use the
                "Building" tab for on-campus research facilities
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
