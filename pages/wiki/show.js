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
            console.log('Received breed data:', breed);

            // Process index values and set the corresponding text
            let friendlinessIndex = breed.friendliness_index;
            console.log(friendlinessIndex)
            let maintenanceIndex = breed.maintenance_index;
            let activityIndex = breed.activity_index;
            let trainabilityIndex = breed.trainability_index;
    
            let friendlinessText, maintenanceText, activityText, trainabilityText;
    
            // Friendliness
            if (friendlinessIndex <= 3) {
              friendlinessText = 'Grumpkin';
            } else if (friendlinessIndex <= 6) {
              friendlinessText = 'Friendly buddy';
            } else {
              friendlinessText = 'Super friendly';
              friendlinessText = 'Life of the party';
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
              activityText = 'Chill';
            } else if (activityIndex <= 6) {
              activityText = 'Active';
            } else {
              activityText = 'Little rocket';
            }
    
            // Trainability
            if (trainabilityIndex <= 3) {
              trainabilityText = 'Stubborn';
            } else if (trainabilityIndex <= 6) {
              trainabilityText = 'Easy to train';
            } else {
              trainabilityText = 'Smart pants';
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