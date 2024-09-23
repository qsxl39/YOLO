import { http } from '@/utils/http'
// import type { S } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'

/**
 * 医生登录
 * @param username 用户名
 * @param password 密码
 */
export const postDoctorLoginAPI = (userName: string, password: string): any => {
  return http.post('/newUser/login', {
    userName,
    password
  })
}
/**
 * 患者登录
 * @param madicalRecord 病历号
 */
export const getPatientLoginAPI = (madicalRecord: string): any => {
  return http.get('/newUser/patientLogin', {
    params: {
      madicalRecord
    }
  })
}
//单个患者删除
export const getDeleteByIdAPI=(id:Number):any=>{
  // return http.delete('/patients/deleteById'),{
  //   params:{
  //     id
  //   }
  // }
  return http({
    url:`/patients/deleteById?id=${id}`,
    method:'delete',
    
  })
}
//返回总计数据
export const getCountAPI=()=>{
  return http.get('/patients/count')
}
//新增患者/user.ts
export const getAddPatientAPI=(data:object)=>{
  // return http.post('/patients/save')
  return http({
    url:'/patients/save',
    method:'post',
    data
  })
}



//批量患者删除
export const getDeleteAPI=(ids:string)=>{
  console.log(ids)
  return http.delete(`/patients/delete?ids=${ids}`)
}
//修改患者信息
export const getUpdateAPI=(data:object
)=>{
  return http({
    url:'/patients/update',
    method:'put',
    data
  })
}
//条件查询患者
export const getPatientConditionAPI=(params:any
)=>{
  console.log(params)
//  return http.get(`/patients/condition?id=5&name=${form.name}&madicalRecord=${form.id}&sex=${form.sex}&treatmentPhase=${form.treatmentPhase}`)
 return http.get(`/patients/condition`,{
  params
 });

}
//分页列表

export const getPatientPageAPI=(currentPage:Number,pageSize:Number)=>{
  return http.get(`/patients/page?currentPage=${currentPage}&pageSize=${pageSize}`,{
   
  })
}
//导出治疗阶段
export const getPatientsExportAPI=(userId:number,treatmentPhase:number)=>{
  return http.get(`/patients/export?userId={userId}&treatmentPhase={treatmentPhase}`,{
    params:{
      userId,
      treatmentPhase
    }
  })
}
//导出治疗阶段全部
export const getPatientExportAllAPI=(userId:number)=>{
  return http.get(`/patients/exportAll?userId={}`,{
    params:{
      userId
    }
  })
}