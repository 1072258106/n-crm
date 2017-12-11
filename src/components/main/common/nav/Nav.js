export default {
    data() {
      return {
          isCollapse: false,
          switchIcon: 'icon-sandaogangwutianchong',
      };
    },
    props: {
        padding:{
            type: Number
        }
    },
    computed: {
        activeNow() {
            console.log(this.$route)
            let result;
            if(this.$route.matched.length > 3) {
                result = this.$route.matched[2].path;
            }else{
                result = this.$route.fullPath;
            }
            if(this.$route.path.indexOf('/main/message/state') >= 0) {
                result = '/main/message/record';
            }
            if(this.$route.path.indexOf('/main/recharge') >= 0) {
                result = '/main/recharge';
            }
            
            return result;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        on() {
            console.log(this.padding)
            this.isCollapse = true;
            //this.padding = 160;
            this.$emit('change',240);
        },
        off() {
            console.log(this.padding)
            this.isCollapse = false;
            this.$emit('change',64);
            //this.padding = 64;
        },
        switchs() {
            if(!this.isCollapse) {
                this.isCollapse = true;
                this.switchIcon = 'icon-sandaogangwutianchong';
                this.$emit('change',64);
            }else{
                this.isCollapse = false;
                this.switchIcon = 'icon-fold';
                this.$emit('change',160);
            }
        }
    }
  }