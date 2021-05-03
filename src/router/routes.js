const routes = [

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/Main/Home/Home.vue')
  // },
  {
    path: '/',
    name: 'Golpino Seller Admin',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Login/index.vue')
  },
  // TEMP DASHBOARD
  {
    path: '/seller/ssettings',
    name: 'Golpino Seller SSettings',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Settings/index2.vue'),
    meta:{
      requiresSeller:true
    },
    children:[
      {
        path:'shop-info',
        name:'Golpino Seller Shop Info Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopInfo.vue')
      },
      {
        path:'shop-delivery-price',
        name:'Golpino Seller Shop Delivery Price Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopDeliveryPrice.vue')
      },
      {
        path:'shop-hours',
        name:'Golpino Seller Shop Hours Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopHours.vue')
      },
      {
        path:'preparation-time',
        name:'Golpino Seller Shop Preparation Time Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopPreparation.vue')
      },
      {
        path:'shop-ranges',
        name:'Golpino Seller Shop Range Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopRange.vue')
      },
      {
        path:'shop-delivery-price',
        name:'Golpino Seller Shop Delivery Price Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopDeliveryPrice.vue')
      },
      {
        path:'shop-images',
        name:'Golpino Seller Shop Preparation Time Page',
        component:()=>import ('../components/Seller/Settings/partials/ShopImages.vue')
      }
    ]
  },
  // TEMP DASHBOARD END
  {
    path: '/seller/product',
    name: 'Golpino Seller Product Form',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Product/ProductForm.vue'),
    meta:{
      requiresSeller:true
    }
  },
  {
    path: '/seller/product/:id',
    name: 'Golpino Seller Product Edit',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Product/ProductForm.vue'),
    meta:{
      requiresSeller:true
    }
  },
  {
    path: '/seller/products',
    name: 'Golpino Seller Products',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Product/index.vue'),
    meta:{
      requiresSeller:true
    }
  },
  {
    path: '/seller/dashboard',
    name: 'Golpino Seller Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Dashbioard/dashboard.vue'),
    meta:{
      requiresSeller:true
    }
  },
  {
    path: '/seller/settings',
    name: 'Golpino Seller Settings',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Settings/index.vue'),
    meta:{
      requiresSeller:true
    }
  },
  {
    path: '/seller/financials',
    name: 'Golpino Seller Financials',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Financial/Payments.vue')
  },

  {
    path: '/seller/orders/:id',
    name: 'Golpino Seller Order Page',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Orders/AnOrder')
  },
  {
    path: '/seller/orders',
    name: 'Golpino Seller Orders',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Orders/Summary')
  },
  {
    path: '/seller/comments',
    name: 'Golpino Seller comments',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Comments/Comments')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../components/Main/Shop/Shop.vue')
  },


]

export default routes