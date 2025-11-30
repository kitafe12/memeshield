
async function testSolana() {
    const address = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"; // BONK
    const url = `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${address}`;

    console.log("Fetching URL:", url);

    try {
        const response = await fetch(url);
        const json = await response.json();

        console.log("Response Code:", json.code);
        console.log("Response Keys:", Object.keys(json));

        if (json.result) {
            console.log("Result Keys:", Object.keys(json.result));
            console.log("Data for exact address:", json.result[address]);
            console.log("Data for lowercase address:", json.result[address.toLowerCase()]);
        } else {
            console.log("No result found in JSON");
        }

        console.log("Full JSON:", JSON.stringify(json, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

testSolana();
