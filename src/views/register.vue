<template>
  <div class="registerbody">
    <div class="registerbodyleft">
      <div class="loginline1">
        <div class="loginzs"><img src="@/assets/钻石.png" alt="" /></div>
        <div class="logintitle"><span>衣品入微</span></div>
      </div>
      <div class="renimg">
        <img src="@/assets/ren.png" alt="" />
      </div>
    </div>
    <div class="registerbodyright">
      <div class="registerbodyrightline1"><span>注册衣品入微账号</span></div>
      <div class="loginline5">
        <div class="loginline5t"><span>没有账号? </span></div>
        <div @click="reg" class="loginline5l"><span>立即登入</span></div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人设计师" name="1"></el-tab-pane>
        <el-tab-pane label="企业设计师" name="2"></el-tab-pane>
      </el-tabs>
      <div class="loginline3" v-if="activeName == '1'">
        <el-form :model="ruleForm" :rules="ruleFormrules" ref="ruleFormRef">
          <el-form-item label="登入账号" prop="username">
            <el-input v-model="usernames"></el-input>
          </el-form-item>
          <el-form-item label="登入密码" prop="password">
            <el-input v-model="ruleForm.password"> </el-input>
            <div class="intensity">
              <span class="psdText">密码强度</span>
              <span
                class="line"
                :class="[level.includes('low') ? 'low' : '']"
              ></span>
              <span
                class="line"
                :class="[level.includes('middle') ? 'middle' : '']"
              ></span>
              <span
                class="line"
                :class="[level.includes('high') ? 'high' : '']"
              ></span>
            </div>
          </el-form-item>
          <el-form-item label="再次确认密码" prop="passwords">
            <el-input v-model="ruleForm.passwords"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="邀请码" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-form>
        <div class="checkedStyle">
          <el-checkbox v-model="checked"></el-checkbox>
          <span
            >创建账户即表示您同意我们的:
            <span @click="yp" class="xy">《衣品入微圈子服务协议》</span>
            <span class="xy" @click="PrivacyShow">《隐私服务协议》</span></span
          >
        </div>
        <div class="Register_now" @click="registerNow" v-if="checked == true">
          <span>立即注册</span>
        </div>
        <div class="Register_nows" v-if="checked == false">
          <span>立即注册</span>
        </div>
      </div>
      <div v-if="activeName == '2'">
        <el-form
          :model="ruleForm"
          :rules="ruleFormrules"
          ref="ruleFormRef"
          label-width="100px"
        >
          <div class="enterprise">
            <el-form-item label="企业名称">
              <el-input v-model="ruleForm.enterprisename"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="ruleForm.enterprisetel"></el-input>
            </el-form-item>
          </div>
          <div class="enterprise">
            <el-form-item label="负责人姓名">
              <el-input v-model="ruleForm.enterpriseperson"></el-input>
            </el-form-item>
            <el-form-item label="座机号码">
              <el-input v-model="ruleForm.enterpriseLandline"></el-input>
            </el-form-item>
          </div>
          <div class="qsasx">
            <el-form-item label="企业地址">
              <el-input v-model="ruleForm.enterprisaddress"></el-input>
            </el-form-item>
            <el-form-item label="邀请码">
              <el-input v-model="ruleForm.enterpriseyqcode"></el-input>
            </el-form-item>
          </div>
          <div class="enterprise">
            <el-form-item label="手机号">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="ruleForm.enterpriseyzcode"></el-input>
            </el-form-item>
          </div>
          <div class="qsasx">
            <el-form-item label="登入账号" prop="username">
            <el-input v-model="usernames"></el-input>
          </el-form-item>
          <el-form-item label="登入密码" prop="password">
            <el-input v-model="ruleForm.password"> </el-input>
            <div class="intensity">
              <span class="psdText">密码强度</span>
              <span
                class="line"
                :class="[level.includes('low') ? 'low' : '']"
              ></span>
              <span
                class="line"
                :class="[level.includes('middle') ? 'middle' : '']"
              ></span>
              <span
                class="line"
                :class="[level.includes('high') ? 'high' : '']"
              ></span>
            </div>
          </el-form-item>
          <el-form-item label="再次确认密码" prop="passwords">
            <el-input v-model="ruleForm.passwords"></el-input>
          </el-form-item>
          </div>
        </el-form>
        <div class="checkedStyle">
          <el-checkbox v-model="checked"></el-checkbox>
          <span
            >创建账户即表示您同意我们的:
            <span @click="yp" class="xy">《衣品入微圈子服务协议》</span>
            <span class="xy" @click="PrivacyShow">《隐私服务协议》</span></span
          >
        </div>
        <div class="Register_now" @click="registerNow" v-if="checked == true">
          <span>立即注册</span>
        </div>
        <div class="Register_nows" v-if="checked == false">
          <span>立即注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyUsersApi, registerApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  data() {
    var usernameV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (this.rules == true) {
        callback(new Error("账号已存在"));
      }
      callback();
    };
    var passwordV = (rule, value, callback) => {
      this.level = [];
      if (!value) {
        return callback("密码不能为空");
      }
      if (value.length < 5) {
        return callback("密码不少于8位");
      }
      if (value.length > 16) {
        return callback("密码不大于16位");
      }
      // 校验是数字
      const regex1 = /^\d+$/;
      // 校验字母
      const regex2 = /^[A-Za-z]+$/;
      // 校验符号
      const regex3 =
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
      if (regex1.test(value)) {
        this.level.push("low");
      } else if (regex2.test(value)) {
        this.level.push("low");
      } else if (regex3.test(value)) {
        this.level.push("low");
      } else if (/^[A-Za-z\d]+$/.test(value)) {
        this.level.push("low");
        this.level.push("middle");
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
          value
        )
      ) {
        this.level.push("low");
        this.level.push("middle");
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
          value
        )
      ) {
        this.level.push("low");
        this.level.push("middle");
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
          value
        )
      ) {
        this.level.push("low");
        this.level.push("middle");
        this.level.push("high");
      }
      return callback();
    };
    var passwordVs = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两个密码不一致"));
      }
      callback();
    };
    var nicknameV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入企业名称"));
      }
      callback();
    };
    var telV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入企业电话"));
      }
      callback();
    };
    return {
      activeName: "1",
      ruleForm: {
        username: "",
        password: "",
        tel: "",
        code: "",
        passwords: "",
        style: "",
        enterprisename: "",
        enterprisetel: "",
        enterpriseperson: "",
        enterpriseLandline: "",
        enterprisaddress: "",
        enterpriseyqcode: "",
        enterpriseyzcode: "",
      },
      usernames: "",
      ruleFormrules: {
        username: [
          {
            validator: usernameV,
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个有效字",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: passwordV,
            trigger: "blur",
          },
        ],
        passwords: [
          {
            validator: passwordVs,
            trigger: "blur",
          },
        ],
        nickname: [
          {
            validator: nicknameV,
            trigger: "blur",
          },
        ],
        tel: [
          {
            validator: telV,
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "长度为11位的号码",
            trigger: "blur",
          },
        ],
      },
      level: [],
      rule: false,
      rules: false,
      checked: false,
      dialogVisible: false,
      Privacy: false,
    };
  },
  watch: {
    usernames: {
      handler: function (val) {
        this.ruleForm.username = val;
        console.log(this.ruleForm.username);
        postD(verifyUsersApi(), this.ruleForm).then((res) => {
          console.log(res);
          var user = val.split("");
          if (res.code == "200" && user.length > 5 && user.length < 20) {
            this.rule = true;
            this.rules = false;
          } else if (
            res.code == "-202" ||
            user.length < 6 ||
            user.length > 20
          ) {
            this.rule = false;
            this.rules = true;
          } else {
            this.rule = false;
            this.rules = false;
          }
        });
      },
    },
  },
  methods: {
    yp() {
      this.dialogVisible = true;
    },
    PrivacyShow() {
      this.Privacy = true;
    },
    registerNow() {
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(registerApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("注册成功");
            this.$router.push("/login");
          } else {
            this.$message.error("注册失败或者账号已存在");
          }
        });
      });
    },
    reg() {
      this.$router.push("/login");
    },
    handleClick(tab, event) {
      this.ruleForm.style = tab.name;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/register.less");
</style>