/**
 * Blockchain explorer link mapping
 */

export function getBlockchainExplorerLink(chainId: number, txHash: string): string {
	if (chainId == 56) {
		return `https://bscscan.com/tx/${txHash}`;
	} else if(chainId == 137) {
		return `https://polygonscan.com/tx/${txHash}`;
	} else if(chainId == 1) {
        return `https://etherscan.com/tx/${txHash}`;
    }
}

export function getChainName(chainId: number): string {
	if (chainId == 56) {
		return "BNB Chain"
	} else if(chainId == 137) {
		return "Polygon"
	} else if(chainId == 1) {
        return "Ethereum"
    }
}
