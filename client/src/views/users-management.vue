<template>
  <div id="users-management">
    <h2>用戶管理</h2>
    <el-tabs v-model="activeName" @tab-click="storageActiveName">
      <el-tab-pane v-for="tab of tabs" :key="tab.name" :name="tab.name" :label="tab.label"></el-tab-pane>
      <details-table
        :table.sync="table"
        :toolbar="toolbar"
        :search.sync="search"
        :slotForms.sync="slotForms"
      >
        <!-- 这里2个el-form用v-for会有毒 -->
        <el-form
          :ref="slotForms[0].ref"
          :slot="slotForms[0].slot"
          label-width="80px"
          :model="slotForms[0].model"
        >
          <el-form-item label="用戶手機" prop="mobilePhone" :rules="{ required: true, message: '請輸入用戶手機', trigger: 'change' }">
            <el-input placeholder="請輸入用戶手機" v-model="slotForms[0].model.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="用戶姓名" prop="name" :rules="{ required: true, message: '請輸入用戶姓名', trigger: 'change' }">
            <el-input placeholder="請輸入用戶姓名" v-model="slotForms[0].model.name"></el-input>
          </el-form-item>
          <el-form-item label="用戶昵稱" prop="nickname" :rules="{ required: true, message: '請輸入用戶昵稱', trigger: 'change' }">
            <el-input placeholder="請輸入用戶昵稱" v-model="slotForms[0].model.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶性別" prop="sex" :rules="{ required: true, message: '請選擇用戶性別', trigger: 'change' }">
            <el-radio-group v-model="slotForms[0].model.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用戶分組" prop="group" :rules="{ required: true, message: '請選擇用戶分組', trigger: 'change' }">
            <el-select placeholder="请选择用戶分組" v-model="slotForms[0].model.group">
              <el-option v-for="groupOption in slotForms[0].groupOptions" :key="groupOption" :value="groupOption"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser(slotForms[0].ref)">確定</el-button>
            <el-button @click="resetForm(slotForms[0].ref)">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :ref="slotForms[1].ref"
          :slot="slotForms[1].slot"
          label-width="80px"
          :model="slotForms[1].model"
        >
          <el-form-item label="用戶手機" prop="mobilePhone" :rules="{ required: true, message: '請輸入用戶手機', trigger: 'change' }">
            <el-input placeholder="請輸入用戶手機" v-model="slotForms[1].model.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="用戶姓名" prop="name" :rules="{ required: true, message: '請輸入用戶姓名', trigger: 'change' }">
            <el-input placeholder="請輸入用戶姓名" v-model="slotForms[1].model.name"></el-input>
          </el-form-item>
          <el-form-item label="用戶昵稱" prop="nickname" :rules="{ required: true, message: '請輸入用戶昵稱', trigger: 'change' }">
            <el-input placeholder="請輸入用戶昵稱" v-model="slotForms[1].model.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶性別" prop="sex" :rules="{ required: true, message: '請選擇用戶性別', trigger: 'change' }">
            <el-radio-group v-model="slotForms[1].model.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用戶分組" prop="group" :rules="{ required: true, message: '請選擇用戶分組', trigger: 'change' }">
            <el-select placeholder="请选择用戶分組" v-model="slotForms[1].model.group">
              <el-option v-for="groupOption in slotForms[1].groupOptions" :key="groupOption" :value="groupOption"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser(slotForms[1].ref)">確定</el-button>
            <el-button @click="resetForm(slotForms[1].ref)">重置</el-button>
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
        sex: ['男', '女'],
        tabs: [
          {
            name: '0',
            label: 'Peer Support 組'
          },
          {
            name: '1',
            label: 'Earmarking Saving 組'
          },
          {
            name: '2',
            label: '雙重干預組'
          },
          {
            name: '3',
            label: '空白對照組'
          }
        ],
        table: {
          ref: 'usersTable',
          border: true,
          maxHeight: '448',
          data: [
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobilePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobilePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            }
          ],
          dataSelected: [],
          columns: [
            {
              prop: 'mobilePhone',
              label: '手機',
              minWidth: '160'
            },
            {
              prop: 'name',
              label: '姓名',
              minWidth: '180'
            },
            {
              prop: 'nickname',
              label: '暱稱',
              minWidth: '180'
            },
            {
              prop: 'sex',
              label: '性別',
              minWidth: '70'
            },
            {
              prop: 'group',
              label: '分組',
              minWidth: '180'
            }
          ],
          rowOperation: true,
          columnsFixedWidth: '1270'
        },
        toolbar: {
          addButton: true,
          deleteButton: true,
          searchBar: true
        },
        search: {
          options: [
            {
              value: 0,
              label: '手機'
            },
            {
              value: 1,
              label: '姓名'
            }
          ],
          type: '',
          value: ''
        },
        slotForms: [
          {
            slot: 'edit-form',
            ref: 'editUsersForm',
            title: '編輯用戶',
            model: {
              mobilePhone: '',
              name: '',
              nickname: '',
              sex: '',
              group: ''
            },
            groupOptions: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組']
          },
          {
            slot: 'add-form',
            ref: 'addUsersForm',
            title: '添加用戶',
            model: {
              mobilePhone: '',
              name: '',
              nickname: '',
              sex: '',
              group: ''
            },
            groupOptions: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組']
          }
        ]
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('usersManagementActiveName', this.tabs[0].name)
        this.activeName = window.sessionStorage.getItem('usersManagementActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        if (this.activeName === null) {
          this.initActiveName()
        } else {
          this.tabs.every((element) => {
            if (this.activeName === element.name) {
              activeNameExited = true
              return false
            }
            return true
          })

          if (activeNameExited === false) {
            this.initActiveName()
          }
        }
      },
      formatTableData () {
        this.table.data.forEach((element) => {
          element.sex = this.sex[element.sex]
          element.group = this.tabs[element.group].label
        })
      },
      storageActiveName (tab) {
        window.sessionStorage.setItem('usersManagementActiveName', tab.name)
      },
      updateUser (ref) {
        this.$refs[ref].validate((isValid) => {
          if (isValid === true) {
            console.log('isValid')
          }
        })
      },
      resetForm (ref) {
        this.$refs[ref].resetFields()
      }
    },
    created () {
      this.checkActiveName()
      this.formatTableData()
    }
  }
</script>

<style lang="less">
</style>
