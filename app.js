App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    const app = this;
    wx.login({
      success: res => {
        // Make the request to login
        wx.request({
          url: `${app.globalData.baseUrl}login`,
          method: 'POST',
          data: { code: res.code }, // pass code in request body
          success(loginRes) {
            console.log(loginRes);
            app.globalData.owner = loginRes.data.owner;
            app.globalData.header = loginRes.data.headers;
            console.log(123, loginRes.data.headers); // { data: { headers: { "X-USER-TOKEN": <User Token> }, user: <User Object> }, ... }
            console.log("owner", loginRes.data.owner);
  
            // Fetch dogs' information after successful login
            wx.request({
              url: `${app.globalData.baseUrl}dogs`,
              method: 'GET',
              header: app.globalData.header,
              success(res) {
                const dogs = res.data.dogs;
                console.log("App data", res)
                const current_owner_dog = res.data.current_owner_dog;
                app.globalData.currentOwnerDog = current_owner_dog;
                 
                const current_dog_img = res.data.current_owner_dog_image
                app.globalData.currentOwnerDogImage = current_dog_img
                // Transform the dogs' information and store it in globalData
                app.globalData.dogs = dogs.map((dog) => {
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
                console.log("Dogs stored in globalData:", app.globalData.dogs);
              },
              fail(err) {
                console.error("Error fetching dogs:", err);
              }
            });
          },
          fail(loginErr) {
            console.error({ loginErr });
          }
        });
      }
    });
  
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  
    this.loadCustomFont();
  },
  
    
  loadCustomFont: function () {
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-bold.ttf")',
      desc: {
        style: "normal",
        weight: "bold"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-regular.ttf")',
      desc: {
        style: "normal",
        weight: "normal"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });

    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-light.ttf")',
      desc: {
        style: "normal",
        weight: "light"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  },
  
  globalData: {
    userInfo: null,
    owner: null,
    header: {},
    baseUrl: 'http://localhost:3000/api/v1/',
    dogs: [],
    currentOwnerDog: null,
    currentOwnerDogImage: null
  }
})