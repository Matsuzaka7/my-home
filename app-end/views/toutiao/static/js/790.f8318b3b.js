"use strict";(self["webpackChunkheadline"]=self["webpackChunkheadline"]||[]).push([[790],{2790:function(t,s,e){e.r(s),e.d(s,{default:function(){return f}});var r=function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"my-container"},[r("router-view",{staticClass:"router-view"}),t.user?r("div",{staticClass:"header user-info"},[r("div",{staticClass:"base-info"},[r("div",{staticClass:"left"},[r("van-image",{staticClass:"avatar",attrs:{src:t.userInfo.photo,fit:"cover",round:""}}),r("span",[t._v(t._s(t.userInfo.name))])],1),r("div",{staticClass:"right"},[r("span",{attrs:{type:"default",size:"mini"},on:{click:function(s){return t.$router.push("/user/profile")}}},[t._v("个人信息 "),r("van-icon",{attrs:{name:"arrow"}})],1)])]),r("div",{staticClass:"data-stats"},[r("div",{staticClass:"data-item",on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}},[r("span",{staticClass:"count"},[t._v(t._s(t.userInfo.art_count))]),r("span",{staticClass:"text"},[t._v("动态")])]),r("div",{staticClass:"data-item",on:{click:function(s){return t.$router.push("/userFollowings")}}},[r("span",{staticClass:"count"},[t._v(t._s(t.userInfo.follow_count))]),r("span",{staticClass:"text"},[t._v("关注")])]),r("div",{staticClass:"data-item",on:{click:function(s){return t.$router.push("/userFollowers")}}},[r("span",{staticClass:"count"},[t._v(t._s(t.userInfo.fans_count))]),r("span",{staticClass:"text"},[t._v("粉丝")])]),r("div",{staticClass:"data-item",on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}},[r("span",{staticClass:"count"},[t._v(t._s(t.userInfo.like_count))]),r("span",{staticClass:"text"},[t._v("获赞")])])])]):r("div",{staticClass:"header not-login"},[r("div",{staticClass:"login-btn",on:{click:function(s){return t.$router.push("/login")}}},[r("img",{staticClass:"mobile-img",attrs:{src:e(9864),alt:""}}),r("span",{staticClass:"login-text"},[t._v("登录 / 注册")])])]),r("van-grid",{attrs:{"column-num":4,border:!1,clickable:""}},[r("van-grid-item",{attrs:{icon:"comment-circle-o",text:"消息通知"},on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}}),r("van-grid-item",{attrs:{icon:"star-o","is-link":"",to:{name:"userCollect"},text:"我的收藏"}}),r("van-grid-item",{attrs:{icon:"clock-o","is-link":"",to:{name:"userHistories"},text:"阅读历史"}}),r("van-grid-item",{attrs:{icon:"orders-o",text:"我的作品"},on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}})],1),r("div",{staticClass:"more"},[r("p",[t._v("更多服务")]),r("van-grid",{attrs:{"column-num":4,border:!1,clickable:""}},[r("van-grid-item",{attrs:{icon:"question-o",text:"问题反馈"},on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}}),r("van-grid-item",{attrs:{icon:"service-o",text:"小智同学","is-link":"",to:{name:"chat",params:{name:this.userInfo.name,photo:this.userInfo.photo}}}}),r("van-grid-item",{attrs:{icon:"smile-comment-o",text:"聊天室"},on:{click:function(s){return t.$toast("此功能暂未开放 ! ")}}})],1)],1),t.user?r("van-cell",{staticClass:"logout-cell",attrs:{title:"退出登录"},on:{click:t.onLogout}}):t._e()],1)},n=[],a=e(4140),o=e(5155),i={name:"MyIndex",data(){return{userInfo:{},flag:!1}},computed:{...(0,a.rn)(["user"])},created(){this.user&&this.loadUserinfo()},activated(){this.user&&this.loadUserinfo()},methods:{async loadUserinfo(){try{const{data:t}=await(0,o.bG)();this.userInfo=t.data}catch(t){this.$toast("身份认证过期 请重新登录 !"),this.$store.commit("setUser",null)}},onLogout(){this.$dialog.confirm({title:"温馨提示",message:"亲,您确定要退出吗?"}).then((()=>{this.$store.commit("setUser",null)})).catch((()=>{}))}}},c=i,u=e(1001),l=(0,u.Z)(c,r,n,!1,null,"cae7c308",null),f=l.exports},5155:function(t,s,e){e.d(s,{Ci:function(){return i},Lj:function(){return f},Q6:function(){return a},R3:function(){return c},W9:function(){return v},X5:function(){return g},bG:function(){return o},dX:function(){return h},et:function(){return l},lQ:function(){return d},qi:function(){return m},x4:function(){return n},zM:function(){return u}});var r=e(8029);e(4901);const n=t=>(0,r.Z)({method:"POST",url:"/v1_0/authorizations",data:t}),a=t=>(0,r.Z)({method:"GET",url:`/v1_0/sms/codes/${t}`}),o=()=>(0,r.Z)({method:"GET",url:"/v1_0/user"}),i=()=>(0,r.Z)({method:"GET",url:"/v1_0/user/channels"}),c=t=>(0,r.Z)({method:"POST",url:"/v1_0/user/followings",data:{target:t}}),u=t=>(0,r.Z)({method:"DELETE",url:`/v1_0/user/followings/${t}`}),l=()=>(0,r.Z)({method:"GET",url:"/v1_0/user/profile"}),f=t=>(0,r.Z)({method:"PATCH",url:"/v1_0/user/profile",data:t}),v=t=>(0,r.Z)({method:"PATCH",url:"/v1_0/user/photo",data:t}),m=()=>(0,r.Z)({method:"GET",url:"/v1_0/article/collections"}),g=()=>(0,r.Z)({method:"GET",url:"/v1_0/user/histories",params:{page:1,per_page:200}}),h=()=>(0,r.Z)({method:"GET",url:"/v1_0/user/followers",params:{page:1,per_page:200}}),d=()=>(0,r.Z)({method:"GET",url:"/v1_0/user/followings",params:{page:1,per_page:200}})},9864:function(t){t.exports="data:image/png;base64,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"}}]);