"use strict";(self["webpackChunkheadline"]=self["webpackChunkheadline"]||[]).push([[46],{8682:function(t,e,a){a.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"error-wrap"},[a("van-image",{staticClass:"img",attrs:{src:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F17%2F02%2F28%2F8e959816807d2a8b3796c76270ace890.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659079604&t=2842b0d4ce5043d9e3c96c369d0eb77f",fit:"contain"}})],1)},s=[],r={name:"NoData"},n=r,o=a(1001),l=(0,o.Z)(n,i,s,!1,null,"358f0f42",null),c=l.exports},6398:function(t,e,a){a.r(e),a.d(e,{default:function(){return h}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{fixed:"","left-arrow":"",title:"我的收藏"},on:{"click-left":function(e){return t.$router.back()}}}),t.isNoData?a("NoData"):a("van-list",{staticClass:"van-list",attrs:{"immediate-check":!1,finished:t.finished,"finished-text":"没有更多了",error:t.error,"error-text":"请求失败 , 点击重新加载"},on:{"update:error":function(e){t.error=e}},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(t,e){return a("ArticleItem",{key:e,attrs:{article:t}})})),1)],1)},s=[],r=a(5155),n=a(3434),o=a(8682),l={name:"userCollect",components:{ArticleItem:n.Z,NoData:o.Z},data(){return{list:[],loading:!1,finished:!1,error:!1,isNoData:null}},methods:{async loadUserCollect(){if(!this.$store.state.user)return this.$toast("您尚未登录!"),void this.$router.push("/login");this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0});try{const{data:t}=await(0,r.qi)(),{results:e}=t.data;this.list.push(...e),this.loading=!1,this.finished=!0,this.$toast("加载完成 !"),0===this.list.length?this.isNoData=!0:this.isNoData=!1}catch(t){this.$toast("发生未知错误 ! 请重试")}}},created(){this.loadUserCollect()},activated(){this.loadUserCollect()}},c=l,u=a(1001),d=(0,u.Z)(c,i,s,!1,null,"5952a6ba",null),h=d.exports}}]);