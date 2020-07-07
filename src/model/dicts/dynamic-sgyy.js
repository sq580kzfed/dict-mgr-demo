import constant from '@/utils/constant'
export default {
  sgyyAsyncWeiHero: {
    url: constant.baseUri + '/heros/wei',
    optionKey: { // 指定后端返回的数据以哪两个字段作为键/值，这里一般需要与后端开发协商好
      label: 'name',
      value: 'code'
    }
  }
}