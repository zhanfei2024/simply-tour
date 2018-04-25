// Core
const debug = require('debug')('APP:ROUTES');

// Library
const acl = require('./middlewares/AclUserMiddleware');
const adminAcl = require('./middlewares/AclAdminMiddleware');
const rateLimitMethod = require('./methods/RateLimitMethod');


// Config
const commonConfig = require('./config/common');

// Middleware define
const adminJwtAuthMiddleware = require('./middlewares/GetAdminMiddleware');
const passportMiddleware = require('./middlewares/PassportMiddleware');

// Paths
const apiPublicPath = `${commonConfig.apiPath}/public`;
const apiAdminPath = `${commonConfig.apiPath}/admin`;
const apiCustomerPath = `${commonConfig.apiPath}/customer`;
const apiMerchantPath = `${commonConfig.apiPath}/merchant`;

// Routes
// 文件系统文件
const fromS3GetFile = require('./routes/ta/fromS3GetFile');

// 公开文件
const publicSlideShow = require('./routes/ta/slideShow');
const publicLocation = require('./routes/ta/location');
const publicTravel = require('./routes/ta/travelAgency');
const publicRoute = require('./routes/ta/route');

// customer文件
const customerAuth = require('./routes/customer/auth');
const customerSelf = require('./routes/customer/customer');
const customerBookmark = require('./routes/customer/bookmark');
const customerMessage = require('./routes/customer/userMessage');


// merchant 文件
const merchantAuth = require('./routes/merchant/auth');
const merchantSelf = require('./routes/merchant/merchant');
const merchantSlideShow = require('./routes/merchant/slideShow');
const merchantTravel = require('./routes/merchant/travel');
const merchantRoute = require('./routes/merchant/route');
const merchantRouteDetails = require('./routes/ta/routeDetails');
const merchantRouteDetailsItem = require('./routes/ta/routeDetailsItem');


// 后台文件
const adminAuth = require('./routes/admin/auth');
const adminSelf = require('./routes/admin/admin');
const adminLocaiton = require('./routes/ta/location');
const adminFeedback = require('./routes/ta/feedback');
const adminMessage = require('./routes/ta/userMessage');
const adminOrder = require('./routes/ta/order');
const adminSetting = require('./routes/setting');
const adminSlideShow = require('./routes/ta/slideShow');
const adminLocation = require('./routes/ta/location');
const adminTravel = require('./routes/ta/travelAgency');
const adminRoute = require('./routes/ta/route');


/**
 * Method
 * @module Method
 */
function bootstrapRoute(app) {


  /***********************************************
   *
   *
   * 公共路由
   *
   *
   ***********************************************/

  // 旅行社列表
  app.get(`${apiPublicPath}/travels`, publicTravel.index);
  app.get(`${apiPublicPath}/travel/:taId([0-9]+)`, publicTravel.show);

  // 路线列表
  app.get(`${apiPublicPath}/routes`, publicRoute.index);
  app.get(`${apiPublicPath}/route/:routeId([0-9]+)`, publicRoute.show);

  // 轮播图
  app.get(`${apiPublicPath}/slide_show`, publicSlideShow.index);

  // location 树列表
  app.get(`${apiPublicPath}/index_tree`, publicLocation.indexTree);

  /** *********************************************
   *
   *
   * 顾客路由
   *
   *
   ***********************************************/
  // 用户认证
  app.post(`${apiCustomerPath}/auth/register`, customerAuth.register);
  app.post(`${apiCustomerPath}/auth/get_code`, customerAuth.getCode);
  app.post(`${apiCustomerPath}/auth/sign_in`, rateLimitMethod.publicLoginLimitMiddleware, customerAuth.login);
  app.post(`${apiCustomerPath}/auth/refresh`, passportMiddleware.passportAuthenticateCustomerJWT('customer-jwt-allow-expired'), customerAuth.refreshToken);
  app.post(`${apiCustomerPath}/auth/reset_password`, customerAuth.resetPassword);
  app.post(`${apiCustomerPath}/auth/check_customer_is_exists`, customerAuth.checkCustomerIsExists);
  app.post(`${apiMerchantPath}/auth/check_code`, customerAuth.checkCode);


  // 用户token认证
  app.use(`${apiCustomerPath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateCustomerJWT());

  // 顾客个人资料
  app.post(`${apiCustomerPath}/upload/avatar`, customerSelf.uploadProfilePhoto); // 上传头像
  app.get(`${apiCustomerPath}/self`, customerSelf.show);
  app.put(`${apiCustomerPath}/self`, customerSelf.update);

  // 账号设置，换帮账号
  // 1. 使用checkCode 路由，验证旧手机号，下一步通过后，执行下面换绑路由。
  app.post(`${apiCustomerPath}/auth/change_binding_phone`, customerAuth.changeBindingPhone);

  // 用户收藏
  app.get(`${apiCustomerPath}/bookmarks`, customerBookmark.index);
  app.get(`${apiCustomerPath}/bookmark/:bookmarkId([0-9]+)`, customerBookmark.show);
  app.post(`${apiCustomerPath}/bookmark`, customerBookmark.create);
  app.delete(`${apiCustomerPath}/bookmark/:bookmarkId([0-9]+)`, customerBookmark.destroy);

  // 用户我的消息
  app.get(`${apiCustomerPath}/messages`, customerMessage.index);
  app.get(`${apiCustomerPath}/message/:messageId([0-9]+)`, customerMessage.show);
  app.put(`${apiCustomerPath}/message/:messageId([0-9]+)`, customerMessage.update);
  app.delete(`${apiCustomerPath}/message/:messageId([0-9]+)`, customerMessage.destroy);

  /** *********************************************
   *
   *
   * 商家路由
   *
   *
   ***********************************************/

  // 商家登入认证
  app.post(`${apiMerchantPath}/auth/register`, merchantAuth.register);
  app.post(`${apiMerchantPath}/auth/get_code`, merchantAuth.getCode);
  app.post(`${apiMerchantPath}/auth/sign_in`, rateLimitMethod.publicLoginLimitMiddleware, merchantAuth.login);
  app.post(`${apiMerchantPath}/auth/refresh`, passportMiddleware.passportAuthenticateMerchantJWT('merchant-jwt-allow-expired'), merchantAuth.refreshToken);
  app.post(`${apiMerchantPath}/auth/reset_password`, merchantAuth.resetPassword);
  app.post(`${apiMerchantPath}/auth/check_merchant_is_exists`, merchantAuth.checkMerchantIsExists);
  app.post(`${apiMerchantPath}/auth/check_code`, merchantAuth.checkCode);


  // 用户token认证
  app.use(`${apiMerchantPath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateMerchantJWT());

  // 商家资料
  app.post(`${apiMerchantPath}/upload/avatar`, merchantSelf.uploadProfilePhoto); // 上传头像
  app.get(`${apiMerchantPath}/self`, merchantSelf.show);
  app.put(`${apiMerchantPath}/self`, merchantSelf.update);

  // 账号设置，换帮账号
  // 1. 使用checkCode 路由，验证旧手机号，下一步通过后，执行下面换绑路由。
  app.post(`${apiMerchantPath}/auth/change_binding_phone`, merchantAuth.changeBindingPhone);

  // 旅行社管理
  app.get(`${apiMerchantPath}/travel/self`, merchantTravel.show);
  app.post(`${apiMerchantPath}/travel`, merchantTravel.create);
  app.put(`${apiMerchantPath}/travel/self`, merchantTravel.update);

  // 发布旅游路线
  app.get(`${apiMerchantPath}/routes`, merchantRoute.index);
  app.get(`${apiMerchantPath}/route/:routeId([0-9]+)`, merchantRoute.show);
  app.post(`${apiMerchantPath}/route`, merchantRoute.create);
  app.put(`${apiMerchantPath}/route/:routeId([0-9]+)`, merchantRoute.update);
  app.delete(`${apiMerchantPath}/route/:routeId([0-9]+)`, merchantRoute.destroy);

  // 发布旅游路线详情
  app.get(`${apiMerchantPath}/route/details`, merchantRouteDetails.index);
  app.get(`${apiMerchantPath}/route/details/:detailsId([0-9]+)`, merchantRouteDetails.show);
  app.post(`${apiMerchantPath}/route/details`, merchantRouteDetails.create);
  app.put(`${apiMerchantPath}/route/details/:detailsId([0-9]+)`, merchantRouteDetails.update);
  app.delete(`${apiMerchantPath}/route/details/:detailsId([0-9]+)`, merchantRouteDetails.destroy);

  // 发布旅游路线详情ITEM
  app.get(`${apiMerchantPath}/route/details/item`, merchantRouteDetailsItem.index);
  app.get(`${apiMerchantPath}/route/details/item/:itemId([0-9]+)`, merchantRouteDetailsItem.show);
  app.post(`${apiMerchantPath}/route/details/item`, merchantRouteDetailsItem.create);
  app.put(`${apiMerchantPath}/route/details/item/:itemId([0-9]+)`, merchantRouteDetailsItem.update);
  app.delete(`${apiMerchantPath}/route/details/item/:itemId([0-9]+)`, merchantRouteDetailsItem.destroy);


  // 轮播图管理 设置
  app.get(`${apiMerchantPath}/slide_show`, merchantSlideShow.index);
  app.get(`${apiMerchantPath}/slide_show/:slideShowId([0-9]+)`, merchantSlideShow.show);
  app.post(`${apiMerchantPath}/slide_show`, merchantSlideShow.create);
  app.put(`${apiMerchantPath}/slide_show/:slideShowId([0-9]+)`, merchantSlideShow.update);
  app.delete(`${apiMerchantPath}/slide_show/:slideShowId([0-9]+)`, merchantSlideShow.destroy);

  /** *********************************************
   *
   *
   * 后台管理员路由
   *
   *
   ***********************************************/

  // 后台管理员认证
  // app.post(`${apiAdminPath}/auth/register`, adminAuthr.register);
  app.post(`${apiAdminPath}/auth/login`, rateLimitMethod.publicLoginLimitMiddleware, adminAuth.login);
  app.post(`${apiAdminPath}/auth/refresh`, passportMiddleware.passportAuthenticateAdminJWT('admin-jwt-allow-expired'), adminAuth.refreshToken);
  app.post(`${apiAdminPath}/auth/verify_email`, adminAuth.verifyEmail);
  app.post(`${apiAdminPath}/auth/forget_password`, adminAuth.forgetPassword);
  app.post(`${apiAdminPath}/auth/reset_password`, adminAuth.resetPassword);
  app.post(`${apiAdminPath}/auth/logout`, passportMiddleware.passportAuthenticateAdminJWT('admin-jwt-allow-expired'), adminAuth.logout);

  // 后台管理员token认证
  app.use(`${apiAdminPath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateAdminJWT(), adminJwtAuthMiddleware);

  // Admin 管理
  app.get(`${apiAdminPath}/admins`, adminSelf.index);
  app.get(`${apiAdminPath}/admins/self`, adminSelf.self);
  app.get(`${apiAdminPath}/admins/:adminId([0-9]+)`, adminSelf.show);
  app.post(`${apiAdminPath}/admins`, adminSelf.create);
  app.put(`${apiAdminPath}/admins/:adminId([0-9]+)`, adminSelf.update);
  app.delete(`${apiAdminPath}/admins/:adminId([0-9]+)`, adminSelf.destroy);
  app.post(`${apiAdminPath}/auth/change_password`, adminAuth.changePassword);

  // 设置平台信息
  app.get(`${apiAdminPath}/setting`, adminSetting.show);
  app.put(`${apiAdminPath}/setting`, adminSetting.update);

  // 轮播图管理
  app.get(`${apiAdminPath}/slide_show`, adminSlideShow.index);
  app.get(`${apiAdminPath}/slide_show/:slideShowId([0-9]+)`, adminSlideShow.show);
  app.post(`${apiAdminPath}/slide_show`, adminSlideShow.create);
  app.put(`${apiAdminPath}/slide_show/:slideShowId([0-9]+)`, adminSlideShow.update);
  app.delete(`${apiAdminPath}/slide_show/:slideShowId([0-9]+)`, adminSlideShow.destroy);

  // 旅行社管理
  app.get(`${apiAdminPath}/travels`, adminTravel.index);
  app.get(`${apiAdminPath}/travel/:taId([0-9]+)`, adminTravel.show);
  app.post(`${apiAdminPath}/travel`, adminTravel.create);
  app.put(`${apiAdminPath}/travel/:taId([0-9]+)`, adminTravel.update);
  app.put(`${apiAdminPath}/travel/:taId([0-9]+)/approved`, adminTravel.approvedOrUpdateStatus);
  app.delete(`${apiAdminPath}/travel/:taId([0-9]+)`, adminTravel.destroy);

  // 路线管理
  app.get(`${apiAdminPath}/routes`, adminRoute.index);
  app.get(`${apiAdminPath}/route/:routeId([0-9]+)`, adminRoute.show);
  app.put(`${apiAdminPath}/route/:routeId([0-9]+)`, adminRoute.approvedOrUpdateStatus);
  app.delete(`${apiAdminPath}/route/:routeId([0-9]+)`, adminRoute.destroy);

  // 意见反馈
  app.get(`${apiAdminPath}/feedback`, adminFeedback.index);
  app.get(`${apiAdminPath}/feedback/:feedbackId([0-9]+)`, adminFeedback.show);
  app.delete(`${apiAdminPath}/feedback/:feedbackId([0-9]+)`, adminFeedback.destroy);

  // 用户消息
  app.get(`${apiAdminPath}/messages`, adminMessage.index);
  app.get(`${apiAdminPath}/message/:message([0-9]+)`, adminMessage.show);
  app.post(`${apiAdminPath}/message`, adminMessage.create);
  app.put(`${apiAdminPath}/message/:message([0-9]+)`, adminMessage.update);
  app.delete(`${apiAdminPath}/message/:message([0-9]+)`, adminMessage.destroy);

  // Location管理
  app.get(`${apiAdminPath}/locations`, adminLocation.index);
  app.post(`${apiAdminPath}/location`, adminLocation.create);
  app.put(`${apiAdminPath}/location/:locationId([0-9]+)`, adminLocation.update);
  app.delete(`${apiAdminPath}/location/:locationId([0-9]+)`, adminLocation.destroy);

  // 订单详情
  app.get(`${apiAdminPath}/orders`, adminOrder.index);
  app.get(`${apiAdminPath}/order/:orderId`, adminOrder.show);
  app.delete(`${apiAdminPath}/order/:orderId`, adminOrder.destroy);

}

module.exports = bootstrapRoute;
