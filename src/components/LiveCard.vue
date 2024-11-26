<template>
  <div class="relative">
    <div 
      class="product-card border overflow-hidden border-[#e399a3] hover:ring-2 hover:border-transparent hover:ring-[#8a2432] hover:ring-offset-0 bg-[#8A24320D] cursor-pointer"
      @click="redirectToProductPage"
    >
      <!-- Lot Number and Favorite Icon -->
      <div class="flex justify-between items-center bg-white px-4 pt-2 text-gray-500 text-[10px]">
        <div>Lot #{{ product.lot_number || 'N/A' }}</div>
        <button 
          class="star-button focus:outline-none" 
          @click.stop="toggleFavorite"
        >
          <img :src="isFavorite ? require('@/assets/Star 1.svg') : require('@/assets/Star 2.svg')" alt="Favorite" class="star-icon" />
        </button>
      </div>

      <!-- Product Image -->
      <img 
        :src="getImageUrl(product.image)"
        alt="Product Image" 
        class="w-full object-contain"
      />

      <!-- Product Details -->
      <div class="px-4 py-6 text-center">
        <h3 class="product-title nunito-sans-light text-black leading-4 text-[14px] mb-2">{{ product.lot_title || 'No Title Available' }}</h3>

        <!-- Reserve Price and Current Bid with Vertical Separator -->
        <div class="flex items-center justify-center text-xs text-gray-600 mt-2">
          <!-- Reserve Price Column -->
          <div class="flex flex-col items-end">
            <p class="text-[#3D3D3D] text-[11px] nunito-sans-light">Reserve Price</p>
            <p class="text-[16px] text-black nunito-sans-light">{{ product.reserve_price || 'N/A' }}</p>
          </div>

          <!-- Vertical Separator -->
          <div class="border-l border-[#646464] h-7 mx-4"></div>

          <!-- Current Bid Column -->
          <div class="flex flex-col items-start">
            <p class="text-[#8a2432] text-[11px] nunito-sans-light">Current Bid</p>
            <p class="text-[16px] text-black nunito-sans-light custom-font-weight ">{{ product.current_bid || 'N/A' }}</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between gap-4 mt-4">
          <button 
            class="flex-1 bg-[#f9f3f4] border border-[#8a2432] text-[12px] nunito-sans-custom text-[#8a2432] py-2 hover:border-[black] hover:bg-black hover:text-white"
            @click.stop="redirectToProductPage"
          >
            View Lot
          </button>
          <button 
            class="flex-1 py-2 bg-[#8a2432] border text-[12px] nunito-sans-custom text-white hover:bg-white hover:border-[#8a2432] hover:text-[#8a2432]"
            @click.stop="showQuickBidPopup"
          >
            Quick Bid
          </button>
        </div>
      </div>
    </div>

    <!-- QuickBidCard Modal -->
    <div 
      v-if="showQuickBid" 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="closeQuickBidPopup"
    >
      <div class="relative bg-white p-6 shadow-lg max-w-md w-full">
        <button 
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          @click="closeQuickBidPopup"
        >
          ✕
        </button>
        <QuickBidCard :product="quickBidProduct" @close="closeQuickBidPopup" />
      </div>
    </div>
  </div>
</template>

<script>
import apiClient, { baseURL } from '@/axios'; // Import apiClient and baseURL from axios.js
import QuickBidCard from './QuickBidCard.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false, // Default state of the star
      showQuickBid: false, // Controls the visibility of QuickBidCard
      quickBidProduct: null, // Holds the product data for quick bid
    };
  },
  methods: {
    // Method to construct the full image URL
    getImageUrl(imagePath) {
      return imagePath ? `${baseURL.replace('/api', '')}${imagePath}` : require('@/assets/Mark 1.jpg');
    },
    redirectToProductPage() {
      this.$router.push({
        name: 'LiveAuctionDetailPage',
        query: { id: this.product.id },
      });
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    async showQuickBidPopup() {
      // Fetch product details by product ID for the QuickBid modal
      const id = this.product.id;
      const url = `/lots/detail/${id}`; // Use relative URL with apiClient

      try {
        const response = await apiClient.get(url); // Use apiClient instead of axios
        this.quickBidProduct = response.data; // Store the fetched product data
        this.showQuickBid = true; // Show the QuickBid modal
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    },
    closeQuickBidPopup() {
      this.showQuickBid = false;
      this.quickBidProduct = null; // Reset quick bid product data
    },
  },
  components: {
    QuickBidCard,
  },
};
</script>

<style scoped>
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis */
  font-weight: 500;
}

.star-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.star-icon {
  width: 22px;
  height: 22px;
}

.custom-font-weight {
  font-weight: 700;
}

.fixed {
  z-index: 50;
}
</style>
