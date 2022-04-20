<script lang="ts">
	import { portfolio, stats } from '$lib/state/store';

export async function get({ params }) {
  // `params.id` comes from [id].js
  const item = await db.get(params.id);

  if (item) {
    return {
      body: { item }
    };
  }

  return {
    status: 404
  };
}
</script>

<PositionList
	positions={closedPositions}
	columns={{ closed_at: true }}
	stats={$stats}
	pagination={true}
/>
