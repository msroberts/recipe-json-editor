import { remote, SaveDialogOptions, FileFilter } from 'electron'

export const DEFAULT_FILTERS: FileFilter[] = [
  {
    name: 'JSON',
    extensions: [
      'json',
    ],
  },
]

export function showOpenDialog () {
  return new Promise<string[]>(resolve => {
    remote.dialog.showOpenDialog({}, resolve)
  })
}

export function showSaveDialog (options?: SaveDialogOptions) {
  if (!options) {
    options = {
      filters: DEFAULT_FILTERS,
    }
  }

  return new Promise<string>((resolve) => {
    remote.dialog.showSaveDialog(options!, resolve)
  })
}
