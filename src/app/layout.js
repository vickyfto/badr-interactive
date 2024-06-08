import { Inter } from "next/font/google";
import "./globals.css";
import AuthChecker from "./hooks/checkAuth";
import ReactQueryProvider from "@/middleware/reactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} px-24 py-5`}>
        <ReactQueryProvider>
          <AuthChecker>
            {children}
          </AuthChecker>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
