import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  ThemingProps,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onConfirm: () => void;
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  descriptionNode?: React.ReactNode;
  cancelText?: string;
  okText?: string;
  colorScheme?: ThemingProps["colorScheme"];
  size?: ThemingProps["size"];
}

export const ConfirmModal = ({
  onConfirm,
  trigger,
  title,
  description,
  cancelText,
  okText,
  colorScheme,
  descriptionNode,
  size,
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onClickConfirm = async () => {
    setLoading(true);

    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader marginRight={4}>{title}</ModalHeader>}
          <ModalCloseButton />
          {description && !descriptionNode && (
            <ModalBody>
              <Text>{description}</Text>
            </ModalBody>
          )}
          {descriptionNode && !description && <ModalBody>{descriptionNode}</ModalBody>}
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {cancelText || t("common.buttons.cancel")}
            </Button>
            <Button
              isLoading={loading}
              colorScheme={colorScheme}
              variant="solid"
              onClick={onClickConfirm}
            >
              {okText || t("common.buttons.confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
