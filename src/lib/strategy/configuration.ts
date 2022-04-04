import {strategyConfig} from "../config";


export class StrategyConfiguration {

    /** Strategy id - used internally in the state files, etc. */
    id: string;

    /** Name displayed until we have loaded data from the server-side  */
    placeHolderName?: string;

    /** Webhook server URL */
    url: string;

    getPlaceHolderName(): string {
        return this.placeHolderName || this.id;
    }
}


/**
 * Get list of configured strategies.
 */
export function getStrategyConfiguration(): StrategyConfiguration[] {
    return strategyConfig;
}