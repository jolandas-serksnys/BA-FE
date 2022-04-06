import styled from "@emotion/styled";
import { brandbook } from "@src/utils/brandbook";

export const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const StyledNote = styled.label`
  color: hsl(${brandbook.color.black.hs}%, 50%);
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.25rem;
`;

export const InputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;