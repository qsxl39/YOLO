import { http } from '@/utils/http'
// import type { S } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'

/**
 * 登录
 * @param username 用户名
 * @param Password 密码
 */
export const postDoctorLoginAPI = (username: string, Password: string): any => {
  // console.log({
  //   username: username,
  //   password: Password
  // })
  // const any = {
  //   username: username,
  //   password: Password
  // }
  // const json = JSON.stringify(any)
  // console.log(json)
  return http.post('/login', {
    username: username,
    password: Password
  })
}
/**
 * 注册 /register
 * @param {string} usernameRegister 准备注册的用户名
 * @param {string} passwordOne 第一次输入的密码
 * @param {string} passwordTwo 第二次输入的密码
 */
export const register = (
  usernameRegister: string,
  passwordOne: string,
  passwordTwo: string
): any => {
  const any = {
    username: usernameRegister,
    password_1: passwordOne,
    password_2: passwordTwo
  }
  const json = JSON.stringify(any)
  console.log(json)
  return http.post('/register', json)
}

//退出登录/logout
export const logout = (): any => {
  return http.post('/logout')
}

//分页  /alarm/query/pages
export const pages = (): any => {
  return http.post('/alarms/query/pages')
}

//图片查询/alarms/query/search
export const search = (
  pic_channel: string,
  pic_type: string,
  pic_time_start: string,
  pic_time_end: string
) => {
  // return http.post('/patients/save')
  return http.post('/alarms/query/search', {
    pic_channel,
    pic_type,
    pic_time_start,
    pic_time_end
  })
}

//导出结果
export const download = (
  pic_channel: string,
  pic_type: string,
  pic_time_start: string,
  pic_time_end: string
): any => {
  return http.post('/alarms/download', {
    pic_channel,
    pic_type,
    pic_time_start,
    pic_time_end
  })
}

//重启通道/channel/manage/restart/channel
export const channel = (the_id: string): any => {
  return http.post('/channel/manage/restart/channel', {
    the_id
  })
}

//重启配置/channel/manage/restart/setting
export const restart = (the_id: string): any => {
  return http.post('/channel/manage/restart/setting', { the_id })
}

//删除记录/alarms/query/delete
export const queryDelete = (): any => {
  return http.delete(`alarms/query/delete`)
}

//通道管理设置
export const setting = (
  the_id: string,
  satuation: string,
  address: string,
  channel_name: string,
  caqu_settings: string,
  open_close: boolean,
  degree: string,
  pinglv: string,
  updatetime: string
): any => {
  return http.post('/channel/manage/setting', {
    the_id,
    satuation,
    address,
    channel_name,
    caqu_settings,
    open_close,
    degree,
    pinglv,
    updatetime
  })
}

//通道信息呈现
export const show = (the_id: string) => {
  return http.post('/alarms/current/show', { the_id })
}

//批量患者删除
export const getDeleteAPI = (ids: string) => {
  console.log(ids)
  return http.delete(`/patients/delete?ids=${ids}`)
}
//修改患者信息
export const getUpdateAPI = (data: object) => {
  return http({
    url: '/patients/update',
    method: 'put',
    data
  })
}
//条件查询患者
export const getPatientConditionAPI = (params: any) => {
  console.log(params)
  //  return http.get(`/patients/condition?id=5&name=${form.name}&madicalRecord=${form.id}&sex=${form.sex}&treatmentPhase=${form.treatmentPhase}`)
  return http.get(`/patients/condition`, {
    params
  })
}
//分页列表

export const getPatientPageAPI = (currentPage: Number, pageSize: Number) => {
  return http.get(`/patients/page?currentPage=${currentPage}&pageSize=${pageSize}`, {})
}
//导出治疗阶段
export const getPatientsExportAPI = (userId: number, treatmentPhase: number) => {
  return http.get(`/patients/export?userId={userId}&treatmentPhase={treatmentPhase}`, {
    params: {
      userId,
      treatmentPhase
    }
  })
}
//导出治疗阶段全部
export const getPatientExportAllAPI = (userId: number) => {
  return http.get(`/patients/exportAll?userId={}`, {
    params: {
      userId
    }
  })
}
