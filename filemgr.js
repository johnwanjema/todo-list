const fs = require("fs/promises")

async function ReadData() {
  try {
    const data = await fs.readFile('listdata.json', 'utf8');
    return data
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
 
async function WriteData(dataOut) {
  try {
    const jsonStr = JSON.stringify(dataOut);
    await fs.writeFile('listdata.json', jsonStr, 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to file:', error);
    throw error;
  }
}
 
exports.ReadData = ReadData;
exports.WriteData = WriteData;