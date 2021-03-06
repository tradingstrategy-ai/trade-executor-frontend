import type { PositionStatistics } from './interface';

/**
 * Get position value at the open in US dollar
 *
 * @param stats
 */
export function getValueAtOpen(stats: PositionStatistics[]): number {
	return stats[0].value;
}

/**
 * Get position value before it was closed
 *
 * @param stats
 */
export function getValueAtClose(stats: PositionStatistics[]): number {
	// At -1 we have updated the position value after close, it is zero if it was properly closed
	// At -2 we have the last valuation before performing the closing the
	return stats.at(-2).value;
}

/**
 * Get position value at its peak as US dollar
 *
 * @param stats
 */
export function getValueAtPeak(stats: PositionStatistics[]): number {
	return Math.max(
		...stats.map((s) => {
			return s.value;
		})
	);
}
