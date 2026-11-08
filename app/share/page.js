import ShareSection from "@/components/ShareSection";

export const metadata = {
  title: "Share — The Help Haven Network",
  description: "Share The Help Haven Network — scan the QR code or copy the link to pass it on.",
};

export default function SharePage() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <ShareSection />
    </div>
  );
}
