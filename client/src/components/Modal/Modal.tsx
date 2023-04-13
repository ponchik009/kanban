import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalHeaderTitle,
} from "./Modal.styled";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  isLoading?: boolean;
}

export const Modal: FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
  isLoading = false,
}) => {
  const ref = useRef<Element | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <>
          {open && (
            <ModalContainer onClick={onClose}>
              <ModalContent onClick={(event) => event.stopPropagation()}>
                <ModalHeader>
                  <CloseButton
                    src="/assets/IconClose.svg"
                    alt="Закрыть окно"
                    width={24}
                    height={24}
                    onClick={onClose}
                  />
                  <ModalHeaderTitle>{title}</ModalHeaderTitle>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
              </ModalContent>
            </ModalContainer>
          )}
        </>,
        ref.current
      )
    : null;
};
