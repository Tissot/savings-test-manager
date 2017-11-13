<template>
  <div id="other">
    <h2>其他</h2>
    <div class="other-item">
      <span>問卷調查鏈接：</span><span class="value">{{ questionnaireURL }}</span>
      <el-button type="text" @click="editInfo(0)" class="edit">編輯</el-button>
    </div>
    <div class="other-item">
      <span>咨詢電話：</span><span class="value">{{ advisoryPhone }}</span>
      <el-button type="text" @click="editInfo(1)" class="edit">編輯</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'other',
    data () {
      return {
        questionnaireURL: '',
        advisoryPhone: ''
      }
    },
    methods: {
      async getOther () {
        const [promise1, promise2] = await this.$ajax.all([
          this.$ajax({
            method: 'post',
            url: '/user/getQuestionnaireURL'
          }), this.$ajax({
            method: 'post',
            url: '/user/getAdvisoryPhone'
          })
        ])

        const response1 = promise1.data
        const response2 = promise2.data

        if (response1.statusCode === 100) {
          this.questionnaireURL = response1.result.questionnaireURL
        }

        if (response2.statusCode === 100) {
          this.advisoryPhone = response2.result.advisoryPhone
        }
      },
      async editInfo (InfoType) {
        const urls = ['editQuestionnaireURL', 'editAdvisoryPhone']
        const Infos = ['問卷調查鏈接', '咨詢電話']

        try {
          const result = await this.$prompt(`請輸入新的${Infos[InfoType]}`, `編輯${Infos[InfoType]}`, {
            lockScroll: false
          })

          if (result.action === 'confirm') {
            const response = (await this.$ajax({
              method: 'post',
              url: `/user/${urls[InfoType]}`,
              data: InfoType === 0 && {
                questionnaireURL: result.value
              } || InfoType === 1 && {
                advisoryPhone: result.value
              }
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getOther()
            }
          }
        } catch (err) {
        }
      }
    },
    created () {
      // this.getOther()
    }
  }
</script>

<style lang="less">
  #other {
      .other-item {
        margin-top: 24px;
      }
      
      .value {
        margin-right: 24px;
      }
  }
</style>