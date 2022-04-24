/**
 * Blockchain explorer link mapping
 */

export function getBlockchainExplorerLink(chainId: number, txHash: string): string {
	if (chainId == 56) {
		return `https://bscscan.com/tx/${txHash}`;
	}
}
