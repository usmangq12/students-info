import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "StudentGridTileView",
  description: "A POC for demonstrating grid and tile views with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
