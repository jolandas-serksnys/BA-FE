import React from "react";

interface Props {
  title: string;
}

export const SectionHeader = ({ title }: Props) =>
  <h2 className="section-heading my-4">{title}</h2>;