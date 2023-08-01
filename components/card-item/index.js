const dog = require('../../pages/dogs/index'); 

Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    handleSwipeOut(e, direction) {
      const dogId = this.properties.itemData.id; 
      const toOwnerId = this.properties.itemData.ownerId; 
      const fromOwnerId = app.globalData.owner.id; 

      dog.sendPostRequest(this, direction, dogId, toOwnerId, fromOwnerId);
    },

    handleTap(e) {
      console.log(e);
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: `/pages/dogs/show?id=${e.currentTarget.dataset.id}`,
      });
    },

    onButtonTap(e) {
      const direction = e.currentTarget.dataset.direction;
      if (direction === "left") {
        console.log("No button tapped");
      } else if (direction === "right") {
        console.log("Yes button tapped");
        this.handleSwipeOut(e, direction);
      }
    }
  }
})