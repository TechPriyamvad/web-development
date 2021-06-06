let puppeteer = require("puppeteer");
let fs = require("fs");
let excel = require("exceljs");

let links = "https://delhifightscorona.in";

let locationName = process.argv[2];
let rtab;
let hospital = [];

console.log("Before");


(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let result1 = await getBedDetailsExceptPhoneNumber(links, browserInstance);
        let result2 = await getBedDetailsWithPhoneNumber(links, browserInstance);
        await excelCreator(result1,result2);
        //console.table(result1);
        console.log("found bed details");
        //console.table(top3HospitalsBedDetails);

    } catch (err) {
        console.log(err);
    }
})();


//excel file creator
async function excelCreator(data1,data2) {
    try {
        let workbook = new excel.Workbook();

        let worksheet = workbook.addWorksheet('CovidInfo1.xlsx');


        worksheet.columns = [
            { header: 'Hospital Name', key: 'hname' },
            { header: 'Seats Left', key: 'vacantSeatNumber' },
            { header: 'Time stamp', key: 'timestamp' }
            //{ header: 'Contacts', key: 'numberPhone' },
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
        worksheet.getRow(1).font = { bold: true }
        //console.log(data);

        // Dump all the data into Excel
        data1.forEach((e, index) => {
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
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'none' }
            }

            const insideColumns = ['B', 'C', 'D','E']
            insideColumns.forEach((v) => {
                worksheet.getCell(`${v}${rowNumber}`).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'none' },
                    right: { style: 'none' }
                }
            })

            worksheet.getCell(`F${rowNumber}`).border = {
                top: { style: 'thin' },
                left: { style: 'none' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        })


        //phone number worksheet
        let worksheet1 = workbook.addWorksheet('CovidInfo2.xlsx');


        worksheet1.columns = [
            //{ header: 'Hospital Name', key: 'hname' },
            //{ header: 'Seats Left', key: 'vacantSeatNumber' },
            //{ header: 'Time stamp', key: 'timestamp' }
            { header: 'Contacts', key: 'phoneNumberStr' },
            //{ header: 'Amount Remaining', key: 'amountRemaining' },
            //{ header: '% Remaining', key: 'percentRemaining' }
        ]

        // force the columns to be at least as long as their header row.
        // Have to take this approach because ExcelJS doesn't have an autofit property.
        worksheet1.columns.forEach(column => {
            column.width = column.header.length < 12 ? 12 : column.header.length
        })

        // Make the header bold.
        // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
        worksheet1.getRow(1).font = { bold: true }
        //console.log(data);

        //Dump all the data into Excel
        data2.forEach((e, index) => {
            // row 1 is the header.
            //const rowIndex = index + 2

            // By using destructuring we can easily dump all of the data into the row without doing much
            // We can add formulas pretty easily by providing the formula property.
            worksheet1.addRow({
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
        worksheet1.eachRow({ includeEmpty: false }, function (row, rowNumber) {
            worksheet1.getCell(`A${rowNumber}`).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'none' }
            }

            const insideColumns = ['B', 'C', 'D','E']
            insideColumns.forEach((v) => {
                worksheet1.getCell(`${v}${rowNumber}`).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'none' },
                    right: { style: 'none' }
                }
            })

            worksheet1.getCell(`F${rowNumber}`).border = {
                top: { style: 'thin' },
                left: { style: 'none' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        })
        await workbook.xlsx.writeFile('Covid19 Beds Availability Info.xlsx')
    }
    catch (err) {
        console.log(err);
    }
}

//find hospital contact details
async function getBedDetailsWithPhoneNumber(link, browserInstance) {
    try {
        //open new tab
        let newTab = await browserInstance.newPage();
        //rtab = newTab;
        //visit page
        await newTab.goto(link);

        //click beds button
        await waitAndClick("#menu-item-5278", newTab);

        //click on covid-19 beds
        await waitAndClick(".card-header", newTab);

        //await newTab.waitForSelector("#hospitals_list", { visible: true });
        await newTab.waitForTimeout(1000);
        //retrieve current page url
        //let url = newTab.url();

        //retrieving details from hospital and storing them in array 
        //-vacant seat
        //-hospital name
        //-timestamp

        function extractHospitalDataFn(selector) {
            let hospitalTable = document.getElementById(selector);
            let row = hospitalTable.querySelectorAll("tr");


            let phoneArr = [];

            for (let i = 0; i < row.length; i++) {
                if (i % 2 != 0) {
                    let phoneNumberArr = row[i].querySelectorAll(".card.shadow.m-1.mb-2 ul a");
                    let phoneNumberStr = "";
                    let vacantSeat = row[i - 1].cells[3].getElementsByTagName("a")[0].textContent;
                    let vacantSeatNumber = parseInt(vacantSeat);
                    if (vacantSeatNumber > 0) {
                        for (let idx = 0; idx < phoneNumberArr.length; idx++) {
                            phoneNumberStr += phoneNumberArr[idx].textContent;
                        }
                        //let numberPhone = parseInt(vacantSeatNumber);
                        phoneArr.push({ phoneNumberStr});
                        //hospital.push({ phoneNumberStr });
                    }

                }
            }
            //console.table(details);
            //console.table(phoneArr);
            return phoneArr;
            //return hospital;
        }
        return newTab.evaluate(extractHospitalDataFn, "hospitals_list");
        //console.log("hello");

    }
    catch (err) {
        console.log(err);
    }
}

//find hospitals having vacant beds
async function getBedDetailsExceptPhoneNumber(link, browserInstance) {
    try {
        //open new tab
        let newTab = await browserInstance.newPage();
        //rtab = newTab;
        //visit page
        await newTab.goto(link);

        //click beds button
        await waitAndClick("#menu-item-5278", newTab);

        //click on covid-19 beds
        await waitAndClick(".card-header", newTab);

        //await newTab.waitForSelector("#hospitals_list", { visible: true });
        await newTab.waitForTimeout(1000);
        //retrieve current page url
        //let url = newTab.url();

        //retrieving details from hospital and storing them in array 
        //-vacant seat
        //-hospital name
        //-timestamp

        function extractHospitalDataFn(selector) {
            let hospitalTable = document.getElementById(selector);
            let row = hospitalTable.querySelectorAll("tr");
            let details = [];

            for (let i = 0; i < row.length; i++) {
                if (i % 2 == 0 && i != row.length - 1) {

                    let hname = row[i].cells[0].textContent;
                    let vacantSeat = row[i].cells[3].getElementsByTagName("a")[0].textContent;
                    let timestamp = row[i].cells[1].textContent;
                    let vacantSeatNumber = parseInt(vacantSeat);
                    if (vacantSeatNumber > 0) {

                        details.push({ hname, vacantSeatNumber,timestamp });
                        //hospital.push({ hname, vacantSeat, timestamp });
                    }
                }
            }


            //console.table(details);
            return details;
            //return hospital;
        }
        return newTab.evaluate(extractHospitalDataFn, "hospitals_list");
        //console.log("hello");

    }
    catch (err) {
        console.log(err);
    }

}

async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    // we didn't wait this promise because we want  the calling perspn to await this promise based async function 
    let selectorClickPromise = newTab.click(selector);
    return selectorClickPromise;
}