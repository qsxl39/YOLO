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
        <el-option label="通道一" value="channel1" />
        <el-option label="通道二" value="channel2" />
      </el-select>
    </el-form-item>
    <el-form-item style="width: 160px" prop="region2">
      <el-select v-model="ruleForm.region2" placeholder="告警类型">
        <el-option label="人数统计" value="人数统计" />
        <el-option label="车辆统计" value="车辆统计" />
      </el-select>
    </el-form-item>

    <el-form-item required>
      <el-col :span="11">
        <el-form-item style="margin: 0" prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            placeholder="起始日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item style="margin: 0" prop="date2">
          <el-date-picker
            v-model="ruleForm.date2"
            type="date"
            placeholder="截止日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
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
      <div
        v-for="(val, key) in state.filtering"
        :key="key"
        ref="dlRefs"
        class="filtering-list-flex"
      >
        <div class="filtering-list-title">{{ val.title }}</div>
        <div class="filtering-list-item" :style="{ height: val.isMore ? 'auto' : '50px' }">
          <span
            class="span"
            :class="v.active ? 'dd-active' : ''"
            v-for="(v, k) in val.children"
            :key="k"
            @click="onSelItem(val, v)"
          >
            {{ v.label }}
          </span>
          <div class="dd-more" v-if="val.isShowMore" @click="val.isMore = !val.isMore">
            <span>{{ val.isMore ? '收起' : '展开' }}</span>
            <i :class="val.isMore ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          </div>
        </div>
      </div>
      <div class="flex-warp mt15 mb15" v-if="state.tableData.data.length > 0">
        <el-row :gutter="15">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            class="mb15"
            v-for="(v, k) in state.tableData.data"
            :key="k"
            @click="onTableItemClick(v)"
          >
            <div class="flex-warp-item">
              <div class="flex-warp-item-box">
                <div class="item-img">
                  <img :src="v.img" />
                </div>
                <div class="item-txt">
                  <div class="item-txt-title">{{ v.title }}</div>
                  <div class="item-txt-other">
                    <div style="width: 100%">
                      <div class="item-txt-msg mb10">
                        <span>评价 {{ v.evaluate }}</span>
                        <span class="ml10">收藏 {{ v.collection }}</span>
                      </div>
                      <div class="item-txt-msg item-txt-price">
                        <span class="font-price">
                          <span>￥</span>
                          <span class="font">{{ v.price }}</span>
                        </span>
                        <span>月销{{ v.monSales }}笔</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else class="filtering-no-data">
        <div class="no-data-box">
          <i class="el-icon-search"></i>
          <div class="no-txt">暂无数据</div>
        </div>
      </div>
      <template v-if="state.tableData.data.length > 0">
        <el-pagination
          style="text-align: right"
          background
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :current-page="state.tableData.param.pageNum"
          :page-size="state.tableData.param.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="state.tableData.total"
        >
        </el-pagination>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {
  pageHeaderEmits,
  type ComponentSize,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { Delete, Search, Upload } from '@element-plus/icons-vue'
import { pages } from '@/api/user'

interface RuleForm {
  region: string
  region2: string
  date1: string
  date2: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: '',
  region2: '',
  date1: '',
  date2: ''
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

  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ]
})

import { search } from '@/api/user'

const submitForm = async () => {
  const arrar = {
    pic_channel: ruleForm.region,
    pic_type: ruleForm.region2,
    pic_time_start: ruleForm.date1,
    pic_time_end: ruleForm.date2
  }
  console.log('已查询')
  console.log(arrar)
  try {
    const res = await search(ruleForm.region, ruleForm.region2, ruleForm.date1, ruleForm.date2)
    console.log(res)
    console.log('查询成功')
  } catch {}
  // if (!formEl) return
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
}

import { download } from '@/api/user'

const resetForm = () => {
  try {
    const res = download(ruleForm.region, ruleForm.region2, ruleForm.date1, ruleForm.date2)
    console.log(res)
    console.log('下载成功')
  } catch {}
  // if (!formEl) return
  // formEl.resetFields()
}

import { queryDelete } from '@/api/user'

const QueryDelete = () => {
  try {
    const res = queryDelete('channel1/人数统计-20240913-1357.jpg')
    console.log(res)
    console.log('删除成功')
  } catch {}
}

// fewcode
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { filterList } from './mock'

// 定义变量内容
const dlRefs = ref<RefType[]>([])
const router = useRouter()
const state = reactive({
  tableData: {
    data: filterList,
    total: 99,
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
        height: 360px;

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
</style>
