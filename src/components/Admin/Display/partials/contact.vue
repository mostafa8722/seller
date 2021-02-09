<template>
    <tr>
        <td>{{theContact.name}}</td>
        <td>{{theContact.email}}</td>
        <td>{{theContact.phone}}</td>
        <td><img :src="theContact.image" alt="image"></td>
        <td class="desc"><p>{{theContact.desc}}</p></td>
    </tr>
</template>
<script>
export default {
    props:['theContact']
}
</script>
<style scoped>
td{
    border:1px solid rgb(218, 218, 218);
    text-align: center;
    padding:5px;
}

td img{
    width: 75px;
}

.desc p{
    width: 500px;
    word-wrap: break-word;
    margin: auto;
}
</style>
