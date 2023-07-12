
App({
  onLaunch() {
    const app = this
    wx.login({
      success: res => {
        console.log(res)
        wx.request ({
          //url: 'http://localhost:3000/api/v1/login',
          url: `${app.globalData.baseUrl}/login`,
          method: 'POST',
          data: { code: res.code }, // pass code in request body
          success(loginRes) {
            app.globalData.owner = loginRes.data.owner
            app.globalData.header = loginRes.data.headers
            console.log(123,loginRes.data.headers) // { data: { headers: { "X-USER-TOKEN": <User Token> }, user: <User Object> }, ... }
          },
          fail(loginErr){
            console.error({loginErr})
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    user: null,
    header: {},
    baseUrl: 'http://localhost:3000/api/v1/'
  }
})