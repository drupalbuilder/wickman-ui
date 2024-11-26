<template>


  <div class="bg-[#f3e9ea] py-1"></div>
  <!-- Breadcrumb Navigation -->
  <nav aria-label="breadcrumb"
    class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light "
    style="max-width: 1536px !important;">
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Watchlist</a>
      </li>
    </ol>
  </nav>


  <div class="flex wapper-max bg-grey container mx-auto  xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    
    <UserDashboardSidebar />
    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <h1 class="text-3xl raleway-custom">Wishlist</h1>
      <p class="text-gray-500 nunito-sans-light mb-6">Here you can manage your profile settings.</p>


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
import UserDashboardSidebar from "@/components/UserDashboardSidebar.vue";

export default {
  components: {
    UserDashboardSidebar,
  },
  data() {
    return {
      wishlistItems: [
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357833",
          title: "Yamazaki 12 Year Old",
          currentBid: "$1800",
          yourBid: "$1700",
        },
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357833",
          title: "Yamazaki 12 Year Old",
          currentBid: "$1800",
          yourBid: "$1700",
        },
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357833",
          title: "Yamazaki 12 Year Old",
          currentBid: "$1800",
          yourBid: "$1700",
        },
        {
          id: 1,
          image: require("@/assets/1718862141IMG-0347 4.png"),
          lotNumber: "357833",
          title: "Yamazaki 12 Year Old",
          currentBid: "$1800",
          yourBid: "$1700",
        },
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
};
</script>

<style scoped>
.wapper-max {
  max-width: 1536px !important;
}

</style>