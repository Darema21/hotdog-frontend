// pages/matches/show.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
      owner: "Owner",
      message: "Message"
    },
    formSubmit (e) {
      let owner = e.detail.value.owner;
      let message = e.detail.value.message;
      let story = {
        owner: owner,
        message: message
      }
      wx.request({
        url: `http://localhost:3000/matches`,
        method: 'POST',
        data: story,
        success() {
          // redirect to index page when done
          wx.redirectTo({
            url: '/pages/matches/show'
          });
        }
      });
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
      let page = this;
      // Get api data
      wx.request({
        url: "http://localhost:3000/matches",
        method: 'GET',
        success(res) {
          const messages = res.data.messages;
          console.log(res)
          // Update local data
          page.setData({
            messages: messages
          });
          wx.hideToast();
        }
      });
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    // onShow() {
    //     const page = this
      
    //     if (typeof this.getTabBar === 'function' &&
    //     this.getTabBar()) {
    //       this.getTabBar().setData({
    //         selected: 2
    //       })
    //     }
    // },

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