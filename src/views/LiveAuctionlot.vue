<template>
  <div class="bg-white min-h-screen">
    <!-- Notification Bar -->
    <div class="bg-[#f3e9ea] py-1"></div>

    <!-- Breadcrumb Navigation -->
    <div class="text-sm container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-5 py-8 text-gray-600">
      <nav aria-label="Breadcrumb nunito-sans-light">
        <ol class="list-reset flex">
          <li>
            <a href="#" class="text-[#B8B8B8]">Home</a>
            <span class="mx-2 text-[#B8B8B8]">></span>
          </li>
          <li>
            <a href="#" class="text-[#B8B8B8]">Live Auction</a>
            <span class="mx-2 text-[#B8B8B8]">></span>
          </li>
          <li>
            <span class="text-[#3D3D3D]">{{ auctionTitle || 'Auction' }}</span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Top Banner -->
    <TopBanner :title="auctionTitle" :description="auctionDescription" :longDescription="auctionDescription" />

    <!-- Main Content -->
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-2 py-10">
      <div class="flex">
        <!-- Left Filter Bar -->
        <div class="w-1/4 pr-8 h-full">
          <FilterBar />
        </div>

        <!-- Right Content Area -->
        <div class="w-3/4">
          <!-- Top Filter Bar -->
          <TopFilterBar :lotCount="auctionItems.length" :sortOptions="sortOptions" :itemsPerPage="itemsPerPage"
            :isSortOrderOpen="isSortOrderOpen" :isItemsPerPageOpen="isItemsPerPageOpen"
            @toggle-dropdown="toggleDropdown" @select-sort-order="selectSortOrder"
            @set-items-per-page="setItemsPerPage" />

          <!-- Product Cards Grid -->
          <div v-if="isLoading" class="text-center py-8">Loading auction items...</div>
          <div v-else-if="auctionItems.length === 0" class="text-center py-8">No auction items available.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <LiveCard v-for="item in auctionItems" :key="item.id" :product="item" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>
<script>
import FilterBar from '@/components/FilterBar.vue';
import LiveCard from '@/components/LiveCard.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import TopBanner from '@/components/TopBanner.vue';
import TopFilterBar from '@/components/TopFilterBar.vue'; // Import TopFilterBar
import apiClient from '@/axios'; // Import the centralized apiClient

export default {
  data() {
    return {
      auctionItems: [],  // list of auction items
      isLoading: true,
      auctionTitle: this.$route.query.title || 'Default Title',  // Fallback title
      auctionDescription: this.$route.query.description || 'No description available', // Fallback description

      // Sort and pagination settings
      sortOrderText: 'Default',
      sortOptions: ['Default', 'Price', 'Newest'],
      isSortOrderOpen: false,
      isItemsPerPageOpen: false,
      itemsPerPage: 30,  // Default items per page
    };
  },

  components: {
    LiveCard,
    SiteFooter,
    TopBanner,
    TopFilterBar,
    FilterBar,
  },

  methods: {
    async fetchAuctionDetails() {
      this.isLoading = true;
      try {
        // Use the centralized apiClient for making the API call
        const response = await apiClient.get(`/lots/${this.$route.query.id}`); // The relative URL path

        if (response.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.auctionItems = response.data.data;
        } else {
          this.auctionItems = [];
        }
      } catch (error) {
        console.error('Error fetching auction details:', error);
        this.auctionItems = [];
      } finally {
        this.isLoading = false;
      }
    },

    toggleDropdown(type) {
      if (type === 'sortOrder') {
        this.isSortOrderOpen = !this.isSortOrderOpen;
      } else if (type === 'itemsPerPage') {
        this.isItemsPerPageOpen = !this.isItemsPerPageOpen;
      }
    },

    selectSortOrder(option) {
      this.sortOrderText = option;
      this.isSortOrderOpen = false;
    },

    setItemsPerPage(size) {
      this.itemsPerPage = size;
      this.isItemsPerPageOpen = false;
    },
  },

  mounted() {
    this.fetchAuctionDetails();
  },
};
</script>


<style scoped>
.container {
  max-width: 1280px;
}

/* Add any additional styles if needed */
</style>
