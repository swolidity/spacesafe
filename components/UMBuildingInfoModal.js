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
            <ModalHeader>UM/UMM Building Tab Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={2}>
                Use the following fields to sign in and out of any UM/UMM
                building space (lab, research meeting area) where you will spend
                more than 15 minutes in the presence of other occupants (planned
                or unplanned). You do not need to document quick access (less
                than 15 minutes) when wearing face coverings and maintaining
                required distancing. Use the "Off Campus" tab for research at
                field sites, vessels, farms or in buildings/spaces at non-UM
                institutions.
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
