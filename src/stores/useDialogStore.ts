import { http } from '@/utils/http'
import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const storedate = reactive([
    {
      ID: '1',
      mingcheng: '人数统计',
      zhuangtai: true,
      lingmindu: 0, // 假设灵敏度初始值为50
      pinlv: 1 // 假设上报频率初始值为1
    },
    {
      ID: '1',
      mingcheng: '车辆统计',
      zhuangtai: false,
      lingmindu: 0, // 假设灵敏度初始值为30
      pinlv: 5 // 假设上报频率初始值为5
    },
    {
      ID: '2',
      mingcheng: '人数统计',
      zhuangtai: true,
      lingmindu: 50, // 假设灵敏度初始值为50
      pinlv: 1 // 假设上报频率初始值为1
    },
    {
      ID: '2',
      mingcheng: '车辆统计',
      zhuangtai: false,
      lingmindu: 30, // 假设灵敏度初始值为30
      pinlv: 5 // 假设上报频率初始值为5
    },
    {
      ID: '3',
      mingcheng: '人数统计',
      zhuangtai: true,
      lingmindu: 50, // 假设灵敏度初始值为50
      pinlv: 1 // 假设上报频率初始值为1
    },
    {
      ID: '3',
      mingcheng: '车辆统计',
      zhuangtai: false,
      lingmindu: 30, // 假设灵敏度初始值为30
      pinlv: 5 // 假设上报频率初始值为5
    },
    {
      ID: '4',
      mingcheng: '人数统计',
      zhuangtai: true,
      lingmindu: 50, // 假设灵敏度初始值为50
      pinlv: 1 // 假设上报频率初始值为1
    },
    {
      ID: '4',
      mingcheng: '车辆统计',
      zhuangtai: false,
      lingmindu: 30, // 假设灵敏度初始值为30
      pinlv: 5 // 假设上报频率初始值为5
    }
  ])

  // const currentShow = async (the_id: number) => {
  //   try {
  //     const res = await http.post('/alarms/current/show', { the_id })
  //     // console.log(res.data.data)
  //   } catch {
  //     console.log('false')
  //   }
  // }

  return {
    storedate
    // currentShow
  }
})
