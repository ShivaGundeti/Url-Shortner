import Providers from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body className="min-h-full flex flex-col">
        <Providers>

        {children}
        </Providers>
        
        
        </body>
    </html>
  );
}
