<template>
  <el-select
    class="dynamic-dict-select"
    :placeholder="calcPlaceholder"
    :no-data-text="noDataText || '无数据'"
    :size="actionType === 'SEARCH' ? 'small' : ''"
    v-model="innerValue"
    :filterable="filterable"
    :clearable="clearable"
    :disabled="disabled"
    :loading="loading"
    :remote="remote"
    :remote-method="remoteMethod"
    @change="change"
    @visible-change="visibleChange"
  >
    <el-option 
      v-for="item in options" 
      :key="item.value" 
      :label="item.label" 
      :value="item.value"
     />
  </el-select>
</template>

<script>
const PLC_MAP = {
  SEARCH: '全部',
  DATAOPR: '请选择'
}

export default {
  name: 'sgDynamicSelect',
  props: {
    actionType: {
      // 'SEARCH' => 搜索操作 | 'DATAOPR' => 数据操作
      type: 'SEARCH' | 'DATAOPR',
      default: 'DATAOPR'
    },
    bindSelItem: {}, // {url: '', optionKey: {label: 'labelKey', value: 'labelKey'}}
    appendParam: {}, // 附加参数，如果有传则处理，未传则不处理
    validFlagNew: {
      //传入0查所有，1查正常（有效）
      type: Number,
      default: 0
    },
    value: {},
    label: {}, //获取 label
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: false,
    load: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    remote: {
      type: Boolean,
      default: true
    },
    paging: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      innerValue: '',
      options: [],
      noDataText: '',
      chooseArr: []
    }
  },

  watch: {
    appendParam: {
      handler(newAppendParam, oldAppendParam) {
        this.findData('', true)
      },
      immediate: true,
      deep: true
    }
  },

  computed: {
    calcPlaceholder() {
      return this.placeholder || PLC_MAP[this.actionType]
    }
  },

  created() {
    // this.remoteMethod = this.$utils.debounce(this.remoteMethod, 300)
    if (this.value) {
      this.innerValue = JSON.parse(JSON.stringify(this.value))
    }
    this.findData()
  },
  methods: {
    visibleChange(visible) {
      if (visible) {
        this.findData()
      }
    },
    async findData(keywords, forceUpdate) {
      let pageIndex = 1
      let pageSize = 50

      const options = this.options
      this.options = [{ value: '1', label: '曹操' },
          { value: '2', label: '司马懿' }]
      // if (options.length > 0 && !forceUpdate) {
      //   return
      // }

      // this.chooseArr = []
      // let isRemote = this.remote

      // if (this.loading) {
      //   return
      // }

      // if (!isRemote && this.options.length > 0) {
      //   return
      // }

      // this.loading = true

      // let params = {
      //   keywords: keywords || '',
      //   name: keywords || ''
      // }

      // // 处理附加参数
      // let appendParam = this.appendParam
      // for (let key in appendParam) {
      //   if (appendParam.hasOwnProperty(key)) {
      //     params[key] = appendParam[key]
      //   }
      // }

      // params.validFlagNew = this.validFlagNew

      // if (this.paging) {
      //   params.pageNum = pageIndex
      //   params.pageSize = pageSize
      //   params.rows = pageSize
      // }

      // let bindSelItem = this.bindSelItem

      // // 解决先赋值再加载列表的问题
      // let cache = ''
      // if (this.innerValue) {
      //   cache = JSON.parse(JSON.stringify(this.innerValue))
      //   this.innerValue = ''
      // }

      // const result = await this.$post(bindSelItem.url, {
      //   data: params
      // })
      
      // if (result.err) {
      //   this.noDataText = result.errmsg
      // } else {
      //   const data = result.data || {}
      //   const arr = []
      //   let list = []

      //   if (data.list) {
      //     list = data.list
      //   } else {
      //     list = data
      //   }

      //   list = list.splice(0, pageSize)

      //   list.forEach(item => {
      //     this.chooseArr.push(item)
      //     arr.push({
      //       label: item[bindSelItem.optionKey['label']],
      //       value: item[bindSelItem.optionKey['value']]
      //     })
      //   })
      //   this.options = arr

      //   setTimeout(() => {
      //     this.$emit('load-data', JSON.parse(JSON.stringify(arr)))
      //   }, 10)

      //   // 设置延迟，解决当有值的情况下，列表未加载出来且下拉列表处于显示状态的时候，不能正确显示label的问题
      //   setTimeout(() => {
      //     if (cache) {
      //       this.innerValue = cache
      //     }
      //   }, 25)

      //   this.noDataText = ''
      // }
    },
    change(e) {
      this.$emit('input', e)
      this.getLabel(e)
      this.$emit('change', e)
    },
    getLabel(value) {
      let label = ''
      let obj = {}
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i]
        if (option.value == value) {
          label = option.label
          obj = this.chooseArr[i]
          break
        }
      }
      this.$emit('update:label', label)
      this.$emit('listenToChildListLabel', label)
      this.$emit('listenToChildListEvent', obj)
    },

    remoteMethod(query) {
      this.findData(query, true)
    }
  },

  watch: {
    value(value) {
      this.innerValue = value
      this.getLabel(value)
    }
  }
}
</script>

<style scoped>
.gp-dynamic-dict-select {
  .el-select__caret {
    &.el-input__icon:not(.el-icon-circle-close) {
      &:before {
        content: '\E6E1';
      }
    }
  }
}
</style>