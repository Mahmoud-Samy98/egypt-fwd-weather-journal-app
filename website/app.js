/* Global Variables */

// fields variables
const dateField = document.getElementById("date");
const tempField = document.getElementById("temp");
const contentField = document.getElementById("content");

const zipCodeField = document.getElementById("zip");
const feelingField = document.getElementById("feelings");

const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// API Key and API URL
const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=1975552d54d6e3e267a168f2ec221e87&units=metric";

// action when clicking on generate button
generateButton.addEventListener("click", doAction);

function doAction(elem) {
  const zipCode = zipCodeField.value;
  const feelingData = feelingField.value;

  // calling (getWeatherData) function to fetch data from open weather website
  getWeatherData(apiUrl, zipCode, apiKey).then((data) => {
    console.log(data);
    // calling postData that post the data to our server that we fetched from api
    postData("/add", {
      date: newDate,
      temp: data.list[0].main.temp,
      content: feelingData,
    }).then(
      // calling updateUI function that get the data and use it to update the UI
      updateUI()
    );
  });
}

// the getWeatherData function
// the order of data in Parentheses is the order of api (api url + zip + api key)
const getWeatherData = async (apiUrl, zipCode, apiKey) => {
  const response = await fetch(apiUrl + zipCode + apiKey);
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error: ", error);
    // appropriately handle the error
  }
};

// postData function that post our data
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// updateUI function the get the data from server and use it to update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    dateField.innerHTML = "date: " + allData.date;
    tempField.innerHTML = "temp: " + allData.temp + ` C<sup>o</sup>`;
    contentField.innerHTML = "feeling: " + allData.content;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
