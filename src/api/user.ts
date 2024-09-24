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
  const any = {
    username: username,
    password: Password
  }
  const json = JSON.stringify(any)
  console.log(json)
  return http.post('/login', json)
}
/**
 * 注册
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

//退出登录
export const getDeleteByIdAPI = (id: Number): any => {
  // return http.delete('/patients/deleteById'),{
  //   params:{
  //     id
  //   }
  // }
  return http({
    url: `/patients/deleteById?id=${id}`,
    method: 'delete'
  })
}

// /**
//  * @param total
//  */
// //分页  /alarm/query/pages
// export const pages = (all_data: string, page_num: number, url: string): any => {
//   const any = {
//     total,
//     current_page,
//     url
//   }
//   const json = JSON.stringify(any)
//   return http.post('/alarm/query/pages', json)
// }

//新增患者/user.ts
export const getAddPatientAPI = (data: object) => {
  // return http.post('/patients/save')
  return http({
    url: '/patients/save',
    method: 'post',
    data
  })
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
