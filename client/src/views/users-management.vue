<template>
  <div id="users-management">
    <h2>用戶管理</h2>
    <el-tabs v-model="activeName" @tab-click="storageActiveName">
      <el-tab-pane v-for="tab of tabs" :key="tab.name" :name="tab.name" :label="tab.label"></el-tab-pane> 
      <details-table
        :table.sync="table"
        :toolbar="toolbar"
        :search.sync="search"
        @edit-user="editUser"
        @delete-user="deleteUser"
      ></details-table>
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
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            },
            {
              mobliePhone: '+85213590175732',
              name: '譚樞銘',
              nickname: '爸爸就是這麼菜啊',
              sex: 0,
              group: 0
            },
            {
              mobliePhone: '13590175735',
              name: '譚樞譚樞',
              nickname: '爸爸就是這麼菜啊',
              sex: 1,
              group: 1
            }
          ],
          dataSelected: [],
          columns: [
            {
              prop: 'mobliePhone',
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
          content: ''
        }
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
      editUser (scope) {
        console.log(scope)
      },
      deleteUser (scope) {
        console.log(scope)
      }
    },
    created () {
      this.checkActiveName()
      this.formatTableData()

      this.table.data
    }
  }
</script>

<style lang="less">
  #users-management {
  }
</style>
