'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Icon } from '@iconify/react'

const MenuItem = ({ item }) => {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  return (
    <div className=' '>
      {item.submenu ? (
        <div className='  '>
          <button
            onClick={toggleSubMenu}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary  w-full  ${
              pathname.includes(item.path)
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <div className='flex flex-row gap-2 items-center '>
              {item.icon}
              <span className='font-semibold   flex capitalize'>
                {item.title}
              </span>
            </div>
            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon='lucide:chevron-down' width='18' height='18' />
            </div>
          </button>

          {subMenuOpen && (
            <div className='my-2 ml-12 flex flex-col space-y-1'>
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`p-2 rounded-md hover:text-primary ${
                      subItem.path === pathname
                        ? ' bg-muted text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className='font-medium capitalize'>
                      {subItem.title}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link
            href={item.path}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              item.path === pathname
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {item.icon}
            <span className='font-semibold  flex capitalize'>{item.title}</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MenuItem
