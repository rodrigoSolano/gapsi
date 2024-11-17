import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

export const metadata = {
  title: "Gapsi eCommerce",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
