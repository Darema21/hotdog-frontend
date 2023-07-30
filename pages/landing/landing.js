// pages/landing/landing.js
Page({

    /**
     * Page initial data
     */
    data: {
      heartbeatAnimationData: {}
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {
      const heartbeatAnimation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      });
  
      // Define the heartbeat animation
      function runHeartbeatAnimation() {
        heartbeatAnimation.scale(1.2).step(); 
        heartbeatAnimation.scale(1).step(); 
  
        this.setData({
          heartbeatAnimationData: heartbeatAnimation.export()
        });
  
        setTimeout(runHeartbeatAnimation.bind(this), 500);
      }
  

      runHeartbeatAnimation.call(this);
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