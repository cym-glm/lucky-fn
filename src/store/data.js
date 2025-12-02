const originUrl = 'https://to2026.xyz'

export const defaultPersonList = [
  { uid: 'U100156001', name: '朱厚熜', department: '皇室', identity: '万岁爷', avatar: 'https://img1.baidu.com/it/u=2165937980,813753762&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', x: 1, y: 1, id: 0, isWin: false, createTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', updateTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', prizeName: [], prizeTime: [], prizeId: [] },
  { uid: 'U100156002', name: '朱载垕', department: '皇室', identity: '裕王', avatar: 'https://img1.baidu.com/it/u=2165937980,813753762&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', x: 2, y: 1, id: 1, isWin: false, createTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', updateTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', prizeName: [], prizeTime: [], prizeId: [] },
  { uid: 'U100156003', name: '朱翊钧 ', department: '皇室', identity: '裕王世子', avatar: 'https://img1.baidu.com/it/u=2165937980,813753762&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', x: 3, y: 1, id: 2, isWin: false, createTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', updateTime: 'Tue Jan 09 2024 23:20:07 GMT+0800 (China Standard Time)', prizeName: [], prizeTime: [], prizeId: [] },
]

export const defaultMusicList = [
  { id: `Geoff Knorr - China (The Industrial Era).ogg${new Date().getTime().toString()}`, name: 'Geoff Knorr - China (The Industrial Era).ogg', url: `${originUrl}/resource/audio/Geoff Knorr - China (The Industrial Era).ogg` },
]

export const defaultPrizeList = [
  { id: '001', name: '三等奖', sort: 1, isAll: false, count: 3, isUsedCount: 0, picture: { id: '2', name: '三等奖', url: `${originUrl}/resource/image/image3.png` }, separateCount: { enable: true, countList: [] }, desc: '三等奖', isShow: true, isUsed: false, frequency: 1 },
]

export const defaultCurrentPrize = { id: '001', name: '三等奖', sort: 1, isAll: false, count: 12, isUsedCount: 0, picture: { id: '2', name: '三等奖', url: `${originUrl}/resource/image/image3.png` }, separateCount: { enable: true, countList: [] }, desc: '三等奖', isShow: true, isUsed: false, frequency: 1 }

export const defaultTemporaryPrize = { id: '', name: '', sort: 0, isAll: false, count: 1, isUsedCount: 0, picture: { id: '-1', name: '', url: '' }, separateCount: { enable: true, countList: [] }, desc: '', isShow: false, isUsed: false, frequency: 1 }

export const defaultImageList = [
  { id: '0', name: '一等奖', url: `${originUrl}/resource/image/image1.png` },
]

export const defaultPatternList = [21, 38, 55]
