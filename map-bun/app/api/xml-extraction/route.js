import { NextResponse } from 'next/server'
import fs from 'fs'
import os from 'os'
import xml2js from 'xml2js'
import { db } from '@/lib/database/knex'

export async function GET(req) {
  try {
    const isWindows = os.platform() === 'win32'
    const filePath = isWindows ? process.env.PATH_WIN : process.env.PATH_LIN
    const xmlData = fs.readFileSync(filePath, 'utf8')

    const parser = new xml2js.Parser()
    const jsonData = await parser.parseStringPromise(xmlData)
    const status =
      jsonData?.Sitedown?.Status[0].trim() === 'Open' ? false : true // Trim whitespace
    const name = jsonData?.Sitedown?.Sitename[0] || null

    const updateResult = await db('maps').where({ name }).update({ status })

    const statusText = status ? 'Up' : 'Down'
    let message
    if (updateResult) {
      message = `Successfully updated status for ${name} - ${statusText}`
      console.log(message)
    } else {
      message = `No records updated for ${name} - ${statusText}`
      console.error(message)
    }

    return NextResponse.json({
      message: message,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
