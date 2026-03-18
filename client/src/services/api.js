export const getDestinations = async () => {
  const response = await fetch("http://127.0.0.1:5000/api/destinations");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
