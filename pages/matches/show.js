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
    },

    formSubmit (e) {
      let owner = e.detail.value.owner;
      let comment = e.detail.value.comment;
      let story = {
        owner: owner,
        comment: comment
      }
      wx.request({
        url: `${app.globalData.baseUrl}owners/:owner_id/matches/:match_id/comments`,
        method: 'POST',
        data: { 
          comment: comment },
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
        url: `${app.globalData.baseUrl}owners/:owner_id/matches/:match_id/comments`,
        method: 'GET',
        // header: {},
        // data: {},
        success(res) {
          console.log({res})
          page.setData({
            comment: res.data.comment
          })
        }
      })
      const stories = wx.getStorageSync('comment')
      this.setData({
        comment: comment
        // stories: []
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

    addComment(e) {
      const app = getApp();
      const comment = e.detail.value; 
    
      wx.request({
        url: `${app.globalData.baseUrl}matches/${match_id}/comments`,
        method: 'POST',
        data: { comment: comment },
        success(res) {
          console.log('update success?', res)
          if (res.statusCode === 422) {
            wx.showModal({
              title: 'Error!',
              content: res.data.errors.join(', '),
              showCancel: false,
              confirmText: 'OK'
            })
          } else {
            wx.switchTab({
              url: '/pages/matches/show',
            })
          }
        },
        fail(error) {
          console.log({ error })
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