// 列表数据
import { pages } from '@/api/user'
import { http } from '@/utils/http'
// export const page = async () => {
//   console.log('已发送分页请求')
//   const res = await pages()
//   console.log(res)
// }
export const filterList = [
  {
    img: ` ${http}/media/channel1/人数统计-20240913-1357.jpg`,
    title: '嘉陵江2020年第1号洪水”在嘉陵江支流涪江形成',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 1
  },
  {
    img: `${http}/media/channel1/人数统计-20240913-1230.jpg`,
    title: '让《民法典》走近群众 盐田街道开展人民调解宣传活动',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 2
  },
  {
    img: `${http}/media/channel1/人数统计-20240913-1400.jpg`,
    title: '记者手记：可可西里，“挪”向“藏羚羊大产房”的14个半小时',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 3
  },
  {
    img: `${http}/media/channel2/车辆统计-20240713-1430.jpg`,
    title: '以优异成绩庆祝深圳经济特区建立40周年',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 4
  },
  {
    img: `${http}/media/channel1/车辆统计-20240913-1230.jpg`,
    title: '草原上的“太阳姑娘”',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 5
  },
  {
    img: `${http}/media/channel1/车辆统计-20240913-1330.jpg`,
    title: '奇观天下|带你走进非洲野生动物观光第一目的地',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 6
  },
  {
    img: 'http://news.sznews.com/pic/2020-09/02/t2_(101X54X600X335)7cd39301-d9cf-45f1-91c3-9575b1e5ce0e.jpg.2',
    title: '五角大楼发布“中国军力报告” 华春莹： 罔顾事实，充满偏见',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 7
  },
  {
    img: 'http://news.sznews.com/pic/2020-09/02/b8b41d9c-0508-4498-8d37-6e597493769f.jpg',
    title: '最新地铁消息汇总：4号线北延、2号线三期、8号线一期等今年通车',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 8
  },
  {
    img: 'http://www.sznews.com/photo/pic/2020-08/10/1635374c-f4d6-475c-ac47-1334176f365d.png',
    title: '9月1日深圳新增5例无症状感染者！钟南山这段话冲上热搜！',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 9
  },
  {
    img: 'http://www.sznews.com/news/pic/2020-08/13/646e5458-92b7-4636-9940-9b0799babfe1.png',
    title: '全能“小福宝” 为文明社区建设添砖加瓦',
    evaluate: (Math.random() * 10).toFixed(2),
    collection: (Math.random() * 100).toFixed(2),
    price: (Math.random() * 10).toFixed(2),
    monSales: (Math.random() * 20).toFixed(2),
    id: 10
  }
]
