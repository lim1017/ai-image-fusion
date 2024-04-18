export const fetchPostsById = async ({
  pageParam = 1,
  pageSize = 8,
  userFavorites = [],
}: {
  pageParam?: number;
  pageSize?: number;
  userFavorites?: string[];
}) => {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/post/favourites`;

  url += `?page=${pageParam}&limit=${pageSize}`;

  if (userFavorites.length > 0) {
    const favoritesQueryParam = userFavorites.join(",");
    url += `&userFavorites=${favoritesQueryParam}`;
  } else {
    url += `&userFavorites=${""}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
};

export const fetchPosts = async ({
  pageParam = 1,
  pageSize = 8,
  userEmail = "",
}) => {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/post`;
  if (userEmail) {
    url += `?userEmail=${userEmail}&page=${pageParam}&limit=${pageSize}`;
  } else {
    url += `?page=${pageParam}&limit=${pageSize}`;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const result = await res.json();
      return result;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
};
