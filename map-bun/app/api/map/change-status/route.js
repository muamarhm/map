import { NextResponse } from 'next/server'
import { db } from '@/lib/database/knex'

export async function POST(req) {
  try {
    const body = await req.json()
    const { status, id } = body
    await db('maps').update('status', status).where('id', id)
    return NextResponse.json({
      message: 'successs',
      success: true,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
