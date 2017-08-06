<template>
  <div id="users-management">
    <h2>用戶管理</h2>
    <el-tabs v-model="activeName" @tab-click="storageActiveName">
      <el-tab-pane v-for="tab of tabs" :key="tab.name" :label="tab.label" :name="tab.name"></el-tab-pane>
      <el-table :data="users" ref="usersTable" :border="true" max-height="448">
        <el-table-column 
          v-for="usersTableColumn of usersTableColumns"
          :key="usersTableColumn.prop"
          :fixed="usersTableColumn.fixed"
          :type="usersTableColumn.type"
          :label="usersTableColumn.label"
          :prop="usersTableColumn.prop"
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
          <el-button type="danger" icon="delete2">刪除用戶</el-button>
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
        mediaQueryList: window.matchMedia('(min-width: 1208px)'),
        tabs: [
          {
            label: 'Peer Support 組',
            name: 'Peer Support'
          },
          {
            label: 'Earmarking Saving 組',
            name: 'Earmarking Saving'
          },
          {
            label: '雙重干預組',
            name: 'Double Intervention'
          },
          {
            label: '空白對照組',
            name: 'Blank Control'
          }
        ],
        users: [
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          },
          {
            mobliePhone: '13590175735',
            name: '譚樞譚樞',
            sex: '女',
            mailBox: '759453442@qq.com',
            group: 'Earmarking Saving 組'
          },
          {
            mobliePhone: '+8613590175732',
            name: '譚樞銘',
            sex: '男',
            mailBox: '759453441@qq.com',
            group: 'Peer Support 組'
          }
        ],
        search: {
          type: 'mobilePhone',
          content: ''
        },
        searchOptions: [
          {
            label: '手機',
            value: 'mobilePhone'
          },
          {
            label: '姓名',
            value: 'name'
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
            label: '手機',
            prop: 'mobliePhone',
            minWidth: '150'
          },
          {
            label: '姓名',
            prop: 'name',
            minWidth: '110'
          },
          {
            label: '性別',
            prop: 'sex',
            minWidth: '70'
          },
          {
            label: '郵箱',
            prop: 'mailBox',
            minWidth: '200'
          },
          {
            label: '分組',
            prop: 'group',
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
        console.log()
        this.mediaQueryList = window.matchMedia('(min-width: 1208px)')
      },
      storageActiveName (tab) {
        window.sessionStorage.setItem('usersManagementActiveName', tab.name)
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
        @media screen and (min-width: 1208px) {
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
