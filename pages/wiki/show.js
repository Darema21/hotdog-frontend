// pages/wiki/show.js
const app = getApp();
const utils = require('../../utils/util');

Page({
  /**
   * Page initial data
   */
  data: {
    friendlinessText: '',
    maintenanceText: '',
    activityText: '',
    trainabilityText: '',
    bestMatches: [],
  },

  goToBreed(e) {
    const id = e.currentTarget.dataset.id;
    utils.goToBreed(id);
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
          trainabilityText: '',
        });
        console.log('Received breed data:', breed);

        // Process index values and set the corresponding text
        let friendlinessIndex = (breed.friendliness_index * 100).toFixed(2);
        let maintenanceIndex = (breed.maintenance_index * 100).toFixed(2);
        let activityIndex = (breed.activity_index * 100).toFixed(2);
        let trainabilityIndex = (breed.trainability_index * 100).toFixed(2);

        // Friendliness
        let friendlinessText;
        if (friendlinessIndex <= 30) {
          friendlinessText = 'Grumpkin';
        } else if (friendlinessIndex <= 60) {
          friendlinessText = 'Friendly buddy';
        } else {
          friendlinessText = 'Super friendly';
        }

        // Maintenance
        let maintenanceText;
        if (maintenanceIndex <= 30) {
          maintenanceText = 'Low maintenance';
        } else if (maintenanceIndex <= 60) {
          maintenanceText = 'Moderate maintenance';
        } else {
          maintenanceText = 'High maintenance';
        }

        // Activity
        let activityText;
        if (activityIndex <= 30) {
          activityText = 'Chill';
        } else if (activityIndex <= 60) {
          activityText = 'Active';
        } else {
          activityText = 'Little rocket';
        }

        // Trainability
        let trainabilityText;
        if (trainabilityIndex <= 30) {
          trainabilityText = 'Stubborn';
        } else if (trainabilityIndex <= 60) {
          trainabilityText = 'Easy to train';
        } else {
          trainabilityText = 'Smart pants';
        }

        // Set the texts in the data object
        page.setData({
          friendlinessText: friendlinessText,
          maintenanceText: maintenanceText,
          activityText: activityText,
          trainabilityText: trainabilityText,
          bestMatches: breed.best_matches.map((match) => ({
            ...match,
            similarity_score: (match.similarity_score * 100).toFixed(2) + '%',
          })),
        });

        wx.hideToast();
      },
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {},

  /**
   * Called when page reach bottom
   */
  onReachBottom() {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {},
});
