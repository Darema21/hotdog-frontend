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
    // Retrieve the dogs from globalData and set them in the pushList
    this.setData({
      pushList: app.globalData.dogs,
    });
  },

  handleSwipeOut(args) {
    console.log('Handle swipe out', args);
    const page = this;
    const direction = args.detail.direction;
    const dog_id = args.detail.item.id;
    const to_owner_id = args.detail.item.ownerId;
    const from_owner_id = app.globalData.owner.id;

    sendPostRequest(page, direction, dog_id, to_owner_id, from_owner_id);
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

function sendPostRequest(page, direction, dog_id, to_owner_id, from_owner_id) {
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
      handleSuccessResponse(res, from_owner_id, to_owner_id);
    },
    fail(res) {
      handleFailureResponse(res);
    }
  });
}

function handleSuccessResponse(res, from_owner_id, to_owner_id) {
  console.log("POST request successful");
  console.log("Response:", res);

  if (res.statusCode === 200 || res.statusCode === 201) {
    const match = res.data;
    console.log("Match status:", match.status);
    if (match.status === "like") {
      console.log("Finding dogs for mutual match:", from_owner_id, to_owner_id);
      const from_owner_dog = app.globalData.currentOwnerDog;
      const to_owner_dog = findDogByOwnerId(to_owner_id);

      if (from_owner_dog && to_owner_dog) {
        console.log("Navigating to mutual page...");
        navigateToMutualPage(from_owner_dog, to_owner_dog);
      } else {
        console.log("Dogs not found for the specified owners");
      }
    } else {
      showToast('Match created successfully');
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

function navigateToMutualPage(page, from_owner_dog, to_owner_dog) {
  wx.navigateTo({
    url: `/pages/matches/mutual?from_owner_id=${from_owner_dog.ownerId}&to_owner_id=${to_owner_dog.ownerId}&from_owner_dog_id=${from_owner_dog.id}&to_owner_dog_id=${to_owner_dog.id}`,
    success(res) {
      console.log("Navigation success:", res);
      // Update the pushList after successful match
      const newList = page.data.pushList.filter((item) => item.ownerId !== to_owner_dog.ownerId && item.ownerId !== from_owner_dog.ownerId);
      page.setData({
        pushList: newList
      });
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

function findDogByOwnerId(owner_id) {
  const dog = app.globalData.dogs.find((dog) => dog.ownerId === owner_id);
  console.log(owner_id);
  console.log("Dog:", dog);
  return dog;
}

module.exports = {
  sendPostRequest: sendPostRequest
};
