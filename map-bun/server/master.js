'use server'

import { db } from '@/lib/database/knex'

export const fetchMaps = async (filter, page, perPage) => {
  const resPerPage = perPage !== 'All' ? parseInt(perPage) : undefined
  let pages = page ? parseInt(page) : 1

  let offset = (pages - 1) * resPerPage
  const filters = {
    name: filter !== '' ? filter : '',
  }
  const getModel = () =>
    db('maps')
      .select('*')
      .whereNot('status', '2')
      .where((builder) => {
        for (const [column, value] of Object.entries(filters)) {
          if (value !== '' && value !== 'null') {
            builder.whereILike(column, `%${value}%`)
          }
        }
      })
      .orderBy('id', 'desc')

  let data
  let totalPages
  let totalCount
  let totalData
  if (resPerPage !== 'All' && resPerPage !== undefined) {
    data = await getModel().offset(offset).limit(resPerPage)

    totalPages = Math.ceil(totalData / resPerPage)
  } else {
    data = await getModel()
    totalPages = 1
  }

  totalCount = await getModel()
  totalData = parseInt(totalCount.length)

  if (!data) return { error: 'No data 😓' }
  if (data) {
    return {
      success: data,
      pagination: {
        totalData,
        totalPages,
        currentPage: pages,
      },
    }
  }
}

export const fetchMapsAll = async () => {
  const data = await db('maps')
    .select('*')
    .whereNot('status', '2')
    .orderBy('id', 'desc')
  if (!data) return { error: 'No data 😓' }
  if (data) {
    return {
      success: data,
    }
  }
}

export const fetchMapsAlls = async () => {
  const data = await db('maps').select('*').orderBy('id', 'desc')
  if (!data) return { error: 'No data 😓' }
  if (data) {
    return {
      success: data,
    }
  }
}
