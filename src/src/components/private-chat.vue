<template>
  <div class="content">
    <ul id="container">
      <el-dialog
        :visible.sync="dialogVisible"
        :show-close = "false"
        :close-on-click-modal = "false"
        title="请输入用户名"
        width="30%"
      >
        <el-input v-model="userName" placeholder="请输入用户名" @keyup.enter.native="close(userName)"/>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="close(userName)">确 定</el-button>
        </span>
      </el-dialog>
      <p v-if="userName == nameId">这个傻子自己在跟自己聊天，你敢相信？简直离谱啊。。。</p>
      <p v-else>当前用户<span>{{ userName||'xx' }}</span>正在同<span>{{ nameId||'xx' }}</span>聊天中...</p>
      <li v-for="(item,index) in chatRecord[nameId]" :key="index" :class="{active:item.type == 0}">
        <img v-if="item.type == 1" src="@/assets/head.jpg"><span>{{ item.msg }}</span><img v-if="item.type == 0" src="@/assets/head.jpg">
      </li>
    </ul>

    <el-row>
      <el-col>
        <div class="grid-content bg-purple">
          <el-input
            v-model="value"
            type="textarea"
            placeholder="梦想一旦被付诸行动，就会变得神圣"
            @keyup.enter.native="sbmit"/>
          <el-button type="primary" size="small" @click="sbmit">发送(S)</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'GroupChat',
  data() {
    return {
      dialogVisible: false,
      chatRecord: {},
      value: '',
      userName: sessionStorage.getItem('userName') || '',
      userList: {
        data: [],
        index: 0
      }
    }
  },
  computed: {
    // 当前聊天窗口用户
    nameId: function() {
      return this.userList.data[this.userList.index]
    }
  },
  mounted() {
    this.$socket.emit('connect', 1);
    this.dialogVisible = !this.userName;
  },
  methods: {
    close(userName) {
      // 请求加入
      if (this.userName) {
        sessionStorage.setItem('userName', this.userName)
        this.$socket.emit('newUser', userName);
      }
    },
    // 发送数据
    sbmit() {
      const data = {
        type: 0,
        userName: this.userName, // 当前用户name
        nameId: this.nameId, // 发送当前聊天窗口选中的用户name
        msg: this.value.trim() || '叼毛，别以为我不知道你在刷空格'
      }
      const nameId = this.nameId;
      if (!this.chatRecord[nameId]) {
        this.chatRecord[nameId] = []
      }
      this.chatRecord[nameId].push(data)
      this.$forceUpdate()
      this.$socket.emit('send_private', data);
      this.value = '';
      this.rollBar();
    },
    rollBar() {
      var e = document.getElementById('container');
      setTimeout(() => {
        if (e.scrollHeight > e.clientHeight) {
          e.scrollTop = e.scrollHeight;
        }
      }, 100)
    }
  },
  sockets: {
    connect(data) {
      if (data) {
        this.$socket.emit('newUser', this.userName);
        console.log('连接成功', data)
      }
    },
    // 首次登陆接收其它成员信息
    login(user) {
      if (user.length >= 1) {
        this.userList.data = user;
        this.userList.userName = this.userName;
        this.$emit('input', this.userList);
        console.log('用户列表信息', user)
      }
    },
    // 中途新用户加入
    newNserJoin(name, index) {
      this.userList.data.push(name)
      this.$emit('input', this.userList);
      console.log(name + '新加入');
    },
    reconnect(data) {
      console.log('重新连接', data)
    },
    disconnecting(data) {
      console.log('socket已断开连接');
    },
    // 销毁
    destroyed() {
      if (this.$socket) this.$socket.disconnect();
    },
    // 监听中途的成员离开
    leave(name) {
      console.log(name + '离开');
      // 移除该用户
      this.userList.data = this.userList.data.filter(item => item != name);
      this.$forceUpdate()
    },
    // 接收私聊信息
    private(data) {
      const userName = data.userName;
      if (!this.chatRecord[userName]) {
        this.chatRecord[userName] = []
      }
      this.chatRecord[userName].push(data)
      this.$forceUpdate()
      this.value = '';
      this.rollBar();
      console.log('接收私聊信息', data, this.chatRecord)
    }
    // getMsg(data) {
    //   console.log('接收后端消息', data)
    //   this.rollBar();
    // }
  }
}
</script>

<style scoped lang="less">
  .content {
    width: calc(100% - 307px);
    height: 100%;
    margin: 0 auto;
    border:1px solid #eee;
    float: right;
    /deep/ .el-textarea__inner{
      height:25vh;
      border-left:0;
      border-right:0;
      border: none;
    }
    /deep/ .el-textarea__inner:hover{
      border: none;
    }
  }
.grid-content{
  position: relative;
  /deep/ .el-textarea__inner:focus {
    outline: 0;
    border-color: #eee;
}
 button{
    position: absolute;
    bottom: 8px;
    right: 20px;
  }
}
  h3 {
    margin: 40px 0 0;
  }
  #container{
    background:#F5F5F5;
  }
  p{
    padding:20px 0;
    margin:0;
    border-bottom:1px solid #E7E7E7;
    span{
      color: #42b983;
      padding:0 5px;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin:0;
    height:calc(100% - 25vh);
    overflow-y: auto;
  }
  ul::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: #f1f1ef;
}
ul::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}
ul::-webkit-scrollbar-track {
    background-color: #f1f1ef;
}
  li {
    margin: 10px;
    text-align: left;
    span {
      color: #333;
      display: inline-block;
      text-align: center;
      background: #fff;
      color: #333;
      font-size: 14px;
      padding: 5px 10px;
      border-radius: 4px;
    }
    img{
      width:45px;
      height:45px;
      border-radius: 8px;
      vertical-align: middle;
      padding:0 10px;
    }
    &.active {
      text-align: right;
      span {
        background: #9EEA6A;
      }
    }
  }
  a {
    color: #42b983;
  }
</style>
