import styled from "@xstyled/styled-components";

export const grid = 8;
export const borderRadius = 2;
export const imageSize = 40;

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return "#E6FCFF";
  }
  if (isDraggingFrom) {
    return "#FFEBE6";
  }
  return "#EBECF0";
};

export const ColumnWrapper = styled.div`
  background-color: ${(props) =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  border: ${grid}px;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 100%;
  overflow-y: auto;
  height: 90vh;
`;
