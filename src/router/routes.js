const routes = [
  // MAIN
  {
    path: '/golpino-for-vendor',
    name: 'Golpino Seller Admin',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Login/index.vue')
  },
  {
    path:'/profile',
    name:'Golpino User Profile Page',
    component:()=>import ('../components/Main/User/Profile.vue'),
    children:[
      {
        path:'info',
        name:'Golpino User Profile Info Page',
        component:()=>import ('../components/Main/User/partials/UserInfo.vue')
      },
      {
        path:'orders',
        name:'Golpino User Profile Orders Page',
        component:()=>import ('../components/Main/Orders/Summary.vue')
      },
      {
        path:'orders/:id',
        name:'Golpino User Profile Order Page',
        component:()=>import ('../components/Main/Orders/AnOrder.vue')
      }
    ]
  },
  {
    path: '/complaint',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Main/Complaints/Send.vue')
  },
  {
    path: '/about',
    name: 'FAQ',
    component: () => import('../components/Main/About/AboutUs.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../components/Main/About/FAQ.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../components/Main/Shop/Shop.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../components/Main/Product/Product.vue')
  },
  {
    path: '/user/payment',
    name: 'Golpino Payment Page',
    component: () => import('../components/Main/Pay/Pay.vue')
  },{
    path: '/user/payment/:id',
    name: 'Golpino Payment Page',
    component: () => import('../components/Main/Pay/Pay.vue')
  },{
    path: '/contact',
    name: 'Golpino Contact Page',
    component: () => import('../components/Main/About/ContactUs.vue')
  },{
    path: '/terms-and-conditions',
    name: 'Golpino Terms And Conditions Page',
    component: () => import('../components/Main/About/Terms.vue')
  },{
    path: '/sponsors',
    name: 'Golpino Sponsors Page',
    component: () => import('../components/Main/About/Sponsors.vue')
  },
  {
    path:'/search',
    name: 'Golpino Search Page',
    component:() => import('../components/Main/Search/Results.vue'),
    props:route => ({category:(route.query.category ? route.query.category : null),district:(route.query.district ? route.query.district : null),address:(route.query.address ? route.query.address : null),name: (route.query.name ? route.query.name : null)})
  },
  {
    path:'/user/orders',
    name: 'Golpino User Orders Page',
    component:() => import('../components/Main/Orders/Summary.vue'),
    meta:{
      requiresAuth:true
    }
    // props:route => ({category:(route.query.category_id ? route.query.category_id : null),district:(route.query.district_id ? route.query.district_id : null),name: (route.query.name ? route.query.name : null)})
  },
  {
    path:'/user/order/:id',
    name: 'Golpino User Order Page',
    component:() => import('../components/Main/Orders/AnOrder.vue')
    // props:route => ({category:(route.query.category_id ? route.query.category_id : null),district:(route.query.district_id ? route.query.district_id : null),name: (route.query.name ? route.query.name : null)})
  },
  {
    path:'/user/cancel-payment',
    name: 'Golpino User Order Page',
    component:() => import('../components/Main/FollowUp/Failure.vue')
    // props:route => ({category:(route.query.category_id ? route.query.category_id : null),district:(route.query.district_id ? route.query.district_id : null),name: (route.query.name ? route.query.name : null)})
  },
  {
    path:'/user/online-payment/:id/:follow',
    name: 'Golpino Successful Payment Page',
    component:() => import('../components/Main/FollowUp/Success.vue')
    // props:route => ({category:(route.query.category_id ? route.query.category_id : null),district:(route.query.district_id ? route.query.district_id : null),name: (route.query.name ? route.query.name : null)})
  }



  // ADMIN
  ,{
    path: '/qwertyzxcvb/login',
    name: 'Golpino Admin Login Page',
    component: () => import('../components/Admin/Login/Login.vue'),
  }
  ,{
    path: '/qwertyzxcvb/admin',
    name: 'Golpino Admin Page',
    component: () => import('../components/Admin/AddStuff.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/district',
    name: 'Golpino Add Districts Page',
    component: () => import('../components/Admin/Forms/District.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/district',
    name: 'Golpino Display Districts Page',
    component: () => import('../components/Admin/Display/Districts.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/district/:id',
    name: 'Golpino Edit District Page',
    component: () => import('../components/Admin/Forms/District.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/categories',
    name: 'Golpino Display Categories Page',
    component: () => import('../components/Admin/Display/Categories.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/category',
    name: 'Golpino Add Categories Page',
    component: () => import('../components/Admin/Forms/Category.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/category/:id',
    name: 'Golpino Edit Category Page',
    component: () => import('../components/Admin/Forms/Category.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/tags',
    name: 'Golpino Display Tags Page',
    component: () => import('../components/Admin/Display/Tags.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/tag',
    name: 'Golpino Add Tags Page',
    component: () => import('../components/Admin/Forms/Tag.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/tag/:id',
    name: 'Golpino Edit Tag Page',
    component: () => import('../components/Admin/Forms/Tag.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/ranges',
    name: 'Golpino Display Ranges Page',
    component: () => import('../components/Admin/Display/ServiceRanges.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/range',
    name: 'Golpino Add Ranges Page',
    component: () => import('../components/Admin/Forms/ServiceRange.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/range/:id',
    name: 'Golpino Edit Range Page',
    component: () => import('../components/Admin/Forms/ServiceRange.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/distances',
    name: 'Golpino Display Distances Page',
    component: () => import('../components/Admin/Display/Distances.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/distance',
    name: 'Golpino Add Distances Page',
    component: () => import('../components/Admin/Forms/Distance.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/distance/:id',
    name: 'Golpino Edit Distance Page',
    component: () => import('../components/Admin/Forms/Distance.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/view/attributes',
    name: 'Golpino Display Attributes Page',
    component: () => import('../components/Admin/Display/Attributes.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/add/attribute',
    name: 'Golpino Add Attributes Page',
    component: () => import('../components/Admin/Forms/Attribute.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/edit/attribute/:id',
    name: 'Golpino Edit Attribute Page',
    component: () => import('../components/Admin/Forms/Attribute.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/orders',
    name: 'Golpino Admin Orders Page',
    component: () => import('../components/Admin/Order/Summary.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/orders/:id',
    name: 'Golpino Admin Order Page',
    component: () => import('../components/Admin/Order/AnOrder.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
    path: '/qwertyzxcvb/admin/verify-shop',
    name: 'Golpino Admin Order Page',
    component: () => import('../components/Admin/Verify/VerifySeller.vue'),
    meta:{
      requiresAdmin:true
    }
  },{
      path: '/qwertyzxcvb/admin/view/discounts',
      name: 'Golpino Display Discounts Page',
      component: () => import('../components/Admin/Display/Discounts.vue'),
      meta:{
        requiresAdmin:true
      }
    },{
      path: '/qwertyzxcvb/admin/add/discount',
      name: 'Golpino Add Discount Page',
      component: () => import('../components/Admin/Forms/Discount.vue'),
      meta:{
        requiresAdmin:true
      }
    },{
      path: '/qwertyzxcvb/admin/edit/discount/:id',
      name: 'Golpino Edit Discount Page',
      component: () => import('../components/Admin/Forms/Discount.vue'),
      meta:{
        requiresAdmin:true
      }
    },{
      path: '/qwertyzxcvb/admin/verify-shops',
      name: 'Golpino Verify Shops Page',
      component: () => import('../components/Admin/Display/Shops.vue'),
      meta:{
        requiresAdmin:true
      }
    },
  // SELLER
  {
    path: '/seller',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../components/Main/Home/Home.vue')
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
  },{
    path: '/seller/orders',
    name: 'Golpino Seller Orders',
    component: () => import(/* webpackChunkName: "about" */ '../components/Seller/Orders/Summary.vue')
  },

  // BASE
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../components/Main/Home/Home.vue')
  },

]

export default routes