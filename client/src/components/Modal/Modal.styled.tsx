import Image from "next/image";
import styled from "styled-components";

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const ModalContent = styled.div`
  min-width: 40vw;
  max-height: 80vh;
  border-radius: 16px;

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  background: #f9f9f9;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalHeader = styled.div`
  min-height: 64px;
  padding: 36px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const ModalHeaderTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  max-width: 80%;
`;

export const CloseButton = styled(Image)`
  position: absolute;
  top: 12px;
  right: 12px;

  cursor: pointer;
`;

export const ModalBody = styled.div`
  padding: 36px 64px 80px 64px;
`;
