import { http } from '@/utils/http'

export const getkonwledgeAPI = (id:string): any => {
  return http.get(`/article/${id}`)
}

export const getvideoAPI = (params:object): any => {
  return http.get('/minio/getUrl',{
    params:params
  })
}

export const gettestAPI = (params:object): any => {
  return http.get('/newQuestionnaire/getQuestionnaireContext',{
    params:params
  })
}