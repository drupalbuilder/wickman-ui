<template>
  <div class="bg-white min-h-screen">
    <!-- Auction Notification Banner -->

    <Notificationbar />


    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb"
      class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 py-8 text-sm text-gray-600 nunito-sans-light">
      <ol class="list-reset flex">
        <li>
          <a href="#" class="text-[#B8B8B8]">Home</a>
          <span class="mx-2 text-[#B8B8B8]">></span>
        </li>
        <li>
          <a href="#" class="text-[#3D3D3D]">Live Auction</a>
        </li>
      </ol>
    </nav>

    <!-- Header / Banner Component -->
    <LiveAuctionBanner />

    <!-- Main Content -->
    <main class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 py-16">
      <!-- Filter Bar -->
      <div class="filter-bar flex space-x-8 text-lg  nunito-sans-light mb-4">
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'all' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('all')">
          All
        </button>
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'monthly' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('monthly')">
          Monthly
        </button>
        <button
          :class="['py-2 transition duration-300', selectedCategory === 'special' ? 'border-b-2 font-bold border-black' : '']"
          @click="setCategory('special')">
          Special
        </button>
      </div>

      <!-- Loader (Visible while fetching data) -->
      <div v-if="loading" class="loader-container">
        <div class="loader"></div>
        <p class="text-center text-gray-600">Loading auctions...</p>
      </div>

      <!-- Auction Grid (Displayed after data is fetched) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <LiveAuctionItem v-for="(auction, index) in filteredAuctions" :key="index" :image="auction.image"
          :title="auction.title" :auctionType="auction.auction_type" @click="redirectToAuctionDetail(auction)" />
      </div>
    </main>

    <!-- Footer Component -->
    <SiteFooter />
  </div>
</template>
<script>
import apiClient from '@/axios'; // Import the axios instance you created
import LiveAuctionItem from '@/components/LiveAuctionItem.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import LiveAuctionBanner from '@/components/LiveAuctionBanner.vue';
import Notificationbar from '@/components/Notificationbar.vue';

export default {
  components: {
    LiveAuctionItem,
    SiteFooter,
    LiveAuctionBanner,
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
        const response = await apiClient.get('/live-auctions'); // Use relative path as the base URL is already set
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
    redirectToAuctionDetail(auction) {
      // Check if auction data is valid
      if (!auction || !auction.slug) {
        console.error('Missing required "slug" parameter in auction:', auction);
        return;
      }

      // Optional: Log auction details to ensure the data is as expected
      console.log('Redirecting to auction:', auction);

      // Proceed with navigation only if slug is present
      this.$router.push({
        path: `/live-auction/${auction.slug}`, // Slug as the URL path
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

/* Loader Styles */
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loader {
  border: 4px solid #f3f3f3;
  /* Light gray */
  border-top: 4px solid #8a2432;
  /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

.text-center {
  margin-top: 10px;
  font-size: 16px;
  color: #8a2432;
}

/* Keyframe for spin animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
