import styled from "@emotion/styled";

interface DishImageProps {
  src: string;
  height?: string;
  borderRadius?: string;
}

export const DishImage = styled.div<DishImageProps>`
  aspect-ratio: ${(props: DishImageProps) => props.height ? '' : '1/1'};
  height: ${(props: DishImageProps) => props.height};
  background-image: url(${(props: DishImageProps) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: ${(props: DishImageProps) => props.borderRadius ? `${props.borderRadius} ${props.borderRadius} 0 0` : '1rem 1rem 0 0'};
  cursor: pointer;
`;

export const Info = styled.div`
  margin-top: -2.55rem;
  cursor: pointer;
`;

export const DishContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
`;

export const AgeRestriction = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;