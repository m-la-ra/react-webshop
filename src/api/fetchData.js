export async function fetchData() {
  try {
    const response = await fetch("/inventory.json");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData.items);
    return responseData.items;
  } catch (error) {
    console.log("Error:", error);
  }
}
