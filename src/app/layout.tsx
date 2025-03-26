"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header"; 
import ReduxProvider from "../components/ReduxProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}  style={{userSelect: 'none'}}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReduxProvider>
            <Header />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
