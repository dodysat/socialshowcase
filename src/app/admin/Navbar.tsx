"use client"
import { useState } from "react"
import {
  IconSocial,
  IconLayoutDashboard,
  IconLogout,
} from "@tabler/icons-react"
import { Flex } from "@mantine/core"
import classes from "./Navbar.module.css"
import Link from "next/link"
import { useLocalStorage } from "@mantine/hooks"

const data = [
  { link: "/admin/dashboard", label: "Dasbor", icon: IconLayoutDashboard },
  { link: "/admin/social-media", label: "Soaial Media", icon: IconSocial },
]

const logout = async () => {
  try {
    const req = await fetch("/api/auth/logout", {
      method: "POST",
    })

    if (!req.ok) {
      throw new Error("Gagal logout")
    }

    window.location.href = "/auth/send-otp"
  } catch (error) {
    console.error(error)
  }
}

export function Navbar({ children }: { readonly children: React.ReactNode }) {
  const [active, setActive] = useLocalStorage({
    key: "activeNavbar",
    defaultValue: "Dasbor",
  })

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <div>
      <Flex>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            {/* <Group className={classes.header} justify="space-between">
              <MantineLogo size={28} />
              Logo
              <Code fw={700}>v3.1.2</Code>
            </Group> */}
            {links}
          </div>

          <div className={classes.footer}>
            <a
              className={classes.link}
              onClick={(event) => {
                event.preventDefault()
                logout()
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>

        <div className={classes.childrenContainer}>{children}</div>
      </Flex>
    </div>
  )
}
