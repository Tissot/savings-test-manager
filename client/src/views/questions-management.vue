<template>
  <div id="online-content-management">
    <h2>試題管理</h2>
    <el-tabs v-model="activeName" @tab-click="toggleGroup">
      <el-tab-pane v-for="group of groups" :key="group" :name="group" :label="group"></el-tab-pane>
      <details-table
        :toolbar="toolbar"
        :slotForms.sync="slotForms"
        :table.sync="table"
        @delete-data="deleteQuestions"
        @current-change="getQuestions"
        @size-change="getQuestions"
      >
        <!-- 这里2个el-form用v-for会有毒 -->
        <el-form
          :ref="slotForms[0].ref"
          :slot="slotForms[0].slot"
          label-width="80px"
          :model="slotForms[0].model"
          @submit.native.prevent
        >
          <el-form-item label="試題標題" prop="question" :rules="{ required: true, message: '請輸入試題標題', trigger: 'change' }">
            <el-input placeholder="請輸入試題標題" v-model.trim="slotForms[0].model.question"></el-input>
          </el-form-item>
          <el-form-item label="選項A" prop="options[0]" :rules="{ required: true, message: '請輸入選項A的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項A的內容" v-model.trim="slotForms[0].model.options[0]"></el-input>
          </el-form-item>
          <el-form-item label="選項B" prop="options[1]" :rules="{ required: true, message: '請輸入選項B的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項B的內容" v-model.trim="slotForms[0].model.options[1]"></el-input>
          </el-form-item>
          <el-form-item label="選項C" prop="options[2]" :rules="{ required: true, message: '請輸入選項C的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項C的內容" v-model.trim="slotForms[0].model.options[2]"></el-input>
          </el-form-item>
          <el-form-item label="選項D" prop="options[3]" :rules="{ required: true, message: '請輸入選項D的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項D的內容" v-model.trim="slotForms[0].model.options[3]"></el-input>
          </el-form-item>
          <el-form-item label="試題答案" prop="answer" :rules="{ required: true, type: 'number', message: '請選擇試題答案', trigger: 'change' }">
            <el-radio-group v-model="slotForms[0].model.answer">
              <el-radio v-for="(answer, index) of answers" :key="index" :label="index">{{ answer }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="試題分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇試題分組', trigger: 'change' }">
            <el-select placeholder="请选择試題分組" v-model="slotForms[0].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(slotForms[0].ref)">重置</el-button>
            <el-button native-type="submit" type="primary" @click="updateQuestions(slotForms[0])">確定</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :ref="slotForms[1].ref"
          :slot="slotForms[1].slot"
          label-width="80px"
          :model="slotForms[1].model"
          @submit.native.prevent
        >
          <el-form-item label="試題標題" prop="question" :rules="{ required: true, message: '請輸入試題標題', trigger: 'change' }">
            <el-input placeholder="請輸入試題標題" v-model.trim="slotForms[1].model.question"></el-input>
          </el-form-item>
          <el-form-item label="選項A" prop="options[0]" :rules="{ required: true, message: '請輸入選項A的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項A的內容" v-model.trim="slotForms[1].model.options[0]"></el-input>
          </el-form-item>
          <el-form-item label="選項B" prop="options[1]" :rules="{ required: true, message: '請輸入選項B的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項B的內容" v-model.trim="slotForms[1].model.options[1]"></el-input>
          </el-form-item>
          <el-form-item label="選項C" prop="options[2]" :rules="{ required: true, message: '請輸入選項C的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項C的內容" v-model.trim="slotForms[1].model.options[2]"></el-input>
          </el-form-item>
          <el-form-item label="選項D" prop="options[3]" :rules="{ required: true, message: '請輸入選項D的內容', trigger: 'change' }">
            <el-input placeholder="請輸入選項D的內容" v-model.trim="slotForms[1].model.options[3]"></el-input>
          </el-form-item>
          <el-form-item label="試題答案" prop="answer" :rules="{ required: true, type: 'number', message: '請選擇試題答案', trigger: 'change' }">
            <el-radio-group v-model="slotForms[1].model.answer">
              <el-radio v-for="(answer, index) of answers" :key="index" :label="index">{{ answer }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="試題分組" prop="group" :rules="{ required: true, type: 'number', message: '請選擇試題分組', trigger: 'change' }">
            <el-select placeholder="请选择試題分組" v-model="slotForms[1].model.group">
              <el-option v-for="(group, index) in groups" :key="index" :value="index" :label="group"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-button native-type="submit" type="primary" @click="updateQuestions(slotForms[1])">確定</el-button>
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
        activeName: window.sessionStorage.getItem('questionsManagementActiveName'),
        groups: ['Peer Support 組', 'Earmarking Saving 組', '雙重干預組', '空白對照組'],
        answers: ['A', 'B', 'C', 'D'],
        toolbar: {
          dataOperation: true,
          searchBar: false,
          pagination: false
        },
        slotForms: [
          {
            slot: 'add-form',
            ref: 'addQuestion',
            title: '添加試題',
            model: {
              question: '',
              options: [],
              answer: '',
              group: ''
            }
          },
          {
            slot: 'edit-form',
            ref: 'editQuestion',
            title: '編輯試題',
            model: {
              _id: '',
              question: '',
              options: [],
              answer: '',
              group: ''
            }
          }
        ],
        table: {
          ref: 'questionsTable',
          border: true,
          maxHeight: '443',
          emptyText: '暫無試題',
          currentPage: 1,
          pageSize: 15,
          data: [
            // 数据结构如下：
            // {
            //   _id: '',
            //   question: '',
            //   options: [],
            //   answer: '',
            //   group: ''
            // }
          ],
          columns: [
            {
              prop: 'question',
              label: '題目',
              minWidth: '200',
              resizable: false
            },
            {
              // 这里的prop如果改成'options[0]'会无法显示。
              prop: 'options.0',
              label: '選項A',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'options.1',
              label: '選項B',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'options.2',
              label: '選項C',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'options.3',
              label: '選項D',
              minWidth: '200',
              resizable: false
            },
            {
              prop: 'answer',
              label: '答案',
              minWidth: '70',
              resizable: false,
              formatter (row, column, cellValue) {
                let answers = ['A', 'B', 'C', 'D']
                return answers[cellValue]
              }
            }
          ]
        }
      }
    },
    methods: {
      initActiveName () {
        window.sessionStorage.setItem('questionsManagementActiveName', this.groups[0])
        this.activeName = window.sessionStorage.getItem('questionsManagementActiveName')
      },
      checkActiveName () {
        let activeNameExited = false

        if (this.activeName === null) {
          this.initActiveName()
        } else {
          this.groups.some((element) => {
            if (this.activeName === element) {
              activeNameExited = true
              return true
            }
          })

          if (activeNameExited === false) {
            this.initActiveName()
          }
        }
      },
      async getQuestions () {
        const response = (await this.$ajax({
          method: 'post',
          url: '/question/getQuestions',
          data: {
            group: this.groups.indexOf(this.activeName)
          }
        })).data

        if (response.statusCode === 100) {
          this.table.data = response.result.questions
        } else if (response.statusCode === -1008) {
          this.table.data = []
        }
      },
      toggleGroup (group) {
        if (this.groups.indexOf(this.activeName) !== -1) {
          this.getQuestions()
          window.sessionStorage.setItem('questionsManagementActiveName', group.name)
        }
      },
      updateQuestions (slotForm) {
        this.$refs[slotForm.ref].validate(async (isValid) => {
          if (isValid === true) {
            const response = (await this.$ajax({
              method: 'post',
              url: `/question/${slotForm.ref}`,
              data: slotForm.model
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getQuestions()
            }
          }
        })
      },
      async deleteQuestions (questions) {
        try {
          const result = await this.$confirm(questions.length === 1 ? '确定刪除該試題？' : `确定刪除這${questions.length}個試題？`, '刪除試題', {
            type: 'warning'
          })

          if (result === 'confirm') {
            const response = (await this.$ajax({
              method: 'post',
              url: '/question/deleteQuestions',
              data: questions
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              this.getQuestions()
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
      this.getQuestions()
    }
  }
</script>

<style lang="less">
</style>
