(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["appreciation"],{"0040":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-joinshop hide-scroll "},[a("my-header",{attrs:{lefticon:!0},on:{click:function(e){return t.$router.push("/setmeal")}}},[t._v("参与门店")]),a("div",{staticClass:"content_search"},[a("van-search",{attrs:{shape:"round","show-action":"",background:"#f9f9fb",clearable:!1,"left-icon":"none",placeholder:"请输入商品关键词或用户名"},on:{search:t.search,cancel:function(e){t.params.storeName=""}},model:{value:t.params.storeName,callback:function(e){t.$set(t.params,"storeName",e)},expression:"params.storeName"}},[a("svg",{staticClass:"icon",attrs:{slot:"right-icon","aria-hidden":"true"},on:{click:t.search},slot:"right-icon"},[a("use",{attrs:{"xlink:href":"#icon-fangdajing"}})])]),a("img",{attrs:{src:s("d236"),alt:""},on:{click:function(e){t.toggle=!t.toggle}}})],1),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.toggle,expression:"toggle"}],staticClass:"popup"},[a("div",{staticClass:"perfect"},[a("p",[t._v("信息完善")]),a("div",{staticClass:"select"},[a("button",{class:{active:1===t.params.perfect},on:{click:function(e){return t.select(1)}}},[t._v(" 已完善 ")]),a("button",{class:{active:0===t.params.perfect},on:{click:function(e){return t.select(0)}}},[t._v(" 未完善 ")])])]),a("div",{staticClass:"mask",on:{click:function(e){t.toggle=!t.toggle}}})])]),a("div",{staticClass:"items hide-scroll",on:{"&scroll":function(e){return t.pullUp(e)}}},[a("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},t._l(t.list,(function(e){return a("div",{key:e.id,staticClass:"item"},[a("img",{attrs:{src:e.urls.length>0?e.urls[0].url:t.defaultImg,alt:""}}),a("div",{staticClass:"discription"},[a("div",{staticClass:"name"},[t._v(t._s(e.storeName))]),a("div",{staticClass:"perfect"},[t._v(" 信息完善："+t._s(e.isPerfect?"已完善":"未完善")+" ")])]),a("div",{staticClass:"ischeck",on:{click:function(t){e.isSelect=!e.isSelect}}},[a("img",{attrs:{src:e.isSelect?t.activeIcon:t.inactiveIcon,alt:""}})])])})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:t.finished,expression:"finished"}],staticClass:"nomore"},[t._v(t._s(t.finishedText))])],1),a("div",{staticClass:"button-container"},[a("van-button",{on:{click:t.submit}},[t._v(" 立即参与 ")])],1)],1)},i=[],n=(s("99af"),s("4160"),s("498a"),s("159b"),s("2909")),r=(s("96cf"),s("1da1")),c=s("b775"),o={name:"addjoinshop",data:function(){return{defaultImg:s("7701"),activeIcon:s("d8c0"),inactiveIcon:s("22d0"),list:[],refreshing:!1,finished:!1,finishedText:"没有更多了",loading:!0,checked:0,params:{currentPage:1,pageSize:10,packageId:5,perfect:"",storeName:"",vasId:""},toggle:!1}},activated:function(){this.$route.params.packageId&&(this.params.packageId=this.$route.params.packageId),this.list=[],this.getList(this.params)},methods:{getList:function(t,e){var s=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log(t.packageId),a.prev=1,a.next=4,Object(c["a"])("/api/".concat(s.params.packageId,"/",2,"/storeIdDetailPackage"),t);case 4:if(i=a.sent,console.log(i),r=i.code,o=i.data,"200"!==r){a.next=18;break}if(!(o.data.length<10)){a.next=14;break}if(s.finishedText="没有更多了",s.finished=!0,0!==o.data.length){a.next=14;break}return s.$toast("搜索不到哦！"),a.abrupt("return");case 14:s.list=[].concat(Object(n["a"])(s.list),Object(n["a"])(o.data)),s.list.forEach((function(t){s.$set(t,"isSelect",!1)})),console.log(s.list),e&&e();case 18:a.next=23;break;case 20:a.prev=20,a.t0=a["catch"](1),console.log(a.t0);case 23:case"end":return a.stop()}}),a,null,[[1,20]])})))()},search:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(s=t.params.storeName.trim(),s){e.next=4;break}return t.$toast("请输入搜索关键字"),e.abrupt("return");case 4:t.list=[],t.params.currentPage=1,t.getList(t.params);case 7:case"end":return e.stop()}}),e)})))()},pullUp:function(t){},onRefresh:function(){var t=this;this.params.currentPage=1,this.list=[],this.finished=!1,this.getList(this.params,(function(){return t.refreshing=!1}))},select:function(t){this.params.perfect=t,this.toggle=!1},submit:function(){var t=this,e=[];if(this.list.forEach((function(t){t.isSelect&&e.push(t.id)})),0===e.length)return this.$toast("请选择要参与的门店");this.$dialog.confirm({title:"已选择".concat(e.length,"家门店，是否确认参与？"),message:"确认参与后不可取消"}).then(Object(r["a"])(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,Object(c["c"])("/api/storeInPackage",{packageIds:[t.params.packageId],storeIds:e});case 2:a=s.sent,t.$router.push({name:"feedback",params:{mark:"add",res:a}});case 4:case"end":return s.stop()}}),s)})))).catch((function(e){"cancel"!==e?console.log(e):t.$toast("取消成功")}))}}},l=o,u=(s("5280"),s("2877")),d=Object(u["a"])(l,a,i,!1,null,"42bffd86",null);e["default"]=d.exports},"095b":function(t,e,s){},"1bf4":function(t,e,s){"use strict";var a=s("7cd7"),i=s.n(a);i.a},"22d0":function(t,e,s){t.exports=s.p+"img/lujing503_2.png"},"2c29":function(t,e,s){t.exports=s.p+"img/xiulichang-1_2.png"},"43dd":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"appreciation hide-scroll"},[s("my-header",{attrs:{lefticon:!0},on:{click:t.back}},[t._v("增值服务")]),s("form",{attrs:{action:"/"}},[s("van-search",{attrs:{shape:"round",background:"#f9f9fb",clearable:!1,"show-action":"","left-icon":"none",placeholder:"请输入商品关键词或用户名"},on:{search:t.search,cancel:function(e){t.value=""}},model:{value:t.params.searchKey,callback:function(e){t.$set(t.params,"searchKey",e)},expression:"params.searchKey"}},[s("svg",{staticClass:"icon",attrs:{slot:"right-icon","aria-hidden":"true"},on:{click:t.search},slot:"right-icon"},[s("use",{attrs:{"xlink:href":"#icon-fangdajing"}})])])],1),s("div",{staticClass:"items hide-scroll",on:{"&scroll":function(e){return t.pullUp(e)}}},[s("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[t._l(t.list,(function(e){return s("div",{key:e.id,staticClass:"item"},[s("div",{staticClass:"top"},[s("div",{staticClass:"label"},[t._v("增值服务名称")]),s("div",{staticClass:"content"},[t._v(t._s(e.vasName))])]),s("div",{staticClass:"bottom"},[s("div",{staticClass:"label"},[t._v("发行方")]),s("div",{staticClass:"content"},[t._v(t._s(e.publisher))])]),s("div",{staticClass:"buttons"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.params.storeId,expression:"!params.storeId"}],on:{click:function(s){return t.$router.push({name:"joinshop",params:{vasId:e.id}})}}},[t._v(" 参与门店 ")]),s("div",{on:{click:function(s){return t.$router.push({name:"setmeal",params:{storeId:t.params.storeId,vasId:e.id,vasName:e.vasName}})}}},[t._v(" 查看套餐 ")])])])})),s("div",{directives:[{name:"show",rawName:"v-show",value:t.finished,expression:"finished"}],staticClass:"nomore"},[t._v(t._s(t.finishedText))])],2)],1)],1)},i=[],n=(s("b0c0"),s("498a"),s("96cf"),s("1da1")),r=s("b775"),c={name:"appreciation",data:function(){return{defaultImg:s("2c29"),list:[],params:{searchKey:"",currentPage:1,pageSize:10,storeId:""},finished:!1,loading:!0,isLoading:!1,finishedText:"没有更多了"}},activated:function(){this.getList()},methods:{search:function(){var t=this.params.searchKey.trim();t?this.getList(this.params):this.$toast("请输入搜索关键字")},getList:function(t,e){var s=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,n,c,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(r["a"])("/api/vasDetail",t);case 3:i=a.sent,console.log(i),n=i.data,c=n.code,o=n.data,"200"===c&&(o.data.length<10&&(s.finished=!0,s.finishedText="没有更多了",0===o.data.length&&(s.finishedText="暂无数据")),s.list=o.data,e&&e()),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](0),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})))()},onRefresh:function(){var t=this;this.params.currentPage=1,this.list=[],this.finished=!1,this.getList(this.params,(function(){t.isLoading=!1}))},pullUp:function(t){var e=this,s=t.target.scrollHeight-t.target.scrollTop-t.target.clientHeight;!this.finished&&s<200&&this.loading&&(this.loading=!1,this.params.currentPage++,this.getList(this.params,(function(){return e.loading=!0})))},back:function(){this.params.storeId?this.$router.push("/shopManage"):this.$router.push("/home/index")}},beforeRouteEnter:function(t,e,s){s((function(t){"shopmanage"===e.name&&(t.params.storeId=t.$route.query.storeId),"index"===e.name&&(t.params.storeId="")}))}},o=c,l=(s("f2f6"),s("2877")),u=Object(l["a"])(o,a,i,!1,null,"314317f8",null);e["default"]=u.exports},"498a":function(t,e,s){"use strict";var a=s("23e7"),i=s("58a8").trim,n=s("c8d2");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return i(this)}})},5280:function(t,e,s){"use strict";var a=s("ebc1"),i=s.n(a);i.a},5530:function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));s("a4d3"),s("4de4"),s("4160"),s("e439"),s("dbb4"),s("b64b"),s("159b");function a(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function i(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function n(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?i(Object(s),!0).forEach((function(e){a(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):i(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}},"57a3":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"join-shop hide-scroll"},[a("my-header",{attrs:{lefticon:!0},on:{click:t.back}},[t._v("参与门店")]),a("div",{staticClass:"content_search"},[a("van-search",{attrs:{shape:"round","show-action":"",background:"#f9f9fb",clearable:!1,"left-icon":"none",placeholder:"请输入商品关键词或用户名"},on:{search:t.search,cancel:function(e){t.params.storeName=""}},model:{value:t.params.storeName,callback:function(e){t.$set(t.params,"storeName",e)},expression:"params.storeName"}},[a("svg",{staticClass:"icon",attrs:{slot:"right-icon","aria-hidden":"true"},on:{click:t.search},slot:"right-icon"},[a("use",{attrs:{"xlink:href":"#icon-fangdajing"}})])]),a("img",{attrs:{src:s("d236"),alt:""},on:{click:function(e){t.toggle=!t.toggle}}})],1),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.toggle,expression:"toggle"}],staticClass:"popup",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.toggle=!1}}},[a("div",{staticClass:"name"},[a("p",[t._v("套餐名称:")]),a("div",{staticClass:"select"},[a("button",{class:{active:t.params.type.wash},on:{click:function(e){t.params.type.wash=!t.params.type.wash}}},[t._v(" 洗车套餐 ")]),a("button",{class:{active:t.params.type.upkeep},on:{click:function(e){t.params.type.upkeep=!t.params.type.upkeep}}},[t._v(" 保养套餐 ")])])]),a("div",{staticClass:"status"},[a("p",[t._v("参与状态：")]),a("div",{staticClass:"select"},[a("button",{class:{active:3===t.params.status},on:{click:function(e){return t.select(3)}}},[t._v(" 审核中 ")]),a("button",{class:{active:1===t.params.status},on:{click:function(e){return t.select(1)}}},[t._v(" 通过 ")]),a("button",{class:{active:2===t.params.status},on:{click:function(e){return t.select(2)}}},[t._v(" 驳回 ")])])])])]),a("div",{staticClass:"items hide-scroll",on:{"&scroll":function(e){return t.pullUp(e)}}},[a("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[t._l(t.list,(function(e){return a("div",{key:e.id,staticClass:"item"},[a("img",{attrs:{src:e.urls.length>0?e.urls[0].url:t.defaultImg,alt:""}}),a("div",{staticClass:"discription"},[a("div",{staticClass:"name"},[t._v(t._s(e["store_name"]))]),a("div",[t._v("套餐名称："+t._s(e["package_name"]))]),a("div",{class:{success:1===e["store_status"],fail:2===e["store_status"]}},[t._v(" 审核信息："+t._s(t._f("handleStatus")(e["store_status"]))+" ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:2===e["store_status"],expression:"item['store_status'] === 2"}],staticClass:"button-container",on:{click:function(e){return t.reason(1)}}},[t._v(" 驳回原因 ")])])})),a("div",{directives:[{name:"show",rawName:"v-show",value:t.finished,expression:"finished"}],staticClass:"nomore"},[t._v(t._s(t.finishedText))])],2)],1)],1)},i=[],n=(s("99af"),s("498a"),s("2909")),r=s("5530"),c=(s("96cf"),s("1da1")),o=s("b775"),l={name:"joinshop",data:function(){return{defaultImg:s("7701"),list:[],refreshing:!1,finished:!1,finishedText:"没有更多了",loading:!0,checked:0,params:{currentPage:1,pageSize:10,status:"",type:{wash:!1,upkeep:!1},storeName:""},vasId:"",toggle:!1}},activated:function(){this.$route.params.vasId&&(this.vasId=this.$route.params.vasId),this.list=[],this.getList(this.params)},deactivated:function(){Object.assign(this.$data.params,this.$options.data().params)},methods:{getList:function(t,e){var s=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var i,c,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(o["a"])("/api/storeDetailByVasId",Object(r["a"])(Object(r["a"])({},t),{},{vasId:s.vasId}));case 3:i=a.sent,console.log(i),c=i.code,l=i.data,"200"===c&&(l.data.length<10&&(s.finishedText="没有更多了",s.finished=!0),s.list=[].concat(Object(n["a"])(s.list),Object(n["a"])(l.data)),e&&e()),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](0),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})))()},getPackge:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(o["a"])("/api/".concat(e.vasId,"/packageDetailVasId"));case 3:s=t.sent,console.log(s),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},search:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var s,a,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(s=t.params.storeName.trim(),s){e.next=4;break}return t.$toast("请输入搜索关键字"),e.abrupt("return");case 4:return t.list=[],t.params.currentPage=1,e.prev=6,e.next=9,Object(o["a"])("/api/store-info/storeInfoList",Object(r["a"])({vasid:t.vasId},t.params));case 9:a=e.sent,i=a.code,c=a.data,"200"===i&&(c.data.length<10&&(t.finishedText="没有更多了",t.finished=!0),0===c.data.length&&t.$toast("搜索不到哦！"),t.list=[].concat(Object(n["a"])(t.list),Object(n["a"])(c.data))),e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](6),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[6,14]])})))()},pullUp:function(t){var e=this,s=t.target.scrollHeight-t.target.scrollTop-t.target.clientHeight;!this.finished&&s<200&&this.loading&&(this.loading=!1,this.params.currentPage++,this.getList(this.params,(function(){return e.loading=!0})))},onRefresh:function(){var t=this;this.params.currentPage=1,this.params.status="",this.list=[],this.finished=!1,this.getList(this.params,(function(){return t.refreshing=!1}))},select:function(t){this.params.status=t,this.toggle=!1,this.list=[],this.getList()},back:function(){this.$route.params.vasId?this.$router.push("/appreciation"):this.$router.push("/setmeal")},reason:function(t){this.$dialog({title:"驳回原因",message:"该店存在违规行为"})}},computed:{hanleType:function(){return this.params.type.wash&&this.params.type.upkeep?["洗车套餐","保养套餐"]:this.params.type.wash&&!this.params.type.upkeep?["洗车套餐"]:this.params.type.upkeep&&!this.params.type.wash?["保养套餐"]:void 0}},filters:{handleStatus:function(t){var e="";switch(t){case 1:e="通过";break;case 2:e="驳回";break;default:e="审核中"}return e}},watch:{hanleType:function(t){t&&this.getPackge(t)}}},u=l,d=(s("e2df"),s("2877")),p=Object(d["a"])(u,a,i,!1,null,"384a8ccd",null);e["default"]=p.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var a=s("1d80"),i=s("5899"),n="["+i+"]",r=RegExp("^"+n+n+"*"),c=RegExp(n+n+"*$"),o=function(t){return function(e){var s=String(a(e));return 1&t&&(s=s.replace(r,"")),2&t&&(s=s.replace(c,"")),s}};t.exports={start:o(1),end:o(2),trim:o(3)}},"636f":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"feed-back pdtop"},[s("my-header",[t._v(t._s(t.title))]),s("div",{staticClass:"main"},[s("img",{attrs:{src:"200"===t.res.code?t.success:t.err,alt:""}}),s("div",{staticClass:"text"},[t._v(" "+t._s("200"===t.res.code?t.msg1:t.msg2)+" ")]),s("div",{staticClass:"button-container"},[s("van-button",{on:{click:function(e){return t.$router.push("/home/index")}}},[t._v("返回首页")]),s("van-button",{on:{click:function(e){return t.$router.push("/appreciation")}}},[t._v("继续参与")])],1)])],1)},i=[],n={name:"feedback",data:function(){return{title:"参与成功",success:s("d8c0"),err:s("22d0"),msg1:"恭喜您，参与成功!请耐心等待审核结果",msg2:"抱歉，参与失败！",res:{}}},activated:function(){this.res=this.$route.params.res,"200"!==this.res.code&&(this.msg2=this.res.message)}},r=n,c=(s("1bf4"),s("2877")),o=Object(c["a"])(r,a,i,!1,null,"1b9a7c32",null);e["default"]=o.exports},7701:function(t,e,s){t.exports=s.p+"img/huluwa.jpg"},"7cd7":function(t,e,s){},bbd1:function(t,e,s){},c8d2:function(t,e,s){var a=s("d039"),i=s("5899"),n="​᠎";t.exports=function(t){return a((function(){return!!i[t]()||n[t]()!=n||i[t].name!==t}))}},c91a:function(t,e,s){},d236:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAAOklEQVQ4T2NkYGC4wMDAoM9AXXCekZYGU9etUNNALqYJGDUYHqw0TRU0S8ejqQIcAkMzHdMsVdDEYABu1ArlkMGN/wAAAABJRU5ErkJggg=="},d247:function(t,e,s){"use strict";var a=s("095b"),i=s.n(a);i.a},d8c0:function(t,e,s){t.exports=s.p+"img/lujing505_2.png"},dbb4:function(t,e,s){var a=s("23e7"),i=s("83ab"),n=s("56ef"),r=s("fc6a"),c=s("06cf"),o=s("8418");a({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,s,a=r(t),i=c.f,l=n(a),u={},d=0;while(l.length>d)s=i(a,e=l[d++]),void 0!==s&&o(u,e,s);return u}})},e2df:function(t,e,s){"use strict";var a=s("c91a"),i=s.n(a);i.a},e439:function(t,e,s){var a=s("23e7"),i=s("d039"),n=s("fc6a"),r=s("06cf").f,c=s("83ab"),o=i((function(){r(1)})),l=!c||o;a({target:"Object",stat:!0,forced:l,sham:!c},{getOwnPropertyDescriptor:function(t,e){return r(n(t),e)}})},ea17:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"set-meal hide-scroll pdtop"},[s("my-header",{attrs:{lefticon:!0},on:{click:function(e){return t.$router.push("/appreciation")}}},[t._v("套餐管理")]),s("div",{staticClass:"main hide-scroll"},[s("van-tabs",{attrs:{color:"#4849A1","title-active-color":"#4849A1",animated:"",swipeable:"",ellipsis:!1,sticky:"","offset-top":"86px"},on:{change:t.change},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.list,(function(e){return s("van-tab",{key:e.id,attrs:{name:e.id,title:e.packageName}},[s("div",{staticClass:"block"},[s("div",{staticClass:"description"},[s("div",{staticClass:"item"},[s("div",{staticClass:"label"},[t._v("套餐名称")]),s("div",{staticClass:"content"},[t._v(t._s(e.packageName))])]),s("div",{staticClass:"item"},[s("div",{staticClass:"label"},[t._v("增值服务名称")]),s("div",{staticClass:"content"},[t._v(t._s(t.vasName))])]),s("div",{staticClass:"item"},[s("div",{staticClass:"label"},[t._v("发行方")]),s("div",{staticClass:"content"},[t._v(t._s(e.publisher))])])]),s("div",{staticClass:"allow-production"},[s("div",{staticClass:"title"},[t._v(" 可用项目 ")]),s("div",{staticClass:"items"},[s("div",{staticClass:"label"},[s("div",[t._v("业务类型")]),s("div",{staticClass:"center"},[t._v("项目名称")]),s("div",[t._v("成本")])]),t._l(e.baseItemPackageDetailVOS,(function(e,a){return s("div",{key:a,staticClass:"item"},[s("div",[t._v(t._s(e.itemType))]),s("div",{staticClass:"center"},[t._v(t._s(e.itemName))]),s("div",[t._v("¥"+t._s(e.price))])])}))],2)]),s("div",{staticClass:"allow-goods"},[s("div",{staticClass:"title"},[t._v(" 可用商品 ")]),s("div",{staticClass:"items"},[s("div",{staticClass:"label"},[s("div",[t._v("商品名称")]),s("div",{staticClass:"center"},[t._v("规格")]),s("div",{staticClass:"guidePrice"},[t._v("成本")]),s("div",[t._v("数量")])]),t._l(e.partPackageDetailVOS,(function(e,a){return s("div",{key:a,staticClass:"item"},[s("div",[t._v(t._s(e.accessoriesName))]),s("div",{staticClass:"center"},[t._v(t._s(e.specification))]),s("div",{staticClass:"guidePrice"},[t._v(t._s(e.costPrice))]),s("div",[t._v(t._s(e.amount))])])}))],2)]),s("div",{staticClass:"inform"},[s("div",{staticClass:"title"},[t._v(" 服务须知 ")]),s("div",{staticClass:"items"},[s("div",{staticClass:"item"},[t._v(" 有效期："+t._s(t._f("timeFilter")(e.startTime,"YYYY.MM.DD"))+"至"+t._s(t._f("timeFilter")(e.endTime,"YYYY.MM.DD"))+" ")]),s("div",{staticClass:"item"},[t._v("预约信息："+t._s(e.reserveInfo))]),s("div",{staticClass:"item"},[t._v("服务对象：5座以上车辆不予服务")]),s("div",{staticClass:"item rules"},[s("div",{staticClass:"label"},[t._v("规则描述：")]),s("div",[t._v(t._s(e.ruleDescription))])]),s("div",{staticClass:"item tips"},[s("div",{staticClass:"label"},[t._v("温馨提示：")]),s("div",[t._v(" 为了保障您的权益，建议使用亲车吧线上支付。若使 用其他支付方式导致纠纷的，亲车吧不承担任何责任， 感谢你的理解和支持！ ")])])])])])])})),1),s("div",{staticClass:"button-container"},[s("van-button",{on:{click:t.join}},[t._v(t._s(t.txt?t.txt:"选择参与门店"))])],1)],1)],1)},i=[],n=(s("4160"),s("159b"),s("96cf"),s("1da1")),r=s("b775"),c=(s("1619"),{name:"setmeal",data:function(){return{active:"",list:[],storeId:"",vasId:"",vasName:"",txt:""}},activated:function(){this.$route.params.storeId?(this.storeId=this.$route.params.storeId,this.txt="立即参与"):this.txt="",this.$route.params.vasId&&(this.vasId=this.$route.params.vasId,this.vasName=this.$route.params.vasName,this.list=[],this.getList())},methods:{getList:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var s,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(r["a"])("/api/".concat(t.vasId,"/packageDetailVasId"));case 3:s=e.sent,console.log(s,"res1"),a=s.code,i=s.data,"200"===a&&i.data.forEach(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(s){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["a"])("/api/".concat(s.id,"/packageDetail"));case 2:a=e.sent,console.log(a,"res2"),"200"===a.code&&t.list.push(a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},change:function(t,e){console.log(t)},join:function(){var t=this;this.$route.params.storeId?this.$dialog.confirm({title:"是否确认参与？",message:"确认参与后不可取消"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["c"])("/api/storeInPackage",{packageIds:[t.active],storeIds:[t.$route.params.storeId]});case 2:s=e.sent,console.log(s),t.$router.push({name:"feedback",params:{res:s}});case 5:case"end":return e.stop()}}),e)})))).catch((function(e){"cancel"!==e?console.log(e):t.$toast("取消成功")})):this.$router.push({name:"addjoinshop",params:{packageId:this.active}})}}}),o=c,l=(s("d247"),s("2877")),u=Object(l["a"])(o,a,i,!1,null,"c13739f4",null);e["default"]=u.exports},ebc1:function(t,e,s){},f2f6:function(t,e,s){"use strict";var a=s("bbd1"),i=s.n(a);i.a}}]);