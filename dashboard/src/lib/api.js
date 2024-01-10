export async function getData() {
  let response;
  try {
    response = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + "/workouts?populate[member]=*",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );
    console.log(response);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
}
