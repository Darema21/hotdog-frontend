let app = getApp();
Component({
  data: {
    "list": [
      {
        "pagePath": "/pages/home/index", 
        "iconPath": "/pages/images/tabbar-icons/home_default.png",
        "selectedIconPath": "/pages/images/tabbar-icons/home_filled.png"
      },
      {
        "pagePath": "/pages/dogs/index", 
        "iconPath": "/pages/images/tabbar-icons/dog.png",
        "selectedIconPath": "/pages/images/tabbar-icons/dog_filled.png"
      },
      {
        "pagePath": "/pages/matches/index",
        "iconPath": "/pages/images/tabbar-icons/messages.png",
        "selectedIconPath": "/pages/images/tabbar-icons/messages_filled.png"
      },
      {
        "pagePath": "/pages/owners/profile",
        "iconPath": "/pages/images/tabbar-icons/profile.png",
        "selectedIconPath": "/pages/images/tabbar-icons/profile_filled.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})