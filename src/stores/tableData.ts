import { defineStore } from 'pinia'  
  
export const tableDataStore = defineStore('tableData', {  
    state: () => [  
        {  
            number: '1',  
            zhuangtai: 'success',  
            dizhi: 'rtsp://xxxx',  
            mingcheng: 'ID-00',  
            peizhi: 'ID-00',  
            zhouije: '4',  
            shijian: '2016-05-04 23:12:11'  
        },  
        {  
            number: '2',  
            zhuangtai: 'fail',  
            dizhi: 'rtsp://xxxx',  
            mingcheng: 'ID-01',  
            peizhi: 'ID-00',  
            zhouije: '4',  
            shijian: '2016-05-04 23:12:11'  
        },  
        {
    number: '3',
    zhuangtai: 'not_configured',
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-02',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  },
  {
    number: '4',
    zhuangtai: 'success',
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-03',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  } 
    ],  

})