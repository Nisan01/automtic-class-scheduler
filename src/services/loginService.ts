


export async function ValidateLogin(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials:"include",
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json(); 
  return data;
}
