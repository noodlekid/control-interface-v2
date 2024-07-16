import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import RosConnect from "./components/ROSConnection";
import Header from "./components/Header";
import useROSStore from "./stores/ROSStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROS2: Humble",
  description: "CPRT: WebInterface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <RosConnect />
        <ToastContainer />
      </body>
    </html>
  );
}
