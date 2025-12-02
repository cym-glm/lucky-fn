import positions from '../src/data/positions.json' assert { type: 'json' }

function simulateDraw(times = 1000) {
  const counts = new Map()
  positions.forEach(p => counts.set(p.abbr, 0))
  for (let i = 0; i < times; i++) {
    const idx = Math.floor(Math.random() * positions.length)
    const p = positions[idx]
    counts.set(p.abbr, counts.get(p.abbr) + 1)
  }
  const missing = []
  counts.forEach((v, k) => { if (v === 0) missing.push(k) })
  console.log('Draw counts:', Object.fromEntries(counts))
  if (missing.length) {
    console.error('Missing positions:', missing)
    process.exitCode = 1
  } else {
    console.log('All positions drawn at least once.')
  }
}

simulateDraw(1000)
