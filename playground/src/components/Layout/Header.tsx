/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 
 * @Date: 2025-03-28 16:49:55
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2025-03-30 17:52:54
 */
import { LogoIcon, SmallLogoIcon } from "@/components/Icon"
import { HeaderRoomInfo, HeaderActions } from "./HeaderComponents"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Header(props: { className?: string }) {
  const { className } = props
  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "flex items-center justify-between bg-[#181a1d] p-2 md:p-4",
          className,
        )}
      >
        <div className="flex items-center space-x-2">
          {/* <LogoIcon className="hidden h-5 md:block" />
          <SmallLogoIcon className="block h-4 md:hidden" /> */}
          <Image src="/ten-agent/company_logo.png" alt="logo" width={100} height={50} />
          <h1 className="text-sm font-bold md:text-xl" style={{ marginLeft: "-50px" }}>Mercallure</h1>
        </div>
        <HeaderRoomInfo />
        <HeaderActions />
      </header>
    </>
  )
}
