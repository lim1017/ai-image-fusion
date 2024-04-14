export const fetchUser = async (email: string, token: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
};
