const utils = require('../../utils/util');
const app = getApp();

Page({
  goToBreed(e) {
    const id = e.currentTarget.dataset.id;
    utils.goToBreed(id);
  },

  /**
   * Page initial data
   */
  data: {
    breeds: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {},

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    const page = this;

    wx.request({
      url: `${app.globalData.baseUrl}breeds`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        console.log(res);
        const breeds = res.data;

        breeds.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        page.setData({
          breeds: breeds,
        });
      },
    });
  },

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
