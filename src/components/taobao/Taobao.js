// require styles
import swipeDirective from 'vue-ui-swipe'
import 'vue-ui-swipe/lib/ui-swiper.css'
export default{
    data() {
        return {
          swiperOption: {
            // some swiper options/callbacks
            // 所有的参数同 swiper 官方 api 参数
            // ...
            autoplay: 1000,
            pagination : '.swiper-pagination',
            paginationClickable :true,
          },
          swiperList: ['../../../static/img/banner-info.jpg','../../../static/img/banner-notice.jpg','../../../static/img/banner-sale.jpg'],
          info: {
                "item": {
                    "title": "",
                    "subtitle": "",
                    "images": [],
                    "favcount": 0,
                    "item_id": "",
                    "comment_count": 0
                },
                "props": {
                    "group_props": []
                },
                "rate": {
                    "total_count": 0,
                    "rate_list": []
                },
                "seller": {
                    "fans": "",
                    "user_id": "",
                    "shop_id": "",
                    "shop_name": "",
                    "shop_icon": "",
                    "all_item_count": "",
                    "new_item_count": null,
                    "seller_nick": "",
                    "credit_level": 0
                },
                "api_stack": [],
                "detail_desc": {
                    "data": {
                        "pages": [],
                        "images": []
                    }
                }
          },
          price:{},
          detailList: [],
          showIndex:0,
          tab: [
              {
                  'text': '图文详情',
                  'index': 0
              },
              {
                'text': '产品参数',
                'index': 1
            },
            {
                'text': '商品评论',
                'index': 2
            }
          ],
          propsList:[],
          rate: {
              total_count:0,
              rate_list:[]
          }
        }
      },
      computed: {
      },
      directives: {
        swipe: swipeDirective
      },
      methods: {
          getDetail() {
              this.$http.get('/h5/items_details?id=6&user_id=1').then(
                  response => {
                      let res = response.data;
                      if(res.code == 0) {
                          this.info = res.data;
                          this.detailList = res.data.detail_desc.data.images;
                          //this.propsList = res.data.props.group_props[0].info;
                          this.rate = res.data.rate;
                          this.price = this.getPrice(res.data.api_stack[0].value);
                          this.swiperList = res.data.item.images;
                          res.data.props.group_props[0].info.forEach(element => {
                                for (var key in element){//遍历键值对
                                    this.propsList.push(
                                        {
                                            'name': key,
                                            'value': element[key]
                                        }  
                                    )
                                } 
                          });
                      }
                  }
              )
          },
          getPrice(value) {
                let str = value.replace(/\\/g,"/");
                let obj = JSON.parse(str);
                let result = {
                    new: obj.price.price.priceText,
                    old: obj.price.extraPrices[0].priceText 
                }
                return result;
          },
          initSwiper() {
          },
          changeShow(index){
              this.showIndex = index;
          }
        //   match(str) {
        //     let result;
        //     if(str.match(/img(\S*)img/)[1]) {
        //         result = str.match(/<img>(\S*)</img>/)[1]
        //     }
        //     if(str.match(/tet(\S*)tet/)[1]) {
        //         result = str.match(/\<tex\>(\S*)\</tex\>/)[1]
        //     }
        //   }
      },
      mounted() {
        this.getDetail();
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
          //console.log('this is current swiper instance object', this.swiper)
          //this.swiper.slideTo(3, 1000, false)
          //添加meta
          let meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
          let head = document.getElementsByTagName('head')[0];
          head.appendChild(meta);
          let fbJs = document.createElement('script');
          fbJs.src = '../../../static/js/flexible.js';
          head.appendChild(fbJs);
          
          
      },
}