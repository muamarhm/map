'use client' // SelectSearch.js
import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function SelectSearch({
  className,
  items = [],
  value,
  onSelect,
  heading,
}) {
  const formattedItems = items.map((item) => ({
    label: item.label,
    value: item.value,
  }))
  const [open, setOpen] = useState(false)

  const current = formattedItems.find((item) => item.value === value)
  return (
    <Popover open={open} onOpenChange={setOpen} className='w-full'>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select'
          className={cn('w-full justify-between capitalize text-xs', className)}
        >
          {current?.label}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search...' />
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup heading={heading}>
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onSelect(item.value)} // Pass the value to onSelect
                  className='text-sm cursor-pointer capitalize'
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      current?.value === item.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
