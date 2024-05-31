'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BreadcrumbItemMenu = () => {
  const pathname = usePathname()
  const getPathSegments = () => {
    return pathname.split('/').filter((segment) => segment !== '')
  }
  const buildBreadcrumb = () => {
    const pathSegments = getPathSegments()
    const breadcrumbSegments = pathSegments.slice(0, -1)

    return (
      <Breadcrumb className='hidden md:flex'>
        <BreadcrumbList>
          {breadcrumbSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className='capitalize'
                    href={`/${breadcrumbSegments
                      .slice(0, index + 1)
                      .join('/')}`}
                  >
                    {segment}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>
              {getLastPathComponent()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const getLastPathComponent = () => {
    const pathSegments = getPathSegments()
    return pathSegments[pathSegments.length - 1]
  }

  if (!pathname || pathname === '/') {
    return null
  }

  return buildBreadcrumb()
}

export default BreadcrumbItemMenu
