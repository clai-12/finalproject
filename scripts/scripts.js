/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

const speciesButtons = document.querySelectorAll('.species');

speciesButtons.forEach(button => {
  button.addEventListener('click', function() {
    const popupId = this.getAttribute('data-popup');
    showPopup(popupId);
  });
});

function showPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'block';
  }
}

function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'none';
  }
}

// Add event listeners for close buttons
const closeButtons = document.querySelectorAll('.close-popup');
closeButtons.forEach(button => {
  button.addEventListener('click', function() {
    const popup = this.closest('.popup-background');
    if (popup) {
      popup.style.display = 'none';
    }
  });
});

// Depth counter functionality
const depthDisplay = document.getElementById('depth-display');
const allZones = document.querySelector('.all-zones');
const zones = [
  { id: 'sunlit', minDepth: 0, maxDepth: 200 },
  { id: 'twilight', minDepth: 200, maxDepth: 1000 },
  { id: 'midnight', minDepth: 1000, maxDepth: 4000 },
  { id: 'abyssal', minDepth: 4000, maxDepth: 6000 },
  { id: 'hadal', minDepth: 6000, maxDepth: 11000 }
];

function updateDepth() {
  const scrollY = allZones.scrollTop;
  const viewportHeight = allZones.clientHeight;
  const viewportCenter = scrollY + viewportHeight / 2;
  
  let currentDepth = 0;
  
  for (const zone of zones) {
    const section = document.getElementById(zone.id);
    if (section) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top - allZones.getBoundingClientRect().top + scrollY;
      const sectionHeight = rect.height;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Check if viewport center is within this section
      if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
        // Calculate progress through the section (0 to 1)
        const progress = (viewportCenter - sectionTop) / sectionHeight;
        currentDepth = zone.minDepth + (zone.maxDepth - zone.minDepth) * progress;
        break;
      }
    }
  }
  
  if (depthDisplay) {
    depthDisplay.textContent = Math.round(currentDepth) + 'm';
  }
}

allZones.addEventListener('scroll', updateDepth);
updateDepth(); // initial call
