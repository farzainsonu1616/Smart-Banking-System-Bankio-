import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, columns, filename = 'Statement.pdf', title = 'Account Statement') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Add date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  // Map data to array of arrays based on columns
  const tableData = data.map(item => columns.map(col => item[col.key]));
  const head = [columns.map(col => col.header)];

  doc.autoTable({
    startY: 36,
    head: head,
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] }, // --primary color
    styles: { fontSize: 9 },
  });

  doc.save(filename);
};

export const exportToExcel = (data, columns, filename = 'Statement.xlsx') => {
  // Format data
  const formattedData = data.map(item => {
    const row = {};
    columns.forEach(col => {
      row[col.header] = item[col.key];
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Statements');
  
  // Generate and download
  XLSX.writeFile(workbook, filename);
};
