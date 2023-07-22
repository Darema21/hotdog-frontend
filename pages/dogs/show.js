// pages/dogs/show.js
const utils = require('../../utils/util');
const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {

    },

    goToBreed(e) {
        console.log(e)
        const data = e.currentTarget.dataset.id;
        console.log('Data:', data);
        utils.goToBreed(data);
      },
      
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const id = options.id
        let page = this;

        wx.request({
          url: `${app.globalData.baseUrl}dogs/${id}`,
          method: 'GET',
          header: app.globalData.header,
          success(res){
              console.log(res);
              const dog = res.data;

              page.setData({
                dog: dog,
                owner: dog.owner,
                breed: dog.breed
              });

              wx.hideToast();
          }
        })
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