<template>
    <div :class="'rounded-image ' + kind">
        <img :src="src" alt="image" class="round">
    </div>
</template>
<script>
export default {
    props:['src','kind']
}
</script>
<style scoped>
    .rounded-image{
        border-radius: 50%;
        display: inline-block;
    }

    .big{
        width:50px;
        height:50px;
    }

    .mid{
        width: 25px;
        height: 25px;
    }

    .round{
        width: 100%;
    }
</style>