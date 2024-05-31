'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from './button'

export const DrawerModal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onChange} className='text-sm'>
      <DrawerContent className='mx-auto w-full  p-2'>
        <DrawerHeader className='text-left'>
          <DrawerTitle className='capitalize'>{title}</DrawerTitle>
          <DrawerDescription className='capitalize'>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className='overflow-auto scrollbar-thin scrollbar-track-blue-200 scrollbar-thumb-blue-300'>
          {children}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
