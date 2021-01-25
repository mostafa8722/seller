<template>
    <div :class="'etiquette d-flex justify-content-center align-items-center ' + kind">
        <p>{{title}}</p>
    </div>
</template>
<script>
export default {
    props:['kind'],
    computed:{
        title:function(){
            switch (this.kind) {
                case 'sent':
                    return 'ارسال شده'       
                    break;
                case 'pending':
                    return  'در انتظار'
                    break;
                case 'cancelled':
                    return 'لغو شده'
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style scoped>
    .etiquette{
        border-radius: 12px;
        font-size: 0.75rem;
        padding:3px;
    }

    .etiquette p{
        margin: 0px;
        padding:0px;
    }
    .sent{
        background-color: rgba(52, 195 , 166, 0.16);
        color: #34C3A6;
    }

    .pending{
        background-color: rgba(255, 170, 0, 0.2);
        color: #D58E00;
    }

    .cancelled{
        background-color: rgba(255, 0, 0, 0.12);
        color: #FF0000;
    }
</style>