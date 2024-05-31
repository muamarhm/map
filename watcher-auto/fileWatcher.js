import chokidar from 'chokidar'
import { processXML } from './xmlProcessor.js'

const watchFile = (filePath) => {
  const watcher = chokidar.watch(filePath, {
    persistent: true,
  })

  watcher.on('change', () => {
    processXML(filePath).catch((error) => {
      console.error('Error processing XML file:', error)
    })
  })

  watcher.on('error', (error) => {
    console.error('Watcher error:', error)
  })
}

export { watchFile }
