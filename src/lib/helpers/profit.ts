// we need move needle 0.25% before calling it moving
export const PROFITABILITY_THRESHOLD = 0.0025;

/**
 * Profit colouring.
 *
 * See routes/__layout.svelte for CSS classes.
 *
 * @param profit Price change as percents
 */
export function determineProfitColourClass(profit: number): string {
	if (Math.abs(profit) < PROFITABILITY_THRESHOLD) {
		return 'proft-black'; // Data not loaded
	}

	if (profit > 0) {
		return 'profit-green';
	} else {
		return 'profit-red';
	}
}
