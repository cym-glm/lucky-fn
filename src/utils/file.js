export function readFileBinary(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}

export function readFileData(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (ev) => {
      resolve({ dataUrl: ev.target.result, fileName: file.name })
    }
  })
}
