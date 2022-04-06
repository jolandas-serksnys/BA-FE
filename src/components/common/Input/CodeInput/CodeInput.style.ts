import styled from "@emotion/styled";

export const HiddenInput = styled.input`
  display: none !important;
`;

interface Props {
  length: number;
}

export const CodeInput = styled.div(({ length }: Props) => (`
  display: inline-grid !important;
  grid-auto-flow: column;
  grid-template-columns: repeat(${length - 1}, 1fr 0) 1fr;
  min-width: calc(227px);
`))