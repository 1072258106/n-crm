import axios from 'axios'
import QRCode from 'qrcode'
    export default{
        data(){
            return {
                elements:[],
                isPC: false,
                isFireFox:false,
                startPosition: {
                    left: 0,
                    top: 0
                },
                boxPosition: {
                    left: 0,
                    top: 0
                }
            }
        },
        computed: {
            widowWidth() {
                let width = document.getElementsByTagName('html')[0].offsetWidth;
                return width;
            }
        },
        mounted() {
            console.info(this)
            this.getMeta();
            console.info(this.$route.query.id)
            console.info(this.$route.query.shop_id)
            let params = {
                id: this.$route.query.id,
                //shop_id: parseInt(this.$route.query.shop_id)
            }
            this.$http.get('/h5/page?id='+this.$route.query.id+'&user_id='+this.$route.query.user_id).then(
                response => {
                    response = response.data;
                    if(response.code == 0) {
                        document.getElementsByTagName('title')[0].innerHTML = response.data.title;//更改网页的标题
                        let page = JSON.parse(response.data.content);
                        //let page = res.data.list[0];
                        console.info(page)
                        this.elements = page;
                        //绘制二维码
                        let canvas = document.getElementById('canvas');
                        let opt = { errorCorrectionLevel: 'H', margin: 3 }
                        QRCode.toCanvas(canvas, response.data.short_url, opt, function(error) {});
                    }
                }
            )

            //判断是否为pc端
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
                this.isPC = false;
            } else if (/(Android)/i.test(navigator.userAgent)) {  
                this.isPC = false;
            } else {  
                this.isPC = true;
                document.getElementById('app').style.backgroundImage = 'url(../../../static/img/bg.png)';
                document.getElementById('app').style.backgroundColor = '#97bbd0';
                if(navigator.userAgent.indexOf("Firefox") > -1){//判断是否为火狐
                    this.isFireFox = true;
                }
            };  
        },
        methods:{
            getMeta() {
                let meta = document.createElement("meta");
                meta.name = 'viewport';
                meta.content='"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"';
                let body = document.getElementsByTagName('body')[0];
                body.appendChild(meta);
                document.getElementById('app').style.overflow = 'visible';
            },
            modify(str) {//修改iframe大小
                let result,regWidth,regHeight;
                if(str.indexOf('youku')){
                    regWidth = /(width=)\S\S\S?/;
                    regHeight = /(height=)\S\S\S?/;
                    this.elements[this.nowIndex].videoShow = true;                    
                }else if(str.indexOf('qq')){
                    regWidth = /(width=")\S\S\S\S?/;
                    regHeight = /(height=")\S\S\S\S?/;
                    this.elements[this.nowIndex].videoShow = true;                    
                }else{
                    this.elements[this.nowIndex].videoShow = false;
                }
                result = str.replace(regWidth,'width=100% ');
                result = result.replace(regHeight,'height=100% ');
                console.info(result)
                return result;
            },
        }
    }