import { ClientProvidersLayout } from "@/lib/client/provider";
import "./globals.css";
import { authSession } from "@/lib/server/session.ssr";
import { ConfigProvider } from "antd";
import { Outfit } from "next/font/google";

const fontSans = Outfit({
  // Google Font
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
});

export const metadata = {
  title: "Welcome to ShareBite Admin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the session on the server side
  // This will ensure that the session is available for the ClientProvidersLayout
  // and can be passed down to the client components
  const session = await authSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#EE217C",
              fontFamily: fontSans.className,
            },
          }}
        >
          <ClientProvidersLayout session={session}>
            {children}
          </ClientProvidersLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
