/**
 * Profit colouring.
 *
 * See routes/__layout.svelte for CSS classes.
 *
 * @param profit Price change as percents
 */
export function determineProfitColourClass(profit: number): string {
    if(!profit) {
        return "proft-black"; // Data not loaded
    }

    if(profit > 0) {
        return "profit-green";
    } else {
        return "profit-red";
    }
}
