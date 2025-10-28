export async function fetchData() {
  try {
    const response = await fetch("/inventory.json");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData.items;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function fetchItemById(id) {
  const items = await fetchData();
  return items.find((item) => item.id === Number(id));
}
