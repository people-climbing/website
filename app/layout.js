import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "./minima.ttf",
});

export const metadata = {
  title: "people climbing",
  description: "ps2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
