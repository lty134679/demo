<template>
    <div class="container">
        <div class="d-flex justify-content-center mt-2">
            <h4>自查工作</h4>
        </div>
        <div class="p-3" style="background-color: #e6e8e9">
            <div class="fw-bold flex-shrink-0 fs-5">运营使用单位网络安全工作情况</div>
            <div class="mt-3 p-3 rounded-3" style="background-color: #f2f2f2">
                <form>
                    <div class="mt-2" v-for="(item,ind) in questionList.data" :key="ind">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="d-flex">
                                <span @click="item.closeFlag=!item.closeFlag">{{item.closeFlag==false?'点击关闭':'点击打开'}}</span>
                                <div class="fs-6 fw-bold ms-2">{{item.topicTitle}}</div>
                                <span class="fw-bold ms-2" style="color: #019ee3">{{transPartNum(ind)}}</span>
                            </div>
                            <div class="progress w-75">
                                <div class="progress-bar" role="progressbar" :style="{width: `${item.partProgress}% !important`}" :aria-valuenow="item[partProgress]"
                                    aria-valuemin="0" aria-valuemax="100">{{item.partProgress}}%</div>
                            </div>
                        </div>
                        <div class="mt-2  d-flex" v-for="(qItem,qIndex) in item.questionDTOList" :key="qIndex" :class="[item.closeFlag==true?'active':'normal']">
                            <div class="pt-3" style="color: #cc3366">
                                {{qIndex+1}}
                            </div>
                            <div class="ms-3 p-3" style="flex: 1" :class="[qIndex%2==0 ?'qes-bkd  rounded-3 bg-opacity-10':'']">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="d-flex">
                                        <span style="color: #cc3366" v-if="qItem.isAnswer==0">*</span>
                                        <div class="ms-1">
                                            {{qItem.questionTitle}}
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-end ">
                                        <div class="ms-1" v-for="(oItem,oInd) in optionList" :key="oInd">
                                            <input class="" type="radio" :name="qItem.id" @change="changeInput(ind,qIndex,qItem.id,oItem.value)">
                                            <label class="form-check-label ms-1" for="exampleRadios1">
                                                {{oItem.label}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="direction mt-1" v-show="qItem.isShow">
                                    <div class="fs-6 flex-shrink-0">*{{qItem.directionTitle}}</div>
                                    <div class="">
                                        <textarea class="form-control" v-model="qItem.answerRemark" aria-label="With textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <button type="button" class="btn btn-primary mt-2" @click="test">测试</button> -->
    </div>
</template>
<script setup>
    import { onMounted, reactive, watch } from 'vue'
    let questionList = reactive({
        data: []
    })
    let optionList = reactive([{
        label: "是",
        value: 1,
    },
    {
        label: "否",
        value: 2,
    },
    {
        label: "非必要",
        value: 3,
    }])
    watch(() => questionList.data, (newValue) => {
        newValue.forEach(item => {
            item.questionDTOList.forEach(v => {
                if (v.answerRemark.length >= 10) {
                    v.answerRemark = v.answerRemark.substring(0, 10)
                }
            })
        })
    }, { deep: true })
    const changeInput = (ind, qindex, id, value) => {
        questionList.data[ind]['questionDTOList'][qindex].answerOption = value
        if (value == 1) {
            questionList.data[ind]['questionDTOList'][qindex].isShow = true
        } else {
            questionList.data[ind]['questionDTOList'][qindex].isShow = false
        }
        let ansArr = questionList.data[ind]['questionDTOList'].filter(v => v.answerOption !== '')
        questionList.data[ind].partProgress = (ansArr.length / questionList.data[ind]['questionDTOList'].length * 100).toFixed(0)
    }

    const transPartNum = (ind) => {
        let dict = ["Part One", "Part Two", "Part Three", "Part Four", "Part Five", "Part Six", "Part Seven", "Part Eight", "Part Nine", "Part Ten"]
        return dict[ind]
    }
    const getQuestionList = () => {
        let arr = [
            {
                "questionDTOList": [
                    {
                        "directionContent": "directionContent",
                        "directionTitle": "directionTitle",
                        "isAnswer": 0,
                        "questionOrder": "1",
                        "questionTitle": "题目1",
                        "remark": "",
                        "id": 1
                    },
                    {
                        "directionContent": "",
                        "directionTitle": "",
                        "isAnswer": 0,
                        "questionOrder": "2",
                        "questionTitle": "题目2",
                        "remark": "",
                        "id": 2
                    }
                ],
                "topicOrder": "1",
                "topicSerial": 1,
                "topicTitle": "类目1"
            },
            {
                "questionDTOList": [
                    {
                        "directionContent": "",
                        "directionTitle": "",
                        "isAnswer": 0,
                        "questionOrder": "1",
                        "questionTitle": "题目3",
                        "remark": "",
                        "id": 3
                    },
                    {
                        "directionContent": "",
                        "directionTitle": "",
                        "isAnswer": 0,
                        "questionOrder": "2",
                        "questionTitle": "题目4",
                        "remark": "",
                        "id": 4
                    }
                ],
                "topicOrder": "1",
                "topicSerial": 2,
                "topicTitle": "类目2"
            }]
        arr.forEach(item => {
            item["partProgress"] = 0
            item['closeFlag'] = false
            item.questionDTOList.forEach(v => {
                v["isShow"] = false
                v["answerOption"] = ""
                v["answerRemark"] = ""
            })
        })
        questionList.data = arr
    }
    onMounted(() => {
        getQuestionList()
    })
</script>
<style lang="scss" scoped>
    .main {
        min-height: 100%;
        padding: 10px;
        background-color: #f8fafc;
    }

    .direction {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .qes-bkd {
        background-color: #e4e8f2;
    }

    .active {
        height: 0;
        overflow: hidden;
    }

    .normal {
        height: auto
    }

    .progress {
        height: 0.8rem !important;
    }

    .progress-bar {
        background-color: #508bfd !important;
    }
</style>