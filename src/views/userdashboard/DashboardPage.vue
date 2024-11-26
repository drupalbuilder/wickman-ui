<template>
  <div class="bg-[#f3e9ea] py-1"></div>

  <!-- Breadcrumb Navigation -->
  <nav
    aria-label="breadcrumb"
    class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light"
    style="max-width: 1536px !important;"
  >
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Dashboard</a>
      </li>
    </ol>
  </nav>

  <div class="flex wapper-max bg-grey container mx-auto min-h-screen xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5">
    <!-- Sidebar -->
    <UserDashboardSidebar />

    <!-- Main Content -->
    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <!-- User Info Section -->
      <div class="mb-8" v-if="user.name">
        <h2 class="text-3xl text-3xl raleway-custom text-[#8A2432]">Hello {{ user.name }},</h2>
        <p class="text-black text-lg mt-2">Welcome to Wickman’s Fine Wine & Whisky Auction!</p>
      </div>

      <!-- Stats Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-trophy text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalLotsWon }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Lots Won</p>
        </div>
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-gavel text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalBids }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Bids</p>
        </div>
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-receipt text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalOrders }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Orders</p>
        </div>
      </div>

      <!-- Recent Bids Section -->
      <div class="bg-white px-6 py-2 rounded-md border border-[#E496A1] mb-6">
        <div class="border-b p-2">
          <h3 class="text-lg font-bold text-[#8A2432]">Recent Bids</h3>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4">Lot Details</th>
              <th class="py-2 px-4">Current Bid</th>
              <th class="py-2 px-4">Your Bid</th>
              <th class="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              class=" hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 flex items-center space-x-4">
                <img :src="product.image" alt="" class="w-12 h-12 rounded" />
                <div>
                  <p class="text-sm font-medium">Lot #{{ product.lotNumber }}</p>
                  <p class="text-sm text-gray-500 truncate w-40">{{ product.title }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-[#8a2432] font-semibold">
                {{ product.currentBid }}
              </td>
              <td class="py-3 px-4 text-gray-600">{{ product.yourBid }}</td>
              <td class="py-3 px-4">
                <a href="#" class="text-gray-600 hover:underline">View Lot</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Wishlist Section -->
      <div class="bg-white px-6 py-2 rounded-md border border-[#E496A1]">
        <div class="border-b p-2">
          <h3 class="text-lg font-bold text-[#8A2432]">Your Wishlist</h3>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4">Lot Details</th>
              <th class="py-2 px-4">Current Bid</th>
              <th class="py-2 px-4">Your Bid</th>
              <th class="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="wishlist in wishlistItems"
              :key="wishlist.id"
              class=" hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 flex items-center space-x-4">
                <img :src="wishlist.image" alt="" class="w-12 h-12 rounded" />
                <div>
                  <p class="text-sm font-medium">Lot #{{ wishlist.lotNumber }}</p>
                  <p class="text-sm text-gray-500 truncate w-40">{{ wishlist.title }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-[#8a2432] font-semibold">
                {{ wishlist.currentBid }}
              </td>
              <td class="py-3 px-4 text-gray-600">{{ wishlist.yourBid }}</td>
              <td class="py-3 px-4">
                <a href="#" class="text-gray-600 hover:underline">View Lot</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import UserDashboardSidebar from "@/components/UserDashboardSidebar.vue";

export default defineComponent({
  components: {
    UserDashboardSidebar,
  },
  data() {
    return {
      user: {},
      stats: {
        totalLotsWon: 10,
        totalBids: 52,
        totalOrders: 8,
      },
      products: [
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357830",
          title: "Buffalo Trace Bourbon Very Fine Rare",
          currentBid: "$1400",
          yourBid: "$1400",
        },
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357830",
          title: "Buffalo Trace Bourbon Very Fine Rare",
          currentBid: "$1400",
          yourBid: "$1400",
        },
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357830",
          title: "Buffalo Trace Bourbon Very Fine Rare",
          currentBid: "$1400",
          yourBid: "$1400",
        },
      ],
      wishlistItems: [
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357833",
          title: "Yamazaki 12 Year Old",
          currentBid: "$1800",
          yourBid: "$1700",
        },
      ],
    };
  },
  created() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.$router.push({ name: "LoginUser" });
    }
  },
});
</script>

<style scoped>
.wapper-max {
  max-width: 1536px !important;
}
</style>
