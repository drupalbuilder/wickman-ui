import { createRouter, createWebHistory } from 'vue-router';

// Lazy load components
const HomePage = () => import('@/views/HomePage.vue');
const PastAuction = () => import('@/views/PastAuction.vue');
const PastAuctionlot = () => import('@/views/PastAuctionlot.vue');
const LiveAuctionlot = () => import('@/views/LiveAuctionlot.vue');
const PastAuctionDetailPage = () => import('@/views/PastAuctionDetailPage.vue');
const RegisterUser = () => import('@/views/RegisterUser.vue');
const LoginUser = () => import('@/views/LoginUser.vue');
const LiveAuction = () => import('@/views/LiveAuction.vue');
const RequestAndValuation = () => import('@/views/RequestAndValuation.vue');
const DeliveryInsurance = () => import('@/views/DeliveryInsurance.vue');
const PrivacyPolicyPage = () => import('@/views/PrivacyPolicyPage.vue');
const TermsAndConditionsPage = () => import('@/views/TermsAndConditionsPage.vue');
const FaqsPage = () => import('@/views/FaqsPage.vue');
const ContactUs = () => import('@/views/ContactUs.vue');
const AboutUs = () => import('@/views/AboutUs.vue');
const LiveAuctionDetailPage = () => import('@/views/LiveAuctionDetailPage.vue');
// User Dashboard Pages
const UserDashboardSidebar = () => import('@/components/UserDashboardSidebar.vue');
const DashboardPage = () => import('@/views/userdashboard/DashboardPage.vue');
const UserProfilePage = () => import('@/views/userdashboard/UserProfile.vue');
const UserAddressPage = () => import('@/views/userdashboard/UserAddress.vue');
const NotificationSetting = () => import('@/views/userdashboard/NotificationSetting.vue');
const WishList = () => import('@/views/userdashboard/WishList.vue');
// Shopping Pages
const ShoppingCart = () => import('@/views/ShoppingCart.vue');
const CheckOutPage = () => import('@/views/CheckOutPage.vue');
// Other Pages
const HowtoBuy = () => import('@/views/HowtoBuy.vue');
const HowtoSale = () => import('@/views/HowtoSale.vue');
const RegisterPayment = () => import('@/views/RegisterPayment.vue');
const NotFoundPage = () => import('@/views/NotFoundPage.vue'); // 404 page
// Routes
const routes = [
  // Public Pages
  { path: '/', name: 'Home', component: HomePage },
  { path: '/how-buy', name: 'HowtoBuy', component: HowtoBuy },
  { path: '/how-sale', name: 'HowtoSale', component: HowtoSale },
  { path: '/request-valuation', name: 'RequestAndValuation', component: RequestAndValuation },
  { path: '/delivery-insurance', name: 'DeliveryInsurance', component: DeliveryInsurance },
  { path: '/privacy-policy', name: 'PrivacyPolicyPage', component: PrivacyPolicyPage },
  { path: '/terms-conditions', name: 'TermsAndConditionsPage', component: TermsAndConditionsPage },
  { path: '/faqs', name: 'FaqsPage', component: FaqsPage },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/about-us', name: 'AboutUs', component: AboutUs },
  // Registration & Login
  { path: '/register-user', name: 'RegisterUser', component: RegisterUser },
  { path: '/login', name: 'LoginUser', component: LoginUser, meta: { guest: true } },

  {
    path: '/past-auction/:slug', // Dynamic route for auction detail page
    name: 'PastAuctionlot',
    component: PastAuctionlot,
  },

  {
    path: '/past-auction', // Add your auction page route here
    name: 'PastAuction',
    component: PastAuction,  // Auction listing page component
  },
  
  {
    path: '/live-auction/:slug', // Dynamic route for auction detail page
    name: 'LiveAuctionlot',
    component: LiveAuctionlot,
  },
  { path: '/live-auction', name: 'LiveAuction', component: LiveAuction },

  { path: '/past-auction-detail/:id', name: 'PastAuctionDetailPage', component: PastAuctionDetailPage, props: true },
  {
    path: '/live-auction-detail',
    name: 'LiveAuctionDetailPage',
    component: LiveAuctionDetailPage,
  },

  // Payment & Cart
  { path: '/register-payment', name: 'RegisterPayment', component: RegisterPayment },
  { path: '/cart', name: 'ShoppingCart', component: ShoppingCart, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'CheckOutPage', component: CheckOutPage },

  // Dashboard Routes
  {
    path: '/dashboard',
    name: 'DashboardPage',
    components: {
      default: DashboardPage,
      sidebar: UserDashboardSidebar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/user-profile',
    name: 'UserProfilePage',
    components: {
      default: UserProfilePage,
      sidebar: UserDashboardSidebar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/address',
    name: 'UserAddressPage',
    components: {
      default: UserAddressPage,
      sidebar: UserDashboardSidebar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/user-notification',
    name: 'NotificationSetting',
    components: {
      default: NotificationSetting,
      sidebar: UserDashboardSidebar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'WishList',
    components: {
      default: WishList,
      sidebar: UserDashboardSidebar,
    },
    meta: { requiresAuth: true },
  },

  // 404 Not Found
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundPage },
];

// Router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  const errorMessageContainer = document.querySelector('.error-message-container');

  // Authentication check
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    if (errorMessageContainer) {
      errorMessageContainer.style.display = 'block';
    }
    return next({ name: 'LoginUser' });
  }

  // Guest-only route check
  if (to.matched.some((record) => record.meta.guest) && token) {
    return next({ name: 'DashboardPage' });
  }

  next();
});

export default router;
