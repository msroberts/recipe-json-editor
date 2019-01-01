import { remote, SaveDialogOptions, FileFilter, OpenDialogOptions } from 'electron'

export const DEFAULT_FILTERS: FileFilter[] = [
  {
    name: 'JSON',
    extensions: [
      'json',
    ],
  },
]

export function showOpenDialog (options?: OpenDialogOptions) {
  if (!options) {
    options = {
      filters: DEFAULT_FILTERS,
    }
  }

  return new Promise<string[]>(resolve => {
    remote.dialog.showOpenDialog(options!, resolve)
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
