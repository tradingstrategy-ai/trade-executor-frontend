/**
 * Blockchain explorer link mapping
 */

interface ChainInfo {
	id: number;
	name: string;
	explorerUrl: string;
}

const CHAINS: ChainInfo[] = [
	{
		id: 1,
		name: 'Ethereum',
		explorerUrl: 'https://etherscan.com'
	},
	{
		id: 56,
		name: 'BNB Chain',
		explorerUrl: 'https://bscscan.com'
	},
	{
		id: 137,
		name: 'Polygon',
		explorerUrl: 'https://polygonscan.com'
	},
	{
		id: 43114,
		name: 'Avalanche C-chain',
		explorerUrl: 'https://snowtrace.io'
	}
];

export function getChainInfo(chainId: number): ChainInfo | undefined {
	return CHAINS.find(({ id }) => id === chainId);
}

export function getChainName(chainId: number): string | undefined {
	return getChainInfo(chainId)?.name;
}

export function getChainExplorerLink(chainId: number, txHash: string): string | undefined {
	const info = getChainInfo(chainId);
	return info && `${info.explorerUrl}/tx/${txHash}`;
}
