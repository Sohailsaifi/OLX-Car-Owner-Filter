  (function() {
      'use strict';
      
      let isFiltering = false;
      let processingMutations = false;
      let lastProcessTime = 0;
  
      const helpers = {
          isDealerListing: function(listing) {
              // Check for featured tag (these are usually dealer/promoted listings)
              const featuredTag = listing.querySelector('span._1nEze');
              if (featuredTag?.textContent === 'Featured') {
                  console.log('Filtered: Featured listing');
                  return true;
              }
  
              // Check for verified badge (usually dealers)
              if (listing.querySelector('img[src*="verified_seller"]') ||
                  listing.querySelector('div[title="Verified Seller"]')) {
                  console.log('Filtered: Verified seller');
                  return true;
              }
  
              // Check listing text for dealer indicators
              const text = listing.textContent.toLowerCase();
              
              // Common dealer keywords
              const dealerKeywords = [
                  'dealer',
                  'cars24',
                  'spinny',
                  'carwale',
                  'cardekho',
                  'true value',
                  'showroom',
                  'authorized',
                  'pre owned',
                  'preowned',
                  'certified',
                  'multi brand'
              ];
  
              // Business terms (likely dealers)
              const businessTerms = [
                  'motors',
                  'automotive',
                  'auto zone',
                  'car zone',
                  'car point',
                  'car palace',
                  'car world',
                  'car hub'
              ];
  
              // Price and quality indicators
              const priceTerms = [
                  'best price',
                  'best deal',
                  'all brands',
                  'all cars',
                  'finance',
                  'loan',
                  'emi',
                  'insurance'
              ];
  
              // Check all keyword categories
              if (dealerKeywords.some(keyword => text.includes(keyword))) {
                  console.log('Filtered: Dealer keyword found');
                  return true;
              }
  
              if (businessTerms.some(term => text.includes(term))) {
                  console.log('Filtered: Business term found');
                  return true;
              }
  
              if (priceTerms.some(term => text.includes(term))) {
                  console.log('Filtered: Price/deal term found');
                  return true;
              }
  
              // Additional checks
              if (text.includes('gst') || text.includes('tcs')) {
                  console.log('Filtered: Business tax terms found');
                  return true;
              }
  
              // Check for multiple cars in same listing
              if ((text.match(/car/g) || []).length > 3) {
                  console.log('Filtered: Multiple cars mentioned');
                  return true;
              }
  
              return false;
          }
      };
  
      const core = {
          toggleDealerListings: function() {
              const currentTime = Date.now();
              if (currentTime - lastProcessTime < 100) return;
              lastProcessTime = currentTime;
  
              const listings = document.querySelectorAll('li[data-aut-id="itemBox2"], li._3V_Ww');
              console.log(`Processing ${listings.length} listings`);
              
              const processChunk = (startIdx) => {
                  const endIdx = Math.min(startIdx + 10, listings.length);
                  
                  for (let i = startIdx; i < endIdx; i++) {
                      const listing = listings[i];
                      if (helpers.isDealerListing(listing)) {
                          listing.style.display = isFiltering ? 'none' : '';
                          if (isFiltering) {
                              listing.style.border = '2px solid red';
                          } else {
                              listing.style.border = '';
                          }
                      }
                  }
  
                  if (endIdx < listings.length) {
                      requestAnimationFrame(() => processChunk(endIdx));
                  }
              };
  
              processChunk(0);
          },
  
          initializeFilter: function() {
              if (document.getElementById('olxFilterButton')) return;
              
              const button = document.createElement('button');
              button.id = 'olxFilterButton';
              button.textContent = 'Hide Dealers';
              button.style.cssText = `
                  position: fixed;
                  top: 80px;
                  right: 20px;
                  z-index: 99999;
                  padding: 8px 16px;
                  background: #002f34;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-family: sans-serif;
                  font-size: 14px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  transition: background-color 0.3s;
              `;
              
              document.body.appendChild(button);
              console.log('Filter button added');
  
              button.addEventListener('click', () => {
                  isFiltering = !isFiltering;
                  button.textContent = isFiltering ? 'Show All' : 'Hide Dealers';
                  button.style.background = isFiltering ? '#ff4040' : '#002f34';
                  requestAnimationFrame(core.toggleDealerListings);
              });
          }
      };
  
      // Initialize
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', core.initializeFilter);
      } else {
          core.initializeFilter();
      }
  
      // Backup initialization
      setTimeout(core.initializeFilter, 1000);
      setTimeout(core.initializeFilter, 2000);
  
      // Monitor for dynamic content
      const observer = new MutationObserver(() => {
          if (!document.getElementById('olxFilterButton')) {
              core.initializeFilter();
          }
          
          if (isFiltering && !processingMutations) {
              processingMutations = true;
              requestAnimationFrame(() => {
                  core.toggleDealerListings();
                  processingMutations = false;
              });
          }
      });
  
      observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: false
      });
  })();