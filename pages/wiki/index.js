// pages/wiki/index.js
const app = getApp()

Page({

    goToShow: function(event) {
        const breedName = event.currentTarget.dataset.breedName;
        wx.request({
            url: `${app.globalData.baseUrl}breedName`
        })
    },

    /**
     * Page initial data
     */
    data: {

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {
        let page = this;

        wx.request({
          url: `${app.globalData.baseUrl}breeds`,
          method: 'GET',
        //   header: app.globalData.header,
          success(res){
              console.log(res)
                page.setData({
                    data: res.data
                })
          }
        })
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})