const utils = require('../../utils/util');
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    // Add any initial data if needed
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("Options", options);
    const from_owner_id = options.from_owner_id;
    const to_owner_id = options.to_owner_id;
  
    console.log("Global dogs", app.globalData.dogs)
    const dogForFromOwner = app.globalData.dogs.find(dog => dog.ownerId === from_owner_id);
    console.log("dogForFromOwner", dogForFromOwner);
  
    const dogForToOwner = app.globalData.dogs.find(dog => dog.ownerId === to_owner_id);
    console.log("dogForToOwner", dogForToOwner);
  },
  

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // Do something when page ready
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // Do something when page shown
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    // Do something when page hidden
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    // Do something when page unload
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    // Do something when pull down
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    // Do something when page reach bottom
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    // Return custom share data when user share
  },

  /**
   * Called when page scroll
   */
  onPageScroll: function (event) {
    // Do something when page scroll
  },

  /**
   * Called when user click on floating tab
   */
  onTabItemTap: function (item) { // Corrected the method name
    // Do something when tab item tapped
  },
});
