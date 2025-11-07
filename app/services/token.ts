export async function setUserToken(userId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
  const { token } = await res.json();
  localStorage.setItem("x-user-token", token);
}
