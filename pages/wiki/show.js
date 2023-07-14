// pages/wiki/show.js
const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        friendlinessText: '',
        maintenanceText: '',
        activityText: '',
        trainabilityText: ''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        console.log('inside wiki/show, options:', options);
        const id = options.id;
        let page = this;
    
        // Get api data
        wx.request({
          url: `${app.globalData.baseUrl}breeds/${id}`,
          method: 'GET',
          header: app.globalData.header,
          success(res) {
            console.log(res);
            const breed = res.data;
    
            // Update local data
            page.setData({
              breed: breed,
              friendlinessText: '',
              maintenanceText: '',
              activityText: '',
              trainabilityText: ''
            });
    
            // Process index values and set the corresponding text
            let friendlinessIndex = breed.friendlinessIndex;
            let maintenanceIndex = breed.maintenanceIndex;
            let activityIndex = breed.activityIndex;
            let trainabilityIndex = breed.trainabilityIndex;
    
            let friendlinessText, maintenanceText, activityText, trainabilityText;
    
            // Friendliness
            if (friendlinessIndex <= 3) {
              friendlinessText = 'Not very friendly';
            } else if (friendlinessIndex <= 6) {
              friendlinessText = 'Friendly';
            } else {
              friendlinessText = 'Super friendly';
            }
    
            // Maintenance
            if (maintenanceIndex <= 3) {
              maintenanceText = 'Low maintenance';
            } else if (maintenanceIndex <= 6) {
              maintenanceText = 'Moderate maintenance';
            } else {
              maintenanceText = 'High maintenance';
            }
    
            // Activity
            if (activityIndex <= 3) {
              activityText = 'Slow';
            } else if (activityIndex <= 6) {
              activityText = 'Active';
            } else {
              activityText = 'Super active';
            }
    
            // Trainability
            if (trainabilityIndex <= 3) {
              trainabilityText = 'Not very trainable';
            } else if (trainabilityIndex <= 6) {
              trainabilityText = 'Moderately trainable';
            } else {
              trainabilityText = 'Highly trainable';
            }
    
            // Set the texts in the data object
            page.setData({
              friendlinessText: friendlinessText,
              maintenanceText: maintenanceText,
              activityText: activityText,
              trainabilityText: trainabilityText
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