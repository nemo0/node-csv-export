const fs = require("fs").promises;
const Papa = require("papaparse");

async function convertToCSV() {
  try {
    const rawJsonData = await fs.readFile("data.json", "utf8");
    const { users } = JSON.parse(rawJsonData);

    const csv = Papa.unparse(users);

    await fs.writeFile("users.csv", csv);
    console.log("CSV file successfully created!");
  } catch (error) {
    console.error(error);
  }
}

convertToCSV();
