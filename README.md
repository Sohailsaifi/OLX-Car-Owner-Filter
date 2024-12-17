# OLX Car Owner Filter

## Overview
OLX Car Owner Filter is a Chrome extension that helps users find cars listed by individual owners on OLX India by filtering out dealer listings. The extension automatically identifies and hides listings from car dealers, making it easier for buyers to find direct-from-owner listings.

## Features
- One-click toggle to show/hide dealer listings
- Automatically identifies dealer listings based on multiple criteria:
  - Featured/promoted listings
  - Verified seller badges
  - Dealer-specific keywords and phrases
  - Business indicators in listing text
- Works on all OLX car listing pages
- No account required
- No data collection or storage
- Completely offline functionality

## Installation

### From Chrome Web Store
1. Visit the Chrome Web Store listing
2. Click "Add to Chrome"
3. Click "Add Extension" in the confirmation popup
4. The extension icon will appear in your Chrome toolbar

### For Development (Loading Unpacked)
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked"
5. Select the directory containing the extension files

## Usage
1. Visit any OLX cars section (e.g., https://www.olx.in/cars_c84)
2. Look for the "Hide Dealers" button in the top-right corner of the page
3. Click the button to hide dealer listings
4. Click again to show all listings
5. The filter persists as you browse different pages and search results

## How It Works
The extension uses several methods to identify dealer listings:

### Dealer Detection Criteria
- Featured/promoted listing tags
- Verified seller badges
- Dealer keywords in listing text:
  - "dealer"
  - "cars24"
  - "spinny"
  - "carwale"
  - "cardekho"
  - etc.
- Business terms:
  - "motors"
  - "automotive"
  - "showroom"
  - etc.
- Price and quality indicators:
  - "best price"
  - "all brands"
  - "finance"
  - "EMI"
  - etc.

### Technical Implementation
- Uses DOM manipulation to hide/show listings
- Monitors page for dynamically loaded content
- Performs filtering in chunks to maintain performance
- Operates entirely client-side

## Project Structure
```
olx-car-owner-filter/
├── manifest.json         # Extension manifest and configuration
├── content.js           # Main extension logic
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Development
### Prerequisites
- Chrome browser
- Basic understanding of JavaScript
- Familiarity with Chrome extension development

### Local Development
1. Make changes to the code
2. Reload the extension in `chrome://extensions/`
3. Refresh the OLX page to see changes

### Building for Production
1. Update version number in manifest.json
2. Create a ZIP file containing all required files
3. Submit to Chrome Web Store

## Privacy
- No user data is collected
- No external services are used
- All operations are performed locally
- Only requires access to olx.in domains
- See full [privacy policy](https://docs.google.com/document/d/1Cd1_LMcTG2iETXgJdgfHC_9jiMyvuMcQdgeIqxzcwbw/edit?usp=sharing)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Known Issues
- Cannot detect dealers based on account names (not visible on listing page)
- Cannot track multiple listings per seller (requires profile page access)

## Future Improvements
- Add settings panel for customization
- Implement additional dealer detection methods
- Add statistics about filtered listings
- Support for other OLX categories

## Acknowledgments
- OLX India for providing the platform
- Chrome Extension documentation
- Contributors and users who provide feedback