<template>
  <div class="card">
    <p>بانک ملی</p>
    <div class="card-number-section d-flex justify-content-between mt-2">
      <p>1208</p>
      <p>1208</p>
      <p>1208</p>
      <p>1208</p>
    </div>
    <div class="detail d-flex justify-content-between mt-2">
      <p class="mini-title">تاریخ انقضا : 12/07/99</p>
      <p class="mini-title">محمد احمدی</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["card"],
};
</script>
<style scoped>
.card{
    background-image: linear-gradient(to right, #772CE8 , #74173E);
    color: #fff;
    padding:0.8rem 1rem 0.8rem 1rem;
    font-size: 0.7rem;
    border-radius: 6px;
}

.card-number-section p{
    display: inline;
    font-weight: normal;
    font-size: 1rem;
}
</style>