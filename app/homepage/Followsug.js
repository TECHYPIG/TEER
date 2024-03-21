export default async function followers() {
    const x = await fetch('/api/followsuggestions');
    return x.json()
}