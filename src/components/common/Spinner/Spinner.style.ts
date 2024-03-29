import styled from "@emotion/styled";

export const StyledSpinner = styled.div`
  display: inline-block;
  position: relative;
  aspect-ratio: 1/1;
  height: 2rem;
  align-self: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border: 2px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &:after {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;