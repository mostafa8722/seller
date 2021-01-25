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
                case "0":
                    return 'پرداخت نشده'       
                    break;
                case "1":
                    return  'پرداخت شده'
                    break;
                case "2":
                    return 'قبول شده'
                    break;
                case "3":
                    return 'لغو شده'
                    break;
                default:
                    break;
            }
        },
        kind:function(){
            switch (this.status) {
                case "0":
                    return 'toBePaid'       
                    break;
                case "1":
                    return  'paid'
                    break;
                case "2":
                    return 'accepted'
                    break;
                case "3":
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
        padding:8px;
        max-width: 100px;
    }

    .etiquette p{
        margin: 0px;
        padding:0px;
    }
    .accepted{
        background-color: rgba(52, 195 , 166, 0.16);
        color: #34C3A6;
    }

    .paid{
        background-color: rgba(255, 170, 0, 0.2);
        color: #D58E00;
    }

    .toBePaid{
        background-color: #fbff94;
        color: #000;
    }

    .cancelled{
        background-color: rgba(255, 0, 0, 0.12);
        color: #FF0000;
    }
</style>