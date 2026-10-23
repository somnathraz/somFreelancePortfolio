import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — geometric S for Somanath Studio */
export default function Icon() {
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
                    borderRadius: 7,
                }}
            >
                <div
                    style={{
                        fontSize: 22,
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
