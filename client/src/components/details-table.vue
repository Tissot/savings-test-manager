<template>
  <div class="details-table">
		<el-table
      :ref="table.ref"
			:border="table.border"
			:max-height="table.maxHeight"
			:data="table.data"
			@selection-change="selectionChange"
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
				<template scope="data">
					<el-button type="text" icon="edit" @click="editData(data.row)">編輯</el-button>
					<el-button type="text" icon="delete2" @click="deleteData(data.row)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar">
			<div>
				<el-button type="primary" icon="plus" v-if="toolbar.addButton === true" @click="addData">添加</el-button>
				<el-button type="danger" :disabled="table.dataSelected.length === 0" icon="delete2" v-if="toolbar.deleteButton === true">刪除</el-button>
			</div>
			<el-input placeholder="搜索内容" v-model="search.value" v-if="toolbar.searchBar === true">
				<el-select v-model="search.type" slot="prepend" placeholder="搜索類型">
					<el-option v-for="option of search.options" :key="option.value" :value="option.value" :label="option.label"></el-option>
				</el-select>
				<el-button slot="append" icon="search"></el-button>
			</el-input>
      <el-dialog :title="slotForms[0].title" :lock-scroll="false" :visible.sync="editDialogVisible">
        <slot name="edit-form"></slot>
      </el-dialog>
      <el-dialog :title="slotForms[1].title" :lock-scroll="false" :visible.sync="addDialogVisible">
        <slot name="add-form"></slot>
      </el-dialog>
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
          value: ''
        } : {}
      },
      slotForms: {
        required: true,
        type: Array,
        default: [
          {
            slot: '',
            ref: '',
            title: '',
            model: {
              mobilePhone: '',
              name: '',
              nickname: '',
              sex: '',
              group: ''
            }
          }
        ]
      }
    },
    data () {
      return {
        mediaQueryList: window.matchMedia(`(min-width: ${this.table.columnsFixedWidth}px)`),
        editDialogVisible: false,
        addDialogVisible: false
      }
    },
    methods: {
      mediaQueryListChanged () {
        this.mediaQueryList = window.matchMedia(`(min-width: ${this.table.columnsFixedWidth}px)`)
      },
      selectionChange (dataSelected) {
        this.table.dataSelected = dataSelected
      },
      editData (row) {
        // 此处应使用JSON对row这一对象进行深拷贝，否则在表单中更改值时会导致表格中的值跟着更改。
        this.slotForms[0].model = JSON.parse(JSON.stringify(row))
        this.editDialogVisible = true
      },
      deleteData (data) {
        this.$emit('delete-data', data)
      },
      addData () {
        this.addDialogVisible = true
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

      .el-input-group__prepend {
        background-color:  #fff;

        .el-select .el-input {
          width: 110px;
        }
      }

      .el-input-group__append {
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
      }
    }

    .el-dialog {
      width: 480px;
      
      .el-dialog__body {
        padding: 28px 36px;

        .el-select {
          width: 100%;
        }

        .el-form-item__content {
          margin-left: 80px;
        }
      }
    }
  }
</style>
