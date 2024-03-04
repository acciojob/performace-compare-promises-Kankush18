// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

// You can write your code here
function fetchData(url) {
  return fetch(url).then(response => response.json());
}

function fetchWithPromiseAll() {
  const startTime = performance.now();
  
  return Promise.all(apiUrls.map(url => fetchData(url)))
    .then(() => performance.now() - startTime);
}

function fetchWithPromiseAny() {
  const startTime = performance.now();

  const promises = apiUrls.map(url => fetchData(url));
  
  return Promise.any(promises)
    .then(() => performance.now() - startTime)
    .catch(error => {
      console.error("Error occurred while fetching data:", error);
      return NaN; // Return NaN if Promise.any fails
    });
}

function displayTimeTakenForAPIs() {
  const outputAll = document.getElementById("output-all");
  const outputAny = document.getElementById("output-any");

  fetchWithPromiseAll().then(time => {
    outputAll.textContent = time.toFixed(2) + " ms";
  });

  fetchWithPromiseAny().then(time => {
    outputAny.textContent = time.toFixed(2) + " ms";
  });
}

// Trigger the function when the page is loaded
document.addEventListener("DOMContentLoaded", displayTimeTakenForAPIs);
