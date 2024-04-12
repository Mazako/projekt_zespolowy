export async function GET(){
    const response = await fetch('http://localhost:8000/ecd/allFiles');
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const json = await response.json();
    console.log(JSON.stringify(json))
    console.log("11111", json)
    return Response.json(json);
}
