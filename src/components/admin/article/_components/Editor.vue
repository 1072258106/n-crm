<template>
    <div>
        <div id="editorElem" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data() {
          return{
              editorContent: '',
              globalApi:this.$store.state.globalApi,
              editor:{}
          }
      },
      props: {
          content: {
              type: String
          }
      },
      methods: {
            initEditor() {
              let that = this;
                this.editor = new E('#editorElem')
                // editor.customConfig.uploadImgServer = 'http://api.iqincheng.com/tools/image_upload';
                // editor.customConfig.uploadImgHeaders = {
                //     'Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wX2lkIjo2OTkxOTc0Nywic2Vzc2lvbl9rZXkiOiI2MjAxZTAyZTE0Wlo4ZmNmY2UxOTQ4MTQyNDAwOTMwNjk0YzVmOGNiZWVjNzRlZjc4NzM5Nzk2MyJ9.nfo-Hw--I6OzBejrggz_yzZ8W9iZRX6oMAWI0KiJiBg',
                //     'Content-Type': 'application/json'
                // }
                this.editor.customConfig.customUploadImg = function (files, insert) {
                    // files 是 input 中选中的文件列表
                    // insert 是获取图片 url 后，插入到编辑器的方法

                    // 上传代码返回结果之后，将图片插入到编辑器中
                    console.log(files)
                    let formData = new FormData();
                    console.log(files[0].name)
                    // formData.append('file',files[0].name);
                    formData.append('file',files[0]);
                    
                    console.log(formData);
                    that.$http.post("/tools/image_upload", formData).then(
                        response => {
                            let res = response.data;
                            console.log(res)
                            if(res.code == 0) {
                                insert(that.globalApi + res.data.path);
                            }
                        }
                    );
                    
                }
                this.editor.customConfig.onchange = (html) => {
                    this.editorContent = html;
                    this.$emit("change", that.editorContent);
                }
                this.editor.create();
                this.editor.txt.html(that.editorContent);
            }
      },
      watch: {
          content() {
              this.editorContent = this.content;
              this.editor.txt.html(this.editorContent);
          }
      },
      mounted() {
          this.editorContent = this.content;
          this.initEditor();
      }
    }
</script>

<style scoped>
</style>