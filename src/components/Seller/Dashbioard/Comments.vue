<template>
    <div class="container">
        <my-modal v-if="modal" @closeModal="toggleModal" position="comment-modal-position">
            <comment :answerable="false"></comment>
        </my-modal>
        <h2>نظرات مشتریان</h2>
        <div class="nav-bar">
            <div class="nav-item mini-title">
                <p>همه</p>
            </div>
            <div class="nav-item mini-title">
                <p>خوانده نشده</p>
            </div>
            <div class="nav-item mini-title">
                <p>اخیر</p>
            </div>
        </div>
        <div class="comments container">
            <comment @answer="toggleModal" :answerable="true"></comment>
            <comment :answerable="true"></comment>
            <comment :answerable="true"></comment>
            <comment :answerable="true"></comment>
        </div>
    </div>    
</template>
<script>
import Comment from './Partials/Comment'
import MyModal from '../Common/Modal'
export default {
    components:{
        Comment,
        MyModal
    },
    data:()=>({
        modal:false,
        commentToAnswer:[],
        answer:""
    }),
    methods:{
        toggleModal:function(v){
            this.commentToAnswer = v
            this.modal=!this.modal
        }
    }
}
</script>
<style>
.comments{
    background-color: #fff;
}

.comment-modal-position{
    top: -10vh !important;
    right:-16vw !important;
    height: 110vh !important;
    padding-top: 11vh !important;
}
</style>