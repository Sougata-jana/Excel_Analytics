const XLSX = require('xlsx');

/**
 * Parse an Excel file and extract data from all sheets
 * @param {string} filePath - Path to the Excel file
 * @returns {Array} - Array of sheet data with headers and rows
 */
const parseExcelFile = (filePath) => {
  try {
    // Read the workbook
    const workbook = XLSX.readFile(filePath);
    
    // Get all sheet names
    const sheetNames = workbook.SheetNames;
    
    // Parse each sheet
    const sheets = sheetNames.map(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Extract headers (first row)
      const headers = jsonData.length > 0 ? jsonData[0] : [];
      
      // Extract data (remaining rows)
      const data = jsonData.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index] !== undefined ? row[index] : null;
        });
        return rowData;
      });
      
      return {
        name: sheetName,
        headers: headers,
        data: data,
        rowCount: data.length,
        columnCount: headers.length
      };
    });
    
    return sheets;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error('Failed to parse Excel file');
  }
};

module.exports = {
  parseExcelFile
}; 