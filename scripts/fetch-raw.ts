
async function fetchRawData() {
    const address = "E9swJ77uXxuMaUe5x5TDUmMYmmwtasPsX5YZcoLQpump";
    const url = `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${address}`;

    console.log("Fetching URL:", url);

    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.result && json.result[address]) {
            const data = json.result[address];
            console.log("Available Keys:", Object.keys(data));

            if (data.holders && Array.isArray(data.holders) && data.holders.length > 0) {
                console.log("First Holder Keys:", Object.keys(data.holders[0]));
                console.log("First Holder Sample:", JSON.stringify(data.holders[0], null, 2));
            } else {
                console.log("No 'holders' field found or empty.");
            }

            if (data.top_10_holders) { // Guessing key names
                console.log("Top 10 Holders:", JSON.stringify(data.top_10_holders, null, 2));
            }
        } else {
            console.log("No data for address");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchRawData();
