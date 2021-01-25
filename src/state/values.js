import { computed, ref } from "@vue/composition-api";

const stateValues = ref({
  searchShops:null,
  searchQuery:null,
  notEmptySearch:false
});

const shoppingCart = ref([])
const totalPrice = computed(()=>{
  let sum = 0
  if(shoppingCart.value.length>0){
    shoppingCart.value.map((i)=>{
      sum = sum + (i.price * i.quantity)
    })
  }
  return sum
})

const addToCart = (product) => {
  let x = {...product}
  let exists = false
  shoppingCart.value.map((p)=>{
    if(p.id == x.id){
      p.quantity++
      exists = true
    }
  })
  if(!exists){
      if(!x.quantity)
        x.quantity = 1
      shoppingCart.value = [...shoppingCart.value,x]
      
  }
  localStorage.golpino_cart = JSON.stringify(shoppingCart.value)
  // $cookies.set("Golpino_cart",JSON.stringify(shoppingCart.value))
}

const plusQuantity = (product) => {
  shoppingCart.value.map((i)=>{
    if(i.id == product.id)
      i.quantity++
  })
  // $cookies.set("Golpino_cart",JSON.stringify(shoppingCart.value))
  localStorage.golpino_cart = JSON.stringify(shoppingCart.value)
}

const minusQuantity = (product) => {
  shoppingCart.value.map((i)=>{
    if(i.id == product.id){
      if(i.quantity != 1)
        i.quantity--
      else
        removeFromCart(product)
    }
  })
  // $cookies.set("Golpino_cart",JSON.stringify(shoppingCart.value))
  localStorage.golpino_cart = JSON.stringify(shoppingCart.value)
}

const removeFromCart = (product) => {
  shoppingCart.value = shoppingCart.value.filter((i)=>{
    console.log(i.id)
    console.log(product.id)
    if(i.id != product.id){
      return i
    }
  })
  // $cookies.set("Golpino_cart",JSON.stringify(shoppingCart.value))
  localStorage.golpino_cart = JSON.stringify(shoppingCart.value)
}

const setCart = (v) => {
    shoppingCart.value = [...v]
    // $cookies.set("Golpino_cart",JSON.stringify(shoppingCart.value))
    localStorage.golpino_cart = JSON.stringify(shoppingCart.value)
}

const getLocalCart = () => {
  shoppingCart.value = JSON.parse(localStorage.golpino_cart)
}

const setShops = (shops,query) => {
  stateValues.value.searchShops = shops
  stateValues.value.searchQuery = query
}

const emptySearch = (x)=>{
  stateValues.value.notEmptySearch = x
}

export default { setCart,emptySearch,stateValues,setShops,getLocalCart,shoppingCart,addToCart,minusQuantity,plusQuantity,removeFromCart,totalPrice}