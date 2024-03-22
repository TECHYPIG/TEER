
export async function gettingVolunteering() {
    try {
        const response = await fetch("/api/volunteerget");
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        // You can now access the usernames from the data array
        const usernames = data.map((item) => item.username);
        const role = data.map((item) => item.role)
        const company = data.map((item) => item.company)
        const description = data.map((item) => item.description)
        const location = data.map((item) => item.location)
        const email = data.map((item) => item.email)
        const id = data.map((item) => item.id)

        return {usernames, role, company, description, location, email, id};
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export async function deletingVolunteering(id) {
    try {
        return await fetch("/api/volunteerdelete", {
            method: 'POST', // Adjust the method as needed (GET, POST, etc.)
            'Content-Type': 'application/json',
            body: JSON.stringify({
                id: id
            })
        })
    } catch (error) {
        console.error("Error:", error);
    }
}