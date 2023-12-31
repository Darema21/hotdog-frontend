const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {
    pushList: []
  },

  bindViewTap: function () {},


  goToShow: function (e) {
    const id = e.currentTarget.dataset.dogid;
    utils.goToShow(id);
  },

  onShow() {

    let page = this;
    console.log("index.js", app.globalData.header)

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    // Get api data
    // wx.request({
    //   url: `${app.globalData.baseUrl}dogs`,
    //   method: 'GET',
    //   header: app.globalData.header,
    //   success(res) {
    //     console.log(res)
    //     const dogs = res.data.dogs;
    //     console.log(dogs)

    //     // Update local data
    //     page.setData({
    //       dogs: dogs
    //     });

    //     wx.hideToast();
    //   },
    //   fail(e) {
    //     console.log(e)
    //   }
    // });
  },

  onLoad(options) {
    let page = this;

    // setInterval(() => {
    //   this.setData({
    //     pushList: [],
    //   });
    // }, 5000);

    // Retrieve the dogs from globalData and set them in the pushList
    this.setData({
      pushList: app.globalData.dogs,
    });
  },

  handleSwipeOut(args) {
    console.log('Handle swipe out', args);
    const direction = args.detail.direction;
    const to_owner_id = args.detail.item.ownerId;
    const from_owner_id = app.globalData.owner.id;
    console.log("To Owner id", to_owner_id);
    console.log("From Owner id", from_owner_id);
    // Remove the swiped dog from pushList
    const newPushList = this.data.pushList.filter(dog => dog.ownerId !== to_owner_id);
    this.setData({
      pushList: newPushList,
    });

    sendPostRequest(direction, from_owner_id, to_owner_id);
  },

  getUserInfo: function (e) {},

  addMatch: function (options) {},

  onReady() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {},
});

function sendPostRequest(direction, from_owner_id, to_owner_id) {
  console.log("Send post request", direction);
  console.log("Send post request", from_owner_id);
  console.log("Send post request", to_owner_id);
  wx.request({
    url: `${app.globalData.baseUrl}owners/${from_owner_id}/matches`,
    method: 'POST',
    header: app.globalData.header,
    data: {
      match: {
        from_owner_id: from_owner_id,
        to_owner_id: to_owner_id,
        from_owner_decision: direction
      }
    },
    success(res) {
      handleSuccessResponse(res);
    },
    fail(res) {
      handleFailureResponse(res);
    }
  });
}

function handleSuccessResponse(res) {
  console.log("POST request successful");
  console.log("Response:", res);

  if (res.statusCode === 200 || res.statusCode === 201) {
    const match = res.data;
    const match_id = match.id;
    const from_dog_id = match.from_dog.id;
    const to_dog_id = match.to_dog.id;
    const to_dog_name = match.to_dog.name;
    const to_owner = match.to_owner.id

    console.log("Match status:", match.status);
    if (match.status === "like") {
      navigateToMutualPage(match_id, from_dog_id, to_dog_id, to_dog_name);
    } else {
      console.log("Like is not mutual");
    }
  } else {
    showToast('Failed to create match');
  }
}

function handleFailureResponse(res) {
  console.log("POST request failed");
  console.log("Error:", res);

  showToast('Failed to create match');
}

function navigateToMutualPage(match_id, from_dog_id, to_dog_id, to_dog_name) {
  console.log("Navigating to mutual page: From dog", from_dog_id, "To dog:", to_dog_id);

  wx.navigateTo({
    url: `/pages/matches/mutual?match_id=${match_id}&from_dog_id=${from_dog_id}&to_dog_id=${to_dog_id}&to_dog_name=${to_dog_name}`,
    success(res) {
      console.log("Navigation success:", res);
    },
    fail(err) {
      console.error("Navigation failed:", err);
    }
  });
}

function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  });
}

module.exports = {
  sendPostRequest: sendPostRequest
};