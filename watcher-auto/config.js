import dotenv from 'dotenv'
import os from 'os'

dotenv.config()

const isWindows = os.platform() === 'win32'
const filePath = isWindows ? process.env.PATH_WIN : process.env.PATH_LIN

if (!filePath) {
  throw new Error(
    'File path is not defined. Please set PATH_WIN or PATH_LIN in your .env file.'
  )
}

export { filePath }
