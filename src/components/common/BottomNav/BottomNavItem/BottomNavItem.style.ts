import styled from "@emotion/styled";

export const Li = styled.li`
  flex: 1;

  a {
    height: 100%;
  }

  @media (max-width: 768px) {
    a {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      text-align: center;
      padding: 0.5rem !important;
      gap: 0.25rem !important;
    }
  }
`;