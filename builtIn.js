const fs = require("fs").promises;

async function convertToCSV() {
  try {
    const rawJsonData = await fs.readFile("data.json", "utf8");
    const jsonData = JSON.parse(rawJsonData);
    const { users } = jsonData;

    const replacer = (_, value) => (value === null ? "" : value);
    const header = Object.keys(users[0]);
    const csv = [
      header.join(","),
      ...users.map((row) =>
        Object.values(row)
          .map((value) => JSON.stringify(value, replacer))
          .join(",")
      ),
    ].join("\r\n");

    await fs.writeFile("users.csv", csv);
    console.log("CSV file successfully created!");
  } catch (error) {
    console.error(error);
  }
}

convertToCSV();
