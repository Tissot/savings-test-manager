<template>
  <div id="savings-situations">
    <h2>儲蓄情況</h2>
    <el-tabs v-model="activeName" @tab-click="toggleGroup">
      <el-tab-pane v-for="group of groups" :key="group" :name="group" :label="group"></el-tab-pane>
      <el-tab-pane name="搜索結果" label="搜索結果" :disabled="true"></el-tab-pane>
      <details-table
        :toolbar="toolbar"
        :search.sync="search"
        :table.sync="table"
        @get-historical-savings-situations="getHistoricalSavingsSituations"
        @search-data="searchUsersSavingsSituations"
        @current-change="getUsersSavingsSituations"
        @size-change="getUsersSavingsSituations"
      >
        <ul slot="view-more">
          <li v-for="yearlySavingsSituations of historicalSavingsSituations" :key="yearlySavingsSituations.key">
            <div class="year">{{ yearlySavingsSituations.key }}年</div>
            <ul class="level">
              <li v-for="monthlySavingsSituation of yearlySavingsSituations.data" :key="monthlySavingsSituation.key">
                <div class="month">{{ [
                  '一月实际储蓄额',
                  '二月实际储蓄额',
                  '三月实际储蓄额',
                  '四月实际储蓄额',
                  '五月实际储蓄额',
                  '六月实际储蓄额',
                  '七月实际储蓄额',
                  '八月实际储蓄额',
                  '九月实际储蓄额',
                  '十月实际储蓄额'
                ].indexOf(monthlySavingsSituation.key) !== -1 && monthlySavingsSituation.key.substring(0, 2) || [
                  '十一月实际储蓄额',
                  '十二月实际储蓄额'
                ].indexOf(monthlySavingsSituation.key) !== -1 && monthlySavingsSituation.key.substring(0, 3) }}</div>
                <ul class="level">
                  <li>實際儲蓄額：{{ monthlySavingsSituation.value === null ? '未填寫' : monthlySavingsSituation.value }}</li>
                  <li v-if="monthlySavingsSituation.achieveExpectation !== undefined">是否達成儲蓄目標：{{ monthlySavingsSituation.achieveExpectation === true ? '是' : '否' }}</li>
                  <li v-if="monthlySavingsSituation.reason !== undefined">{{ monthlySavingsSituation.achieveExpectation === true ? '' : '未' }}達成儲蓄目標的原因：{{ monthlySavingsSituation.reason === null ? '未填寫' : monthlySavingsSituation.reason }}</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </details-table>
    </el-tabs>
  </div>
</template>

<script>
  import detailsTable from '../components/details-table'

  export default {
    name: 'savings-situations',
    components: {
      detailsTable
    },
    data () {
      return {
        activeName: window.sessionStorage.getItem('savingsSituationsActiveName'),
        genders: ['男', '女'],
        groups: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組'],
        toolbar: {
          viewMore: true,
          searchBar: true,
          pagination: true
        },
        search: {
          typeOptions: ['手機', '姓名'],
          type: '',
          value: ''
        },
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
            //   _id: string,
            //   mobilePhone: string,
            //   name: string,
            //   eachMonthIncome: number,
            //   eachMonthOutcome: number,
            //   eachMonthRecommendSavings: number,
            //   eachMonthExpectedSavings: number,
            //   LatestActualSavings: number,
            //   achieveExpectation: boolean,
            //   group: enum(0, 1, 2, 3)
            // }
          ],
          columns: [
            {
              prop: 'mobilePhone',
              label: '手機',
              minWidth: '160',
              fixed: true,
              resizable: false
            },
            {
              prop: 'name',
              label: '姓名',
              minWidth: '160',
              resizable: false
            },
            {
              prop: 'eachMonthIncome',
              label: '每月收入',
              minWidth: '128',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
              }
            },
            {
              prop: 'eachMonthOutcome',
              label: '每月支出',
              minWidth: '128',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
              }
            },
            {
              prop: 'eachMonthRecommendSavings',
              label: '每月建議儲蓄額',
              minWidth: '136',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
              }
            },
            {
              prop: 'eachMonthExpectedSavings',
              label: '每月期望儲蓄額',
              minWidth: '136',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
              }
            },
            {
              prop: 'LatestActualSavings',
              label: '最新實際儲蓄額',
              minWidth: '136',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
              }
            },
            {
              prop: 'achieveExpectation',
              label: '是否達成儲蓄目標',
              minWidth: '150',
              resizable: false,
              formatter (row, column, cellValue) {
                return cellValue === null ? '未填寫' : cellValue
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
        },
        historicalSavingsSituations: []
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('savingsSituationsActiveName', this.groups[0])
        this.activeName = window.sessionStorage.getItem('savingsSituationsActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        if (this.activeName === '搜索結果') {
          activeNameExited = true
          this.searchUsersSavingsSituations(JSON.parse(window.sessionStorage.getItem('savingsSituationsSearch')))
        } else {
          this.groups.some((element) => {
            if (this.activeName === element) {
              activeNameExited = true
              this.getUsersSavingsSituations()
              return true
            }
          })
        }

        if (activeNameExited === false) {
          this.initActiveName()
          this.getUsersSavingsSituations()
        }
      },
      async getUsersSavingsSituations () {
        const response = (await this.$ajax({
          method: 'post',
          url: '/savingsSituation/getUsersSavingsSituations',
          data: {
            group: this.groups.indexOf(this.activeName),
            startNum: (this.table.currentPage - 1) * this.table.pageSize,
            pageSize: this.table.pageSize
          }
        })).data
        console.log(response)

        if (response.statusCode === 100) {
          this.table.data = response.result.usersSavingsSituations
          this.table.count = response.result.count
        }
      },
      toggleGroup (group) {
        if (this.groups.indexOf(this.activeName) !== -1) {
          this.getUsersSavingsSituations()
          window.sessionStorage.setItem('savingsSituationsActiveName', group.name)
        }
      },
      async getHistoricalSavingsSituations (userId, savingsSituationType) {
        const response = (await this.$ajax({
          method: 'post',
          url: '/savingsSituation/getHistoricalSavingsSituations',
          data: {
            savingsSituationType,
            userId
          }
        })).data
        console.log(response.result.historicalSavingsSituations)

        if (response.statusCode === 100) {
          this.historicalSavingsSituations = response.result.historicalSavingsSituations
        } else if (response.statusCode === 101) {
          this.historicalSavingsSituations = []
        }
      },
      async searchUsersSavingsSituations (searchObject) {
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
            window.sessionStorage.setItem('savingsSituationsSearch', JSON.stringify({
              type: this.search.type,
              value: this.search.value
            }))
          }
        }
        this.activeName = '搜索結果'
        window.sessionStorage.setItem('savingsSituationsActiveName', this.activeName)

        const response = (await this.$ajax({
          method: 'post',
          url: '/savingsSituation/searchUsersSavingsSituations',
          data: {
            type: this.search.type,
            content: this.search.value
          }
        })).data

        // 此处令count为-1是为了不渲染分页组件
        this.table.count = -1

        if (response.statusCode === 100) {
          this.table.data = response.result.usersSavingsSituations
        }
      }
    },
    created () {
      this.checkActiveName()
    }
  }
</script>

<style lang="less">
  #savings-situations {
    li {
      list-style: none;
    }

    .year {
      font-size: 16px;
      font-weight: bold;
    }

    .month {
      font-weight: bold;
    }

    .level {
      margin-left: 16px;
    }
  }
</style>
