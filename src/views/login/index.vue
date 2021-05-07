<template>
  <div>
    <a-modal
      title=""
      destroyOnClose
      :visible="visible"
      centered
      :closable="closable"
      :footer="null"
      :width="572"
      :height="433"
      @cancel="cancel"
    >
      <div class="login-box">
        <div class="title">登录基础平台</div>
        <a-form-model
          :model="loginInfo"
          class="form-content"
          v-bind="formItemLayout"
          :rules="rules"
        >
          <a-form-model-item label="账号" prop="username">
            <a-input
              v-model="loginInfo.username"
              placeholder="请输入账号"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input
              v-model="loginInfo.password"
              type="password"
              placeholder="请输入密码"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item
            class="submit"
            :isLoading="isLoading"
            @click="handleSubmit"
          >
            <a-button type="primary" block @click="handleSubmit">
              登录
            </a-button>
            <!-- <span @click="handleSubmit">登录</span> -->
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { setToken } from '@/libs/util'
import { mapActions } from 'vuex'
import router, { resetNewRoute } from '@/router'
export default {
  name: 'Login',
  props: ['isShow'],
  data() {
    return {
      visible: true,
      closable: false,
      isLoading: false,
      loginInfo: {
        layout: 'horizontal',
        username: localStorage.getItem('usrn')
          ? localStorage.getItem('usrn')
          : '',
        password: localStorage.getItem('pwd') ? localStorage.getItem('pwd') : ''
      },
      rules: {
        username: [{ validator: this.ruleUsername, trigger: 'blur' }],
        password: [{ validator: this.rulePassword, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.loginInfo.username = localStorage.getItem('usrn')
      ? localStorage.getItem('usrn')
      : ''
    this.loginInfo.password = localStorage.getItem('pwd')
      ? localStorage.getItem('pwd')
      : ''
  },
  computed: {
    formItemLayout() {
      const { layout } = this.loginInfo
      return layout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
          }
        : {}
    }
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    rulesCommon(value, type, lengthMin, lengthMax) {
      var returnMsg = ''
      if (value === null || value === '' || value === undefined) {
        returnMsg = '不能为空！'
      } else {
        if (type === 'tel' && !this.myreg.test(value)) {
          returnMsg = '格式不对！'
        } else if (type === 'en-num' && !this.enAndNum.test(value)) {
          returnMsg = '仅由字母和数字组成！'
        } else if (type === 'num' && !this.num.test(value)) {
          returnMsg = '仅由数字组成!'
        } else if (
          type != 'tel' &&
          (value.length < lengthMin || value.length > lengthMax)
        ) {
          returnMsg = '位数应在' + lengthMin + '~' + lengthMax + '之间！'
        }
      }
      return returnMsg
    },
    rulePassword(rule, value, callback) {
      const msg = this.rulesCommon(value, 'en-num', 6, 10)
      if (msg.length > 0) {
        const input = this.$refs.password.$refs.input
        input.focus()
        callback(new Error('密码' + msg))
      }
      callback()
    },
    ruleUsername(rule, value, callback) {
      const msg = this.rulesCommon(value, 'en-num', 5, 15)
      if (msg.length > 0) {
        const input = this.$refs.username.$refs.input
        input.focus()
        callback(new Error('账号' + msg))
      }
      callback()
    },
    cancel() {
      this.visible = false
      this.$emit('update:isShow', 0)
    },
    checkChange(flag) {
      this.isChecked = flag.target.checked
    },
    remember() {
      if (this.isChecked) {
        localStorage.setItem('usrn', this.loginInfo.username)
        localStorage.setItem('pwd', this.loginInfo.password)
      } else {
        localStorage.removeItem('usrn')
        localStorage.removeItem('pwd')
      }
    },
    handleSubmit() {
      this.isLoading = true
      const { username, password } = this.loginInfo
      if (username == '') {
        this.$message.info('用户名不能为空！')
        return false
      }
      if (password == '') {
        this.$message.info('密码不能为空！')
        return false
      }
      this.handleLogin({ username, password }).then(res => {
        this.$emit('update:isShow', false)
        this.isLoading = false
        this.visible = false
        this.$message.success('登录成功！', 1, () => {
          this.$store.dispatch('getRouterInfo').then(() => resetNewRoute())
        })
      })
      // setTimeout(() => {
      //   const userInfo = {
      //     username,
      //     userId: '123456',
      //     remarkName: '',
      //     sinm: 'Bearer' + '74185adsf9344555ff'
      //   }
      //   if (username == 'admin') {
      //     userInfo.remarkName = '管理员'
      //   } else {
      //     userInfo.remarkName = '测试人员'
      //   }
      //   setToken('UserInfo', userInfo)
      //   this.$store.commit('setUserInfo', userInfo)
      //   this.$emit('update:isShow', false)
      //   this.isLoading = false
      //   this.$message.success('登录成功！')
      //   this.visible = false
      // }, 1000)
      // const params = {
      //   username,
      //   password,
      //   responseBodyType: 20,
      //   needLoginOld: true
      // }
      // this.remember()
      // this.$http
      //   .post('signIn', params, {
      //     isMock: false,
      //     transformData: false,
      //     type: 'form'
      //   })
      //   .then(data => {
      //     console.log(`data`, data)
      //     if (data.userId) {
      //       this.remember()
      //       console.log(data)
      //       const {
      //         accessToken,
      //         userEmail,
      //         authorities,
      //         userAccountName,
      //         userAccountNum,
      //         userId,
      //         userOrganization,
      //         userPassword,
      //         userRegisterMobile,
      //         username
      //       } = data
      //       const userInfo = {
      //         userName: username,
      //         userId: userId,
      //         userEmail: userEmail,
      //         remarkName: username,
      //         userOrganization: userOrganization,
      //         userRegisterMobile: userRegisterMobile,
      //         sinm: 'Bearer' + ' ' + accessToken
      //       }
      //       setToken('UserInfo', userInfo)
      //       this.$store.commit('setUserInfo', userInfo)
      //       this.$emit('update:isShow', 0)
      //       this.$message.success('登录成功！')
      //       this.isLoading = false
      //       this.visible = false
      //     } else {
      //       this.errorMessage = data.errorMsg + ','
      //       this.$message.error(data.errorMsg)
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.$message.error('登录失败')
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  width: 354px;
  .title {
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    font-weight: bold;
    font-family: Microdoft YaHei;
    font-style: normal;
    color: #323233;
  }
  .form-content {
    ::v-deep .ant-form-item-required::before {
      content: '';
    }
    .submit {
      cursor: pointer;
      margin-bottom: 40px;
      ::v-deep .ant-form-item-control-wrapper {
        width: 100%;
        text-align: center;
        color: #ffffff;
      }
    }
    padding: 45px 0 0 0;
    .forget-password {
      float: right;
      // padding-right: 8px;
      cursor: pointer;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height */

      text-align: right;

      color: #598ff1;
    }
    .no-account {
      margin-bottom: 0px;
      text-align: center;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height */
      color: #898989;
      span {
        cursor: pointer;
        text-align: right;
        color: #598ff1;
      }
      ::v-deep .ant-form-item-control {
        line-height: 20px;
      }
      ::v-deep .ant-form-item-control-wrapper {
        width: 100%;
      }
    }
    .remember-password {
      ::v-deep .ant-form-item-control {
        line-height: 20px;
      }
      margin-left: 59px;
      margin-bottom: 48px;
      width: 100%;
      .remember-check {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height */

        color: #898989;
      }
      ::v-deep .ant-checkbox-input {
        background: #ffffff;
        border: 1px solid #dce0e6;
        box-sizing: border-box;
        border-radius: 3px;
      }
    }
  }
  ::v-deep .ant-form-item-label {
    line-height: 32px;
    > label::after {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      content: '';
      position: relative;
      top: -0.5px;
      margin: 0 38px 0 0px;
    }
  }
  ::v-deep .ant-form-item-control {
    line-height: 32px;
  }
  ::v-deep .ant-form-item {
    margin-bottom: 24px;
  }
  ::v-deep .ant-input {
    background: #ffffff;
    border: 1px solid #dce0e6;
    box-sizing: border-box;
    border-radius: 4px;
  }
  ::v-deep .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #598ff1;
    border-color: #598ff1;
  }
}
::v-deep .ant-btn-primary {
  background: #598ff1;
  border-radius: 4px;
  /* 雅黑/14@20 */

  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
::v-deep .ant-btn-primary:hover,
.ant-btn-primary:focus {
  color: #fff;
  background-color: #598ff1;
  border-color: #598ff1;
}
::v-deep .ant-modal-body {
  padding: 40px 105px 56px 105px;
}
::v-deep .ant-modal-mask {
  background: rgba(0, 0, 0, 0.6);
}
::v-deep .ant-input:focus {
  box-shadow: 0 0 0 0px;
}
</style>
