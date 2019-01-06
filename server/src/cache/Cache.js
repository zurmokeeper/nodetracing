module.exports = {
    // span收集队列/处理池
    spanQueue: [],
    spanArr: [],
    // 服务节点数组/图
    serviceSet: new Set(),
    serviceMap: {},
    serviceDAG: { data: [], links: [], categories: [], legend: { data: [] } }
}