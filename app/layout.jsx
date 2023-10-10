import Navbar from "@components/Navbar";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "@components/ui/toaster";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Company",
  description: "Company hierarchy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
