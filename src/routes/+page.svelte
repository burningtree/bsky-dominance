<script>
    import data from "$lib/data.json";

    function numberFmt(n) {
        return new Intl.NumberFormat("en-EN").format(n);
    }

    const categories = [
        {
            title: "Protocol Development",
            dominance: 100,
            caption: "Protocol development is fully controlled by Bluesky PBC",
            sources: ["https://github.com/bluesky-social/atproto"],
        },
        {
            title: "Identity",
            dominance: 99.9,
            approx: true,
            caption: "did:plc is fully controlled by Bluesky PBC",
            sources: ["https://web.plc.directory/"],
        },
        {
            title: "Handles",
            dominance: (
                100 -
                data.customHandleCount / (data.userCount / 100)
            ).toFixed(2),
            caption: `${numberFmt(data.userCount - data.customHandleCount)} out of ${numberFmt(data.userCount)} (${numberFmt(data.customHandleCount)} non-bsky handles)`,
            sources: ["https://blue.mackuba.eu/directory/"],
        },
        {
            title: "Data (PDS repos)",
            dominance: (
                100 -
                data.pdsStats.accounts / (data.userCount / 100)
            ).toFixed(2),
            caption: `${numberFmt(data.userCount - data.pdsStats.accounts)} out of ${numberFmt(data.userCount)} (${numberFmt(data.pdsStats.accounts)} non-bsky repositories)`,
            sources: [
                "https://blue.mackuba.eu/directory/pdses",
                "https://bsky.jazco.dev/stats",
            ],
        },
        {
            title: "Relays",
            dominance: 99.9,
            approx: true,
            caption:
                "This is just an estimate, we don't have enough data at the moment",
            sources: [
                "https://bsky.app/profile/laurenshof.online/post/3la4dkbmx4m2j",
            ],
        },
        {
            title: "AppViews",
            dominance: 99.9,
            approx: true,
            caption:
                "This is just an estimate, we don't have enough data at the moment",
            sources: [],
        },
        {
            title: "Bluesky Client Diversity",
            dominance: 98,
            approx: true,
            caption:
                "This is just an estimate, we don't have enough data at the moment",
            sources: [],
        },
        {
            title: "Bluesky Moderation",
            dominance: 80,
            approx: true,
            caption:
                "This is just an estimate, we don't have enough data at the moment",
            sources: [],
        },
    ];

    const totalDominance = (
        categories.reduce((tot, cur) => tot + Number(cur.dominance), 0) /
        categories.length
    ).toFixed(2);
</script>

{#snippet category(cat)}
    <div class="mb-4 p-4 bg-gray-100 rounded group">
        <div class="sm:flex items-center">
            <div class="w-full sm:w-1/2">
                <h2 class="text-3xl font-semibold">{cat.title}</h2>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-1/2 mt-2 sm:mt-0">
                <div class="w-full bg-gray-200 rounded-full h-6">
                    <div
                        class="{cat.dominance > 25
                            ? cat.dominance >= 75
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            : 'bg-green-500'} h-full rounded-full"
                        style="width: {cat.dominance}%"
                    ></div>
                </div>
                <div class="text-3xl grow w-44 text-left">
                    {#if cat.approx}~{/if}{cat.dominance}%
                </div>
            </div>
        </div>
        <div class="mt-4 opacity-50 text-sm">
            {cat.caption}
            {#if cat.sources && cat.sources.length > 0}
                ({@html cat.sources
                    .map((s, i) => `<a href="${s}">Source ${i + 1}</a>`)
                    .join(", ")})
            {/if}
        </div>
    </div>
{/snippet}

<svelte:head>
    <title>ATP/bsky Dominance Index</title>
</svelte:head>

<div class="max-w-3xl mx-auto mt-10 px-4 pb-16">
    <h1 class="text-4xl font-bold">
        AT Protocol - Bluesky PBC Dominance Index
    </h1>
    <p class="mt-10">
        This page provides a measurement of <a
            href="https://bsky.social/about/faq">Bluesky PBC</a
        >'s control over various components of the
        <a href="https://atproto.com/">AT Protocol</a> social network infrastructure.
        It tracks the distribution of power across key protocol elements, helping
        to assess the current state of decentralization and identify areas where
        centralized control may need to be reduced to achieve the protocol's long-term
        vision of a truly distributed social network.
    </p>
    <div class="mt-10 sm:flex items-center">
        <div class="text-4xl grow font-semibold">Overall dominance</div>
        <div
            class="text-5xl bg-red-500 rounded p-3 inline-block text-white font-bold mt-4 sm:mt-0"
        >
            {totalDominance}%
        </div>
    </div>

    <div class="mt-10 mb-10">
        {#each categories as cat}
            {@render category(cat)}
        {/each}
    </div>

    <div class="">
        Author: <a href="https://bsky.app/profile/tree.fail">@tree.fail</a>
    </div>
</div>
