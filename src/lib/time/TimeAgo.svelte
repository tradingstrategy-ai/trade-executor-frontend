<!--
@component

Display time ago widget.
-->
<script lang="ts">
	import assert from 'assert-ts';
	import { formatUnixTimestampAsHours } from '$lib/helpers/formatters';

	export let time;
	export let mode = 'minutes';

	/**
	 * Format "ago" text.
	 *
	 * https://stackoverflow.com/a/69122877/315168
	 *
	 * @param input: Timestamp as UNIX seconds
	 */
	function formatTimeAgo(input: number) {
		assert(input, 'input number missing');
		const date = input instanceof Date ? input : new Date(input * 1000);

		const formatter = new Intl.RelativeTimeFormat('en');
		const ranges = {
			years: 3600 * 24 * 365,
			months: 3600 * 24 * 30,
			weeks: 3600 * 24 * 7,
			days: 3600 * 24,
			hours: 3600,
			minutes: 60,
			seconds: 1
		};
		const secondsElapsed = (date.getTime() - Date.now()) / 1000;
		for (let key in ranges) {
			if (ranges[key] < Math.abs(secondsElapsed)) {
				const delta = secondsElapsed / ranges[key];
				return formatter.format(Math.round(delta), key);
			}
		}
	}

	$: agoText = formatTimeAgo(time);
</script>

<span class="time-ago">
	{#if mode == 'minutes'}
		<span class="timestamp">{formatUnixTimestampAsHours(time)} UTC</span>
		<span class="ago-text">({agoText})</span>
	{/if}
</span>
