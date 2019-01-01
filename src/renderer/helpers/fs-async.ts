import { writeFile } from 'fs'

export function writeFileAsync (path: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}
