'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import Papa from 'papaparse'

export default function CSVUploader() {
  const [jsonData, setJsonData] = useState<any[] | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      Papa.parse(file, {
        complete: function (results)  {
          const data = results.data as any[]
          setJsonData(data)
          console.log('Extracted JSON data:', data)
        },
        header: true,
        skipEmptyLines: true
      })
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">CSV File Uploader</h1>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
            id="csv-upload"
            aria-label="Upload CSV file"
          />
          <Button onClick={handleButtonClick}>
            Select CSV File
          </Button>
          {fileName && (
            <p className="text-sm text-gray-600">
              Selected file: {fileName}
            </p>
          )}
          {jsonData && (
            <div className="text-center">
              <p className="text-green-600">
                CSV file successfully parsed and converted to JSON!
              </p>
              <p className="text-sm text-gray-600">
                {jsonData.length} rows processed. Check the console for the full data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}