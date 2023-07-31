// pages/users/profile.js
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    owner: {},
    dog: {}
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    console.log("Selected Avatar URL:", avatarUrl);
    this.setData({ avatarUrl });
    app.globalData.avatarUrl = avatarUrl;
    console.log("Global Avatar URL:", app.globalData.avatarUrl);

    // Make API call to update the owner's record with the new avatarUrl
    this.updateOwnerProfile();
  },

  setNickname(e) {
    const input = e.detail.value;
    console.log("Nickname Input:", input);
    this.setData({ nickname: input });
    app.globalData.nickname = input;
    console.log("Global Nickname:", app.globalData.nickname);

    // Make API call to update the owner's record with the new nickname
    this.updateOwnerProfile();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log("Profile:", options);
    // Set the owner and dog data from app.globalData
    this.setData({
      owner: app.globalData.owner,
      dog: app.globalData.currentOwnerDog
    });
  },

  updateOwnerProfile() {
    // Check if both nickname and avatarUrl are available
    if (app.globalData.nickname && app.globalData.avatarUrl) {
      console.log("Sending data to server:", {
        name: app.globalData.nickname,
        avatar_url: app.globalData.avatarUrl
      });

      wx.request({
        url: `${app.globalData.baseUrl}owners/${app.globalData.owner.id}`,
        method: 'PUT',
        header: app.globalData.header,
        data: {
          owner: {
            name: app.globalData.nickname,
            avatar_url: app.globalData.avatarUrl
          }
        },
        success(res) {
          console.log("Owner profile updated on the server:", res);
        },
        fail(err) {
          console.error("Failed to update owner profile on the server:", err);
        }
      });
    }
  }
});
