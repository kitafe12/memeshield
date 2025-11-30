
import { fetchTokenSecurity } from "../src/lib/scanner";

async function debugScore() {
    // Addresses to test (mix of Solana and EVM if possible, or just the ones user used)
    const tokens = [
        { chain: "solana", address: "E9swJ77uXxuMaUe5x5TDUmMYmmwtasPsX5YZcoLQpump" },
    ];

    for (const t of tokens) {
        console.log(`\n--- Analyzing ${t.chain} token: ${t.address} ---`);
        try {
            const result = await fetchTokenSecurity(t.chain, t.address);
            console.log("Final Score:", result.score);
            console.log("Red Flags:", result.redFlags);
            console.log("Raw Details:", {
                isOpenSource: result.details.isOpenSource,
                isMintable: result.details.isMintable,
                ownerAddress: result.details.ownerAddress,
                buyTax: result.details.buyTax,
                sellTax: result.details.sellTax,
                isHoneypot: result.details.isHoneypot
            });
            // Log full result to check for holders/lp_holders
            // console.log("Full API Result:", JSON.stringify(result, null, 2)); 
            // We need to see the raw JSON from the fetch, not the processed result.
            // I will modify the scanner.ts temporarily or create a new raw fetch script.
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

debugScore();
