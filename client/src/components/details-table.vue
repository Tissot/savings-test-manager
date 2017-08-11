<template>
  <div class="details-table">
		<el-table
      :ref="table.ref"
			:border="table.border"
			:max-height="table.maxHeight"
			:data="table.data"
			@selection-change="emitSelectionChange"
		>
      <el-table-column :fixed="mediaQueryList.matches === true ? false : 'left'" type="selection" width="54" v-if="toolbar.deleteButton === true"></el-table-column> 
			<el-table-column
				v-for="table of table.columns"
				:key="table.prop"
				:prop="table.prop"
				:label="table.label"
				:min-width="table.minWidth"
			></el-table-column>
			<el-table-column :fixed="mediaQueryList.matches === true ? false : 'right'" label="操作" width="147">
				<template scope="scope">
					<el-button type="text" icon="edit" @click="emitEditUser(scope)">編輯</el-button>
					<el-button type="text" icon="delete2" @click="emitDeleteUser(scope)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar">
			<div>
				<el-button type="primary" icon="plus" v-if="toolbar.addButton === true">添加用戶</el-button>
				<el-button type="danger" :disabled="table.dataSelected.length === 0" icon="delete2" v-if="toolbar.deleteButton === true">刪除用戶</el-button>
			</div>
			<el-input placeholder="請輸入搜索内容" v-model="search.content" v-if="toolbar.searchBar === true">
				<el-select v-model="search.type" slot="prepend" placeholder="類型">
					<el-option v-for="option of search.options" :key="option.value" :value="option.value" :label="option.label"></el-option>
				</el-select>
				<el-button slot="append" icon="search"></el-button>
			</el-input>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'details-table',
    props: {
      table: {
        required: true,
        type: Object,
        default: {
          ref: '',
          border: false,
          maxHeight: '',
          data: [],
          dataSelected: [],
          columns: [
            {
              prop: '',
              label: '',
              minWidth: ''
            }
          ],
          rowOperation: false,
          columnsFixedWidth: ''
        }
      },
      toolbar: {
        required: true,
        type: Object,
        default: {
          addButton: false,
          deleteButton: false,
          searchBar: false
        }
      },
      search: {
        required: this.searchBar,
        type: Object,
        default: toolbar.searchBar === true ? {
          options: [
            {
              value: 0,
              label: ''
            }
          ],
          type: 0,
          content: ''
        } : {}
      }
    },
    data () {
      return {
        mediaQueryList: window.matchMedia(`(min-width: ${this.table.columnsFixedWidth}px)`)
      }
    },
    methods: {
      mediaQueryListChanged () {
        this.mediaQueryList = window.matchMedia(`(min-width: ${this.table.columnsFixedWidth}px)`)
      },
      emitSelectionChange (dataSelected) {
        this.table.dataSelected = dataSelected
      },
      emitEditUser (scope) {
        this.$emit('edit-user', scope)
      },
      emitDeleteUser (scope) {
        this.$emit('delete-user', scope)
      }
    },
    watch: {
      'mediaQueryList.matches' (newValue) {
        document.querySelector('.el-table__body-wrapper').style.overflowX = newValue === true ? 'hidden' : 'auto'
      }
    },
    created () {
      this.mediaQueryList.addListener(this.mediaQueryListChanged)
      this.mediaQueryListChanged()
      console.log(this.table.dataSelected.length)
    },
    mounted () {
      document.querySelector('.el-table__body-wrapper').style.overflowX = this.mediaQueryList.matches === true ? 'hidden' : 'auto'
    },
    destroyed () {
      this.mediaQueryList.removeListener(this.mediaQueryListChanged)
    }
  }
</script>

<style lang="less">
  .details-table {
		.el-table {
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
