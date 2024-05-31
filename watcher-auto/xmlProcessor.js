import fs from 'fs/promises'
import xml2js from 'xml2js'
import { db } from './db.js'

const MAX_RETRIES = 3 // max retries
const parser = new xml2js.Parser() // Cache parser object

// Fungsi untuk menulis log ke file
const logToFile = async (message) => {
  const timestamp = new Date().toLocaleString()
  const logMessage = `${timestamp} - ${message}\n`
  try {
    await fs.appendFile('log.txt', logMessage, 'utf8')
  } catch (error) {
    console.error('Error writing to log file:', error)
  }
}

// Fungsi untuk memproses XML
const processXML = async (filePath, retryCount = 0) => {
  const xmlData = await fs.readFile(filePath, 'utf8') // Asynchronously read the file
  const jsonData = await parser.parseStringPromise(xmlData)

  const status = jsonData?.Sitedown?.Status[0].trim() === 'Open' ? false : true // Trim whitespace
  const name = jsonData?.Sitedown?.Sitename[0] || null
  if (name) {
    const updateResult = await db('maps').where({ name }).update({ status })

    const statusText = status ? 'Up' : 'Down'
    if (updateResult) {
      const message = `Successfully updated status for ${name} - ${statusText}`
      console.log(message)
      await logToFile(message)
    } else {
      const message = `No records updated for ${name} - ${statusText}`
      console.error(message)
      await logToFile(message)
    }
  } else {
    if (retryCount < MAX_RETRIES) {
      console.error(`Error processing XML file (retry ${retryCount + 1})`)
      await logToFile(`Error processing XML file (retry ${retryCount + 1})`)

      // call again processXML - add retryCount
      await processXML(filePath, retryCount + 1)
    } else {
      console.error(`Max retries reached. Unable to process XML file`)
      await logToFile(`Max retries reached. Unable to process XML file`)
    }
  }
}
export { processXML }
