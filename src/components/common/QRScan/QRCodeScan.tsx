import React from "react";
import { QrReader } from "react-qr-reader";
import { QRCodeScanWrapper } from "./QRCodeScan.style";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onResult: (result: any, error: any) => void
}

export const QRCodeScan = ({ onResult }: Props) => {
  return (
    <QRCodeScanWrapper className="qr-code-scan-wrapper">
      <QrReader
        onResult={onResult}
        constraints={{ facingMode: 'environment' }}
      />
    </QRCodeScanWrapper>
  );
};