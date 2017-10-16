<template>
  <div id="users-management">
    <h2>用戶管理</h2>
    <el-tabs v-model="activeName" @tab-click="toggleGroup">
      <el-tab-pane v-for="group of groups" :key="group" :name="group" :label="group"></el-tab-pane>
      <el-tab-pane name="搜索結果" label="搜索結果" :disabled="true"></el-tab-pane>
      <details-table
        :toolbar="toolbar"
        :search.sync="search"
        :slotForms.sync="slotForms"
        :table.sync="table"
        @delete-data="deleteUsers"
        @search-data="searchUsers"
        @current-change="getUsers"
        @size-change="getUsers"
      >
        <!-- 这里2个el-form用v-for会有毒 -->
        <el-form
          :ref="slotForms[0].ref"
          :slot="slotForms[0].slot"
          label-width="80px"
          :model="slotForms[0].model"
          @submit.native.prevent
        >
          <el-form-item label="用戶手機" prop="mobilePhone" :rules="{ required: true, message: '請輸入用戶手機', trigger: 'change' }">
            <el-input placeholder="請輸入用戶手機" v-model.trim="slotForms[0].model.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="用戶姓名" prop="name" :rules="{ required: true, message: '請輸入用戶姓名', trigger: 'change' }">
            <el-input placeholder="請輸入用戶姓名" v-model.trim="slotForms[0].model.name"></el-input>
          </el-form-item>
          <el-form-item label="用戶昵稱" prop="nickname" :rules="{ required: true, message: '請輸入用戶昵稱', trigger: 'change' }">
            <el-input placeholder="請輸入用戶昵稱" v-model.trim="slotForms[0].model.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶性別" prop="gender" :rules="{ required: true, type: 'number', message: '請選擇用戶性別', trigger: 'change' }">
            <el-radio-group v-model="slotForms[0].model.gender">
              <el-radio v-for="(gender, index) of genders" :key="index" :label="index">{{ gender }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用戶分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇用戶分組', trigger: 'change' }">
            <el-select placeholder="请选择用戶分組" v-model="slotForms[0].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(slotForms[0].ref)">重置</el-button>
            <el-button native-type="submit" type="primary" @click="updateUser(slotForms[0])">確定</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :ref="slotForms[1].ref"
          :slot="slotForms[1].slot"
          label-width="80px"
          :model="slotForms[1].model"
          @submit.native.prevent
        >
          <el-form-item label="用戶手機" prop="mobilePhone" :rules="{ required: true, message: '請輸入用戶手機', trigger: 'change' }">
            <el-input placeholder="請輸入用戶手機" v-model.trim="slotForms[1].model.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="用戶姓名" prop="name" :rules="{ required: true, message: '請輸入用戶姓名', trigger: 'change' }">
            <el-input placeholder="請輸入用戶姓名" v-model.trim="slotForms[1].model.name"></el-input>
          </el-form-item>
          <el-form-item label="用戶昵稱" prop="nickname" :rules="{ required: true, message: '請輸入用戶昵稱', trigger: 'change' }">
            <el-input placeholder="請輸入用戶昵稱" v-model.trim="slotForms[1].model.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶性別" prop="gender" :rules="{ required: true, type: 'number', message: '請選擇用戶性別', trigger: 'change' }">
            <el-radio-group v-model="slotForms[1].model.gender">
              <el-radio v-for="(gender, index) of genders" :key="index" :label="index">{{ gender }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用戶分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇用戶分組', trigger: 'change' }">
            <el-select placeholder="请选择用戶分組" v-model="slotForms[1].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-button native-type="submit" type="primary" @click="updateUser(slotForms[1])">確定</el-button>
          </el-form-item> 
        </el-form>
      </details-table>
    </el-tabs>
  </div>
</template>

<script>
  import detailsTable from '../components/details-table'

  export default {
    name: 'users-management',
    components: {
      detailsTable
    },
    data () {
      return {
        activeName: window.sessionStorage.getItem('usersManagementActiveName'),
        genders: ['男', '女'],
        groups: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組'],
        toolbar: {
          dataOperation: true,
          searchBar: true,
          pagination: true
        },
        search: {
          typeOptions: ['手機', '姓名'],
          type: '',
          value: ''
        },
        slotForms: [
          {
            slot: 'add-form',
            ref: 'addUser',
            title: '添加用戶',
            model: {
              mobilePhone: '',
              name: '',
              nickname: '',
              gender: '',
              group: ''
            }
          },
          {
            slot: 'edit-form',
            ref: 'editUser',
            title: '編輯用戶',
            model: {
              _id: '',
              mobilePhone: '',
              name: '',
              nickname: '',
              gender: '',
              group: ''
            }
          }
        ],
        table: {
          ref: 'usersTable',
          border: true,
          maxHeight: '443',
          emptyText: '暫無用戶',
          currentPage: 1,
          pageSize: 15,
          count: 0,
          data: [
            // 数据结构如下：
            // {
            //   _id: '',
            //   mobilePhone: '',
            //   name: '',
            //   nickname: '',
            //   gender: '',
            //   group: ''
            // }
          ],
          columns: [
            {
              prop: 'mobilePhone',
              label: '手機',
              minWidth: '160',
              resizable: false
            },
            {
              prop: 'name',
              label: '姓名',
              minWidth: '180',
              resizable: false
            },
            {
              prop: 'nickname',
              label: '暱稱',
              minWidth: '180',
              resizable: false
            },
            {
              prop: 'gender',
              label: '性別',
              minWidth: '70',
              resizable: false,
              formatter (row, column, cellValue) {
                let genders = ['男', '女']
                return genders[cellValue]
              }
            },
            {
              prop: 'group',
              label: '分組',
              minWidth: '180',
              resizable: false,
              formatter (row, column, cellValue) {
                let groups = ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組']
                return groups[cellValue]
              }
            }
          ]
        }
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('usersManagementActiveName', this.groups[0])
        this.activeName = window.sessionStorage.getItem('usersManagementActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        if (this.activeName === '搜索結果') {
          activeNameExited = true
          this.searchUsers(JSON.parse(window.sessionStorage.getItem('usersManagementSearch')))
        } else {
          this.groups.some((element) => {
            if (this.activeName === element) {
              activeNameExited = true
              this.getUsers()
              return true
            }
          })
        }

        if (activeNameExited === false) {
          this.initActiveName()
          this.getUsers()
        }
      },
      async getUsers () {
        const response = (await this.$ajax({
          method: 'post',
          url: '/user/getUsers',
          data: {
            group: this.groups.indexOf(this.activeName),
            startNum: (this.table.currentPage - 1) * this.table.pageSize,
            pageSize: this.table.pageSize
          }
        })).data

        if (response.statusCode === 100) {
          this.table.data = response.result.users
          this.table.count = response.result.count
        }
      },
      toggleGroup (group) {
        if (this.groups.indexOf(this.activeName) !== -1) {
          this.getUsers()
          window.sessionStorage.setItem('usersManagementActiveName', group.name)
        }
      },
      updateUser (slotForm) {
        this.$refs[slotForm.ref].validate(async (isValid) => {
          if (isValid === true) {
            const response = (await this.$ajax({
              method: 'post',
              url: `/user/${slotForm.ref}`,
              data: slotForm.model
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              if (this.groups.indexOf(this.activeName) !== -1) {
                this.getUsers()
              } else if (this.activeName === '搜索結果') {
                this.searchUsers(JSON.parse(window.sessionStorage.getItem('usersManagementSearch')))
              }
            }
          }
        })
      },
      async deleteUsers (users) {
        try {
          const result = await this.$confirm(users.length === 1 ? '确定刪除該用戶？' : `确定刪除這${users.length}個用戶？`, '刪除用戶', {
            type: 'warning'
          })

          if (result === 'confirm') {
            const response = (await this.$ajax({
              method: 'post',
              url: '/user/deleteUsers',
              data: users
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              if (this.groups.indexOf(this.activeName) !== -1) {
                this.getUsers()
              } else if (this.activeName === '搜索結果') {
                this.searchUsers(JSON.parse(window.sessionStorage.getItem('usersManagementSearch')))
              }
            }
          }
        } catch (error) {
        }
      },
      async searchUsers (searchObject) {
        if (searchObject !== undefined) {
          this.search.type = searchObject.type
          this.search.value = searchObject.value
        } else {
          if (this.search.type === '') {
            this.$message({
              showClose: true,
              message: '請選擇搜索類型',
              type: 'error'
            })

            return
          } else if (this.search.value === '') {
            this.$message({
              showClose: true,
              message: '請輸入搜索內容',
              type: 'error'
            })

            return
          } else {
            window.sessionStorage.setItem('usersManagementSearch', JSON.stringify({
              type: this.search.type,
              value: this.search.value
            }))
          }
        }
        this.activeName = '搜索結果'
        window.sessionStorage.setItem('usersManagementActiveName', this.activeName)

        const response = (await this.$ajax({
          method: 'post',
          url: '/user/searchUsers',
          data: {
            type: this.search.type,
            content: this.search.value
          }
        })).data

        // 此处令count为-1是为了不渲染分页组件
        this.table.count = -1

        if (response.statusCode === 100) {
          this.table.data = response.result
        } else if (response.statusCode === -1006) {
          this.table.data = []
        }
      },
      resetForm (ref) {
        this.$refs[ref].resetFields()
      }
    },
    created () {
      this.checkActiveName()
    }
  }
</script>

<style lang="less">
</style>
