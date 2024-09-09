export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": "b169fe4ffdmshe901fd7a32c54edp172479jsnca3d235e9c2f",
  },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchData = async (url, options, delayTime = 1000) => {
  try {
    await delay(delayTime);
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
