import { remote, SaveDialogOptions, FileFilter, OpenDialogOptions } from 'electron'

export const DEFAULT_FILTERS: FileFilter[] = [
  {
    name: 'JSON',
    extensions: [
      'json',
    ],
  },
]

export async function showOpenDialog (options?: OpenDialogOptions) {
  if (!options) {
    options = {
      filters: DEFAULT_FILTERS,
    }
  }

  const results = await remote.dialog.showOpenDialog(options)
  return results.filePaths
}

export async function showSaveDialog (options?: SaveDialogOptions) {
  if (!options) {
    options = {
      filters: DEFAULT_FILTERS,
    }
  }

  const results = await remote.dialog.showSaveDialog(options)
  return results.filePath
}
