(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4801ab3c"],{1163:function(e,t,n){"use strict";n("45ec")},"45ec":function(e,t,n){},b9d6:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.records}},[n("el-table-column",{attrs:{type:"index",align:"center",label:"序号",width:"80"}}),n("el-table-column",{attrs:{prop:"skuName",label:"名称",width:"width"}}),n("el-table-column",{attrs:{prop:"skuDesc",label:"描述",width:"width"}}),n("el-table-column",{attrs:{prop:"prop",label:"默认图片",width:"110"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;e.$index;return[n("img",{attrs:{src:t.skuDefaultImg,width:"80px",height:"80px"}})]}}])}),n("el-table-column",{attrs:{align:"center",prop:"weight",label:"重量",width:"80"}}),n("el-table-column",{attrs:{align:"center",prop:"price",label:"价格",width:"80"}}),n("el-table-column",{attrs:{prop:"prop",label:"操作",width:"width"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;t.$index;return[0==r.isSale?n("el-button",{staticStyle:{background:"#666",border:"#666 solid 1px"},attrs:{type:"success",icon:"el-icon-bottom",size:"mini"},on:{click:function(t){return e.sale(r)}}},[e._v("下架")]):n("el-button",{attrs:{type:"success",icon:"el-icon-top",size:"mini"},on:{click:function(t){return e.cancel(r)}}},[e._v("上架")]),n("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:e.edit}}),n("el-button",{attrs:{type:"info",icon:"el-icon-info",size:"mini"},on:{click:function(t){return e.getSkuInfo(r)}}}),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"}})]}}])})],1),n("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"current-page":e.page,"page-sizes":[3,5,10],"page-size":e.limit,layout:"prev, pager, next, jumper, ->, sizes,total",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.getSkuList}}),n("el-drawer",{attrs:{visible:e.drawer,"show-close":!1,size:"50%"},on:{"update:visible":function(t){e.drawer=t}}},[n("el-row",[n("el-col",{attrs:{span:5}},[e._v("名称")]),n("el-col",{attrs:{span:16}},[e._v(e._s(e.skuInfo.skuName))])],1),n("el-row",[n("el-col",{attrs:{span:5}},[e._v("描述")]),n("el-col",{attrs:{span:16}},[e._v(e._s(e.skuInfo.skuDesc))])],1),n("el-row",[n("el-col",{attrs:{span:5}},[e._v("价格")]),n("el-col",{attrs:{span:16}},[e._v(e._s(e.skuInfo.price))])],1),n("el-row",[n("el-col",{attrs:{span:5}},[e._v("平台属性")]),n("el-col",{attrs:{span:16}},e._l(e.skuInfo.skuAttrValueList,(function(t,r){return n("el-tag",{key:t.id,staticStyle:{"margin-right":"10px"},attrs:{type:"success"}},[e._v(e._s(t.attrId)+" - "+e._s(t.valueId))])})),1)],1),n("el-row",[n("el-col",{attrs:{span:5}},[e._v("商品图片")]),n("el-col",{attrs:{span:16}},[n("el-carousel",{attrs:{height:"150px"}},e._l(e.skuInfo.skuImageList,(function(e){return n("el-carousel-item",{key:e.id},[n("img",{attrs:{src:e.imgUrl,width:"100%"}})])})),1)],1)],1)],1)],1)},a=[],s=n("291b"),i=(n("e186"),{name:"Sku",data:function(){return{page:1,limit:10,records:[],total:0,skuInfo:{},drawer:!1}},mounted:function(){this.getSkuList()},methods:{getSkuList:function(){var e=arguments,t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:1,t.page=r,n.next=4,t.$API.sku.reqSkuList(t.page,t.limit);case 4:a=n.sent,200===a.code&&(t.total=a.data.total,t.records=a.data.records);case 6:case"end":return n.stop()}}),n)})))()},handleSizeChange:function(e){this.limit=e,this.getSkuList()},sale:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$API.sku.reqSale(e.id);case 2:r=n.sent,200===r.code&&(t.$message.success("上架成功"),t.getSkuList());case 4:case"end":return n.stop()}}),n)})))()},cancel:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$API.sku.reqCancel(e.id);case 2:r=n.sent,200===r.code&&(t.$message.success("下架成功"),t.getSkuList());case 4:case"end":return n.stop()}}),n)})))()},edit:function(){this.$message("正在开发中")},getSkuInfo:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.drawer=!0,n.next=3,t.$API.sku.reqSkuById(e.id);case 3:r=n.sent,200===r.code&&(t.skuInfo=r.data);case 5:case"end":return n.stop()}}),n)})))()}}}),c=i,o=(n("1163"),n("cba8")),l=Object(o["a"])(c,r,a,!1,null,"f7f9740e",null);t["default"]=l.exports}}]);