const API = "http://localhost:5000/mentores";

export async function getMentores() {
    const res = await fetch(API);
    return res.json();
}

export async function addMentor(mentor) {
    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mentor)
    });
}