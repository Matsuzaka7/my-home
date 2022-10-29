(self["webpackChunkheadline"]=self["webpackChunkheadline"]||[]).push([[790],{2790:function(t,n,r){"use strict";r.r(n),r.d(n,{default:function(){return m}});var e=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"my-container"},[e("router-view",{staticClass:"router-view"}),t.user?e("div",{staticClass:"header user-info"},[e("div",{staticClass:"base-info"},[e("div",{staticClass:"left"},[e("van-image",{staticClass:"avatar",attrs:{src:t.userInfo.photo,fit:"cover",round:""}}),e("span",[t._v(t._s(t.userInfo.name))])],1),e("div",{staticClass:"right"},[e("span",{attrs:{type:"default",size:"mini"},on:{click:function(n){return t.$router.push("/user/profile")}}},[t._v("个人信息 "),e("van-icon",{attrs:{name:"arrow"}})],1)])]),e("div",{staticClass:"data-stats"},[e("div",{staticClass:"data-item",on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}},[e("span",{staticClass:"count"},[t._v(t._s(t.userInfo.art_count))]),e("span",{staticClass:"text"},[t._v("动态")])]),e("div",{staticClass:"data-item",on:{click:function(n){return t.$router.push("/userFollowings")}}},[e("span",{staticClass:"count"},[t._v(t._s(t.userInfo.follow_count))]),e("span",{staticClass:"text"},[t._v("关注")])]),e("div",{staticClass:"data-item",on:{click:function(n){return t.$router.push("/userFollowers")}}},[e("span",{staticClass:"count"},[t._v(t._s(t.userInfo.fans_count))]),e("span",{staticClass:"text"},[t._v("粉丝")])]),e("div",{staticClass:"data-item",on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}},[e("span",{staticClass:"count"},[t._v(t._s(t.userInfo.like_count))]),e("span",{staticClass:"text"},[t._v("获赞")])])])]):e("div",{staticClass:"header not-login"},[e("div",{staticClass:"login-btn",on:{click:function(n){return t.$router.push("/login")}}},[e("img",{staticClass:"mobile-img",attrs:{src:r(9864),alt:""}}),e("span",{staticClass:"login-text"},[t._v("登录 / 注册")])])]),e("van-grid",{attrs:{"column-num":4,border:!1,clickable:""}},[e("van-grid-item",{attrs:{icon:"comment-circle-o",text:"消息通知"},on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}}),e("van-grid-item",{attrs:{icon:"star-o","is-link":"",to:{name:"userCollect"},text:"我的收藏"}}),e("van-grid-item",{attrs:{icon:"clock-o","is-link":"",to:{name:"userHistories"},text:"阅读历史"}}),e("van-grid-item",{attrs:{icon:"orders-o",text:"我的作品"},on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}})],1),e("div",{staticClass:"more"},[e("p",[t._v("更多服务")]),e("van-grid",{attrs:{"column-num":4,border:!1,clickable:""}},[e("van-grid-item",{attrs:{icon:"question-o",text:"问题反馈"},on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}}),e("van-grid-item",{attrs:{icon:"service-o",text:"小智同学","is-link":"",to:{name:"chat",params:{name:this.userInfo.name,photo:this.userInfo.photo}}}}),e("van-grid-item",{attrs:{icon:"smile-comment-o",text:"聊天室"},on:{click:function(n){return t.$toast("此功能暂未开放 ! ")}}})],1)],1),t.user?e("van-cell",{staticClass:"logout-cell",attrs:{title:"退出登录"},on:{click:t.onLogout}}):t._e()],1)},s=[],o=r(2646),a=r(2381),i=r(2173),c=r(4140),u=r(5155),l={name:"MyIndex",data:function(){return{userInfo:{},flag:!1}},computed:(0,i.Z)({},(0,c.rn)(["user"])),created:function(){this.user&&this.loadUserinfo()},activated:function(){this.user&&this.loadUserinfo()},methods:{loadUserinfo:function(){var t=this;return(0,a.Z)((0,o.Z)().mark((function n(){var r,e;return(0,o.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,u.bG)();case 3:r=n.sent,e=r.data,t.userInfo=e.data,n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),t.$toast("身份认证过期 请重新登录 !"),t.$store.commit("setUser",null);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},onLogout:function(){var t=this;this.$dialog.confirm({title:"温馨提示",message:"亲,您确定要退出吗?"}).then((function(){t.$store.commit("setUser",null)})).catch((function(){}))}}},f=l,v=r(1001),p=(0,v.Z)(f,e,s,!1,null,"cae7c308",null),m=p.exports},9337:function(t,n,r){var e=r(2109),s=r(9781),o=r(3887),a=r(5656),i=r(1236),c=r(6135);e({target:"Object",stat:!0,sham:!s},{getOwnPropertyDescriptors:function(t){var n,r,e=a(t),s=i.f,u=o(e),l={},f=0;while(u.length>f)r=s(e,n=u[f++]),void 0!==r&&c(l,n,r);return l}})},5155:function(t,n,r){"use strict";r.d(n,{Ci:function(){return i},Lj:function(){return f},Q6:function(){return o},R3:function(){return c},W9:function(){return v},X5:function(){return m},bG:function(){return a},dX:function(){return g},et:function(){return l},lQ:function(){return h},qi:function(){return p},x4:function(){return s},zM:function(){return u}});var e=r(8029),s=(r(4901),function(t){return(0,e.Z)({method:"POST",url:"/v1_0/authorizations",data:t})}),o=function(t){return(0,e.Z)({method:"GET",url:"/v1_0/sms/codes/".concat(t)})},a=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user"})},i=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user/channels"})},c=function(t){return(0,e.Z)({method:"POST",url:"/v1_0/user/followings",data:{target:t}})},u=function(t){return(0,e.Z)({method:"DELETE",url:"/v1_0/user/followings/".concat(t)})},l=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user/profile"})},f=function(t){return(0,e.Z)({method:"PATCH",url:"/v1_0/user/profile",data:t})},v=function(t){return(0,e.Z)({method:"PATCH",url:"/v1_0/user/photo",data:t})},p=function(){return(0,e.Z)({method:"GET",url:"/v1_0/article/collections"})},m=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user/histories",params:{page:1,per_page:200}})},g=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user/followers",params:{page:1,per_page:200}})},h=function(){return(0,e.Z)({method:"GET",url:"/v1_0/user/followings",params:{page:1,per_page:200}})}},9864:function(t){"use strict";t.exports="data:image/png;base64,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"},2173:function(t,n,r){"use strict";r.d(n,{Z:function(){return o}});r(7941),r(2526),r(7327),r(1539),r(5003),r(4747),r(9337);function e(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function s(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function o(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?s(Object(r),!0).forEach((function(n){e(t,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))}))}return t}}}]);