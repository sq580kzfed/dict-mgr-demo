let subDictKeys = [
  './static-sgyy',
]

// 向外提供基础方法供外部模块按需获取
let dicts = {

  dictArr: {
    common: [
      { key: '1', value: '共用字典字段' }
    ]
  },

  // 对外提供转换为键值对功能
  getDict: function (key) {
    var arr = this.dictArr[key]
    var dict = {}
    for (var i = 0; i < arr.length; i++) {
      dict[arr[i].key + ''] = arr[i].value
    }
    return dict
  },

  // 按原始数组形式对外
  getDictArr: function (key) {
    return this.dictArr[key]
  }
}

subDictKeys.forEach(item => {
  let subDicts = require(item+'')
  let tmpDictArr = mix(dicts.dictArr, subDicts.dictArr)
  dicts.dictArr = tmpDictArr
})

function mix(o, n) {
  var obj = o || {}

  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p))) {
      o[p] = n[p]
    }
  }

  return obj
}

module.exports = dicts