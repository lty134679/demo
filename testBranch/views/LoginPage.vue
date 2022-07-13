<template>
    <div class="">
        <div class="login-page d-flex flex-column align-items-center justify-content-center">
            <div class="p-3 w-auto h-auto login-box d-flex justify-content-between ">
                <img src="../assets/a流程图.png" class="w-50 h-50" alt="">
                <div class="p-5  bg-opacity-10 w-auto h-auto" style="background-color: #eaf1fb">
                    <div class="d-flex justify-content-center align-items-center flex-wrap">
                        <img src="../assets/logo.png" style="width: 80px;height: 80px" alt="">
                        <span class="fs-3 fw-bold ms-2 flex-shrink-0" style="color: #0c60f4">自查工具</span>
                    </div>
                    <div>
                        <div>
                            <img src="../assets/zhanghaodenglu_press.png"  alt="">
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="input-group mb-3 d-flex align-items-center">
                            <span class="input-label" id="basic-addon1">姓名</span>
                            <input type="text" class="form-control ms-2 rounded-3" placeholder="请输入您的姓名" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
    // import { onMounted, reactive, watch } from 'vue'

</script>
<style lang="scss" scoped>
    .login-page {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("../assets/login_bkd_no.png") no-repeat;
        background-size: 100% 100%;
    }

    .login-box {
        position: absolute !important;
        right: 10rem;
        width: auto;
        height: auto;
    }

    .input-label {
        color: #8c8c8c;
    }
</style>