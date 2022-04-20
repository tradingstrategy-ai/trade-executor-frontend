/**
 * State interface mappings relecting those in Python.
 *
 * Hand-sketched, not complete.
 *
 * https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/state.py
 *
 */

/**
 * Used to differetiate different position types in UI logic
 */
export enum PositionKind {
	open,
	closed,
	frozen
}

/**
 *
 * https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/trade.py
 */
export interface TradeExecution {
	trade_id: number;
	position_id: number;
	pair: any;
}

/**
 *
 * https://github.com/tradingstrategy-ai/trade-executor/blob/e1d3a1df80d8aa6ce505507253af8c4ed87cb222/tradeexecutor/state/position.py#L18
 */
export interface TradingPosition {
	pair: any;
	trades: Record<number, TradeExecution>;
	position_id: number;
}

/**
 * State profitabiltiy statistics.
 */
export interface Stats {
	portfolio: any;
	positions: Record<number, any[]>;
	closed_positions: Record<number, any>;
}

/**
 * Portfolio state.
 *
 * https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/portfolio.py#L24
 */
export interface Portfolio {
	open_positions: Record<number, TradingPosition>;
	frozen_positions: Record<number, TradingPosition>;
	closed_positions: Record<number, TradingPosition>;
}

/**
 * Strategy execution state as exported from Python.
 *
 * For structure details see: https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/state.py#L25
 *
 *
 */
export interface State {
	portfolio: any;
	stats: Stats;
}
