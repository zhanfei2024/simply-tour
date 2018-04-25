<template>
  <div class="container">
    <div class="user-container">
      <Row :gutter="20">
        <i-col span="3">
          <div class="container-left">
            <Menu active-name="1">
              <MenuGroup title="用户中心">
                <MenuItem name="1">
                  <router-link to="/user/center">
                    个人中心
                  </router-link>
                </MenuItem>
                <MenuItem name="2">
                  <router-link to="/user/profile">
                    个人信息
                  </router-link>
                </MenuItem>
                <MenuItem name="3">
                  <router-link to="/user/security-list">
                    安全设置
                  </router-link>
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="交易管理">
                <MenuItem name="4">
                  <router-link to="/user/order-list">
                    我的订单
                  </router-link>
                </MenuItem>
                <MenuItem name="5">
                  <router-link to="/user/evaluate-list">
                    评价订单
                  </router-link>
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="我的收藏">
                <MenuItem name="6">
                  <router-link to="/user/collection/line">
                    收藏的线路
                  </router-link>
                </MenuItem>
                <MenuItem name="7">
                  <router-link to="/user/collection/travel">
                    收藏的旅行社
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

<style scoped>

</style>
