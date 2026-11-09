import { ImageResponse } from "next/og";

// Default site-wide Open Graph / Twitter share image (Next.js file
// convention — any route without its own opengraph-image.* falls back to
// this one). Generated at request time so there's no binary asset to keep
// in sync with the brand; colors match the site's dark-cobalt theme in
// app/globals.css (--panel, --ink, --teal-dark).
export const alt = "The Help Haven Network — free crisis and support resource directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1530 0%, #101d3a 55%, #16284f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#eef1fb",
            textAlign: "center",
            letterSpacing: "-0.02em",
            padding: "0 80px",
          }}
        >
          The Help Haven Network
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "#b9cbff",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Free crisis & support resource directory — Dallas-Fort Worth
        </div>
      </div>
    ),
    { ...size }
  );
}
