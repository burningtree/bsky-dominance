import * as fs from 'node:fs'
import * as path from 'node:path'

const OUTPUT_FN = './src/lib/data.json'

async function getUserCount() {
    const resp = await fetch('https://bsky-search.jazco.io/stats')
    const stats = await resp.json()
    return stats.total_users
}

async function getPDSStats() {
    const resp = await fetch('https://blue.mackuba.eu/directory/pdses')
    const html = await resp.text()
    return {
        total: Number(html.match(/Total PDSes: (\d+)/)[1]),
        accounts: Number(html.match(/Accounts: (\d+)/)[1])
    }
}

async function run() {

    const output = {
        userCount: await getUserCount(),
        pdsStats: await getPDSStats(),
        customHandleCount: 186_000,
    }

    fs.writeFileSync(OUTPUT_FN, JSON.stringify(output))
    console.log(output, null, 2)
    console.log(`Writed: ${OUTPUT_FN}`)
}

run()