// Gallery Overlay Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryCloseBtn = document.getElementById('gallery-close');
    const viewMoreLinks = document.querySelectorAll('.view-more-link');
    
    // New elements for single image view
    const galleryContent = document.getElementById('gallery-content-scrollable');
    const singleImageContainer = document.getElementById('single-image-container');
    const singleImageElement = document.getElementById('single-image-element');
    const galleryBackBtn = document.getElementById('gallery-back');

    // Check if required elements exist
    if (!galleryOverlay || !galleryGrid || !galleryCloseBtn) {
        console.warn('Gallery elements not found');
        return;
    }

    const galleryImages = {
        preparation: [
            'https://via.placeholder.com/400x400?text=Prep+1',
            'https://via.placeholder.com/400x400?text=Prep+2',
            'https://via.placeholder.com/400x400?text=Prep+3',
            'https://via.placeholder.com/400x400?text=Prep+4',
            'https://via.placeholder.com/400x400?text=Prep+5',
            'https://via.placeholder.com/400x400?text=Prep+6'
        ],
        ceremony: [
            'https://via.placeholder.com/400x400?text=Ceremony+1',
            'https://via.placeholder.com/400x400?text=Ceremony+2',
            'https://via.placeholder.com/400x400?text=Ceremony+3',
            'https://via.placeholder.com/400x400?text=Ceremony+4'
        ],
        evening: [
            'evening/evening-1.jpg',
            'https://via.placeholder.com/400x400?text=Evening+2',
            'https://via.placeholder.com/400x400?text=Evening+3',
            'https://via.placeholder.com/400x400?text=Evening+4',
            'https://via.placeholder.com/400x400?text=Evening+5'
        ]
    };

    function openGallery(imageUrls) {
        console.log('Opening gallery with images:', imageUrls);
        
        // Clear previous images
        galleryGrid.innerHTML = '';

        // Create and append new images
        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            galleryGrid.appendChild(img);
            
            // Add click listener to each grid image
            img.addEventListener('click', () => {
                openSingleImageView(url);
            });
        });

        // Show overlay
        galleryOverlay.style.display = 'flex';
        setTimeout(() => {
            galleryOverlay.classList.add('show');
            if (window.bodyScrollLock) {
                window.bodyScrollLock.disableBodyScroll(galleryOverlay);
            }
        }, 10); // Small delay for transition
    }

    function closeGallery() {
        galleryOverlay.classList.remove('show');
        setTimeout(() => {
            galleryOverlay.style.display = 'none';
            // Reset view to grid for next time
            closeSingleImageView();
            if (window.bodyScrollLock) {
                window.bodyScrollLock.enableBodyScroll(galleryOverlay);
            }
        }, 300); // Match transition duration
    }
    
    // --- Single Image View Functions ---
    function openSingleImageView(imageUrl) {
        singleImageElement.src = imageUrl;
        galleryContent.style.display = 'none';
        singleImageContainer.style.display = 'flex';
        galleryBackBtn.style.display = 'block';
    }

    function closeSingleImageView() {
        singleImageContainer.style.display = 'none';
        galleryBackBtn.style.display = 'none';
        galleryContent.style.display = 'block';
    }

    // Event Listeners
    console.log('Found view more links:', viewMoreLinks.length);
    viewMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const galleryKey = this.dataset.gallery;
            console.log('Gallery key:', galleryKey);
            const images = galleryImages[galleryKey];
            if (images) {
                openGallery(images);
            } else {
                console.warn('No images found for gallery:', galleryKey);
            }
        });
    });

    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeGallery);
    }
    
    // Add listener for new back button
    if (galleryBackBtn) {
        galleryBackBtn.addEventListener('click', closeSingleImageView);
    }

    if (galleryOverlay) {
        galleryOverlay.addEventListener('click', function(e) {
            if (e.target === galleryOverlay) {
                closeGallery();
            }
        });
    }

    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryOverlay.classList.contains('show')) {
            // If in single view, go back. Otherwise, close.
            if (singleImageContainer.style.display === 'flex') {
                closeSingleImageView();
            } else {
                closeGallery();
            }
        }
    });
}); 