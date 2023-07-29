// pages/matches/index.js
const app = getApp()
const utils = require('../../utils/util')

Page({

    /**
     * Page initial data
     */
    data: {

    },

    goToShow: function (e) {
      console.log(e)
      const id = e.currentTarget.dataset.id;
      utils.goToShow(id);
    },
  
    goToMatch(event) {
      console.log('ID:', event.currentTarget.dataset.matchId);
      const match_id = event.currentTarget.dataset.matchId;
      wx.navigateTo({
        url: `/pages/matches/show?id=${match_id}`,
      });
    },
    
    /**
     * Lifecycle function--Called when page load
     */

    onLoad(options) {
      const page = this

      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        });
      }

      wx.request({
        url: `${app.globalData.baseUrl}owners/${owner_id}/matches/${match_id}/comments`,
        method: 'GET',
        header: getApp().globalData.header,
        success(res) {
          const matches = res.matches;
          console.log("matches:", matches)
          // Update local data
          const updatedDogs = matches.map((matches) => {
            return {
              id: match.id,
              name: owner.name,
              imageUrl: dog.image_urls ? dog.image_urls[0] : '', // Get the first image URL
              ownerId: dog.owner_id
            };
          });

          // page.setData({
          //   pushList: updatedDogs, // Set the updated dogs array to pushList
          // }, () => {
          //   console.log("Push List", page.data.pushList)
          // });
          // wx.hideToast();
        },
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
    onShow() {

      const page = this;

        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2
          })
        } 
  
      console.log("index.js", app.globalData.header)
      
        // Get api data
      wx.request({
        url: `${app.globalData.baseUrl}owners/${owner_id}/matches`,
        method: 'GET',
        header: app.globalData.header,
        success(res) {
          console.log(res)
          const matches = res.data.matches;
          console.log(matches)
    
          // Update local data
          page.setData({
            matches: matches
          });
      
          wx.hideToast();
        },
        fail(e) {
          console.log(e)
        },
        // wx.request({
        //   url: `${app.globalData.baseUrl}owners/${app.globalData.owner.id}/matches`,
        //   method: 'GET',
        //   header: app.globalData.header,
        //   success(res){
        //     console.log("Matches:", res);
        //     const matches = res.data;

        //     page.setData({
        //       matches: matches
        //     })

        //   }
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