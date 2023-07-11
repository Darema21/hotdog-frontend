App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);

        // 登录
        const app = this; // Move this line outside the object literal
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res);
                wx.request({
                    url: `${app.globalData.baseUrl}login`, // Modify the URL according to your API endpoint
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: loginRes => {
                        app.globalData.user = loginRes.data.user;
                        app.globalData.header = loginRes.data.headers;
                        console.log(loginRes.data.headers);
                        // Perform further operations with the obtained user data
                    },
                    fail: loginErr => {
                        console.error(loginErr);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        user: null,
        header: {},
        baseUrl: 'http://localhost:3000/api/v1/'
    }
});
