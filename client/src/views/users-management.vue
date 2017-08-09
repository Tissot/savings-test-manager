<template>
  <div id="users-management">
    <h2>用戶管理</h2>
    <el-tabs v-model="activeName" @tab-click="storageActiveName">
      <el-tab-pane v-for="tab of tabs" :key="tab.name" :name="tab.name" :label="tab.label"></el-tab-pane> 
      <el-table
        :data="users"
        ref="usersTable"
        :border="true"
        max-height="448"
        @selection-change="toggleUsersSelected"
      >
        <el-table-column 
          v-for="usersTableColumn of usersTableColumns"
          :key="usersTableColumn.prop"
          :fixed="usersTableColumn.fixed"
          :type="usersTableColumn.type"
          :prop="usersTableColumn.prop"
          :label="usersTableColumn.label"
          :width="usersTableColumn.width"
          :min-width="usersTableColumn.minWidth"
        ></el-table-column>
        <el-table-column :fixed="mediaQueryList.matches ? false : 'right'" label="操作" width="147">
          <template scope="scope">
            <el-button type="text" icon="edit" @click="editUser(scope.$index, scope.row)">編輯</el-button>
            <el-button type="text" icon="delete2" @click="deleteUser(scope.$index, scope.row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="toolbar">
        <div>
          <el-button type="primary" icon="plus">添加用戶</el-button>
          <el-button type="danger" :disabled="usersSelected.length === 0" icon="delete2">刪除用戶</el-button>
        </div>
        <el-input placeholder="请输入搜索内容" v-model="search.content">
          <el-select v-model="search.type" slot="prepend" placeholder="類型">
            <el-option v-for="searchOption of searchOptions" :key="searchOption.value" :label="searchOption.label" :value="searchOption.value"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'users-management',
    data () {
      return {
        activeName: window.sessionStorage.getItem('usersManagementActiveName'),
        mediaQueryList: window.matchMedia('(min-width: 1188px)'),
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
        users: [
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            nickname: '爸爸就是這麼菜啊',
            sex: '男',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            nickname: '爸爸就是這麼菜啊',
            sex: '女',
            group: 'Earmarking Saving 組'
          }
        ],
        usersSelected: [],
        search: {
          type: 'mobilePhone',
          content: ''
        },
        searchOptions: [
          {
            value: 'mobilePhone',
            label: '手機'
          },
          {
            value: 'name',
            label: '姓名'
          }
        ]
      }
    },
    computed: {
      usersTableColumns () {
        return [
          {
            fixed: this.mediaQueryList.matches ? false : 'left',
            type: 'selection',
            width: '54'
          },
          {
            prop: 'mobliePhone',
            label: '手機',
            minWidth: '150'
          },
          {
            prop: 'name',
            label: '姓名',
            minWidth: '110'
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
          for (let tab of this.tabs) {
            if (this.activeName === tab.name) {
              activeNameExited = true
              break
            }
          }

          if (activeNameExited === false) {
            this.initActiveName()
          }
        }
      },
      mediaQueryListChanged () {
        this.mediaQueryList = window.matchMedia('(min-width: 1188px)')
      },
      storageActiveName (tab) {
        window.sessionStorage.setItem('usersManagementActiveName', tab.name)
      },
      toggleUsersSelected (usersSelected) {
        console.log(usersSelected)
        this.usersSelected = usersSelected
      },
      editUser (index, row) {
        console.log(index, row)
      },
      deleteUser (index, row) {
        console.log(index, row)
      }
    },
    created () {
      this.checkActiveName()
    },
    mounted () {
      this.mediaQueryList.addListener(this.mediaQueryListChanged)
      this.mediaQueryListChanged()
    },
    destroyed () {
      this.mediaQueryList.removeListener(this.mediaQueryListChanged)
    }
  }
</script>

<style lang="less">
  #users-management {
    .el-table {
      .el-table__body-wrapper {
        @media screen and (min-width: 1188px) {
          overflow-x: hidden;
        }
      }

      .el-button + .el-button {
        color: #ff4949;
      }
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
    }

    .el-button + .el-button {
      margin-left: 12px;
    }
  }
</style>
