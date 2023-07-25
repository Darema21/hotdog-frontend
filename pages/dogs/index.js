const app = getApp()
const utils = require('../../utils/util')

Page({
  data: {
    pushList: [],
    currentCard: {}
  },
  bindViewTap: function () {

  },
  onLoad: function () {
    setInterval(() => {
      this.setData({
        pushList: []
      })
    }, 5000)
  },

  goToShow: function (e) {
    const id = e.currentTarget.dataset.dogid
    utils.goToShow(id)
  },

  onShow() {
  },

  onLoad(options) {
    const page = this

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }

    console.log(app.globalData.owner)
    wx.request({
      url: `${app.globalData.baseUrl}dogs`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        const dogs = res.data;
        console.log("dogs:", dogs)
        const updatedDogs = dogs.map((dog) => {
          return {
            id: dog.id,
            name: dog.name,
            gender: dog.gender,
            imageUrl: dog.image_urls ? dog.image_urls[0] : '',
            neutered: dog.neutered,
            vaccinated: dog.vaccinated,
            ownerId: dog.owner_info.id,
            ownerImg: dog.owner_info.image_url
          };
        });

        page.setData({
          pushList: updatedDogs,
        }, () => {
          console.log("Push List", page.data.pushList)
        });

        wx.hideToast();
      },
    });
  },

  handleSwipeOut(args) {
    console.log("Handle swipe out", args)
    const page = this;
    const direction = args.detail.direction;
    const dog_id = args.detail.item.id;
    const to_owner_id = args.detail.item.ownerId;
    const from_owner_id = 11;

    sendPostRequest(page, direction, dog_id, to_owner_id, from_owner_id);
  },

  getUserInfo: function (e) {

  },

  addMatch: function (options) {

  },
  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {}
})

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
      handleSuccessResponse(page, res, from_owner_id, to_owner_id);
    },
    fail(res) {
      handleFailureResponse(res);
    }
  });
}

function handleSuccessResponse(page, res, from_owner_id, to_owner_id) {
  console.log("POST request successful");
  console.log("Response:", res);

  if (res.statusCode === 200 || res.statusCode === 201 ) {
    const match = res.data;
    if (match.status === "like") {
      navigateToMatchPage(page, from_owner_id, to_owner_id);
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

function navigateToMatchPage(page, from_owner_id, to_owner_id) {
  wx.navigateTo({
    url: `/pages/matches/mutual?from_owner_id=${from_owner_id}&to_owner_id=${to_owner_id}`,
    success(res) {
      console.log(res)
      // Update the pushList after successful match
      const newList = page.data.pushList.filter((item) => item.ownerId !== to_owner_id);
      page.setData({
        pushList: newList
      });
    },
    fail(err) {
      console.error(err)
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
