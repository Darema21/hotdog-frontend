// pages/matches/show.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
      match_id: '', 
      owner_name: '',
      dog_name: '',
      owner_image_url: '',
      dog_image_url: '',
      comments: [],
    },

    handleInput: function(e) {
      this.setData({
        wechatId: e.detail.value
      });
    },
  
    handleAccept: function() {
      const app = getApp();
      const comment = this.data.wechatId; 
      const match_id = this.data.match_id;
    
      wx.request({
        url: `${app.globalData.baseUrl}matches/${match_id}/comments`,
        method: 'POST',
        header: app.globalData.header,
        data: { 
          comment: {
            message: comment,
            owner_id: app.globalData.owner.id
          }
        },
        success: (res) => {
          console.log('update success?', res)
          if (res.statusCode === 422) {
            wx.showModal({
              title: 'Error!',
              content: res.data.errors.join(', '),
              showCancel: false,
              confirmText: 'OK'
            })
          } else {
            // Update the comments data property to include the new comment
            this.setData({
              comments: [...this.data.comments, comment]
            });
          }
        },
        fail(error) {
          console.log({ error })
        }
      })
    },
    


    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
      console.log("Options show match", options);
      const page = this;
    
      page.setData({
        match_id: options.id,
        owner_name: options.owner_name,
        dog_name: options.dog_name,
        owner_image_url: options.owner_image_url,
        dog_image_url: options.dog_image_url,
      });
    
      wx.request({
        url: `${app.globalData.baseUrl}matches/${page.data.match_id}/comments`,
        method: 'GET',
        header: app.globalData.header,
        // data: {},
        success(res) {
          console.log("Comments from API", res);
          page.setData({
            comments: res.data
          })
        }
      })
      // const stories = wx.getStorageSync('comment')
      // this.setData({
      //   comment: comment
      //   // stories: []
      // })
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