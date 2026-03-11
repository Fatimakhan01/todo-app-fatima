export const signUp = async (email: string, password: string) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Sign up failed");
  return res.json();
};

export const signIn = async (email: string, password: string) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Sign in failed");
  return res.json();
};

export const signOut = async () => {
  await fetch("/api/auth/signout", { method: "POST" });
};

export const getSession = async () => {
  const res = await fetch("/api/auth/session");
  return res.json();
};