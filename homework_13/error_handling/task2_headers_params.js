const axios = require("axios");

async function fetchCustomData(params, headers) {
  try {
    const response = await axios.get("https://api.restful-api.dev/objects", {
      params: params,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return "An error occurred while fetching data";
  }
}

module.exports = fetchCustomData;
