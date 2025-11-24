export function getUser() {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch { return null; }
}

export function getUserId() {
    const user = getUser();
    return user ? user.id : null;
}

export function setUser(u) {
    localStorage.setItem("user", JSON.stringify(u));
}

export function logout() {
    localStorage.removeItem("user");
}

export function isLoggedIn() {
    return !!getUser();
}