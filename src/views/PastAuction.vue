<template>
  <div class="bg-white min-h-screen">
    <!-- Auction Notification Banner -->
    <Notificationbar />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 py-8 text-sm text-gray-600 nunito-sans-light">
      <ol class="list-reset flex">
        <li>
          <a href="#" class="text-[#B8B8B8]">Home</a>
          <span class="mx-2 text-[#B8B8B8]">></span>
        </li>
        <li>
          <a href="#" class="text-[#3D3D3D]">Past Auction</a>
        </li>
      </ol>
    </nav>

    <!-- Header / Banner Component -->
    <PastAuctionBanner />

    <!-- Main Content -->
    <main class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 py-16">
      <!-- Filter Bar -->
      <div class="filter-bar flex space-x-8 text-lg nunito-sans-light mb-4">
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'all' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('all')"
        >
          All
        </button>
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'monthly' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('monthly')"
        >
          Monthly
        </button>
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'special' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('special')"
        >
          Special
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <span class="text-lg">Loading Auctions...</span>
        <!-- You can add a spinner here -->
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-center py-8 text-red-500">
        <span>{{ error }}</span>
      </div>

      <!-- Auction Grid -->
      <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <AuctionItem
          v-for="(auction, index) in filteredAuctions"
          :key="index"
          :image="auction.image"
          :title="auction.title"
          :auctionType="auction.auction_type"
          @click="redirectToAuctionDetail(auction)"
        />
      </div>
    </main>

    <!-- Footer Component -->
    <SiteFooter />
  </div>
</template>

<script>
import apiClient from '@/axios'; // Import the centralized apiClient
import AuctionItem from '@/components/AuctionItem.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import PastAuctionBanner from '@/components/PastAuctionBanner.vue';
import Notificationbar from '@/components/Notificationbar.vue';

export default {
  components: {
    AuctionItem,
    SiteFooter,
    PastAuctionBanner,
    Notificationbar,
  },
  data() {
    return {
      auctions: [],
      selectedCategory: 'all', // Default category is 'all'
      loading: false, // To manage loading state
      error: null, // To manage error state
      categoryMap: { // Externalized category map
        all: 'all',
        monthly: '1',
        special: '2',
      },
    };
  },
  computed: {
    // Filter auctions based on the selected category
    filteredAuctions() {
      if (this.selectedCategory === 'all') {
        return this.auctions;
      }
      return this.auctions.filter((auction) => auction.auction_type === this.categoryMap[this.selectedCategory]);
    },
  },
  methods: {
    async fetchAuctions() {
      this.loading = true; // Set loading to true when fetching auctions
      try {
        const response = await apiClient.get('/previous-auctions'); // Use the relative URL with apiClient
        this.auctions = response.data.Auctions || [];
      } catch (error) {
        this.error = 'Error fetching auctions: ' + error.message; // Store error message
        console.error(this.error);
      } finally {
        this.loading = false; // Set loading to false once data is fetched or an error occurs
      }
    },
    setCategory(category) {
      this.selectedCategory = category;
    },
    // Redirect to auction detail page
    redirectToAuctionDetail(auction) {
      // Check if auction data is valid
      if (!auction || !auction.slug) {
        console.error('Missing required "slug" parameter in auction:', auction);
        return;
      }

      // Log auction details to ensure the data is as expected
      console.log('Redirecting to auction:', auction);

      // Navigate with slug in the path and other details in query parameters
      this.$router.push({
        path: `/past-auction/${auction.slug}`, // Slug as the URL path
        query: {
          id: auction.id, // ID as a query parameter
          title: auction.title, // Title as a query parameter
          description: auction.description, // Description as a query parameter
        },
      });
    },
  },
  mounted() {
    this.fetchAuctions();
  },
};
</script>


<style scoped>
.container {
  max-width: 1280px !important;
}
.filter-bar button {
  color: #3d3d3d;
}
.filter-bar button.border-b-2 {
  border-color: #3d3d3d;
}
</style>
