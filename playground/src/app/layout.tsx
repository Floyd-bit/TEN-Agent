/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 
 * @Date: 2025-03-28 16:49:55
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2025-03-28 17:08:29
 */
// import { ConfigProvider } from "antd";
import { StoreProvider } from "@/store"
import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/sonner"

import "./global.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "TEN Agent | Real-Time Multimodal AI Agent",
  description:
    "TEN Agent is an open-source multimodal AI agent that can speak, see, and access a knowledge base(RAG).",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Script src="/ten-agent/live2d.min.js" />
      <Script src="/ten-agent/live2dcubismcore.min.js" />
      <body className="dark">
        {/* <ConfigProvider
          theme={{
            components: {
              Select: {
                selectorBg: "#181A1D",
              },
            },
          }}
        > */}
        <StoreProvider>{children}</StoreProvider>
        {/* </ConfigProvider> */}
        <Toaster richColors closeButton theme="dark" />
      </body>
    </html>
  )
}
