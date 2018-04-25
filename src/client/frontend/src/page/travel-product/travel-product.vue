<template>
  <div class="travel-home2">
    <div class="travel-home-bg">
      <img src="../../assets/images/travel_home_bg.png"  class="img-responsive"/>
    </div>
    <div class="">
      <div class="container">
        <div class="travel-home-profile-content">
          <img v-lazy="" class="img-responsive travel-logo">
          <div class="travel-home-profile">
            <h2>四川省中国青年旅行社少城分社</h2>
            <p class="travel-reputation">
              <span class="reputation">实名认证</span>
              <span class="reputation">游客保障</span>
              <span class="collection">收藏商家</span>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="travel-home-menu">
          <Row>
            <i-col span="12" offset="6">
              <Menu mode="horizontal" theme="light" active-name="1">
                <MenuItem name="1" class="hvr-underline-from-center">
                  <router-link to="/travel/1/home">首页</router-link>
                </MenuItem>
                <MenuItem name="2" class="hvr-underline-from-center">
                  <router-link to="/travel/1/domestic">国内游</router-link>
                </MenuItem>
                <MenuItem name="3" class="hvr-underline-from-center">
                  <router-link to="/travel/1/abroad">境外游</router-link>
                </MenuItem>
                <MenuItem name="4" class="hvr-underline-from-center">
                  <router-link to="/travel/1/introduction">企业简介</router-link>
                </MenuItem>
                <MenuItem name="5" class="hvr-underline-from-center">
                  <router-link to="/travel/1/contact">联系我们</router-link>
                </MenuItem>
              </Menu>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <div class="container">
      <!--商品购买-->
      <div class="product-breadcrumb">
        <Breadcrumb separator=">">
          <Breadcrumb-item href=">">首页</Breadcrumb-item>
          <Breadcrumb-item href="/components/breadcrumb">北京旅行社</Breadcrumb-item>
          <Breadcrumb-item>四川省中国青年旅行社少城分社</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <Row>
        <i-col span="24">
          <Row>
            <i-col span="12">
              <Row>
                <div class="product-detail-left">
                  <i-col span="24">
                    <img src="../../assets/images/product_1.jpg" style="width: 100%;height: 420px;"/>
                  </i-col>
                  <div class="product-img-item-content">
                    <div class="product-img-item product-img-item-active">
                      <img src="../../assets/images/product_1.jpg" class="img-responsive"/>
                    </div>
                    <div class="product-img-item">
                      <img src="../../assets/images/product_2.jpg" class="img-responsive"/>
                    </div>
                    <div class="product-img-item">
                      <img src="../../assets/images/product_3.jpg" class="img-responsive"/>
                    </div>
                    <div class="product-img-item">
                      <img src="./../../assets/images/product_4.jpg" class="img-responsive"/>
                    </div>
                    <div class="product-img-item">
                      <img src="../../assets/images/product_5.jpg" class="img-responsive"/>
                    </div>
                  </div>
                </div>
              </Row>
            </i-col>
            <i-col span="12">
              <div class="product-detail-right">
                <h3 class="product-title"> 深圳往返泰国曼谷、芭堤雅、沙美岛经典6天5晚跟团游深圳往返泰国曼谷</h3>
                <p class="objective">
                  <b>
                    <Icon class="icon" type="ios-flag-outline" size="22"></Icon>
                  </b> 出发城市： 深圳
                </p>
                <p class="objective">
                  <b>
                    <Icon class="icon" type="ios-time-outline" size="18"></Icon>
                  </b>发团日期： 天天发团，请至少提前4天报名
                </p>
                <p class="product-price">
                  <span class="money">¥249起</span>
                  <span class="price">儿童价格：198起</span>
                  <span class="price">成人价格：298起</span>
                </p>
                <div class="product-specifications">
                  <p class="product-type">
                    <span class="name"> 产品类型：</span>
                    <span v-for="item in productType">
                                        <Button type="ghost" @click="selectType(item)">{{item.name}}</Button>
                    </span>
                  </p>
                  <div class="product-type">
                    <Row>
                      <i-col span="24">
                        <span class="name">出行日期:</span>
                        <DatePicker v-model="product.startDate" type="date"
                                    placeholder="Select date"
                                    class="product-select-date"
                                    style="width: 200px"></DatePicker>
                      </i-col>
                    </Row>
                  </div>
                  <div class="product-type">
                    <span class="name">出游人数：</span>
                    <span class="adultsNumber">
                      <span  @click="selectNumber('delete','adults')"><Icon type="ios-minus-outline" size="20"></Icon></span>
                       <span class="text">成人/</span>
                       <InputNumber :max="10" :min="1" v-model="product.adultsNumber"></InputNumber>
                      <span @click="selectNumber('add','adults')"><Icon type="ios-plus-outline" size="20"></Icon></span>
                    </span>
                    <span class="adultsNumber">
                      <span  @click="selectNumber('delete','child')"><Icon type="ios-minus-outline" size="20"></Icon></span>
                      <span class="text">儿童/</span>
                      <InputNumber :max="10" :min="1" v-model="product.childNumber"></InputNumber>
                      <span  @click="selectNumber('add','child')"><Icon type="ios-plus-outline" size="20"></Icon></span>
                    </span>
                  </div>
                  <div class="product-btn-content">
                    <Button type="primary" @click="go()">立即預定</Button>
                    <span class="form-error-text">{{errorText}}</span>
                  </div>
                </div>
              </div>
            </i-col>
          </Row>
        </i-col>
      </Row>
      <!--商品详情-->
      <Row :gutter="10">
        <div class="product-detail-container">
          <i-col span="20">
            <div class="product-detail-content-left">
              <Tabs value="name1">
                <TabPane label="线路特色" name="name1">
                  <div class="characteristic">
                    1.因美娜多马路状况，旅游车一般以35座或以下车型为主，建议每辆车收客人数不超过30人，地接将根据团队人数安排，保证每人1正座。

                    • 2.美娜多酒店房型大多以大床房为主，报名时请注明所需房型，尽量安排，但不保证；如团队遇单男单女或自然单间（包括领队在内）均以加床或补单间差处理；12岁以下小童占床大小同价。

                    • 3.行李托运:每人手提7KG以内，托运行李为15KG，托运行李不能超过以下尺寸：长119 cm * 宽119cm *高81cm。

                    •
                    4.在行程中，当地有不少不法分子利用各种手段（例如用低价吸引旅客出海或者参加海上活动，完成出海或者海上活动后向旅客收取更高的费用），导致客人蒙受金钱损失。在此特别提醒客人，在出海时，一定要跟随导游出行，不要轻信不明人士的推介。若在旅途中出现上述情况引致客人上当受骗或带来的不利后果，不属于旅行社承担的责任范围内。

                    • 5.印尼海关最新规定：为防止不法商贩走私运毒，印尼海关不允许游客携带毒品入境，违者将有可能被印尼政府处以死刑。敬请留意！另外，旅客可免税携带香烟一条，洋酒一瓶及少量的香水或礼品入境。

                    • 6.进入海洋保护区旅游浮潜玩水时,请不要踩踏珊瑚或将海中生物捞起或带走,以免违反海洋保护法遭受海警处罚。

                    • 7.强烈建议出行游客购买个人旅游意外保险。

                    • 8.在不减少景点的前提下，地接社可根据实际情况调整参观顺序。


                    • • 旅行产品具有较强的时效性价值，预订完成后如您需要退/改行程，需参照以下规则：

                    • 1、旅游者违约

                    • 旅游者在行程开始前30日以内提出解除合同的，扣除必要的费用之外需按以下标准支付违约金：

                    • 行程开始前 29 日至 15 日，支付旅游费用总额的 5%的违约金；

                    • 行程开始前 14 日至 7 日，支付旅游费用总额的 20%的违约金；

                    • 行程开始前 6 日至 4 日，支付旅游费用总额的 50%的违约金；

                    • 行程开始前 3 日至 1 日，支付旅游费用总额的 60%的违约金；

                    • 行程开始当日，支付旅游费用总额的 70%的违约金。

                    • 如按上述比例扣除的必要的费用低于实际发生的费用，旅游者按实际发生的费用支付，但最高额不应当超过旅游费用总额。

                    • 2、旅行社违约

                    • 旅行社在行程开始前 30 日以内提出解除合同的，或者旅游者在行程开始前 30
                    日以内收到旅行社不能成团通知，不同意转团、延期出行和改签线路解除合同的，旅行社向旅游者退还已收取的全部旅游费用（扣除签证／签注等费用），并按下列标准向旅游者支付违约金：

                    • 行程开始前30日至15日，支付旅游费用总额2%的违约金；

                    • 行程开始前 14 日至 7 日，支付旅游费用总额 5%的违约金；

                    • 行程开始前 6 日至 4 日，支付旅游费用总额 10%的违约金；

                    • 行程开始前 3 日至 1 日，支付旅游费用总额 15%的违约金；

                    • 行程开始当日，支付旅游费用总额 20%的违约金
                  </div>
                </TabPane>
                <TabPane label="参考行程" name="name2">
                  <Row>
                    <div class="reference">
                      <i-col span="3">
                        <div class="reference-left">
                           <div class="detail-journey-4-nav-box">
                             <Timeline>
                               <TimelineItem color="#ffffff">
                                 <Button class="active">第一天</Button>
                               </TimelineItem>
                               <TimelineItem color="#ffffff">
                                 <Button>第二天</Button>
                               </TimelineItem>
                               <TimelineItem color="#ffffff">
                                 <Button>第三天</Button>
                               </TimelineItem>
                             </Timeline>
                           </div>
                        </div>
                      </i-col>
                      <i-col span="21">
                        <div class="reference-right">
                          <Timeline  >
                            <TimelineItem color="#5a3662">
                              <Icon type="flag" slot="dot" size="25"></Icon>
                              <p class="time-title">第1天 · 【帆船摩羯岛一日游】【赠送香蕉船】【浮潜】【海钓】【射飞镖】【出 海跟拍】</p>
                              <p class="content">
                                景点 · 大皇宫
                                大皇宫The Royal Palace位于曼谷市中心区，由一组布局错落的建筑群组成，汇集了绘画、雕刻和装怖艺术的精华。
                                曼谷王朝开国君主拉玛一世登基后，于1782年把首都从吞武里迁至湄南河东岸的曼谷，经历代不断扩建，终于建成规模宏大的大皇宫建筑群。
                                <img src="../../assets/images/product_1.jpg" class="img-responsive"/>

                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="android-map" slot="dot" size="16"></Icon>
                              <p class="content">
                                景点 · 大皇宫
                                大皇宫The Royal Palace位于曼谷市中心区，由一组布局错落的建筑群组成，汇集了绘画、雕刻和装怖艺术的精华。
                                曼谷王朝开国君主拉玛一世登基后，于1782年把首都从吞武里迁至湄南河东岸的曼谷，经历代不断扩建，终于建成规模宏大的大皇宫建筑群。
                                <img src="../../assets/images/product_2.jpg" class="img-responsive"/>
                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="coffee"  slot="dot" size="16"></Icon>
                              <div class="content">
                                 <p class="margin-bottom-20"><span class="content-head">早餐：</span>在酒店吃早餐</p>
                                 <p class="margin-bottom-20"><span class="content-head">早餐：</span>在酒店吃早餐</p>
                                 <p><span class="content-head">早餐：</span>在酒店吃早餐</p>
                              </div>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="ios-home" slot="dot" size="16"></Icon>
                              <p class="content">
                                <span class="content-head">住宿：</span>乐珊瑚世外桃源超越普吉旅馆(Le Coral Hideaway Beyond Phuket)高档型或爱凯拉普吉海滩俱乐部酒店(Th
                                e akyra Beach Club Phuket)豪华型或查龙奇迹湖景度假村及水疗中心(Chalong Miracle Lakeview Resort & Sp
                                a)豪华型或普吉岛麦考棕榈滩度假村（Maikhao Palm Beach Resort）或其他同级别酒店
                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="android-subway" slot="dot" size="16"></Icon>
                              <p class="content">
                                <span class="content-head">交通：</span>飛機、高鐵、地鐵、大巴、沙灘車。
                              </p>
                            </TimelineItem>
                          </Timeline>
                          <Timeline  >
                            <TimelineItem color="#5a3662">
                              <Icon type="flag" slot="dot" size="25"></Icon>
                              <p class="time-title">第2天 · 【帆船摩羯岛一日游】【赠送香蕉船】【浮潜】【海钓】【射飞镖】【出 海跟拍】</p>
                              <p class="content">
                                景点 · 大皇宫
                                大皇宫The Royal Palace位于曼谷市中心区，由一组布局错落的建筑群组成，汇集了绘画、雕刻和装怖艺术的精华。
                                曼谷王朝开国君主拉玛一世登基后，于1782年把首都从吞武里迁至湄南河东岸的曼谷，经历代不断扩建，终于建成规模宏大的大皇宫建筑群。
                                <img src="../../assets/images/product_1.jpg" class="img-responsive"/>

                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="android-map" slot="dot" size="16"></Icon>
                              <p class="content">
                                景点 · 大皇宫
                                大皇宫The Royal Palace位于曼谷市中心区，由一组布局错落的建筑群组成，汇集了绘画、雕刻和装怖艺术的精华。
                                曼谷王朝开国君主拉玛一世登基后，于1782年把首都从吞武里迁至湄南河东岸的曼谷，经历代不断扩建，终于建成规模宏大的大皇宫建筑群。
                                <img src="../../assets/images/product_2.jpg" class="img-responsive"/>
                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="coffee"  slot="dot" size="16"></Icon>
                              <div class="content">
                                <p class="margin-bottom-20"><span class="content-head">早餐：</span>在酒店吃早餐</p>
                                <p class="margin-bottom-20"><span class="content-head">早餐：</span>在酒店吃早餐</p>
                                <p><span class="content-head">早餐：</span>在酒店吃早餐</p>
                              </div>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="ios-home" slot="dot" size="16"></Icon>
                              <p class="content">
                                <span class="content-head">住宿：</span>乐珊瑚世外桃源超越普吉旅馆(Le Coral Hideaway Beyond Phuket)高档型或爱凯拉普吉海滩俱乐部酒店(Th
                                e akyra Beach Club Phuket)豪华型或查龙奇迹湖景度假村及水疗中心(Chalong Miracle Lakeview Resort & Sp
                                a)豪华型或普吉岛麦考棕榈滩度假村（Maikhao Palm Beach Resort）或其他同级别酒店
                              </p>
                            </TimelineItem>
                            <TimelineItem color="#5a3662">
                              <Icon type="android-subway" slot="dot" size="16"></Icon>
                              <p class="content">
                                <span class="content-head">交通：</span>飛機、高鐵、地鐵、大巴、沙灘車。
                              </p>
                            </TimelineItem>
                          </Timeline>

                        </div>
                      </i-col>
                    </div>

                  </Row>


                </TabPane>
                <TabPane label="费用说明" name="name3">
                  <div class="cost">
                    <div class="cost-contain">
                      <h4 class="title">费用包含</h4>
                      <ul>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                      </ul>
                    </div>
                    <div class="cost-no-contain">
                      <h4 class="title">费用不包含</h4>
                      <ul>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                        <li>• 广州往返机票、机场税</li>
                      </ul>
                    </div>
                  </div>
                </TabPane>
                <TabPane label="预订须知" name="name4">
                  <h4 class="notice-title">附加预订须知:</h4>
                  <p class="notice-text">
                    1.自助游产品均为即时计价，请以我方最终确认价格为准。2.若预订的机票是团队机票，存在航班调整的可能（包括航空公司、起飞时间的变化），故最终航班情况以出票时的具体信息为准。3.持大陆护照者，我司可代办签证，或需自备有效证件及目的地签证出行。4.为了不耽误您的行程，请您在国际航班起飞前120分钟到达机场办理登机以及出入境相关手续；如涉及海外国内段行程，请您在航班起飞前60分钟到达机场办理登机手续。5.请在出行前记录下出团通知书上的紧急联系人电话，以便应对突发情况。6..游泳、漂流、潜水等水上运动，均存在危险。参与前请根据自身条件，并充分参考当地海事部门及其它专业机构相关公告及建议后量力而行。7.如您持外籍护照前往中国境外，请确保持有再次进入中国大陆的有效签证。8.如自备签证，请提供有效护照及签证复印件，用于核对客人姓名和签证有效期。9.其他：12周岁以上儿童按照酒店规定必须占床，与成人同价。第三个成人入住，酒店收取加床费，但不提供加床。★本产品预订生效后，您出发前8日及8日以上(按出发日减去解除合同通知到达日的自然日之差计算，下同。若您所预订的产品在目的地停留的日期部分或全部处在元旦、春节、五一劳动节、国庆节、圣诞节或其它国家性或地方性重大节日期间，鉴于资源的特殊状况，如您取消此已签约订单，需向途牛支付该订单全部费用总额100％的业务损失费。)取消，收取费用总额的20%，出发前7日至3日取消，收取费用总额的80%，出发前2天以内取消，收取费用总额的100%。
                    温馨提示:1.天气：泰国属热带季风气候，炎热潮湿。热季为每年3到5月，雨季为6到9月，凉季从10月到翌年2月。全年平均气温28℃，年温差较小。2.衣着：全年可穿着简单夏季服装，喜欢游泳者可自备泳衣及拖鞋，晚间天气较凉，需准备长袖外套。3.时差：比北京时间慢一小时。4.语言：主要为泰语和英语，会基本英语即可。5.饮水：泰国习惯在饮料中加冰块，酒店自来水不能饮用。6.日用品：多数酒店不配备一次性的毛巾、洗发护发液、牙膏、牙刷及拖鞋，请自备。7.药物：请带一些常用的药物及紧急医疗用品，以备不时之需。8.电压：220伏特，双孔圆形与三孔扁型插座。9.货币：泰国货币单位为铢（Baht）,100元人民币约兑换泰铢450铢。1)国内换汇：建议去中国银行，但需提前去电预约。2)普吉岛换汇：①多数银行位于普吉镇和芭东海滩，在卡隆海滩设有分行。营业时间：周一至周五8:30-15:30。②银行都可换汇，在芭东、卡隆海滩和普吉镇也会有银行开的换汇亭。另外，一些高档宾馆里也可以换汇，但汇率通常比银行差。换汇亭开放时间：每天9:00-20:00。③在普吉岛POS机比较普遍，可以使用银联信用卡刷卡，农民银行（KasikornBank）、TMB军人银行和SCIB银行的ATM上可以用银联卡直接提取泰铢。需注意ATM机存款余额是显示按当时中国银联的外汇牌价计算出的泰铢金额，而不是人民币余额。汇率按照当天中国银行公布的泰铢卖出价计算。10.交通：交通不是很便利。建议晚上10点后到达普吉岛的客人提前预定接机服务。11.紧急联系电话：中国驻泰国大使馆电话0066-2-2457044；救护车254425、210935；旅游警察：1155。12.小费：一些地方可能需要支付小费，这不算是必须的，更多的是一种礼仪：1)泰式按摩：您可视按摩师的服务品质或专业水准而弹性给予，约50-100泰铢。2)与人妖拍照：每人每次约20-100泰铢。3)床头小费：一间房每天给20泰铢。4)旅馆员工服务良好，可酌予给小费，一般一次约20泰铢或1美元左右。
                    特殊人群限制
                    · 病患者、孕妇及行动不便者
                    1.为了确保旅游顺利出行，防止旅途中发生人身意外伤害事故，请旅游者在出行前做一次必要的身体检查，如存在下列情况，因服务能力所限无法接待：
                    （1）传染性疾病患者，如传染性肝炎、活动期肺结核、伤寒等传染病人；
                    （2）心血管疾病患者，如严重高血压、心功能不全、心肌缺氧、心肌梗塞等病人；
                    （3）脑血管疾病患者，如脑栓塞、脑出血、脑肿瘤等病人；
                    （4）呼吸系统疾病患者，如肺气肿、肺心病等病人；
                    （5）精神病患者，如癫痫及各种精神病人；
                    （6）严重贫血病患者，如血红蛋白量水平在50克/升以下的病人；
                    （7）大中型手术的恢复期病患者；
                    （8）孕妇及行动不便者。
                    · 老年人
                    1. 70周岁以上老年人预订出游，须与我司签订《健康证明》并有家属或朋友（因服务能力所限无法接待及限制接待的人除外）陪同方可出游。
                    2. 因服务能力所限，无法接待81周岁以上的旅游者报名出游，敬请谅解。
                    3. 因服务能力所限，不受理65周岁（含65周岁）以上老年人预订云南跟团产品。
                    4. 因服务能力所限，不受理70周岁（含70周岁）以上老年人预订四川跟团产品。
                    · 未成年人
                    1.未满18周岁的旅游者请由家属（因服务能力所限无法接待及限制接待的人除外）陪同参团。
                    2.因服务能力所限，无法接待18周岁以下旅游者单独报名出游，敬请谅解。
                    · 外籍友人
                    本产品网上报价适用持有大陆居民身份证的游客。如您持有其他国家或地区的护照，请在预订过程中注明。
                  </p>
                </TabPane>
                <TabPane label="游客点评" name="name5">

                  <div class="evaluate-list-head clearfix">
                    <Row type="flex" justify="space-around" class="code-row-bg">
                      <i-col span="4">
                        <div class="evaluate-title">
                          <span class="title"> 食宿评分</span>
                          <Rate show-text v-model="valueText"></Rate>
                        </div>
                      </i-col>
                      <i-col span="4">
                        <div class="evaluate-title">
                          <span class="title"> 食宿评分</span>
                          <Rate show-text v-model="valueText"></Rate>
                        </div>
                      </i-col>
                      <i-col span="4">
                        <div class="evaluate-title">
                          <span class="title"> 食宿评分</span>
                          <Rate show-text v-model="valueText"></Rate>
                        </div>
                      </i-col>
                    </Row>
                    <i-col span="24" class="text-center">
                      <Button type="primary" class="evaluate-list-btn">我要点评</Button>
                    </i-col>
                  </div>
                  <Row>
                    <div class="evaluate-list clearfix">
                      <p class="description"> 评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾，吃得也还不错!</p>
                      <div>
                        <span class="text">行程：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">食宿：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">服务：<Rate show-text v-model="valueText"></Rate></span>
                      </div>
                      <p class="evaluate-date">
                        领队恒sir
                        <span class="date">2017-12-03 12:03</span>
                      </p>
                    </div>
                    <div class="evaluate-list clearfix">
                      <p class="description"> 评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾，吃得也还不错!</p>
                      <div>
                        <span class="text">行程：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">食宿：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">服务：<Rate show-text v-model="valueText"></Rate></span>
                      </div>
                      <p class="evaluate-date">
                        领队恒sir
                        <span class="date">2017-12-03 12:03</span>
                      </p>
                    </div>
                    <div class="evaluate-list clearfix">
                      <p class="description"> 评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾，吃得也还不错!</p>
                      <div>
                        <span class="text">行程：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">食宿：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">服务：<Rate show-text v-model="valueText"></Rate></span>
                      </div>
                      <p class="evaluate-date">
                        领队恒sir
                        <span class="date">2017-12-03 12:03</span>
                      </p>
                    </div>
                    <div class="evaluate-list clearfix">
                      <p class="description"> 评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾，吃得也还不错!</p>
                      <div>
                        <span class="text">行程：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">食宿：<Rate show-text v-model="valueText"></Rate></span>
                        <span class="text">服务：<Rate show-text v-model="valueText"></Rate></span>
                      </div>
                      <p class="evaluate-date">
                        领队恒sir
                        <span class="date">2017-12-03 12:03</span>
                      </p>
                    </div>
                    <div class="text-center page-content">
                      <Page :total="100"></Page>
                    </div>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </i-col>
          <i-col span="4">
            <div class="product-detail-content-right">
              <div class="travel-home-right">
                <h2 class="product-recommend-title">热门线路推荐</h2>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

              </div>
            </div>
          </i-col>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
  import IColProduct from "./../../components/i-col-product/i-col-product";

  export default {
    data() {
      return {
        value: 1,
        lists: [],
        errorText: '',
        cover: '../../assets/images/product_1.jpg',
        valueText: 4,
        productType: [
          {
            id: '1',
            name: '跟團游'
          },
          {
            id: '2',
            name: '自助游'
          }
        ],
        product: {
          startDate: '',
          adultsNumber: 1,
          childNumber: 0,
          selectType: ''
        }
      }
    },
    components: {IColProduct},
    created() {
      this.get_data();
    },
    methods: {
      go() {
        if (sessionStorage.getItem('access_token') && sessionStorage.getItem('role') === 'user') {
          if (this.product.selectType === '') {
            this.errorText = '請選擇商品類型'
          } else if (this.product.adultsNumber === 0) {
            this.errorText = '請輸入出遊人數'
          }
          else if (this.product.startDate === '') {
            this.errorText = '請選擇出行日期'
          } else {
            this.$store.commit('productDetailsState', this.product);
            this.$router.push({path: '/product/1/order'})
          }
        } else {
          this.$router.push({path: '/auth/login/user'});
        }

      },
      get_data() {
        this.$Loading.start();
        this.$http.get(
          'public/cocs',
        ).then(res => {
          this.lists = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
          // error callback
        })
      },
      selectType(item) {
        this.product.selectType = item;
      },
      selectNumber(type, name) {
        if (type === 'add' && name === 'adults') {
          this.product.adultsNumber++;
        }
        if (type === 'delete' && name === 'adults' && this.product.adultsNumber !== 0) {
          this.product.adultsNumber--;
        }
        if (type === 'add' && name === 'child') {
          console.log("#3333333333")
          this.product.childNumber++;
        }
        if (type === 'delete' && name === 'child' && this.product.childNumber !== 0) {
          this.product.childNumber--;
        }
      },
      selectImage(url){
        this.cover = url;
      }
    }
  }
</script>

<style scoped>

</style>
