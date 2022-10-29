"use strict";(self["webpackChunkheadline"]=self["webpackChunkheadline"]||[]).push([[314],{2314:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("van-nav-bar",{staticClass:"page-nav-bar",attrs:{title:"登录","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}}}),n("h4",{staticClass:"loginTitle"},[e._v("头条欢迎您")]),n("van-form",{ref:"loginForm",staticClass:"form",on:{submit:e.onSubmit}},[n("van-field",{attrs:{name:"mobile",placeholder:"请输入手机号",rules:e.userFormRules.phone,maxlength:"11",type:"number"},model:{value:e.user.mobile,callback:function(t){e.$set(e.user,"mobile",t)},expression:"user.mobile"}},[n("i",{staticClass:"toutiao toutiao-shouji",attrs:{slot:"left-icon"},slot:"left-icon"})]),n("van-field",{attrs:{name:"code",placeholder:"请填写验证码",rules:e.userFormRules.code,type:"number",maxlength:"6"},scopedSlots:e._u([{key:"button",fn:function(){return[e.isCountDownShow?n("van-count-down",{staticStyle:{color:"#a699b3"},attrs:{time:6e4,format:"ss s"},on:{finish:function(t){e.isCountDownShow=!1}}}):n("van-button",{staticClass:"sendCode",attrs:{"native-type":"button",size:"mini",round:""},on:{click:e.onSendSms}},[e._v("发送验证码")])]},proxy:!0}]),model:{value:e.user.code,callback:function(t){e.$set(e.user,"code",t)},expression:"user.code"}},[n("i",{staticClass:"toutiao toutiao-yanzhengma",attrs:{slot:"left-icon"},slot:"left-icon"})]),n("div",{staticClass:"isRememberUser"},[n("van-checkbox",{attrs:{"icon-size":"18px"},model:{value:e.isRemember,callback:function(t){e.isRemember=t},expression:"isRemember"}},[e._v("记住手机号")])],1),n("div",{staticClass:"btnBox"},[n("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v("登录/注册")])],1)],1),n("span",{staticClass:"code-text"},[e._v("验证码为 246810")])],1)},o=[],s=n(2646),u=n(2381),a=n(5155),i=n(1718),c=n(7139),l={name:"loginIndex",data:function(){return{user:{mobile:(0,i.rV)("user-phone")||"13800000000",code:""},isRemember:(0,i.rV)("user-phone")?1:0,userFormRules:{phone:[{required:!0,message:"请输入手机号"},{pattern:/1[3|5|7|8|9|4|6]\d{9}$/,message:"手机号格式错误!"}],code:[{required:!0,message:"请填写验证码"},{patter:/\d[6]/,message:"验证码格式错误"}]},isCountDownShow:!1}},methods:{onSubmit:function(){var e=this;return(0,u.Z)((0,s.Z)().mark((function t(){var n,r,o;return(0,s.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return c.Z.loading({message:"登录中...",forbidClick:!0,duration:0}),n=e.user,t.prev=2,t.next=5,(0,a.x4)(n);case 5:r=t.sent,o=r.data,e.$store.commit("setUser",o.data),e.$store.commit("delCachePage","LayoutIndex"),c.Z.success({message:"登录成功!",forbidClick:!0}),e.isRemember?(0,i.LS)("user-phone",e.user.mobile):(0,i.LS)("user-phone",null),e.$router.back(),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](2),c.Z.fail({message:"登录失败!请重试",forbidClick:!0});case 17:case"end":return t.stop()}}),t,null,[[2,14]])})))()},onSendSms:function(){var e=this;return(0,u.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.loginForm.validate("mobile");case 3:t.next=8;break;case 5:return t.prev=5,t.t0=t["catch"](0),t.abrupt("return",t.t0);case 8:return e.isCountDownShow=!0,t.prev=9,t.next=12,(0,a.Q6)(e.user.mobile);case 12:c.Z.success("发送成功"),t.next=19;break;case 15:t.prev=15,t.t1=t["catch"](9),e.isCountDownShow=!1,c.Z.fail("发送失败,请稍后重试");case 19:case"end":return t.stop()}}),t,null,[[0,5],[9,15]])})))()}}},m=l,f=n(1001),d=(0,f.Z)(m,r,o,!1,null,"1eed1bfb",null),p=d.exports},5155:function(e,t,n){n.d(t,{Ci:function(){return a},Lj:function(){return m},Q6:function(){return s},R3:function(){return i},W9:function(){return f},X5:function(){return p},bG:function(){return u},dX:function(){return h},et:function(){return l},lQ:function(){return v},qi:function(){return d},x4:function(){return o},zM:function(){return c}});var r=n(8029),o=(n(4901),function(e){return(0,r.Z)({method:"POST",url:"/v1_0/authorizations",data:e})}),s=function(e){return(0,r.Z)({method:"GET",url:"/v1_0/sms/codes/".concat(e)})},u=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user"})},a=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user/channels"})},i=function(e){return(0,r.Z)({method:"POST",url:"/v1_0/user/followings",data:{target:e}})},c=function(e){return(0,r.Z)({method:"DELETE",url:"/v1_0/user/followings/".concat(e)})},l=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user/profile"})},m=function(e){return(0,r.Z)({method:"PATCH",url:"/v1_0/user/profile",data:e})},f=function(e){return(0,r.Z)({method:"PATCH",url:"/v1_0/user/photo",data:e})},d=function(){return(0,r.Z)({method:"GET",url:"/v1_0/article/collections"})},p=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user/histories",params:{page:1,per_page:200}})},h=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user/followers",params:{page:1,per_page:200}})},v=function(){return(0,r.Z)({method:"GET",url:"/v1_0/user/followings",params:{page:1,per_page:200}})}}}]);