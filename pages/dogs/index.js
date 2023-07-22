const app = getApp()
const utils = require('../../utils/util')

Page({
  data: {
    pushList: [

    ],
    currentCard: {}
  },
  //事件处理函数
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

    /**
     * Lifecycle function--Called when page show
     */
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
        selected: 0
      });
    }

    wx.request({
      url: `${app.globalData.baseUrl}dogs`,
      method: 'GET',
      header: getApp().globalData.header,
      success(res) {
        const dogs = res.data;
        console.log("dogs:", dogs)
        // Update local data
        const updatedDogs = dogs.map((dog) => {
          return {
            id: dog.id,
            name: dog.name,
            gender: dog.gender,
            imageUrl: dog.image_urls ? dog.image_urls[0] : '', // Get the first image URL
            neutered: dog.neutered,
            vaccinated: dog.vaccinated,
            ownerId: dog.owner_id
          };
        });

        page.setData({
          pushList: updatedDogs, // Set the updated dogs array to pushList
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
    const from_owner_id = 2;
    console.log("Direction:", direction);
    console.log("Dog Id:", dog_id);
    console.log("Type of direction:", typeof direction);

    console.log("Before sending requests");

    // Send the POST request
    wx.request({
      url: `${app.globalData.baseUrl}owners/${from_owner_id}/matches`,
      method: 'POST',
      data: {
        match: {
          from_owner_id: from_owner_id,
          to_owner_id: to_owner_id,
          from_owner_decision: direction
        }
      },
      success(res) {
        console.log("POST request successful");
        console.log("Response:", res);

        // Handle the success response
        if (res.statusCode === 200 || res.statusCode === 201 ) {
          const match = res.data;
          if (match.status === "like") {
            console.log("Mutual match found:", match);
            wx.navigateTo({
              //Need to add dogs somehow
              url: `pages/matches/mutual?from_owner_id=${from_owner_id}&to_owner_id=${to_owner_id}`,
            });
          } else {
            console.log("Match created successfully");
            wx.showToast({
              title: 'Match created successfully',
              icon: 'success',
              duration: 2000
            });
          }
        } else {
          console.log("Failed to create match");
          wx.showToast({
            title: 'Failed to create match',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail(res) {
        console.log("POST request failed");
        console.log("Error:", res);

        // Handle the failure response
        wx.showToast({
          title: 'Failed to create match',
          icon: 'none',
          duration: 2000
        });
      }
    });

    
    // Send the GET request
    // wx.request({
    //   url: `${app.globalData.baseUrl}owners/${from_owner_id}/matches`,
    //   method: 'GET',
    //   success(res) {
    //     console.log("GET request successful");
    //     console.log("Response:", res);
    
    //     // Handle the success response
    //     // Check if there is an existing match
    //   },
    //   fail(res) {
    //     console.log("GET request failed");
    //     console.log("Error:", res);
    
    //     // Handle the failure response
    //   }
    // });
    
    console.log("After sending requests");
    
  },

  getUserInfo: function (e) {

  },

  addMatch: function (options) {

  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

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