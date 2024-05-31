import { filePath } from './config.js'
import { processXML } from './xmlProcessor.js'
import { watchFile } from './fileWatcher.js'

const main = async () => {
  await processXML(filePath)

  watchFile(filePath)
}

main().catch((error) => console.error('Error in main function:', error))
