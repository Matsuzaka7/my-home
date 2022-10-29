<template>
  <div class="setting">
    <div class="settingItem">
      <h2>全局主题</h2>
      <div>
        <el-select
          v-model="value"
          placeholder="跟随系统"
          @change="changeSelect"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="settingItem" style="align-items: flex-start">
      <h2>接口测试</h2>
      <div class="settingItemTest">
        <div class="card">
          <div class="settingItemTestTop">
            <el-select
              v-model="type"
              placeholder="类型(GET)"
              class="settingItemTestSelect"
            >
              <el-option
                v-for="item in ApiType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option
            ></el-select>
            <div style="margin-top: 10px">
              <el-checkbox v-model="SeverChecked">代理转发</el-checkbox>
              <el-checkbox v-model="formDataChecked">formData</el-checkbox>
            </div>
          </div>

          <el-autocomplete
            clearable
            class="inline-input"
            v-model="inputVal"
            :fetch-suggestions="querySearch"
            placeholder="URL"
            @change="ChangeSelect"
          >
            <template slot-scope="{ item, $index }">
              <div class="name">
                {{ item.value }}
                <i
                  @click.stop="deleteList"
                  class="el-icon-delete icon-delete"
                  >{{ $index }}</i
                >
              </div>
            </template></el-autocomplete
          >
          <textarea
            v-model="ajaxData"
            class="data"
            contenteditable="true"
            :placeholder="`
            携带参数
            格式:
            1. 基本数据: &quot;hello word&quot;
            
            2. 引用数据:
                {
                  &quot;user&quot;: &quot;admin&quot;,
                  &quot;password&quot;: 123456
                }`"
          ></textarea>
          <button @click="subAjax">发送请求</button>
        </div>
      </div>
    </div>

    <div class="settingItem">
      <h2>错误日志</h2>
      <div class="card" style="max-height: 200px; overflow: scroll; padding-top: 10px;">
        <div v-for="item in error" class="errorItem">
          <span>{{ timeFormat(item.time) }}：</span>
          <p>{{ item.err }}</p>
        </div>
      </div>
    </div>

    <el-dialog
      class="dialog"
      title="结果"
      :visible.sync="centerDialogVisible"
      width="85%"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <textarea v-model="toast" class="data" contenteditable="true"></textarea>
    </el-dialog>
  </div>
</template>

<script>
import { timeFormat } from "@/tool/tools";
import axios from "axios";
export default {
  name: "Set",
  data() {
    return {
      centerDialogVisible: false, // dialog框不展示
      restaurants: JSON.parse(localStorage.getItem("UrlList")) || [
        { value: "http://matsuzaka.top:404/login" },
      ],
      value: localStorage.getItem("Global-theme"), // 主题颜色的值
      type: "", // 测试接口的类型
      inputVal: "", // 测试接口的值
      SeverChecked: false, // 代理发送的复选框
      formDataChecked: false, // formData的复选框
      ajaxData: "", // 发送携带的值
      options: [
        {
          value: "跟随系统",
          label: "跟随系统",
        },
        {
          value: "深色",
          label: "深色",
        },
        {
          value: "浅色",
          label: "浅色",
        },
      ],
      ApiType: [
        {
          value: "GET",
          label: "GET",
        },
        {
          value: "POST",
          label: "POST",
        },
        {
          value: "PUT",
          label: "PUT",
        },
        {
          value: "DELETE",
          label: "DELETE",
        },
      ],
      toast: [],
      error: JSON.parse(localStorage.getItem("error")) || [],
    };
  },
  created() {
    this.timeFormat = timeFormat
  },
  methods: {
    changeSelect(val) {
      localStorage.setItem("Global-theme", val);
      this.$bus.$emit("setGlobalTheme", val);
    },
    // 点击按钮执行的回调
    async subAjax() {
      let options = {
        url: this.inputVal,
        method: this.type || "GET",
      };
      try {
        const f = new FormData();
        const obj = JSON.parse(this.ajaxData || "{}");
        for (const key in obj) {
          f.append(key, obj[key]);
        }

        // 判断类型
        if (this.type == "GET" || this.type == "DELETE" || this.type == "") {
          // 开启代理，开启formData
          if (this.formDataChecked && this.SeverChecked) {
            options.params = this.ajaxData && JSON.parse(this.ajaxData);
            options.fromData = true;
            // 开启代理，关闭formData
          } else if (this.SeverChecked && !this.formDataChecked) {
            options.params = this.ajaxData && JSON.parse(this.ajaxData);
            // 关闭代理，关闭formData
          } else if (!this.SeverChecked && !this.formDataChecked) {
            options.params = this.ajaxData && JSON.parse(this.ajaxData);
            // 关闭代理，开启formData
          } else if (!this.SeverChecked && this.formDataChecked) {
            options.params = f;
          }
        } else if (this.type == "POST" || this.type == "PUT") {
          // 开启代理，开启formData
          if (this.formDataChecked && this.SeverChecked) {
            options.data = this.ajaxData && JSON.parse(this.ajaxData);
            options.fromData = true;
            // 开启代理，关闭formData
          } else if (this.SeverChecked && !this.formDataChecked) {
            options.data = this.ajaxData && JSON.parse(this.ajaxData);
            // 关闭代理，关闭formData
          } else if (!this.SeverChecked && !this.formDataChecked) {
            options.data = this.ajaxData && JSON.parse(this.ajaxData);
            // 关闭代理，开启formData
          } else if (!this.SeverChecked && this.formDataChecked) {
            options.data = f;
          }
        }
      } catch (error) {
        // 保存错误信息
        let errorData = JSON.parse(localStorage.getItem("error")) || [];
        errorData.unshift({ time: Date.now(), err: error.message });
        this.error.unshift({ time: Date.now(), err: error.message })
        localStorage.setItem("error", JSON.stringify(errorData));
        this.$message.error("参数格式有误");
      }

      try {
        // 开启代理
        if (this.SeverChecked) {
          // 开启formData
          const res = await this.$API.Setting.apiTest({ options });
          if (res.status === 200) {
            this.toast = JSON.stringify(res.data, null, 4);
            this.centerDialogVisible = true;
          } else {
            this.$message.error("请检查接口或接口类型");
          }
          // 关闭代理
        } else {
          const res = await axios(options);
          if (res.status === 200) {
            this.toast = JSON.stringify(res.data, null, 4);
            this.centerDialogVisible = true;
          } else {
            this.$message.error("可能跨域或接口地址和接口类型错误");
          }
        }
      } catch (error) {
        let errorData = JSON.parse(localStorage.getItem("error")) || [];
        errorData.unshift({ time: Date.now(), err: error.message });
        this.error.unshift({ time: Date.now(), err: error.message })
        localStorage.setItem("error", JSON.stringify(errorData));
        this.$message.error("可能跨域或请求超时或请求地址不存在");
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 失去焦点触发
    ChangeSelect(val) {
      // 如果数组中有重复的就不添加
      if (
        !localStorage.getItem("UrlList") ||
        !JSON.parse(localStorage.getItem("UrlList")).some(
          (item) => item.value == val
        )
      ) {
        this.restaurants.push({ value: val });
        localStorage.setItem("UrlList", JSON.stringify(this.restaurants));
      }
    },
    // 删除列表其中一项
    deleteList(e) {
      let index = this.restaurants.findIndex((item) => {
        return item.value === e.target.parentNode.innerText;
      });
      this.restaurants.splice(index, 1);
      localStorage.setItem("UrlList", JSON.stringify(this.restaurants));
    },
    handleClose(done) {
      this.centerDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.dialog >>> .el-dialog__body {
  padding: 0 20px 30px;
}
button {
  display: block;
  margin-top: 10px;
  width: 100%;
  user-select: none;
  border: 1px solid #dcdfe6;
}
button:active {
  background-color: rgba(0, 0, 0, 0.05);
}
h2 {
  user-select: none;
  font-size: 14px;
  width: 70px;
}
.icon-delete {
  width: 20px;
  position: absolute;
  right: 20px;
  line-height: 34px;
}
.setting {
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.settingItem {
  box-sizing: border-box;
  /* display: flex; */
  width: 100%;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.settingItem div {
  flex: 1;
}

.settingItemTestTop {
  margin-bottom: 10px;
}

.settingItemTestSelect {
  width: 120px;
  margin-right: 10px;
}

.inline-input {
  width: 100%;
}
.data {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 30vh;
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: #fff;
  overflow: scroll;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.data::placeholder {
  color: #c0c4cc;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.errorItem {
  color: #333;
  padding: 5px 0;
  border-bottom: 1px solid #aaa;
}

</style>
