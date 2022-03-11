<template>
  <div class="home">
    <div class="sidebar">
      <img src="@/assets/head.jpg">
      <span>{{ userList.userName }}</span>
    </div>
    <div class="userList">
      <div class="search">
        <el-input
          v-model="input1"
          placeholder="搜索"
          size = "mini"
          suffix-icon="el-icon-plus">
          <i slot="prefix" class="el-input__icon el-icon-search"/>
        </el-input>
      </div>
      <ul>
        <li v-for="(item, index) in userList.data" :key="item" :class="{active:userList.index == index}" @click="slcet(index)">
          <img src="@/assets/head.jpg">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- <el-button type="primary" size="mini" @click="change">切换聊天模式</el-button> -->
    <component v-model="userList" :is="currentView"/>
  </div>
</template>

<script>
import groupChat from '@/components/group-chat.vue'
import privateChat from '@/components/private-chat.vue'

export default {
  name: 'Home',
  components: {
    groupChat,
    privateChat
  },
  data: function() {
    return {
      input1: '',
      type: 1,
      userList: {
        data: [],
        index: 0,
        userNname: sessionStorage.getItem('userName') || ''
      }
    };
  },
  computed: {
    currentView() {
      return this.type ? 'groupChat' : 'privateChat';
    }
  },
  methods: {
    change() {
      this.type = !this.type;
    },
    slcet(index) {
      this.userList.index = index
    }
  }
}
</script>
<style scoped lang="less">
.home{
  height:100%
}
.search{
  padding:0 5px;
  margin:20px 0;
}
.userList{
  width: 250px;
  height: 100%;
  float: left;
  ul{
    margin:0;
    padding:0;
  }
  ul li{
    height:30px;
    padding:10px 15px;
    border-bottom: 1px solid #ebeef5;
    text-align: left;
    list-style:none;
    img{
      width: 30px;
      height:30px;
      padding-right: 8px;
      vertical-align: middle;
    }
    &:hover{
      background: rgba(0,0,0,0.1);
      cursor: pointer;
    }
  }
  ul li.active{
      background: rgba(0,0,0,0.15);
  }
}
.sidebar{
  width: 55px;
  height: 100%;
  background: #2E2E2E;
  float: left;
  img{
    width: 45px;
    height:45px;
    margin-top:35px;
    border-radius: 4px;
  }
  span{
    padding:5px;
    color:#fff;
    text-align: center;
    font-size:14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
}
</style>
