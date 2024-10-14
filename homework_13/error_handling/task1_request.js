const axios = require("axios");

async function fetchData() {
  try {
    const response = await axios.get("https://wrongURL:)");
    return response.data;
  } catch (error) {
    return "An error occurred while fetching data";
  }
}

module.exports = fetchData;
