
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

        return {usernames, role, company, description, location, email};
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}