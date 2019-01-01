import { writeFile, readFile } from 'fs'

export function readFileAsync (path: string) {
  return new Promise<string>((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export function writeFileAsync (path: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}
