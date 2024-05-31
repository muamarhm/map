'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetMap } from '@/data/master'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { useChangeStatusModal } from '@/hooks/use-modal'
import { useChangeDeleteModal } from '@/hooks/use-modal'

const DataList = () => {
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState('1')
  const [perPage, setPerPage] = useState('5')
  const { data, error, isLoading } = useGetMap(filter, page, perPage)
  const modal = useChangeStatusModal()
  const modalDelete = useChangeDeleteModal()

  const handleFilterName = (e) => {
    setFilter(e.target.value)
  }
  const handlePerPage = (value) => {
    setPerPage(value)
  }
  if (error) return <div className='capitalize'>{error.message}</div>

  return (
    <div className='border border-dashed p-2 space-y-2 rounded-md'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <Input
            type='text'
            placeholder='Filter Name...'
            onBlur={handleFilterName}
          />
          <Select value={perPage} onValueChange={handlePerPage}>
            <SelectTrigger>
              <SelectValue placeholder='Rows per Page' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
              <SelectItem value='All'>All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex-1 '>
        <Card className='overflow-auto'>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='capitalize'>name</TableHead>
                  <TableHead className='capitalize'>lon</TableHead>
                  <TableHead className='capitalize'>lat</TableHead>
                  <TableHead className='capitalize'>ground overlay</TableHead>
                  <TableHead className='capitalize'>status</TableHead>
                  <TableHead className='capitalize'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                )}
                {data?.success && data.success.length > 0 ? (
                  data?.success.map((inc) => (
                    <TableRow key={inc.id}>
                      <TableCell className='capitalize'>{inc.name}</TableCell>
                      <TableCell className='capitalize'>{inc.lon}</TableCell>
                      <TableCell className='capitalize'>{inc.lat}</TableCell>

                      <TableCell>
                        <img
                          src={inc.ground_overlay_img}
                          className={`w-20 ${
                            inc.status == '1' ? '' : 'filter invert  '
                          }`}
                        />
                      </TableCell>
                      <TableCell className='capitalize'>
                        {inc.status == 1 ? (
                          <Badge variant='outline'>Active</Badge>
                        ) : (
                          <Badge variant='destructive'>Not Active</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                modal.onOpen()
                                modal.updateData(inc)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                modalDelete.onOpen()
                                modalDelete.updateData(inc)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No Data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DataList
