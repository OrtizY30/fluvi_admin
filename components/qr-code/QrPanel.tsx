import QRCode from "react-qr-code";

type QrPanelProps = {
  value: string;
};

const QrPanel =(
  ({ value } : QrPanelProps ) => {
    return (
     <div style={{ background: "white", padding: "16px", display: "inline-block" }}>
        <QRCode
          value={value}
          size={218}
          title={value}
        />
      </div>
    );
  }
);

export default QrPanel;
