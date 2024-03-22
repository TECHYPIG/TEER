import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TEER",
  description: "The Volunteering Social Media App is a platform designed to connect volunteers with organizations that need their help. It allows users to create profiles, post about their volunteering experiences, and connect with other like-minded individuals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
