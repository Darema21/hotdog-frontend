const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    match_id: '',
    owner_id: '',
    owner_name: '',
    dog_name: '',
    owner_image_url: '',
    dog_image_url: '',
    comments: [],
    current_owner: '',
    wechatId: '',
  },

    /**
   * Function to refresh the comments data
   */
  refreshComments() {
    const page = this;
    const match_id = this.data.match_id;
    const current_owner = app.globalData.owner;

    wx.request({
      url: `${app.globalData.baseUrl}matches/${match_id}/comments`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        page.setData({
          comments: res.data,
          current_owner: current_owner,
        });
      },
      fail(error) {
        console.log({ error });
      },
    });
  },

  handleInput: function (e) {
    this.setData({
      wechatId: e.detail.value,
    });
  },

  handleAccept: function () {
    const page = this;
    const comment = this.data.wechatId;
    const match_id = this.data.match_id;
  
    wx.request({
      url: `${app.globalData.baseUrl}matches/${match_id}/comments`,
      method: 'POST',
      header: app.globalData.header,
      data: {
        comment: {
          message: comment,
          owner_id: app.globalData.owner.id,
        },
      },
      success: (res) => {
        console.log('update success?', res);
        if (res.statusCode === 422) {
          wx.showModal({
            title: 'Error!',
            content: res.data.errors.join(', '),
            showCancel: false,
            confirmText: 'OK',
          });
        } else {
          // Update the local comments data to include the new comment
          const newComment = {
            id: res.data.id,
            message: comment,
            owner_id: app.globalData.owner.id,
          };
          page.setData({
            comments: [...page.data.comments, newComment],
            wechatId: '', // Clear the input field after successful comment submission
          });
        }
      },
      fail(error) {
        console.log({ error });
      },
    });
  },
  
  

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('Options show match', options);
    this.setData({
      match_id: options.id,
      owner_name: options.owner_name,
      dog_name: options.dog_name,
      owner_image_url: options.owner_image_url,
      dog_image_url: options.dog_image_url,
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    let page = this;
    const match_id = page.data.match_id;
    const current_owner = app.globalData.owner;
    this.refreshComments();

    wx.request({
      url: `${app.globalData.baseUrl}matches/${match_id}/comments`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        page.setData({
          comments: res.data,
          current_owner: current_owner,
        });
      },
      fail(error) {
        console.log({ error });
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
