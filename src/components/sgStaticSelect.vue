<template>
  <el-select :placeholder="calcPlaceholder" clearable
    :value="value + ''"
    @change="changeFn"
  >
    <el-option
      v-for="item in dictArr"
      :value="item.key"
      :key="item.key"
      :label="item.value"
    />
  </el-select>
</template>

<script>

const PLC_MAP = {
  SEARCH: '全部', 
  DATAOPR: '请选择'
}

export default {
  name: 'sgStaticSelect',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: String | Number,
      default: ''
    },
    dictArr: {
      type: Array,
      default: []
    },
    actionType: { // 'SEARCH' => 搜索操作 | 'DATAOPR' => 数据操作
      type: 'SEARCH' | 'DATAOPR',
      default: 'DATAOPR'
    },
    placeholder: ''
  },

  computed: {
    calcPlaceholder() {
      return this.placeholder || PLC_MAP[this.actionType]
    }
  },

  data () {
    return {
      PLC_MAP: {
        SEARCH: '全部',
        SELECT: '请选择'
      }
    }
  },

  methods: {
    changeFn(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
