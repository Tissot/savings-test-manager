<template>
  <div id="online-content-management">
    <h2>在綫內容管理</h2>
    <el-tabs v-model="activeName" @tab-click="toggleGroup">
      <el-tab-pane v-for="group of groups" :key="group" :name="group" :label="group"></el-tab-pane>
      <details-table
        :toolbar="toolbar"
        :slotForms.sync="slotForms"
        :table.sync="table"
        @delete-data="deleteOnlineContents"
        @current-change="getOnlineContents"
        @size-change="getOnlineContents"
      >
        <!-- 这里2个el-form用v-for会有毒 -->
        <el-form
          :ref="slotForms[0].ref"
          :slot="slotForms[0].slot"
          label-width="80px"
          :model="slotForms[0].model"
          @submit.native.prevent
        >
          <el-form-item label="內容標題" prop="title" :rules="{ required: true, message: '請輸入在綫內容標題', trigger: 'change' }">
            <el-input placeholder="請輸入在綫內容標題" v-model.trim="slotForms[0].model.title"></el-input>
          </el-form-item>
          <el-form-item label="內容链接" prop="url" :rules="{ required: true, message: '請輸入在綫內容链接', trigger: 'change' }">
            <el-input placeholder="請輸入在綫內容链接" v-model.trim="slotForms[0].model.url"></el-input>
          </el-form-item>
          <el-form-item label="內容類型" prop="type" :rules="{ required: true, type: 'number', message: '請選擇內容類型', trigger: 'change' }">
            <el-radio-group v-model="slotForms[0].model.type">
              <el-radio v-for="(type, index) of types" :key="index" :label="index">{{ type }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="內容分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇內容分組', trigger: 'change' }">
            <el-select placeholder="请选择內容分組" v-model="slotForms[0].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(slotForms[0].ref)">重置</el-button>
            <el-button native-type="submit" type="primary" @click="updateOnlineContents(slotForms[0])">確定</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :ref="slotForms[1].ref"
          :slot="slotForms[1].slot"
          label-width="80px"
          :model="slotForms[1].model"
          @submit.native.prevent
        >
          <el-form-item label="內容標題" prop="title" :rules="{ required: true, message: '請輸入在綫內容標題', trigger: 'change' }">
            <el-input placeholder="請輸入在綫內容標題" v-model.trim="slotForms[1].model.title"></el-input>
          </el-form-item>
          <el-form-item label="內容链接" prop="url" :rules="{ required: true, message: '請輸入在綫內容链接', trigger: 'change' }">
            <el-input placeholder="請輸入在綫內容链接" v-model.trim="slotForms[1].model.url"></el-input>
          </el-form-item>
          <el-form-item label="內容類型" prop="type" :rules="{ required: true, type: 'number', message: '請選擇內容類型', trigger: 'change' }">
            <el-radio-group v-model="slotForms[1].model.type">
              <el-radio v-for="(type, index) of types" :key="index" :label="index">{{ type }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="內容分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇內容分組', trigger: 'change' }">
            <el-select placeholder="请选择內容分組" v-model="slotForms[1].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-button native-type="submit" type="primary" @click="updateOnlineContents(slotForms[1])">確定</el-button>
          </el-form-item> 
        </el-form>
      </details-table>
    </el-tabs>
  </div>
</template>

<script>
  import detailsTable from '../components/details-table'

  export default {
    name: 'online-content-management',
    components: {
      detailsTable
    },
    data () {
      return {
        activeName: window.sessionStorage.getItem('onlineContentsManagementActiveName'),
        groups: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組'],
        types: ['文档', '视频'],
        toolbar: {
          dataOperation: true
        },
        slotForms: [
          {
            slot: 'add-form',
            ref: 'addOnlineContent',
            title: '添加在綫內容',
            model: {
              title: '',
              url: '',
              type: -1,
              group: ''
            }
          },
          {
            slot: 'edit-form',
            ref: 'editOnlineContent',
            title: '編輯在綫內容',
            model: {
              _id: '',
              title: '',
              url: '',
              type: -1,
              group: ''
            }
          }
        ],
        table: {
          ref: 'onlineContentsTable',
          border: true,
          maxHeight: '443',
          emptyText: '暫無在綫內容',
          currentPage: 1,
          pageSize: 15,
          data: [
            // 数据结构如下：
            // {
            //   _id: '',
            //   title: '',
            //   url: '',
            //   type: -1,
            //   group: ''
            // }
          ],
          columns: [
            {
              prop: 'title',
              label: '標題',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'url',
              label: '鏈接',
              minWidth: '400',
              resizable: false
            },
            {
              prop: 'type',
              label: '類型',
              minWidth: '70',
              resizable: false,
              formatter (row, column, cellValue) {
                const types = ['文档', '视频']
                return types[cellValue]
              }
            }
          ]
        }
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('onlineContentsManagementActiveName', this.groups[0])
        this.activeName = window.sessionStorage.getItem('onlineContentsManagementActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        this.groups.some((element) => {
          if (this.activeName === element) {
            activeNameExited = true
            return true
          }
        })

        if (activeNameExited === false) {
          this.initActiveName()
        }
      },
      async getOnlineContents () {
        const response = (await this.$ajax({
          method: 'post',
          url: '/onlineContent/getOnlineContents',
          data: {
            group: this.groups.indexOf(this.activeName)
          }
        })).data

        if (response.statusCode === 100) {
          this.table.data = response.result.onlineContents
        } else if (response.statusCode === -1008) {
          this.table.data = []
        }
      },
      toggleGroup (group) {
        if (this.groups.indexOf(this.activeName) !== -1) {
          this.getOnlineContents()
          window.sessionStorage.setItem('onlineContentsManagementActiveName', group.name)
        }
      },
      updateOnlineContents (slotForm) {
        this.$refs[slotForm.ref].validate(async (isValid) => {
          if (isValid === true) {
            const response = (await this.$ajax({
              method: 'post',
              url: `/onlineContent/${slotForm.ref}`,
              data: slotForm.model
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getOnlineContents()
            }
          }
        })
      },
      async deleteOnlineContents (onlineContents) {
        try {
          const result = await this.$confirm(onlineContents.length === 1 ? '确定刪除該在綫內容？' : `确定刪除這${onlineContents.length}個在綫內容？`, '刪除在綫內容', {
            type: 'warning'
          })

          if (result === 'confirm') {
            const response = (await this.$ajax({
              method: 'post',
              url: '/onlineContent/deleteOnlineContents',
              data: onlineContents
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getOnlineContents()
            }
          }
        } catch (error) {
        }
      },
      resetForm (ref) {
        this.$refs[ref].resetFields()
      }
    },
    created () {
      this.checkActiveName()
      this.getOnlineContents()
    }
  }
</script>

<style lang="less">
</style>
