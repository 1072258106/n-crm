export default {
    data() {
      return {
        total: 0,
        search: {
          id: "",
          content: "",
          start_time: "",
          end_time: "",
          page_size: 8,
          page: 1
        },
        Statistics: {},
        dataRecords: [],
        recordLoading:false,
        total:0
      };
    },
    methods: {
      sendAgain(item) {
          if(item.type == 1) {
            this.$router.push({path:'/main/message/normal',query: {id: item.id}})
          }else{
            this.$router.push({path:'/main/message/variable',query: {id: item.id}})
          }
      },
      getLists() {
        let start_time, end_time;
        this.search.start_time != ""
          ? (start_time = formatDate(this.search.start_time))
          : (start_time = this.search.start_time);
        this.search.end_time != ""
          ? (end_time = formatDate(this.search.end_time))
          : (end_time = this.search.end_time);
        this.$http
          .get("/activity", {
            params: {
              content: this.search.content,
              start_time: start_time,
              end_time: end_time,
              page_size: this.search.page_size,
              page: this.search.page
            }
          })
          .then(response => {
            let responseData = response.data;
            if (responseData.code == 0) {
              this.dataRecords = responseData.data.list;
              this.total = responseData.data.total;
              console.log(responseData.data);
            } else {
              this.$message.error(responseData.message);
            }
          });
      },
      changeTime( time , fmt = 'yyyy-MM-dd') {
        let data = new Date(time)
        var o = {
            "M+": data.getMonth() + 1, //月份
            "d+": data.getDate(), //日
            "h+": data.getHours(), //小时
            "m+": data.getMinutes(), //分
            "s+": data.getSeconds(), //秒
            "q+": Math.floor((data.getMonth() + 3) / 3), //季度
            "S": data.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },
      getStatistic() {
        this.$http.get("/active/total").then(response => {
            let responseData = response.data;
            if (responseData.code == 0) {
              this.Statistics = responseData.data;
            }
        });
      },
      handleCurrentChange() {
        this.getLists();
      },
      searchList() {
        this.getRecordData();
      },
      getRecordData() {
        this.recordLoading = true;
        let start_time,end_time;
        let params = {
          content: this.search.content,
          page: this.search.page,
          page_size: this.search.page_size,
        }
        this.search.start_time != ""
          ? (start_time = this.changeTime(this.search.start_time))
          : (start_time = this.search.start_time);
        this.search.end_time != ""
          ? (end_time = this.changeTime(this.search.end_time))
          : (end_time = this.search.end_time);
          if(start_time){
            params.start_time = start_time
          }
          if(end_time){
            params.start_time = end_time
          }
        this.$http.get('/active',{
          params
        }).then(
            response => {
              this.recordLoading = false;
              let res = response.data;
              this.dataRecords = res.data.list;
              this.total = res.data.total;
            }
        )
      }
    },
    mounted() {
    //   this.getLists();
      this.getRecordData();
      this.getStatistic();
    }
};