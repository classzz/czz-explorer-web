import ajax from './ajax.js'

// 查看hash rate 等数据
export const difficulty = params => ajax.get('/v1/block/difficulty', params)

// 检测是否需要更新数据 http://explorerapi.czze.io/v1/block/latestHeight
export const latestHeight = params => ajax.get('/v1/block/latest', params)

// 获取latest block 数据
export const blocks = params => ajax.get('/v1/blocks', params)

// 获取 transaction 的数据
export const transactions = params => ajax.get('/v1/transactions', params)

// 搜索 数据 height
export const search = (params) => ajax.get(`v1/block/search`, params)

// v1/transactions/wallet
export const wallet = (params) => ajax.get(`v1/transactions/wallet`, params)

//v1/account/search
export const acsearch = (params) => ajax.get(`v1/account/search`, params)



