<template>
    <div :class="'etiquette d-flex justify-content-center align-items-center mini-title m-auto ' + kind">
        <p>{{title}}</p>
    </div>
</template>
<script>
export default {
    props:['status'],
    computed:{
        title:function(){
            switch (this.status) {
                case 1:
                    return 'پرداخت شده'       
                    break;
                case 2:
                    return  'قبول شده'
                    break;
                case 3:
                    return 'رد شده'
                    break;
                case 4:
                    return 'در حال آماده سازی'
                    break;
                case 5:
                    return 'در حال ارسال'
                    break;
                case 6:
                    return 'تحویل داده شد'
                    break;
                case 7:
                    return 'لغو شده'
                    break;
                default:
                    break;
            }
        },
        kind:function(){
            switch (this.status) {
                case 1:
                    return 'sent'       
                    break;
                case 2:
                    return  'sent'
                    break;
                case 3:
                    return 'cancelled'
                    break;
                case 4:
                    return 'pending'
                    break;
                case 5:
                    return 'pending'
                    break;
                case 6:
                    return 'sent'
                    break;
                case 7:
                    return 'cancelled'
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
        max-width: 100px;
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