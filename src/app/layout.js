import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "./minima.ttf",
});

export const metadata = {
  title: "people",
  description: "the room is dark and spinning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
