import Header from "@/components/Header";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={`bg-primary-900 text-accent-100 min-h-screen flex flex-col relative ${JosefinSans.className}`}
      >
        <Header />
        <div className="flex-1 grid w-full">
          <div className="max-w-7xl mx-auto px-10 py-6 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
