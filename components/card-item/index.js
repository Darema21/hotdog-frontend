const app = getApp();
const utils = require('../../utils/util');

Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {

    handleTap(e) {
      console.log(e);
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: `/pages/dogs/show?id=${e.currentTarget.dataset.id}`,
      });
    },


    handleSwipeOut(direction) {
      const dogId = this.properties.itemData.id;
      const toOwnerId = this.properties.itemData.ownerId;
      const fromOwnerId = app.globalData.owner.id;
      
      sendPostRequest(direction, dogId, toOwnerId, fromOwnerId);
    },

    onNoButtonTap(e) {
      console.log("No button tapped");
      this.handleSwipeOut("left");
    },

    onYesButtonTap(e) {
      console.log("Yes button tapped");
      this.handleSwipeOut("right");
    }
  }
})