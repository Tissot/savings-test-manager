<template>
  <div class="details-table">
    <div class="toolbar">
			<div v-if="toolbar.dataOperation === true">
				<el-button type="primary" icon="plus" @click="addData">添加</el-button>
				<el-button
          type="danger"
          :disabled="dataSelected.length === 0"
          icon="delete2"
          @click="deleteData(dataSelected)"
        >刪除</el-button>
			</div>
			<el-input placeholder="搜索内容" v-model.trim="search.value" v-if="toolbar.searchBar === true" @keyup.native.enter="searchData">
				<el-select v-model="search.type" slot="prepend" placeholder="搜索類型">
					<el-option v-for="(typeOption, index) of search.typeOptions" :key="index" :value="index" :label="typeOption"></el-option>
				</el-select>
				<el-button slot="append" icon="search" @click="searchData"></el-button>
			</el-input>
      <el-dialog :title="slotForms[0].title" :lock-scroll="false" :visible.sync="addDialogVisible">
        <slot name="add-form"></slot>
      </el-dialog>
      <el-dialog :title="slotForms[1].title" :lock-scroll="false" :visible.sync="editDialogVisible">
        <slot name="edit-form"></slot>
      </el-dialog>
		</div>
    <div :style="tableStyle">
      <el-table
        :ref="table.ref"
        :border="table.border"
        :max-height="table.maxHeight"
        :data="table.data"
        :empty-text="table.emptyText"
        @selection-change="selectionChange"
      >
        <el-table-column :fixed="mediaQueryList.matches === true ? false : 'left'" type="selection" width="54" v-if="toolbar.dataOperation === true"></el-table-column> 
        <el-table-column
          v-for="table of table.columns"
          :key="table.prop"
          :prop="table.prop"
          :label="table.label"
          :min-width="table.minWidth"
          :resizable="table.resizable"
          :formatter="table.formatter"
        ></el-table-column>
        <el-table-column :fixed="mediaQueryList.matches === true ? false : 'right'" label="操作" width="147" :resizable="false" v-if="toolbar.dataOperation === true">
          <template scope="data">
            <el-button type="text" icon="edit" @click="editData(data.row)">編輯</el-button>
            <el-button type="text" icon="delete2" @click="deleteData([data.row._id])">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.count"
      :page-size="table.pageSize"
      :page-sizes="[15, 20, 30, 40, 50]"
      :current-page.sync="table.currentPage"
      v-if="table.count > 0 && toolbar.pagination === true"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'details-table',
    props: {
      toolbar: {
        required: true,
        type: Object,
        default () {
          return {
            dataOperation: false,
            searchBar: false,
            pagination: false
          }
        }
      },
      search: {
        type: Object,
        default () {
          return {
            typeOptions: [],
            type: 0,
            value: ''
          }
        }
      },
      slotForms: {
        required: true,
        type: Array,
        default () {
          return [
            {
              slot: '',
              ref: '',
              title: '',
              model: {
                _id: '',
                mobilePhone: '',
                name: '',
                nickname: '',
                gender: '',
                group: ''
              }
            }
          ]
        }
      },
      table: {
        required: true,
        type: Object,
        emptyText: '暫無數據',
        startNum: 0,
        pageSize: 15,
        default () {
          return {
            ref: '',
            border: false,
            maxHeight: '',
            currentPage: 1,
            pageSize: 10,
            count: 0,
            data: [],
            columns: [
              {
                prop: '',
                label: '',
                minWidth: '',
                resizable: false
              }
            ]
          }
        }
      }
    },
    data () {
      return {
        columnsFixedWidth: 0,
        mediaQueryList: '',
        tableStyle: {
          height: `${this.table.maxHeight}px`,
          margin: '16px 0'
        },
        editDialogVisible: false,
        addDialogVisible: false,
        dataSelected: []
      }
    },
    methods: {
      initColumnsFixedWidth () {
        return new Promise((resolve, reject) => {
          this.columnsFixedWidth = this.table.columns.reduce((result, element) => {
            return result + Number(element.minWidth)
          }, this.toolbar.dataOperation ? 482 : 281)
          resolve()
        })
      },
      listenMediaQueryList () {
        return new Promise((resolve, reject) => {
          this.mediaQueryList = window.matchMedia(`(min-width: ${this.columnsFixedWidth}px)`)
          this.mediaQueryList.addListener(this.mediaQueryListChanged)
          this.mediaQueryListChanged()
          resolve()
        })
      },
      mediaQueryListChanged () {
        this.mediaQueryList = window.matchMedia(`(min-width: ${this.columnsFixedWidth}px)`)
        document.querySelector('.el-table__body-wrapper').style.overflowX = this.mediaQueryList.matches === true ? 'hidden' : 'auto'
      },
      editData (row) {
        // 此处应使用JSON对row这一对象进行深拷贝，否则在表单中更改值时会导致表格中的值跟着更改。
        this.slotForms[1].model = JSON.parse(JSON.stringify(row))
        this.editDialogVisible = true
      },
      deleteData (data) {
        this.$emit('delete-data', data)
      },
      addData () {
        this.addDialogVisible = true
      },
      searchData () {
        this.$emit('search-data')
      },
      selectionChange (selection) {
        this.dataSelected = []
        selection.forEach((element) => {
          this.dataSelected.push(element._id)
        })
      },
      currentChange (currentPage) {
        this.$emit('current-change')
      },
      sizeChange (size) {
        this.table.pageSize = size
        this.$emit('size-change')
      }
    },
    async created () {
      await this.initColumnsFixedWidth()
      await this.listenMediaQueryList()
      document.querySelector('.el-table__body-wrapper').style.overflowX = this.mediaQueryList.matches === true ? 'hidden' : 'auto'
    },
    destroyed () {
      this.mediaQueryList.removeListener(this.mediaQueryListChanged)
    }
  }
</script>

<style lang="less">
  .details-table {  
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

      .el-dialog {
        width: 480px;
        
        .el-dialog__body {
          padding: 28px 36px;

          .el-select {
            width: 100%;
          }

          .el-form-item:last-child {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0;
          }
        }
      }
    }

		.el-table {
      .el-button + .el-button {
        color: #ff4949;
      }
    }

    .el-pagination {
      display: flex;
      justify-content: center;
    }
  }
</style>
