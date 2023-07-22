Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      console.log(e)
      console.log(e.currentTarget.dataset.id)
      // dog = e.currentTarget.dataset.id;
      // console.log("ID:", dog)
      wx.navigateTo({
        url: `/pages/dogs/show?id=${e.currentTarget.dataset.id}`,
      })      
    }
  }
})