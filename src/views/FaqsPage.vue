<template>
    <div class="container mx-auto p-6">
      <!-- FAQ Section -->
      <section>
        <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Frequently Asked Questions</h2>
  
        <!-- Loop through each FAQ category -->
        <div v-for="(category, index) in faqData" :key="index" class="mb-8">
          <h3 class="text-2xl  text-[#8a2432] mb-4">{{ category.category }}</h3>
  
          <!-- Loop through each FAQ question in the category -->
          <div v-for="(faq, i) in category.faqs" :key="i" class="border-b pb-4 mb-4">
            <div @click="toggleAnswer(index, i)" class="cursor-pointer flex justify-between items-center">
              <h4 class="text-xl text-gray-700">{{ faq.question }}</h4>
              <span class="text-gray-500">{{ activeFaqs[index] === i ? '-' : '+' }}</span>
            </div>
            <p v-if="activeFaqs[index] === i" class="text-gray-600 mt-2">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </section>
    </div>
  
    <!-- Footer -->
    <SiteFooter />
  </template>
  
  <script>
  import { reactive } from 'vue';
  import SiteFooter from '@/components/SiteFooter.vue';
  
  export default {
    components: {
      SiteFooter,
    },
    setup() {
      // FAQ data specific to auction websites
      const faqData = [
        {
          category: "For Buyers",
          faqs: [
            {
              question: "How do I participate in live bidding?",
              answer: "To participate in live bidding, ensure your account is verified and navigate to the 'Live Auctions' section. Click on an auction to join and place bids in real-time."
            },
            {
              question: "What happens if I win an auction?",
              answer: "If you win an auction, you will receive a confirmation email with payment instructions. Ensure the payment is completed within the specified time to avoid penalties."
            },
            {
              question: "Are there any additional charges for buyers?",
              answer: "Yes, a buyer’s premium, typically a percentage of the final sale price, will be added to your total. Taxes may also apply depending on your location."
            },
            {
              question: "Can I cancel my bid?",
              answer: "No, bids cannot be canceled once placed. Please review your bid amount carefully before confirming."
            },
          ],
        },
        {
          category: "For Sellers",
          faqs: [
            {
              question: "How do I list an item for auction?",
              answer: "To list an item, go to your seller dashboard, click 'Create Auction', and provide details such as item description, starting bid, and auction duration."
            },
            {
              question: "What fees do sellers need to pay?",
              answer: "Sellers are charged a listing fee and a commission on the final sale price. The exact percentage is outlined in your seller agreement."
            },
            {
              question: "How are payments processed for sellers?",
              answer: "Payments are released to sellers within 7 business days after the buyer completes their payment, minus applicable fees."
            },
            {
              question: "Can I set a reserve price for my auction?",
              answer: "Yes, you can set a reserve price, which is the minimum amount you are willing to accept for your item. If the bidding does not meet the reserve price, the item will not be sold."
            },
          ],
        },
        {
          category: "Platform Use",
          faqs: [
            {
              question: "How do I create an account?",
              answer: "Click on 'Sign Up' on the homepage, fill in the required details, and verify your email to activate your account."
            },
            {
              question: "Is my data secure on this platform?",
              answer: "Yes, we use industry-standard encryption to ensure your data remains secure. We also comply with all relevant data protection regulations."
            },
            {
              question: "What happens if there is a technical issue during live bidding?",
              answer: "In case of a technical issue, the auction may be paused or extended. Our support team will notify participants and resolve issues promptly."
            },
            {
              question: "How do I contact support?",
              answer: "You can contact our support team via email at support@wiskii.com or through the live chat option available on the website."
            },
          ],
        },
      ];
  
      // Reactive state for active FAQs
      const activeFaqs = reactive({});
  
      // Method to toggle the active FAQ
      const toggleAnswer = (categoryIndex, faqIndex) => {
        if (activeFaqs[categoryIndex] === faqIndex) {
          activeFaqs[categoryIndex] = null; // Collapse the FAQ
        } else {
          activeFaqs[categoryIndex] = faqIndex; // Expand the clicked FAQ
        }
      };
  
      return {
        faqData,
        activeFaqs,
        toggleAnswer,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1280px;
  }
  </style>
  