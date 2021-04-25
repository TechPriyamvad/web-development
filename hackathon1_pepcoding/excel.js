let excel = require("exceljs");

let data = [{
    firstName: 'John',
    lastName: 'Bailey',
    purchasePrice: 1000,
    paymentsMade: 100
}, {
    firstName: 'Leonard',
    lastName: 'Clark',
    purchasePrice: 1000,
    paymentsMade: 150
}, {
    firstName: 'Phil',
    lastName: 'Knox',
    purchasePrice: 1000,
    paymentsMade: 200
}, {
    firstName: 'Sonia',
    lastName: 'Glover',
    purchasePrice: 1000,
    paymentsMade: 250
}, {
    firstName: 'Adam',
    lastName: 'Mackay',
    purchasePrice: 1000,
    paymentsMade: 350
}, {
    firstName: 'Lisa',
    lastName: 'Ogden',
    purchasePrice: 1000,
    paymentsMade: 400
}, {
    firstName: 'Elizabeth',
    lastName: 'Murray',
    purchasePrice: 1000,
    paymentsMade: 500
}, {
    firstName: 'Caroline',
    lastName: 'Jackson',
    purchasePrice: 1000,
    paymentsMade: 350
}, {
    firstName: 'Kylie',
    lastName: 'James',
    purchasePrice: 1000,
    paymentsMade: 900
}, {
    firstName: 'Harry',
    lastName: 'Peake',
    purchasePrice: 1000,
    paymentsMade: 1000
}]

let workbook = new excel.Workbook();

let worksheet = workbook.addWorksheet('Covid19 Beds Availability Info');


worksheet.columns = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Purchase Price', key: 'purchasePrice' },
    { header: 'Payments Made', key: 'paymentsMade' },
    //{ header: 'Amount Remaining', key: 'amountRemaining' },
    //{ header: '% Remaining', key: 'percentRemaining' }
]

// force the columns to be at least as long as their header row.
// Have to take this approach because ExcelJS doesn't have an autofit property.
worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length
  })
  
  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(1).font = {bold: true}
//console.log(data);

// Dump all the data into Excel
data.forEach((e, index) => {
    // row 1 is the header.
    //const rowIndex = index + 2
  
    // By using destructuring we can easily dump all of the data into the row without doing much
    // We can add formulas pretty easily by providing the formula property.
    worksheet.addRow({
      ...e,
    //   amountRemaining: {
    //     formula: `=C${rowIndex}-D${rowIndex}`
    //   },
    //   percentRemaining: {
    //     formula: `=E${rowIndex}/C${rowIndex}`
    //   }
    })
  })
  
  // loop through all of the rows and set the outline style.
worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    worksheet.getCell(`A${rowNumber}`).border = {
      top: {style: 'thin'},
      left: {style: 'thin'},
      bottom: {style: 'thin'},
      right: {style: 'none'}
    }
  
    const insideColumns = ['B', 'C', 'D']
    insideColumns.forEach((v) => {
      worksheet.getCell(`${v}${rowNumber}`).border = {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'none'},
        right: {style: 'none'}
      }
    })
  
    worksheet.getCell(`F${rowNumber}`).border = {
      top: {style: 'thin'},
      left: {style: 'none'},
      bottom: {style: 'thin'},
      right: {style: 'thin'}
    }
  })

async function fn()
{
    try{
        await workbook.xlsx.writeFile('Covid19 Beds Availability Info.xlsx')
    }
    catch(err)
    {
        //workbook.xlsx.writeFile('Covid19 Beds Availability Info.xlsx')
        console.log(err);
    }   
}

fn();
console.log("end of file");