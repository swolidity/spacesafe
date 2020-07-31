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

export default function UMBuildingInfoModal() {
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
              <Text mb={2}>
                Use the following fields to sign in and out of any research
                space (lab, computer room, meeting area) where you will spend
                more than 5 minutes alone or any time in the presence of
                other occupants.  You do not need to document quick access (less
                than 5 minutes) of unoccupied spaces when wearing face
                coverings.  Use the "field work" tab for off-campus research,
                including field sites or buildings/spaces at other institutions.
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
