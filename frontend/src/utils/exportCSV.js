/**
 * Export an array of objects as a CSV file download.
 * @param {Array<Object>} data - Array of objects to export
 * @param {string} filename - Name of the downloaded file (without .csv)
 */
export const exportCSV = (data, filename = 'export') => {
  if (!data || data.length === 0) {
    alert('No data to export')
    return
  }

  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row =>
      headers.map(header => {
        let value = row[header]
        if (value === null || value === undefined) value = ''
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value).replace(/"/g, '""')
        return `"${stringValue}"`
      }).join(',')
    )
  ]

  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default exportCSV
