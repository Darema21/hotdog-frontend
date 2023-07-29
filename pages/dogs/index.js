const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {
    pushList: []
  },

  bindViewTap: function () {},

  onLoad: function () {

    setInterval(() => {
      this.setData({
        pushList: [],
      });
    }, 5000);
  },

  goToShow: function (e) {
    const id = e.currentTarget.dataset.dogid;
    utils.goToShow(id);
  },

  onShow() {

    let page = this;
    console.log("index.js", app.globalData.header)
    
      // Get api data
    wx.request({
      url: `${app.globalData.baseUrl}dogs`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        console.log(res)
        const dogs = res.data.dogs;
        console.log(dogs)
  
        // Update local data
        page.setData({
          dogs: dogs
        });
    
        wx.hideToast();
      },
      fail(e) {
        console.log(e)
      }
    });
    },
    
  onLoad(options) {
    const page = this

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
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
    console.log("To Owner id", to_owner_id)
    sendPostRequest(direction, to_owner_id, from_owner_id);
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
    const from_dog_img = match.from_dog.image_url;
    const to_dog_id = match.to_dog.id;
    const to_dog_img = match.to_dog.image_url;
    const to_dog_name = match.to_dog.name;

    console.log("Match status:", match.status);
    if (match.status === "like") {
      navigateToMutualPage(match_id, from_dog_img, to_dog_id, to_dog_img, to_dog_name);
    } else {
      console.log("Dogs not found for the specified owners");
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

function navigateToMutualPage(match_id, from_dog_img, to_dog_id, to_dog_img, to_dog_name) {
  console.log("Navigating to mutual page: From dog", app.globalData.currentOwnerDog.id, "To dog:", to_dog_id);

  wx.navigateTo({
    url: `/pages/matches/mutual?match_id=${match_id}&from_dog_img=${from_dog_img}&to_dog_id=${to_dog_id}&to_dog_img=${to_dog_img}&to_dog_name=${to_dog_name}`,
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
