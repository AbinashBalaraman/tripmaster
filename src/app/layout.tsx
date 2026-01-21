import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TripMaster - Manage Your Trips Like Never Before",
  description:
    "Plan trips, track expenses, split costs with friends, and create memories without the financial stress. Perfect for boys trips, family vacations, and group adventures.",
  keywords: [
    "trip planner",
    "expense tracker",
    "group travel",
    "split expenses",
    "travel budget",
  ],
  openGraph: {
    title: "TripMaster - Manage Your Trips Like Never Before",
    description:
      "Plan trips, track expenses, split costs with friends, and create memories without the financial stress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
