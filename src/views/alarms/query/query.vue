<template>
  <el-form
    :inline="true"
    ref="ruleFormRef"
    style="max-width: 100%"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item style="width: 160px" prop="region">
      <el-select v-model="ruleForm.region" placeholder="选择通道">
        <el-option label="通道一" value="通道一" />
        <el-option label="通道二" value="通道二" />
      </el-select>
    </el-form-item>
    <el-form-item style="width: 160px" prop="region2">
      <el-select v-model="ruleForm.region2" placeholder="告警类型">
        <el-option label="人数统计" value="人数统计" />
        <el-option label="车辆统计" value="车辆统计" />
      </el-select>
    </el-form-item>

    <el-form-item required>
      <div class="line" />
      <div class="block">
        <el-date-picker
          v-model="ruleForm.date"
          type="datetimerange"
          start-placeholder="起始时间"
          end-placeholder="截至时间"
          range-separator="至"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm"
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="success" plain :icon="Search" @click="submitForm()"> 查询记录 </el-button>
      <el-button type="danger" plain :icon="Delete" @click="QueryDelete()"> 删除记录 </el-button>
      <el-button type="primary" plain @click="resetForm()">
        导出记录<el-icon class="el-icon--right"> <Upload /> </el-icon
      ></el-button>
    </el-form-item>
  </el-form>

  <!-- fewcode -->
  <div class="filtering layout-pd">
    <el-card
      shadow="hover"
      class="filtering-list br-top-no"
      v-loading="state.tableData.loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(255, 255, 255, 0.1)"
      :class="{ 'min-h-360': state.tableData.data.length <= 0 }"
    >
      <!-- 假设 paginatedData 是已经分页好的数据 -->
      <div class="filtering-list-flex">
        <div class="flex-warp mt15 mb15">
          <el-row :gutter="15">
            <!-- 这里我们不再遍历 state.tableData.data，而是直接使用 paginatedData 中的 item -->
            <el-col
              v-for="(item, index) in paginatedData"
              :key="index"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
              class="mb15"
            >
              <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                  <div class="item-img">
                    <img :src="item.img" />
                    <!-- 注意这里使用了 item.img 而不是 v.img -->
                  </div>
                  <div class="item-txt">
                    <div class="item-txt-title">{{ item.title }}</div>
                    <!-- 注意这里使用了 item.title 而不是 v.title -->
                  </div>
                </div>
              </div>
            </el-col>
            <!-- 注意：如果 paginatedData 中的每个元素都代表一行数据，那么上面的 el-col 就不应该再嵌套 v-for -->
          </el-row>
        </div>
      </div>

      <div v-if="!paginatedData.length" class="filtering-no-data" style="height: 200px;">暂无数据</div>

      <!-- 分页组件 -->
      <el-pagination
        style="text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[8, 16, 24]"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterList.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
//分页
import { watch, computed } from 'vue'
// 加载状态
const loading = ref(false)
// 当前页
const currentPage = ref(1)
// 每页数量
const pageSize = ref(8)
// 总数据量
const total = ref(0)

// 从localStorage加载分页设置
onMounted(() => {
  const savedPage = localStorage.getItem('currentPage')
  const savedSize = localStorage.getItem('pageSize')

  if (savedPage) {
    currentPage.value = Number(savedPage)
  }
  if (savedSize) {
    pageSize.value = Number(savedSize)
  }
})

// 监听当前页和每页数量变化并保存到localStorage
watch([currentPage, pageSize], () => {
  localStorage.setItem('currentPage', currentPage.value.toString())
  localStorage.setItem('pageSize', pageSize.value.toString())
})

// 过滤后的数据（暂时无实际过滤）
const filteredData = computed(() => {
  return state.tableData.data
})

// 计算分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})
// Handlers for pagination
function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  currentPage.value = 1 // Reset to first page
}

function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
}
//分页

import {
  pageHeaderEmits,
  type ComponentSize,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { Delete, Search, Upload } from '@element-plus/icons-vue'
import { pages } from '@/api/user'

// 修改 RuleForm 接口
interface RuleForm {
  region: string
  region2: string
  date: [string, string] // 数组，包含起始和结束日期时间
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
//修改 ruleForm 响应式对象
const ruleForm = reactive<RuleForm>({
  region: '',
  region2: '',
  date: ['2023-01-01 00:00:00', '2023-01-31 23:59:59']
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
  region: [
    {
      required: true,
      message: '请选择通道',
      trigger: 'change'
    }
  ],
  region2: [
    {
      required: true,
      message: '请选择告警',
      trigger: 'change'
    }
  ],

  'date.0': [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ],
  'date.1': [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ]
})

//图片查询
import { search } from '@/api/user'

const submitForm = async () => {
  const { pic_channel, pic_type, pic_time_start, pic_time_end } = {
    pic_channel: ruleForm.region,
    pic_type: ruleForm.region2,
    pic_time_start: ruleForm.date[0], // 起始日期
    pic_time_end: ruleForm.date[1] // 结束日期
  }
  console.log('已查询')
  console.log({ pic_channel, pic_type, pic_time_start, pic_time_end })
  try {
    const res = await search(pic_channel, pic_type, pic_time_start, pic_time_end)
    filterList.splice(0, filterList.length)
    for (let i = 0; i < res.data.url.length; i++) {
      const obj = { img: res.data.url[i] }
      filterList.push(obj)
    }
  } catch (error) {
    console.error('查询失败:', error)
  }
}

//分页请求
import { http } from '@/utils/http'
import { pageStore } from '@/stores/page'
const page = pageStore()

{
  http
    .post('/alarms/query/pages')
    .then((res) => {
      console.log('分页成功')
      console.log(res.data.url)
      const { total, current_page, url } = res.data
      page.setPage(total, current_page, url)
      filterList.splice(0, filterList.length)
      for (let i = 0; i < url.length; i++) {
        const obj = { img: url[i] }
        filterList.push(obj)
      }
    })
    .catch((error) => {
      console.log(error) // 处理错误
    })
}

//导出结果
import { download } from '@/api/user'
const resetForm = async () => {
  try {
    const res = await download(
      ruleForm.region,
      ruleForm.region2,
      ruleForm.date[0],
      ruleForm.date[1]
    )
    // saveAs(res.data, '')
    console.log(res)

    let url = URL.createObjectURL(res.data)
    console.log(url)
    let link = document.createElement('a')
    link.href = url
    link.download = 'download.zip'
    link.style.display = 'none'
    link.click()
    URL.revokeObjectURL(url)

    console.log('下载成功')
  } catch {}
}

// import axios from 'axios'
// axios({
//   method: 'post',
//   url: '/alarms/query/download', //'文件下载的URL',
//   data: {
//     pic_channel: ruleForm.region,
//     pic_type: ruleForm.region2,
//     pic_time_start: ruleForm.date[0],
//     pic_time_end: ruleForm.date[1]
//   },
//   responseType: 'blob' // 重要，设置响应类型为blob
// }).then((res) => {
//   if (res) {
//     let temp = res.headers['content-disposition'].split(';')[1].split('=')[1]
//     //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
//     let iconv = require('iconv-lite')
//     let fileName = iconv.decode(temp, 'gbk')
//     let type = decodeURIComponent(res.headers['content-type']) // const xlsx = 'application/vnd.ms-excel'
//     // console.log(type);
//     const blob = new Blob([res.data], {
//       type: 'application/vnd.ms-excel;charset=UTF-8'
//     })
//     // console.log(blob);
//     const blobUrl = window.URL.createObjectURL(blob)
//     let a = document.createElement('a') // 转换完成，创建一个a标签用于下载
//     // 设置href属性为文件路径，download属性可以设置文件名称
//     a.style.display = 'none'
//     a.href = blobUrl
//     a.download = fileName
//     document.body.appendChild(a)
//     a.click()
//     Window.URL.revokeObjectURL(blobUrl)
//     a.remove()
//   } else {
//     this.$message.error('导出失败')
//   }
// })
//删除记录
import { queryDelete } from '@/api/user'

const QueryDelete = async () => {
  try {
    const res = await queryDelete()
    filterList.splice(0, filterList.length)
    for (let i = 0; i < res.data.url.length; i++) {
      const obj = { img: res.data.url[i] }
      filterList.push(obj)
    }
  } catch {}
}

// fewcode
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { filterList } from './mock'
import { title } from 'process'

// 定义变量内容

const dlRefs = ref<RefType[]>([])
const router = useRouter()
const state = reactive({
  tableData: {
    data: filterList,
    total: page.page.total,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10
    }
  }
})

// 页面加载时
// onMounted(() => {
//     initBtnToggle();
//     window.onresize = () => {
//         initBtnToggle();
//     };
// });

// 过滤当前选中的数据
// const onSelItem = (val: FilteringRowType, v: FilteringChilType) => {
//     val.children.map((v: FilteringChilType) => (v.active = false));
//     v.active = true;
//     let arr = [];
//     state.filtering.map((item: FilteringRowType) => {
//         item.children.map((chil: FilteringChilType) => {
//             if (chil.active) {
//                 arr.push({
//                     ...item,
//                     children: [{ ...chil }],
//                 });
//             }
//         });
//     });
//     state.tableData.loading = true;
//     setTimeout(() => {
//         state.tableData.loading = false;
//     }, 500);
// };
// 当前列表项点击
// const onTableItemClick = (v: FilterListType) => {
//     if (v.id === 1) {
//         router.push({
//             path: '/pages/filtering/details',
//             query: { id: v.id },
//         });
//     } else {
//         router.push({
//             path: '/pages/filtering/details1',
//             query: { id: v.id },
//         });
//     }
// };
// 分页点击
const onHandleSizeChange = (val: number) => {
  state.tableData.param.pageSize = val
}
// 分页点击
const onHandleCurrentChange = (val: number) => {
  state.tableData.param.pageNum = val
}
</script>

<style scoped lang="scss">
.filtering {
  .filtering-list {
    overflow: hidden;
    border-bottom: none !important;

    .filtering-list-flex {
      &:last-of-type {
        .filtering-list-item {
          border-bottom: none !important;
        }
      }

      .filtering-list-title {
        float: left;
        width: 64px;
        font-weight: 700;
        position: relative;
        color: #909399;
        margin: 15px 0;

        &:after {
          content: '';
          position: absolute;
          border: 1px solid #909399;
          border-width: 0 1px 1px 0;
          width: 4px;
          height: 4px;
          transform: rotate(-45deg) translateY(-50%);
          right: 10px;
          top: 50%;
        }
      }

      .filtering-list-item {
        border-bottom: 1px dotted var(--next-border-color-light);
        margin-left: 64px;
        overflow: hidden;
        position: relative;

        .span {
          color: #8d8d91;
          font-size: 14px;
          float: left;
          padding: 0 15px;
          margin: 15px 0;

          &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }

        .dd-active {
          color: var(--el-color-primary);
        }

        .dd-more {
          font-size: 12px;
          position: absolute;
          right: 0;
          top: 16px;
          color: #a5a5a5;

          &:hover {
            cursor: pointer;
            color: #8d8d91;
          }
        }
      }
    }
  }

  .br-top-no {
    border-top: none;

    .flex-warp {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin: 0 -5px;

      .el-row {
        width: 101%;
      }

      .flex-warp-item {
        padding: 5px;
        width: 100%;
        height: 250px;

        .flex-warp-item-box {
          border: 1px solid var(--next-border-color-light);
          width: 100%;
          height: 100%;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;

          &:hover {
            cursor: pointer;
            border: 1px solid var(--el-color-primary);
            transition: all 0.3s ease;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);

            .item-txt-title {
              color: var(--el-color-primary) !important;
              transition: all 0.3s ease;
            }

            .item-img {
              img {
                transition: all 0.3s ease;
                transform: translateZ(0) scale(1.05);
              }
            }
          }

          .item-img {
            width: 100%;
            height: 215px;
            overflow: hidden;

            img {
              transition: all 0.3s ease;
              width: 100%;
              height: 100%;
            }
          }

          .item-txt {
            flex: 1;
            padding: 15px;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .item-txt-title {
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              color: #666666;
              transition: all 0.3s ease;

              &:hover {
                color: var(--el-color-primary);
                text-decoration: underline;
                transition: all 0.3s ease;
              }
            }

            .item-txt-other {
              flex: 1;
              align-items: flex-end;
              display: flex;

              .item-txt-msg {
                font-size: 12px;
                color: #8d8d91;
              }

              .item-txt-price {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .font-price {
                  color: #ff5000;

                  .font {
                    font-size: 22px;
                  }
                }
              }
            }
          }
        }
      }
    }

    :deep(.el-card__body) {
      height: 100%;

      .filtering-no-data {
        display: flex;
        height: 100%;

        .no-data-box {
          color: #cccccc;
          margin: auto;

          i {
            font-size: 70px;
          }

          .no-txt {
            font-size: 14px;
            text-align: center;
            margin-top: 15px;
          }
        }
      }
    }
  }

  .min-h-360 {
    height: 360px;
  }
}

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}

.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
}

.line {
  width: 1px;
  background-color: var(--el-border-color);
}
.mb15 {
  flex: 0 0 auto;
  /* 防止列自动扩展以填充可用空间 */
  margin-bottom: 15px;
  /* 列之间的垂直间距，可以根据需要调整 */
}
.item-img {
  display: flex;
  justify-content: center;
  /* 水平居中图片 */
  align-items: center;
  /* 垂直居中图片（如果图片容器有额外的高度） */
  overflow: hidden;
  /* 防止图片溢出容器 */
  /* 根据需要设置图片容器的宽度和高度 */
  width: 100%;
  /* 使容器宽度与列宽相匹配 */
  /* 如果需要，可以设置固定高度，或者使用padding-bottom技巧来维持宽高比 */
}
</style>
