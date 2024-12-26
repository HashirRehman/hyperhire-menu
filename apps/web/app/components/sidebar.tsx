'use client'

import { useState } from 'react'
import { Folder, Code, Settings2, MenuIcon, List, Users, Trophy, X } from 'lucide-react'

const navItems = [
  { icon: Folder, label: 'Systems', href: '#' },
  { icon: Code, label: 'System Code', href: '#' },
  { icon: Settings2, label: 'Properties', href: '#' },
  { icon: MenuIcon, label: 'Menus', href: '#', active: true },
  { icon: List, label: 'API List', href: '#' },
  { icon: Users, label: 'Users & Group', href: '#' },
  { icon: Trophy, label: 'Competition', href: '#' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-20 rounded-md bg-gray-800 p-2 text-white md:hidden"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      <div
        className={`fixed inset-0 z-30 transform bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed left-0 top-0 z-40 h-full w-[240px] transform bg-[#14161A] text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">CLOIT</span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-1 p-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                item.active
                  ? 'bg-[#4CAF50] text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

