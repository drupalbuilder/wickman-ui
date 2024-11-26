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
            <a href="#" class="text-[#B8B8B8]">Past Auction</a>
            <span class="mx-2 text-[#B8B8B8]">></span>
          </li>
          <li>
            <span class="text-[#3D3D3D]" aria-current="page">{{ slug }}</span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Top Banner -->
    <TopBanner :title="title" :description="description" :longDescription="description" />

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
          <TopFilterBar 
            :lotCount="lotData.length"
            :sortOrderText="sortOrderText"
            :sortOptions="sortOptions"
            :itemsPerPage="itemsPerPage"
            :isSortOrderOpen="isSortOrderOpen"
            :isItemsPerPageOpen="isItemsPerPageOpen"
            @toggle-dropdown="toggleDropdown" 
            @select-sort-order="selectSortOrder"
            @set-items-per-page="setItemsPerPage" 
          />

          <!-- Product Cards Grid -->
          <div v-if="loading" class="text-center py-8">
            <img src="/path/to/loading-spinner.svg" alt="Loading..." class="inline-block" />
            Loading auction items...
          </div>
          <div v-else-if="lotData.length === 0 && !loading" class="text-center py-8">
            No auction items available. Try adjusting your filters.
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <ProductCard v-for="lot in lotData" :key="lot.id" :product="formatProduct(lot)" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>
<script>
import apiClient from '@/axios';  // Import the centralized apiClient
import FilterBar from '@/components/FilterBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import TopBanner from '@/components/TopBanner.vue';
import TopFilterBar from '@/components/TopFilterBar.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: {
    ProductCard,
    FilterBar,
    SiteFooter,
    TopBanner,
    TopFilterBar,
  },
  data() {
    return {
      slug: '',
      title: '',
      description: '',
      id: '',
      lotData: [],
      loading: true,
      isSortOrderOpen: false,
      isItemsPerPageOpen: false,
      sortOrder: 'Default',
      sortOrderText: 'Default',
      sortOptions: ['Price', 'Date', 'Title'],
      itemsPerPage: 30,
    };
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.updateDataFromRoute();
      },
    },
  },
  methods: {
    updateDataFromRoute() {
      this.slug = this.$route.params.slug || 'Default Slug';
      this.title = this.$route.query.title || 'Default Title';
      this.description = this.$route.query.description || 'Default Description';
      this.id = this.$route.query.id;

      // Set the document title dynamically based on the page's title
      document.title = `${this.title} - Auction`;

      this.fetchLotData();
    },
    async fetchLotData() {
      this.loading = true;
      try {
        const response = await apiClient.get(`lots/${this.id}`, {  // Use apiClient here
          params: { sortOrder: this.sortOrder }
        });
        if (response.data && Array.isArray(response.data.data)) {
          this.lotData = response.data.data;
        } else {
          this.lotData = [];
        }
      } catch (error) {
        console.error('Error fetching auction data:', error);
        this.lotData = [];
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown(type) {
      if (type === 'sortOrder') {
        this.isSortOrderOpen = !this.isSortOrderOpen;
        this.isItemsPerPageOpen = false;
      } else if (type === 'itemsPerPage') {
        this.isItemsPerPageOpen = !this.isItemsPerPageOpen;
        this.isSortOrderOpen = false;
      }
    },
    selectSortOrder(option) {
      this.sortOrder = option;
      this.sortOrderText = option;
      this.isSortOrderOpen = false;
    },
    setItemsPerPage(size) {
      this.itemsPerPage = size;
      this.isItemsPerPageOpen = false;
    },
    formatProduct(lot) {
      // Remove /api from the baseURL and ensure proper image path formatting
      const baseURL = apiClient.defaults.baseURL.replace('/api', '');
      const imageUrl = lot.image ? `${baseURL}${lot.image.replace(/^\//, '')}` : require('@/assets/Mark 1.jpg');

      return {
        soldDate: 'N/A',
        image: imageUrl, // Corrected image URL without '/api'
        reserveStatus: lot.reserve_price ? 'Reserve has been met' : 'Reserve has not been met',
        lotNumber: lot.lot_number,
        title: lot.lot_title,
        winningBid: lot.reserve_price,
        slug: lot.slug,
        id: lot.id,
      };
    },
  },
};
</script>


<style scoped>
/* Scoped styles from the main file if needed */
</style>
