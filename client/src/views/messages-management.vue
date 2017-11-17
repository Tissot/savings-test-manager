<template>
  <div id="messages-management">
    <h2>消息管理</h2>
    <el-tabs v-model="activeName" @tab-click="toggleGroup">
      <el-tab-pane v-for="group of groups.slice(0, 4)" :key="group" :name="group" :label="group"></el-tab-pane>
      <details-table
        :toolbar="toolbar"
        :slotForms.sync="slotForms"
        :table.sync="table"
        @current-change="getMessages"
        @size-change="getMessages"
      >
        <el-form
          :ref="slotForms[0].ref"
          :slot="slotForms[0].slot"
          label-width="80px"
          :model="slotForms[0].model"
          @submit.native.prevent
        >
          <el-form-item label="消息內容" prop="content" :rules="{ required: true, message: '請輸入消息標題', trigger: 'change' }">
            <el-input placeholder="請輸入消息標題" v-model.trim="slotForms[0].model.content"></el-input>
          </el-form-item>
          <el-form-item label="消息分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇消息分組', trigger: 'change' }">
            <el-select placeholder="請選擇消息分組" v-model="slotForms[0].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(slotForms[0].ref)">重置</el-button>
            <el-button native-type="submit" type="primary" @click="updateMessages(slotForms[0])">確定</el-button>
          </el-form-item>
        </el-form>
      </details-table>
    </el-tabs>
  </div>
</template>

<script>
  import detailsTable from '../components/details-table'

  export default {
    name: 'messages-management',
    components: {
      detailsTable
    },
    data () {
      return {
        activeName: window.sessionStorage.getItem('messagesManagementActiveName'),
        groups: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組', '全部分組'],
        answers: ['A', 'B', 'C', 'D'],
        toolbar: {
          pagination: true
        },
        slotForms: [
          {
            slot: 'add-form',
            ref: 'addSystemMessage',
            title: '添加消息',
            model: {
              content: '',
              group: ''
            }
          }
        ],
        table: {
          ref: 'messagesTable',
          border: true,
          maxHeight: '443',
          emptyText: '暫無消息',
          currentPage: 1,
          pageSize: 15,
          data: [
            // 数据结构如下：
            // {
            //   _id: '',
            //   content: '',
            //   date: '',
            //   group: ''
            // }
          ],
          columns: [
            {
              prop: 'content',
              label: '内容',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'date',
              label: '日期',
              minWidth: '120',
              resizable: false
            }
          ]
        }
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('messagesManagementActiveName', this.groups[0])
        this.activeName = window.sessionStorage.getItem('messagesManagementActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        this.groups.slice(0, 4).some((element) => {
          if (this.activeName === element) {
            activeNameExited = true
            return true
          }
        })

        if (activeNameExited === false) {
          this.initActiveName()
        }
      },
      async getMessages () {
        const response = (await this.$ajax({
          method: 'post',
          url: '/message/getMessages',
          data: {
            group: this.groups.slice(0, 4).indexOf(this.activeName),
            startNum: (this.table.currentPage - 1) * this.table.pageSize,
            pageSize: this.table.pageSize
          }
        })).data

        if (response.statusCode === 100) {
          this.table.data = response.result.messages
          this.table.count = response.result.count
        }
      },
      toggleGroup (group) {
        if (this.groups.slice(0, 4).indexOf(this.activeName) !== -1) {
          this.getMessages()
          window.sessionStorage.setItem('messagesManagementActiveName', group.name)
        }
      },
      updateMessages (slotForm) {
        this.$refs[slotForm.ref].validate(async (isValid) => {
          if (isValid === true) {
            const response = (await this.$ajax({
              method: 'post',
              url: `/message/${slotForm.ref}`,
              data: slotForm.model
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getMessages()
            }
          }
        })
      },
      resetForm (ref) {
        this.$refs[ref].resetFields()
      }
    },
    created () {
      this.checkActiveName()
      this.getMessages()
    }
  }
</script>

<style lang="less">
  #messages-management {
  }
</style>