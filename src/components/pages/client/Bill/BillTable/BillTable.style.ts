import styled from "@emotion/styled";

export const Row = styled.tr`
  position: relative;

  td,
  th {
    padding: 0.5rem;
  }

  td:first-child,
  th:first-child {
    padding-left: 1.5rem;
  }

  td:last-child,
  th:last-child {
    padding-right: 1.5rem;
  }

  tbody &:not(:last-of-type):hover {
    background-color: #eeeeee;
  }

  &:after {
    content: "";
    height: 1px;
    background-color: #eeeeee;
    position: absolute;
    left: 2rem;
    right: 2rem;
    bottom: 0;
  }
`;