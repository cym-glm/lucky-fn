import positions from '@/data/positions.json'

export function getPositions() {
  return positions
}

export function positionsToCards() {
  const now = new Date().toString()
  return positions.map((p, i) => ({
    id: i,
    uid: p.abbr,
    name: p.name,
    department: '岗位',
    identity: p.abbr,
    avatar: '',
    isWin: false,
    x: 0,
    y: 0,
    createTime: now,
    updateTime: now,
    prizeName: [],
    prizeId: [],
    prizeTime: [],
  }))
}
