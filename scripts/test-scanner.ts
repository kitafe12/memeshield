import { fetchTokenSecurity } from "../src/lib/scanner";

async function main() {
    const chainId = "1"; // ETH
    const address = "0x6982508145454Ce325dDbE47a25d4ec3d2311933"; // PEPE

    console.log(`Testing scan for ${address} on chain ${chainId}...`);

    try {
        const result = await fetchTokenSecurity(chainId, address);
        console.log("Scan Success!");
        console.log("Score:", result.score);
        console.log("Risk Level:", result.riskLevel);
        console.log("Red Flags:", result.redFlags);
    } catch (error) {
        console.error("Scan Failed:", error);
    }
}

main();
