export default{
    data() {
        return {
            hotClass: 1,
            classList: [],
            chooseType: 1,
            hotList: [],
            hotLoading:false
        }
    },
    methods: {
        rowList: function (row,hotList) {
            return hotList.slice(row,row+4);
        },
        chooseClass(id) {
            this.hotLoading = true;
            this.chooseType = id;
            this.$http.get("system/template/list?cid="+id).then(
                response => {
                    this.hotLoading = false;
                    let res = response.data
                    console.log(res.data.list)
                    this.hotList = res.data.list;
                }
            )
        },
        getClassList() {
            this.$http.get("/system/template/category").then(
                response => {
                    let res = response.data
                    this.classList = res.list;
                    this.chooseClass(this.classList[0].id);
                }
            )
        }
    },
    mounted() {
        this.getClassList();
    }
}