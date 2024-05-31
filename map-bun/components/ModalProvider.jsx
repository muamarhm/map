'use client'
import { useEffect, useState } from 'react'
import { ChangeStatusModal } from './modals/map/ChangeStatusModal'
import { ChangeStatusModalDelete } from './modals/map/ChangeStatusModalDelete'
import { AddMapModal } from './modals/map/AddMapModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <ChangeStatusModal />
      <ChangeStatusModalDelete />
      <AddMapModal />
    </>
  )
}
