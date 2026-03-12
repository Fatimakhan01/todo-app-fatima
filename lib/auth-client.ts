export const signUp = async (name: string, email: string, password: string) => {
  const res = await fetch("/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    throw new Error("Sign up failed");
  }

  return data;
};