<template>
  <div class="hello">
    <h2>静态字典</h2>
    <ul>
      <li>
        <el-form inline :model="table.params" >
          <el-form-item label="蜀国武将">
            <sg-static-select actionType="SEARCH"
              v-model="table.params.shu"
              :dictArr="searchDicts.shu"
            />
          </el-form-item>
        </el-form>
      </li>
    </ul>
    <h2>动态字典</h2>
    <ul>
      <li>
        <el-form
          ref="sgyySearchForm"
          inline
          :model="searchForm"
        >
          <el-form-item label="魏国武将" prop="weiHero">
            <sg-dynamic-select
              actionType="SEARCH"
              v-model="searchForm.weiHero"
              :bindSelItem="bindDynamicSel.sgyyAsyncWeiHero"
            />
          </el-form-item>
        </el-form>
      </li>
    </ul>
  </div>
</template>

<script>

import dicts from '@M/dicts/index'

import sgStaticSelect from '@C/sgStaticSelect.vue'
import sgDynamicSelect from '@C/sgDynamicSelect.vue'

import bindDynamicSel from "@M/dicts/dynamic-sgyy";

const INIT_SEARCH_FILTER = {
  wei: '',
  shu: '',
  wu: ''
}

export default {
  name: 'Demo',

  components: {
    sgStaticSelect,
    sgDynamicSelect
  },

  data () {
    return {
      table: {
        params: {
          ...INIT_SEARCH_FILTER
        },
        loading: true,
        total: 0,
        page: 1,
        size: 10,
        list: []
      },
      viewOrderId: '',
      searchDicts: {
        wei: dicts.getDictArr('sgyyWei'),
        shu: dicts.getDictArr('sgyyShu'),
        wu: dicts.getDictArr('sgyyWu')
      },
      searchForm: {
        weiHero: "",
      },
      bindDynamicSel: bindDynamicSel,
      visble: false,
      dataForm: {
        weiHero: "",
      },
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
