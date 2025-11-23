export function getUser() {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch { return null; }
}

export function setUser(u) {
    localStorage.setItem("user", JSON.stringify(u));
}

export function logout() {
    localStorage.removeItem("user");
}