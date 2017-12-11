import show from '../_components/Show';
export default{
    components: {
        show
    },
    data() {
        return {
            header: {
                "Access-Token": this.$store.state.token
            },
            globalApi: this.$store.state.globalApi,
            htmlName: '',
            htmlId:'',
            items:[
                {
                    'icon': '../../../../../../../static/img/word.png',
                    'text': '文字'
                },
                {
                    'icon': '../../../../../../../static/img/pic.png',
                    'text': '图片'
                },
                {
                    'icon': '../../../../../../../static/img/radio.png',
                    'text': '视频'
                }
            ],
            elements:[],
            left: 0,
            top:0,
            padding:0,
            fontSize:12,
            priceColor:'#ff5500',
            color: '#000',
            borderWidth:0,
            borderColor: '#000',
            background: '#fff',
            width:0,
            height:0,
            href:'',//除视频外的元素的跳转地址
            text:'请输入文字',
            src:'',
            videoSrc:'',
            nowIndex: {
                type: Number
            },
            valueShow: false,
            controlType: 'text',
            startPosition: {
                left: 0,
                top: 0
            },
            showPhone: false,
            zIndex: 0,
            showVisible: false,//预览框可见参数
            showContent: '',//预览传递的参数
            bigImgVisible: false,
            imageUrl:''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.globalApi + '/tools/image_upload';
        }
        // width() {
        //     if(document.getElementsByClassName('selected')[0]){
        //         console.info(document)
        //         console.info('computWidth:',document.getElementsByClassName('selected')[0])
        //     }
        //     //console.info('computWidth:',document.getElementsByClassName('seleted')[0].offsetWidth)
        //     return 'auto';
        // },
        // height() {
        //     return 'auto';
        // }
    },
    watch:{
        //将控制器的值赋予当前元素
        'left': function() {
            this.elements[this.nowIndex].css.left = this.left
        },
        'top': function() {
            this.elements[this.nowIndex].css.top = this.top
        },
        'padding': function() {
            this.elements[this.nowIndex].css.padding = this.padding
        },
        'color': function() {
            this.elements[this.nowIndex].css.color = this.color
        },
        'background': function() {
            this.elements[this.nowIndex].css.background = this.background
        },
        'fontSize': function() {
            this.elements[this.nowIndex].css.fontSize = this.fontSize
        },
        'priceColor': function() {
            this.elements[this.nowIndex].css.priceColor = this.priceColor
        },
        'borderWidth': function() {
            this.elements[this.nowIndex].css.borderWidth = this.borderWidth
        },
        'borderColor': function() {
            this.elements[this.nowIndex].css.borderColor = this.borderColor
        },
        'transform':function() {
            this.elements[this.nowIndex].css.transform = this.transform
        },
        'videoSrc': function() {
            this.elements[this.nowIndex].videoSrc = this.videoSrc
        },
        'height': function() {
            this.elements[this.nowIndex].css.height = this.height
        },
        'width': function() {
            this.elements[this.nowIndex].css.width = this.width
        },
        'text': function() {
            this.elements[this.nowIndex].text = this.text
        }
        // 'src': function() {
        //     this.elements[this.nowIndex].src = this.src
        // },

    },
    methods: {
        insertElements (index,obj) {
            let item = {
                'type': 'text',
                'href': '',
                'text': '请输入文字',
                'src': '',
                'videoShow': true,
                'css': {
                    'left': 0,
                    'top': 0,
                    'color': '#000',
                    'fontSize': 12,
                    'lineHeight': 12,
                    'height': '100',
                    'width': 'auto',
                    'background': '#fff',
                    'padding': 8,
                    'borderWidth': 1,
                    'borderColor': '#000',
                    'transform': 'none',
                    'zIndex': 0,
                    'borderWidth':0,
                    'textAlign':'left'
                },
            };
            if (index == 1) {
                item.type = 'img';
            }
            if (index == 2) {
                item.type = 'video';
                item.videoSrc = '';
                item.videoShow = false;
            }
            this.elements.push(item)
            this.nowIndex = this.elements.length - 1;//插入新的元素就选择这个元素
            this.valueShow = true//插入新的元素就对这个元素开启控制
            this.controlType = item.type;//插入新的元素就选择这个元素的控制器类型
        },
        choose (index) {
            // if(this.nowIndex == index) {
            //     return
            // }
            console.info('index:',index)
            console.info('elements:',this.elements)
            console.info('top:',this.top)
            this.nowIndex = index

            this.valueShow = true//开启控制器
            //将控制器转换为当前元素的类型
            this.controlType = this.elements[index].type;

            //图片获取高宽度
            console.info('computedWid:',document.getElementsByClassName('elements')[index])
            this.width = document.getElementsByClassName('elements')[index].offsetWidth
            this.height = document.getElementsByClassName('elements')[index].offsetHeight
            //图片获取高宽度

            //将控制器的值赋为当前元素的值
            this.left = this.elements[index].css.left
            this.top = this.elements[index].css.top
            this.padding = this.elements[index].css.padding
            this.color = this.elements[index].css.color
            this.text = this.elements[index].text
            //将控制器的值赋为当前元素的值

            return false;
            //右键删除
            // document.oncontextmenu = function(ev){
            //     if(ev.target.getAttribute('right') == 'myright') {

            //     }
                
            // };
        },
        change () {
            console.info(this.left)
        },
        animate() {  
            this.transform = 'rotate(30deg)';
        },
        dragStart(index,e) {
            this.choose(index)
            this.startPosition.left = e.screenX;
            this.startPosition.top = e.screenY;
        },
        dragEnd(e) {
            console.info('end',e)
            this.left += e.screenX - this.startPosition.left;
            this.top += e.screenY - this.startPosition.top;
        },
        fixTop() {
            this.zIndex++;
            this.elements[this.nowIndex].css.zIndex = this.zIndex;
        },
        save() {
            // let content = document.getElementById('works').innerHTML;
            // console.info('content',content)
            // this.showPhone = true;
            // setTimeout(function(){
            //     let newContainer = document.getElementById('showPhone');
            //     console.log(newContainer)
            //     newContainer.innerHTML = content;
            // },0)
            
            //保存页面
            if(!this.htmlName){
                this.$alert('请输入网页名称', '', {
                    confirmButtonText: '确定'
                });
                return false;
            }
            let content = JSON.stringify(this.elements);
            let params = {
                title: this.htmlName,
                content: content
            }
            let postUrl = '/tools/page';
            if(this.htmlId) {
                params.id = this.htmlId;
                postUrl = '/tools/page_edit';
            }
            this.$http.post(postUrl,params).then(
                response => {
                    console.info('上传页面后',response);
                    let res = response.data;
                    if(res.code == 0){
                        // this.$alert('操作成功', {
                        //     confirmButtonText: '确定',
                        //     callback: action => {
                        //         this.$router.push('h5/list');
                        //     }
                        // });
                        this.$router.push('h5/list');
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        changeArr(how) {
            if(how == 'up'){
                let save = this.elements[this.nowIndex];
                this.elements[this.nowIndex] = this.elements[this.nowIndex - 1];
                this.elements[this.nowIndex-1] = save;
                this.nowIndex = this.nowIndex - 1;
            }
            if(how == 'down'){
                let save = this.elements[this.nowIndex];
                this.elements[this.nowIndex] = this.elements[this.nowIndex + 1];
                this.elements[this.nowIndex+1] = save;
                this.nowIndex = this.nowIndex + 1;
            }
            if(how == 'del'){
                this.elements.splice(this.nowIndex,1);
                this.nowIndex = -1;
                this.valueShow = false;
            }
        },
        blur() {
            // this.nowIndex = -1;
            // this.valueShow = false;
        },
        show() {
            this.showContent = JSON.stringify(this.elements);
            this.showVisible = true
        },
        init() {
            this.htmlName = '';
            this.htmlId = '';
            this.elements = [];
            this.nowIndex=-1;
            this.valueShow = false;
            this.controlType = 'text';
            this.showPhone = false;
            this.goodsList = [];
            this.zIndex = 0;
            this.quanListShow = false;
            this.showVisible = false;
            this.showContent =  '';
        },
        verify(index) {
            let str = this.elements[index].videoSrc
            if(str.indexOf('youku')<0 && str.indexOf('qq')<0) {
                this.$message.error('请插入优酷、腾讯的通用视频链接');
                this.elements[index].videoShow = false;
            }
        },
        modify(index) {//修改iframe大小
            let str = this.elements[index].videoSrc
            let result,regWidth,regHeight;
            if(str.indexOf('youku') >= 0){
                regWidth = /(width=)\S\S\S?/;
                regHeight = /(height=)\S\S\S?/;
                this.elements[index].videoShow = true;   
                console.log('youku')                 
            }else if(str.indexOf('qq') >= 0){
                regWidth = /(width=")\S\S\S\S?/;
                regHeight = /(height=")\S\S\S\S?/;
                this.elements[index].videoShow = true;    
                console.log('qq')                
            }
            result = str.replace(regWidth,'width=100% ');
            result = result.replace(regHeight,'height=100% ');
            console.info(result)
            this.elements[index].videoSrc = result;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {
            console.info(file)
        },
        handleAvatarSuccess(res) {
            if(res.code == 0) {
                this.elements[this.nowIndex].src = this.globalApi + res.data.path;
            }else{
                this.$message.error(res.message)
            }
        },
        addHttp() {
            let href = this.elements[this.nowIndex].href;
            if(href.indexOf('http://') < 0 && href.indexOf('https://') < 0){
                this.elements[this.nowIndex].href = 'http://' + this.elements[this.nowIndex].href
            }
        },
        htmlNameVety() {
            if(this.htmlName.length >= 15) {
                this.$message.error('最多只能输入15个字符')
            }
        },
        initTextContent() {
            console.log(this.elements)
            if(this.elements[this.nowIndex].text == '请输入文字'){
                this.elements[this.nowIndex].text = '';
                console.log(this.elements)
            }
        }
    },
    mounted() {
        if(this.$route.query.id) {
            this.htmlId = this.$route.query.id;
            this.$http.get('/tools/page/'+this.htmlId).then(
                response => {
                    let res = response.data;
                    this.elements = JSON.parse(res.data.content)
                    this.htmlName = res.data.title;
                }
            )
        }
    },
    
}