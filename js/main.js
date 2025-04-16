// Sticker data structure
const stickers = {
    formula1: [],
    anime: {
        'one-piece': [],
        'jjk': []
    },
    arcane: [],
    stitch: []
};

// Current sorting method
let currentSort = 'name-asc';

// Current grid layout
let currentGridLayout = 'grid';

// Function to load stickers from the Catalogue folder
async function loadStickers() {
    try {
        // Load Formula 1 stickers
        const formula1Stickers = Array.from({length: 47}, (_, i) => ({
            path: `Catalogue/Formula 1/formula_1_png_${String(i + 1).padStart(3, '0')}.png`,
            name: `Formula 1 Sticker ${i + 1}`,
            category: 'formula1',
            subcategory: null
        }));
        stickers.formula1 = formula1Stickers;
        console.log('Loaded Formula 1 stickers:', stickers.formula1.length);

        // Load One Piece stickers
        const onePieceStickers = Array.from({length: 56}, (_, i) => ({
            path: `Catalogue/Anime/One piece/anime_one_piece_${String(i + 1).padStart(3, '0')}.png`,
            name: `One Piece Sticker ${i + 1}`,
            category: 'anime',
            subcategory: 'one-piece'
        }));
        stickers.anime['one-piece'] = onePieceStickers;
        console.log('Loaded One Piece stickers:', stickers.anime['one-piece'].length);

        // Load Jujutsu Kaisen stickers
        const jjkStickers = Array.from({length: 56}, (_, i) => ({
            path: `Catalogue/Anime/Jujutsu Kaisen/anime_jujutsu_kaisen_${String(i + 1).padStart(3, '0')}.png`,
            name: `Jujutsu Kaisen Sticker ${i + 1}`,
            category: 'anime',
            subcategory: 'jjk'
        }));
        stickers.anime['jjk'] = jjkStickers;
        console.log('Loaded JJK stickers:', stickers.anime['jjk'].length);

        // Load Arcane stickers
        const arcaneStickers = Array.from({length: 18}, (_, i) => ({
            path: `Catalogue/Arcane/arcane_${String(i + 1).padStart(3, '0')}.png`,
            name: `Arcane Sticker ${i + 1}`,
            category: 'arcane',
            subcategory: null
        }));
        stickers.arcane = arcaneStickers;
        console.log('Loaded Arcane stickers:', stickers.arcane.length);

        // Load Stitch stickers
        const stitchStickers = Array.from({length: 26}, (_, i) => ({
            path: `Catalogue/Stitch/stitch_png_${String(i + 1).padStart(3, '0')}.png`,
            name: `Stitch Sticker ${i + 1}`,
            category: 'stitch',
            subcategory: null
        }));
        stickers.stitch = stitchStickers;
        console.log('Loaded Stitch stickers:', stickers.stitch.length);

        // Create all sticker elements with data attributes
        createStickerElements();
        
        // Show all stickers initially
        filterStickers('all');
        
        // Apply default grid layout
        applyGridLayout('grid');
    } catch (error) {
        console.error('Error loading stickers:', error);
        showError();
    }
}

// Function to create all sticker elements with data attributes
function createStickerElements() {
    const stickerGrid = document.getElementById('sticker-grid');
    stickerGrid.innerHTML = ''; // Clear the grid
    
    // Create elements for all stickers
    const allStickers = [
        ...stickers.formula1,
        ...stickers.anime['one-piece'],
        ...stickers.anime['jjk'],
        ...stickers.arcane,
        ...stickers.stitch
    ];
    
    allStickers.forEach(sticker => {
        const card = document.createElement('div');
        card.className = 'col-lg-2-4 col-md-4 col-sm-6 sticker-item';
        card.dataset.category = sticker.category;
        if (sticker.subcategory) {
            card.dataset.subcategory = sticker.subcategory;
        }
        
        card.innerHTML = `
            <div class="card sticker-card">
                <img src="${sticker.path}" class="card-img-top" alt="${sticker.name}" onerror="this.src='assets/placeholder.svg'">
                <div class="card-body">
                    <h5 class="card-title">${sticker.name}</h5>
                    <p class="card-text">
                        ${sticker.subcategory ? 
                            `${sticker.subcategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Collection` :
                            `${sticker.category.charAt(0).toUpperCase() + sticker.category.slice(1)} Collection`
                        }
                    </p>
                </div>
            </div>
        `;
        stickerGrid.appendChild(card);
    });
    
    console.log('Created sticker elements:', stickerGrid.querySelectorAll('.sticker-item').length);
}

// Function to filter stickers based on category and subcategory
function filterStickers(category, subcategory = null) {
    console.log('FILTERING STICKERS - Category:', category, 'Subcategory:', subcategory);
    
    const stickerItems = document.querySelectorAll('.sticker-item');
    let visibleCount = 0;
    
    stickerItems.forEach(item => {
        const itemCategory = item.dataset.category;
        const itemSubcategory = item.dataset.subcategory;
        
        // Check if the item matches the selected category and subcategory
        const matchesCategory = category === 'all' || itemCategory === category;
        const matchesSubcategory = !subcategory || subcategory === 'all-anime' || itemSubcategory === subcategory;
        
        if (matchesCategory && matchesSubcategory) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log('Visible stickers after filtering:', visibleCount);
    
    // Show no stickers message if none are visible
    if (visibleCount === 0) {
        showNoStickers();
    }
}

// Function to apply different grid layouts
function applyGridLayout(layout) {
    console.log('Applying grid layout:', layout);
    currentGridLayout = layout;
    
    const stickerGrid = document.getElementById('sticker-grid');
    const stickerItems = document.querySelectorAll('.sticker-item');
    
    // Remove all layout classes
    stickerGrid.classList.remove('grid-layout', 'mobile-layout');
    
    // Add the selected layout class
    stickerGrid.classList.add(`${layout}-layout`);
    
    // Update grid layout buttons
    const gridButtons = document.querySelectorAll('.grid-layout-btn');
    gridButtons.forEach(btn => {
        if (btn.dataset.layout === layout) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply specific layout styles
    if (layout === 'grid') {
        // Default grid layout (5 per row on desktop)
        stickerItems.forEach(item => {
            item.className = 'col-lg-2-4 col-md-4 col-sm-6 sticker-item';
        });
    } else if (layout === 'mobile') {
        // Mobile layout (2 per row)
        stickerItems.forEach(item => {
            item.className = 'col-6 sticker-item';
        });
    }
}

// Helper function to show error message
function showError() {
    const stickerGrid = document.getElementById('sticker-grid');
    stickerGrid.innerHTML = `
        <div class="col-12 text-center">
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Unable to load stickers. Please check the console for more details.
            </div>
        </div>
    `;
}

// Helper function to show no stickers message
function showNoStickers() {
    const stickerGrid = document.getElementById('sticker-grid');
    const noStickersMessage = document.createElement('div');
    noStickersMessage.className = 'col-12 text-center';
    noStickersMessage.innerHTML = `
        <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            No stickers found in this category.
        </div>
    `;
    stickerGrid.appendChild(noStickersMessage);
}

// Event listeners for category filtering
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Setting up event listeners');
    
    // Load stickers when the page loads
    loadStickers();

    // Category buttons in the sidebar
    const categoryButtons = document.querySelectorAll('.btn-category');
    console.log('Found category buttons:', categoryButtons.length);
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            console.log('CATEGORY BUTTON CLICKED:', category);
            
            // Remove active class from all category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle anime category group
            const categoryGroup = this.closest('.category-group');
            if (categoryGroup) {
                console.log('Anime category group found');
                categoryGroup.classList.toggle('active');
                if (!categoryGroup.classList.contains('active')) {
                    console.log('Closing anime category, resetting to All Products');
                    // If closing the anime category, reset to "All Products"
                    const allButton = document.querySelector('.btn-category[data-category="all"]');
                    allButton.classList.add('active');
                    this.classList.remove('active');
                    filterStickers('all');
                    return;
                }
            } else {
                console.log('Non-anime category clicked, closing any open category groups');
                // If clicking a non-anime category, close any open category groups
                document.querySelectorAll('.category-group').forEach(group => {
                    group.classList.remove('active');
                });
            }
            
            // Filter stickers for selected category
            console.log('Calling filterStickers with category:', category);
            filterStickers(category);
        });
    });

    // Anime subcategory buttons
    const animeSubcategoryButtons = document.querySelectorAll('.btn-subcategory');
    console.log('Found anime subcategory buttons:', animeSubcategoryButtons.length);
    
    animeSubcategoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent triggering parent category button
            
            const subcategory = this.dataset.subcategory;
            console.log('SUBCATEGORY BUTTON CLICKED:', subcategory);
            
            // Remove active class from all subcategory buttons
            animeSubcategoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Make sure the anime category button is active
            const animeButton = document.querySelector('.btn-category[data-category="anime"]');
            animeButton.classList.add('active');
            
            // Filter stickers for the selected subcategory
            console.log('Calling filterStickers with anime and subcategory:', subcategory);
            filterStickers('anime', subcategory === 'all-anime' ? null : subcategory);
        });
    });

    // Sort buttons
    const sortButtons = document.querySelectorAll('.sticker-sidebar .btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all sort buttons
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current sort method
            currentSort = button.dataset.sort;
            
            // Get current category and subcategory
            const activeCategoryButton = document.querySelector('.main-categories .btn.active');
            const category = activeCategoryButton ? activeCategoryButton.dataset.category : 'all';
            
            let subcategory = null;
            if (category === 'anime') {
                const activeSubcategoryButton = document.querySelector('.anime-subcategories .btn.active');
                if (activeSubcategoryButton) {
                    subcategory = activeSubcategoryButton.dataset.subcategory;
                    if (subcategory === 'all-anime') subcategory = null;
                }
            }
            
            // Display stickers with new sort
            displayStickers(category, subcategory);
        });
    });

    // Grid layout buttons
    const gridLayoutButtons = document.querySelectorAll('.grid-layout-btn');
    if (gridLayoutButtons.length > 0) {
        console.log('Found grid layout buttons:', gridLayoutButtons.length);
        
        gridLayoutButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const layout = this.dataset.layout;
                console.log('GRID LAYOUT BUTTON CLICKED:', layout);
                
                // Apply the selected layout
                applyGridLayout(layout);
            });
        });
    }
    
    // Check if we're on a mobile device and apply mobile layout
    if (window.innerWidth <= 767) {
        console.log('Mobile device detected, applying mobile layout');
        applyGridLayout('mobile');
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}); 