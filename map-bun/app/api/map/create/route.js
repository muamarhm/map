import { NextResponse } from 'next/server'
import { db } from '@/lib/database/knex'

export async function POST(req) {
  try {
    const body = await req.json()
    const { lon, lat } = body
    const check = await db('maps').where('lon', lon).where('lat', lat).first()
    if (!check) {
      await db('maps').insert(body)
    }
    return NextResponse.json({
      message: 'successs',
      success: true,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
