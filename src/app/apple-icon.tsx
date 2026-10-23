import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — geometric S for Somanath Studio */
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000000",
                    borderRadius: 40,
                }}
            >
                <div
                    style={{
                        fontSize: 120,
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1,
                        letterSpacing: "-0.06em",
                        fontFamily: "system-ui, sans-serif",
                    }}
                >
                    S
                </div>
            </div>
        ),
        { ...size }
    );
}
