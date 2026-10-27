import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "AyudemosMás. Es hora de ayudar.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen que se ve al compartir el enlace (Instagram, TikTok, LinkedIn).
export default async function OpengraphImage() {
  const [logo, serifItalic, outfitBold] = await Promise.all([
    readFile(path.join(process.cwd(), "public/logo-horizontal.svg")),
    readFile(path.join(process.cwd(), "src/fonts/freeserif/FreeSerifItalic.ttf")),
    readFile(path.join(process.cwd(), "src/fonts/outfit/Outfit-Bold-static.ttf")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7FDBC2",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1040,
            height: 470,
            borderRadius: 48,
            background: "#ffffff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={740} height={161} alt="" />
          <div
            style={{
              marginTop: 40,
              fontFamily: "FreeSerif",
              fontStyle: "italic",
              fontSize: 64,
              color: "#000000",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: "Outfit",
              fontSize: 30,
              color: "#434B56",
            }}
          >
            {site.instagramHandle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "FreeSerif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Outfit", data: outfitBold, style: "normal", weight: 700 },
      ],
    },
  );
}
