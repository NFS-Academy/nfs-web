const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000/api";

export async function request(path, options = {}) {
  const token = localStorage.getItem("naim_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function withMockFallback(remoteCall, mockCall) {
  try {
    return await remoteCall();
  } catch (error) {
    if (error.status) throw error;
    return mockCall();
  }
}
