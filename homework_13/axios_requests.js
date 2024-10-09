import axios from "axios";

const baseURL = "https://api.restful-api.dev/objects";

async function apiRequests() {
  let objectId = "4";
  let objectToDelete = 6;

  // GET all data
  console.log("GET all data:");
  try {
    const response = await axios.get(baseURL);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    console.error(
      "Error in GET /objects:",
      error.response ? error.response.data : error.message
    );
  }

  // GET specific data via ID
  console.log("GET specific data via ID");
  try {
    const response = await axios.get(`${baseURL}/${objectId}`);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    console.error(
      `Error in GET /objects/${objectId}:`,
      error.response ? error.response.data : error.message
    );
  }

  // POST new object
  console.log("Post new object");
  try {
    const newObject = {
      name: "Apple iPhone 16",
      data: {
        color: "green",
        capacity: "256 GB",
      },
    };
    const response = await axios.post(baseURL, newObject);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    console.error(
      "Error in POST /objects:",
      error.response ? error.response.data : error.message
    );
  }

  // GET all data after POST
  console.log("GET all data after POST:");
  try {
    const response = await axios.get(baseURL);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    console.error(
      "Error in GET /objects:",
      error.response ? error.response.data : error.message
    );
  }

  // POST Create a new object via POST request
  console.log("Creating a new object via POST request");
  try {
    const newObjectData = {
      name: "Test",
      description: "This is a test object.",
    };

    const postResponse = await axios.post(`${baseURL}`, newObjectData);
    const newObjectId = postResponse.data.id;
    console.log(`POST /objects/ - Created new object with ID: ${newObjectId}`);

    // PUT the newly created object via PUT request
    console.log(`Updating object (ID ${newObjectId}) via PUT request`);
    const updatedObjectData = {
      name: "Updated Object",
      description: "This object has been updated before deletion.",
    };

    // DELETE the newly created object
    console.log(`DELETE specific object (ID ${newObjectId})`);
    const deleteResponse = await axios.delete(`${baseURL}/${newObjectId}`);
    console.log("Status:", deleteResponse.status);
    console.log("Data:", deleteResponse.data);
  } catch (error) {
    console.error(
      `Error in POST or DELETE request:`,
      error.response ? error.response.data : error.message
    );
  }
  
}

apiRequests();
