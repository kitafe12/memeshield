export interface SecurityData {
    isOpenSource: boolean;
    isProxy: boolean;
    isMintable: boolean;
    ownerAddress: string;
    canTakeBackOwnership: boolean;
    ownerChangeBalance: boolean;
    hiddenOwner: boolean;
    selfDestruct: boolean;
    externalCall: boolean;
    buyTax: string;
    sellTax: string;
    cannotSellAll: boolean;
    slippageModifiable: boolean;
    isHoneypot: boolean;
    transferPause: boolean;
    isBlacklisted: boolean;
    isWhitelisted: boolean;
    tradingCooldown: boolean;
    personalSlippageModifiable: boolean;
    // Strict Auditor Logic Fields
    totalSupply?: string;
    holders?: { address: string; balance: string; is_locked?: number }[];
    lpHolderCount?: string;
    // New Market Data (DexScreener)
    marketCap?: number;
    liquidity?: number;
    volume24h?: number;
    pairCreatedAt?: number;
    pairAddress?: string; // For Chart
}

export interface ScanResult {
    score: number;
    riskLevel: 'SAFE' | 'CAUTION' | 'DANGEROUS' | 'SCAM';
    redFlags: string[];
    details: SecurityData;
    summary: string;
}

interface DexScreenerResponse {
    pairs: {
        chainId: string;
        dexId: string;
        url: string;
        pairAddress: string;
        liquidity?: { usd?: number };
        marketCap?: number; // Some pairs use fdv
        fdv?: number;
        volume?: { h24?: number };
        pairCreatedAt?: number;
    }[];
}

async function fetchMarketData(address: string): Promise<{ liquidity: number, marketCap: number, volume24h: number, pairCreatedAt: number, pairAddress: string } | null> {
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
        const data: DexScreenerResponse = await response.json();

        if (!data.pairs || data.pairs.length === 0) return null;

        // Find the pair with the highest liquidity
        const bestPair = data.pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];

        return {
            liquidity: bestPair.liquidity?.usd || 0,
            marketCap: bestPair.marketCap || bestPair.fdv || 0,
            volume24h: bestPair.volume?.h24 || 0,
            pairCreatedAt: bestPair.pairCreatedAt || 0,
            pairAddress: bestPair.pairAddress
        };
    } catch (error) {
        console.error("DexScreener Fetch Error:", error);
        return null;
    }
}

export async function fetchTokenSecurity(chainId: string, address: string): Promise<ScanResult> {
    // GoPlus API Endpoint Logic
    let url = "";
    if (chainId === "solana") {
        url = `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${address}`;
    } else {
        url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${address}`;
    }

    try {
        // Fetch both Security (GoPlus) and Market (DexScreener) data in parallel
        const [securityResponse, marketData] = await Promise.all([
            fetch(url).then(res => res.json()),
            fetchMarketData(address)
        ]);

        const json = securityResponse;

        if (json.code !== 1 || !json.result) {
            console.warn("API Error or No Data:", json);
            throw new Error("Token not found or API error");
        }

        const data = json.result[address] || json.result[address.toLowerCase()];

        if (!data) {
            console.error("GoPlus API Response:", JSON.stringify(json, null, 2));
            throw new Error(`No data found for this token address: ${address}`);
        }

        console.log("Raw Holders Data:", JSON.stringify(data.holders, null, 2)); // Debugging log

        // Map GoPlus snake_case to our camelCase interface
        const securityData: SecurityData = {
            isOpenSource: data.is_open_source === "1",
            isProxy: data.is_proxy === "1",
            isMintable: data.is_mintable === "1",
            ownerAddress: data.owner_address || "",
            canTakeBackOwnership: data.can_take_back_ownership === "1",
            ownerChangeBalance: data.owner_change_balance === "1",
            hiddenOwner: data.hidden_owner === "1",
            selfDestruct: data.self_destruct === "1",
            externalCall: data.external_call === "1",
            buyTax: data.buy_tax || "0",
            sellTax: data.sell_tax || "0",
            cannotSellAll: data.cannot_sell_all === "1",
            slippageModifiable: data.slippage_modifiable === "1",
            isHoneypot: data.is_honeypot === "1",
            transferPause: data.transfer_pause === "1",
            isBlacklisted: data.is_blacklisted === "1",
            isWhitelisted: data.is_whitelisted === "1",
            tradingCooldown: data.trading_cooldown === "1",
            personalSlippageModifiable: data.personal_slippage_modifiable === "1",
            // Strict Auditor Fields
            totalSupply: data.total_supply,
            holders: (data.holders || []).map((h: any) => ({
                address: h.address || "Unknown",
                balance: h.balance || "0",
                is_locked: h.is_locked || 0
            })),
            lpHolderCount: data.lp_holder_count || "0",
            // Market Data
            marketCap: marketData?.marketCap,
            liquidity: marketData?.liquidity,
            volume24h: marketData?.volume24h,
            pairCreatedAt: marketData?.pairCreatedAt,
            pairAddress: marketData?.pairAddress,
        };

        return calculateSafetyScore(securityData);

    } catch (error) {
        console.error("Fetch error:", error);
        throw new Error("Failed to fetch token data. Check address and chain.");
    }
}

export function calculateSafetyScore(data: SecurityData): ScanResult {
    let score = 100;
    const redFlags: string[] = [];

    // --- 1. KILL SWITCH (Instant Fails) ---

    if (data.isHoneypot) {
        score = 0;
        redFlags.push("⛔ KILL SWITCH: Honeypot Detected (User cannot sell)");
        return {
            score,
            riskLevel: 'SCAM',
            redFlags,
            details: data,
            summary: "🚨 SCAM CONFIRMED: This token is a Honeypot. You will be able to buy but NEVER sell. Do not touch this."
        };
    }

    if (data.isMintable) {
        score = 0;
        redFlags.push("⛔ KILL SWITCH: Mintable (Dev can print more tokens)");
        return {
            score,
            riskLevel: 'SCAM',
            redFlags,
            details: data,
            summary: "🚨 SCAM RISK: The developer can print infinite tokens and dump them on you. Immediate exit recommended."
        };
    }

    if (data.isProxy) {
        score = 0;
        redFlags.push("⛔ KILL SWITCH: Proxy Contract (Logic can be changed by dev)");
        return {
            score,
            riskLevel: 'SCAM',
            redFlags,
            details: data,
            summary: "🚨 HIGH RISK: This is a Proxy contract. The developer can change the code at any time to steal funds."
        };
    }

    // --- 2. PENALTY SYSTEM (Start at 100, then subtract) ---

    // A. Whale Dominance (CRITICAL)
    if (data.holders && data.totalSupply) {
        const totalSupply = parseFloat(data.totalSupply);
        if (totalSupply > 0) {
            const sortedHolders = [...data.holders].sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
            const top10 = sortedHolders.slice(0, 10);
            const top10Balance = top10.reduce((sum, h) => sum + parseFloat(h.balance), 0);
            const top10Percent = (top10Balance / totalSupply) * 100;

            console.log(`[Whale Check] Top 10 Percent: ${top10Percent}%`);

            if (top10Percent > 50) {
                score -= 40;
                redFlags.push(`🐋 CRITICAL: Whales hold ${top10Percent.toFixed(1)}% of supply (>50%)`);
            } else if (top10Percent > 30) {
                score -= 20;
                redFlags.push(`⚠️ Whale Warning: Top 10 hold ${top10Percent.toFixed(1)}% (>30%)`);
            }
        }
    } else {
        // Missing holder data is a risk
        score -= 30;
        redFlags.push("⚠️ Holder Data Unavailable (Hidden Whales?)");
    }

    // B. Taxes (Greed Check)
    const buyTax = parseFloat(data.buyTax);
    const sellTax = parseFloat(data.sellTax);
    const totalTax = buyTax + sellTax;

    if (totalTax > 20) {
        score -= 50;
        redFlags.push(`🛑 GREED: Total Tax is ${totalTax}% (>20%)`);
    } else if (totalTax > 10) {
        score -= 20;
        redFlags.push(`⚠️ High Tax: Total Tax is ${totalTax}% (>10%)`);
    }

    // C. Liquidity Health (GoPlus Data)
    const lpHolders = parseInt(data.lpHolderCount || "0");
    if (lpHolders < 3) {
        score -= 15;
        redFlags.push(`💧 Weak Liquidity: Only ${lpHolders} LP providers (<3)`);
    }

    // D. Market Analysis (DexScreener Data)
    if (data.liquidity !== undefined && data.marketCap !== undefined) {
        // 1. Ghost Liquidity Check
        if (data.liquidity < 1000) {
            score -= 30;
            redFlags.push(`👻 Ghost Town: Extremely Low Liquidity ($${data.liquidity.toLocaleString()})`);
        } else if (data.liquidity < 5000) {
            score -= 15;
            redFlags.push(`⚠️ Low Liquidity: Only $${data.liquidity.toLocaleString()}`);
        }

        // 2. Liquidity to MarketCap Ratio (Rug Risk)
        // If MCap is high but Liquidity is low, it's dangerous.
        if (data.marketCap > 0) {
            const liqToMcapRatio = (data.liquidity / data.marketCap) * 100;
            if (liqToMcapRatio < 10 && data.marketCap > 10000) { // Only apply if MCap is significant
                score -= 20;
                redFlags.push(`📉 Thin Liquidity: Only ${liqToMcapRatio.toFixed(1)}% of MarketCap (Volatile!)`);
            }
        }
    } else {
        // If market data is missing, it might be a brand new or unlisted token
        score -= 10;
        redFlags.push("⚠️ Market Data Unavailable (Not listed on DexScreener?)");
    }

    // E. Open Source Check
    if (!data.isOpenSource) {
        score -= 30;
        redFlags.push("⚠️ Closed Source: Contract not verified (-30)");
    }

    // F. Owner Status
    if (data.ownerAddress !== "0x0000000000000000000000000000000000000000" && data.ownerAddress !== "") {
        score -= 10;
        redFlags.push("⚠️ Ownership Not Renounced (Dev can change rules)");
    }

    // --- 3. OUTPUT FORMAT ---
    score = Math.max(0, Math.min(100, score));

    let riskLevel: ScanResult['riskLevel'] = 'SAFE';
    let summary = "";

    if (score < 40) {
        riskLevel = 'SCAM';
        summary = "⛔ CRITICAL DANGER: This token shows multiple signs of a scam or rug pull. High taxes, hidden whales, or broken liquidity. Stay away.";
    } else if (score < 70) {
        riskLevel = 'DANGEROUS';
        summary = "⚠️ HIGH RISK: Significant red flags detected. It might not be a hard scam, but the risk of losing money is extremely high due to whales or liquidity issues.";
    } else if (score < 90) {
        riskLevel = 'CAUTION';
        summary = "🤔 CAUTION: The contract is mostly safe, but there are some concerns (like taxes or concentration). Trade with small amounts only.";
    } else {
        summary = "✅ LOOKS SAFE: No major red flags found. The contract is verified, liquidity is decent, and taxes are low. Always DYOR, but this looks clean.";
    }

    // Override summary if specific major flags exist but score didn't drop enough (Edge cases)
    if (redFlags.some(f => f.includes("Whales hold"))) {
        summary += " Be careful: Whale concentration is high.";
    }

    return {
        score,
        riskLevel,
        redFlags,
        details: data,
        summary
    };
}
