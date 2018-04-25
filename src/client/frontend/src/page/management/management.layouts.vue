<template>
  <div class="container">
    <div class="user-container">
      <Row :gutter="20">
        <i-col span="3">
          <div class="container-left">
            <Menu active-name="1">
              <MenuGroup title="我的账户">
                <MenuItem name="1">
                  <router-link to="/management/center">
                    管理中心
                  </router-link>
                </MenuItem>
                <MenuItem name="2">
                  <router-link to="/management/profile">
                    基本信息
                  </router-link>
                </MenuItem>
                <MenuItem name="3">
                  <router-link to="/management/security-list">
                    安全设置
                  </router-link>
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="交易管理">
                <MenuItem name="4">
                  <router-link to="/management/order-list">
                    我的订单
                  </router-link>
                </MenuItem>
                <MenuItem name="5">
                  <router-link to="/management/evaluate-list">
                    待回复订单
                  </router-link>
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="产品管理">
                <MenuItem name="6">
                  <router-link to="/management/line-list">
                    线路管理
                  </router-link>
                </MenuItem>
                <MenuItem name="7">
                  <router-link to="/management/carousel">
                    轮播图管理
                  </router-link>
                </MenuItem>
              </MenuGroup>
            </Menu>
          </div>
        </i-col>
        <i-col span="21">
          <div class="container-right">
            <router-view></router-view>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>

  export default {}
</script>


