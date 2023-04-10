import styled from "styled-components";

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: calc(100% - 100px);
  flex-shrink: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: none;
  background-color: transparent;
  margin-bottom: 10px;
`;

export const Container = styled.div<{ isDragging?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 300px;
  min-width: 300px;
  height: calc(100vh - 280px);
  margin-right: 20px;
  position: relative;
  ${({ isDragging }) => isDragging && "opacity: 0.6;"};
  border: 1px solid black;
  overflow-y: auto;
  padding: 8px 16px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  color: #333;
  background-color: transparent;
  font-weight: 400;
  padding: 0;
  cursor: grab;
  &:hover {
    color: #428bca;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

type RowDropshadowProps = {
  marginTop: number;
  height: number;
};

export const RowDropshadow = styled.div<RowDropshadowProps>`
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  border-radius: 3px;
  background-color: #ddd;
  width: 280px;
  height: ${({ height }) => height}px;
  z-index: 1;
`;

export const DropshadowContainer = styled(RowContainer)`
  width: auto;
  position: absolute;
`;
