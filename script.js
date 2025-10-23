// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingElement.remove();
            }, 500);
        }
    }, 1000);
    
    // Initialize all features
    initializeNavigationTabs();
    
    initializeContactForm();
    
    initializeSkillBars();
    initializeSkillLevels();
    initializeSkillsRadarChart();
    initializeLanguageChart();
    initializeProjectFilters();
    initializeProjectStats();

    initializeEnhancedAnimations();
    
    // Initialize enhanced interactive features
    initializeEnhancedFeatures();
    
    // Initialize education chart
    initializeEducationChart();

    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize all animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .experience-card, .timeline-content, .language-item, .attribute-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        section, .experience-card, .timeline-content, .language-item, .attribute-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate-in, .experience-card.animate-in, .timeline-content.animate-in, 
        .language-item.animate-in, .attribute-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize skill tags with hover effects
function initializeSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for skill tags
        tag.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Initialize progress bars with animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.transform = 'translateY(-10px)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeaderOnScroll);
            ticking = true;
        }
    });
}



// Add contact information copy functionality
function initializeContactCopy() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Create temporary input to copy text
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show feedback
            showNotification(`${text} copied to clipboard!`);
        });
    });
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #27ae60;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
    
    // Add animation CSS
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
}

// Initialize contact copy functionality
initializeContactCopy();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close any open modals (if any)
    if (e.key === 'Escape') {
        // Add any modal closing logic here
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Ensure loading screen is hidden
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
        setTimeout(() => {
            loadingElement.remove();
        }, 500);
    }
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add theme toggle functionality (optional)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #2c3e50;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    let isDark = false;
    
    themeToggle.addEventListener('click', function() {
        isDark = !isDark;
        if (isDark) {
            document.body.classList.add('dark-theme');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-theme');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Uncomment the line below to add theme toggle
// addThemeToggle();

// Initialize navigation tabs functionality
function initializeNavigationTabs() {
    const navTabs = document.querySelectorAll('.dark-nav-item');
    const sections = document.querySelectorAll('.section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
} 



// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Simulate form submission (replace with actual backend integration)
            // Form data logged for development - remove in production
        });
    }
}





// Enhanced Animations
function initializeEnhancedAnimations() {

    

    
    // Contact form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

 






function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function simulateLocation() {
    // Simulate different locations for demo purposes
    const locations = [
        { country: 'United States', city: 'New York', flag: '🇺🇸' },
        { country: 'United Kingdom', city: 'London', flag: '🇬🇧' },
        { country: 'Canada', city: 'Toronto', flag: '🇨🇦' },
        { country: 'Australia', city: 'Sydney', flag: '🇦🇺' },
        { country: 'Germany', city: 'Berlin', flag: '🇩🇪' },
        { country: 'France', city: 'Paris', flag: '🇫🇷' },
        { country: 'Japan', city: 'Tokyo', flag: '🇯🇵' },
        { country: 'India', city: 'Mumbai', flag: '🇮🇳' }
    ];
    
    return locations[Math.floor(Math.random() * locations.length)];
}

function storeVisitorData(visitorData) {
    // Get existing data from localStorage
    let analyticsData = JSON.parse(localStorage.getItem('analyticsData')) || {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitors: [],
        locations: {},
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        browsers: {},
        sources: {},
        dailyStats: {}
    };
    
    // Update total visits
    analyticsData.totalVisits++;
    
    // Check if this is a unique visitor (simple check based on session)
    const isUnique = !analyticsData.visitors.some(v => 
        v.userAgent === visitorData.userAgent && 
        v.platform === visitorData.platform
    );
    
    if (isUnique) {
        analyticsData.uniqueVisitors++;
    }
    
    // Add visitor to list (keep only last 50)
    analyticsData.visitors.unshift(visitorData);
    if (analyticsData.visitors.length > 50) {
        analyticsData.visitors = analyticsData.visitors.slice(0, 50);
    }
    
    // Update location stats
    const locationKey = `${visitorData.location.country}-${visitorData.location.city}`;
    analyticsData.locations[locationKey] = (analyticsData.locations[locationKey] || 0) + 1;
    
    // Update device stats
    analyticsData.devices[visitorData.deviceType]++;
    
    // Update browser stats
    analyticsData.browsers[visitorData.browser] = (analyticsData.browsers[visitorData.browser] || 0) + 1;
    
    // Update source stats
    const source = visitorData.referrer === 'Direct' ? 'Direct' : 'Referral';
    analyticsData.sources[source] = (analyticsData.sources[source] || 0) + 1;
    
    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    if (!analyticsData.dailyStats[today]) {
        analyticsData.dailyStats[today] = 0;
    }
    analyticsData.dailyStats[today]++;
    
    // Store updated data
    localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
}

function loadAnalyticsData() {
    const analyticsData = JSON.parse(localStorage.getItem('analyticsData')) || {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitors: [],
        locations: {},
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        browsers: {},
        sources: {},
        dailyStats: {}
    };
    
    // Update stats display
    updateStatsDisplay(analyticsData);
    
    // Update location list
    updateLocationList(analyticsData.locations);
    
    // Update visitors list
    updateVisitorsList(analyticsData.visitors);
    
    // Update sources chart
    updateSourcesChart(analyticsData.sources);
    
    // Update device stats
    updateDeviceStats(analyticsData.devices);
    
    // Update current visitors
    updateCurrentVisitors();
}

function updateStatsDisplay(data) {
    document.getElementById('totalVisits').textContent = data.totalVisits.toLocaleString();
    document.getElementById('uniqueVisitors').textContent = data.uniqueVisitors.toLocaleString();
    
    // Calculate today's visits
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = data.dailyStats[today] || 0;
    document.getElementById('todayVisits').textContent = todayVisits;
    
    // Calculate this month's visits
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    let monthVisits = 0;
    
    Object.keys(data.dailyStats).forEach(date => {
        const dateObj = new Date(date);
        if (dateObj.getMonth() === thisMonth && dateObj.getFullYear() === thisYear) {
            monthVisits += data.dailyStats[date];
        }
    });
    
    document.getElementById('thisMonth').textContent = monthVisits;
}

function updateLocationList(locations) {
    const locationList = document.getElementById('locationList');
    const sortedLocations = Object.entries(locations)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    locationList.innerHTML = sortedLocations.map(([location, count]) => {
        const [country, city] = location.split('-');
        return `
            <div class="location-item">
                <div class="location-flag">${getFlagEmoji(country)}</div>
                <span class="location-name">${city}, ${country}</span>
                <span class="location-count">${count}</span>
            </div>
        `;
    }).join('');
}

function getFlagEmoji(country) {
    const flagEmojis = {
        'United States': '🇺🇸',
        'United Kingdom': '🇬🇧',
        'Canada': '🇨🇦',
        'Australia': '🇦🇺',
        'Germany': '🇩🇪',
        'France': '🇫🇷',
        'Japan': '🇯🇵',
        'India': '🇮🇳'
    };
    return flagEmojis[country] || '🌍';
}

function updateVisitorsList(visitors) {
    const visitorsList = document.getElementById('visitorsList');
    const recentVisitors = visitors.slice(0, 8);
    
    visitorsList.innerHTML = recentVisitors.map(visitor => {
        const timeAgo = getTimeAgo(new Date(visitor.timestamp));
        const initials = getInitials(visitor.location.city);
        
        return `
            <div class="visitor-item">
                <div class="visitor-avatar">${initials}</div>
                <div class="visitor-info">
                    <div class="visitor-name">${visitor.location.city}, ${visitor.location.country}</div>
                    <div class="visitor-details">${visitor.deviceType} • ${visitor.browser}</div>
                </div>
                <div class="visitor-time">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function getInitials(city) {
    return city.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
}

function updateSourcesChart(sources) {
    const sourcesChart = document.getElementById('sourcesChart');
    const total = Object.values(sources).reduce((sum, count) => sum + count, 0);
    
    sourcesChart.innerHTML = Object.entries(sources).map(([source, count]) => {
        const percentage = Math.round((count / total) * 100);
        const icon = source === 'Direct' ? '🔗' : '📤';
        
        return `
            <div class="source-item">
                <div class="source-icon">${icon}</div>
                <span class="source-name">${source}</span>
                <span class="source-percentage">${percentage}%</span>
            </div>
        `;
    }).join('');
}

function updateDeviceStats(devices) {
    const total = Object.values(devices).reduce((sum, count) => sum + count, 0);
    
    if (total > 0) {
        document.getElementById('desktopPercent').textContent = 
            Math.round((devices.desktop / total) * 100) + '%';
        document.getElementById('mobilePercent').textContent = 
            Math.round((devices.mobile / total) * 100) + '%';
        document.getElementById('tabletPercent').textContent = 
            Math.round((devices.tablet / total) * 100) + '%';
    }
}

function updateCurrentVisitors() {
    // Simulate current online visitors
    const currentVisitors = Math.floor(Math.random() * 5) + 1;
    document.getElementById('currentVisitors').textContent = currentVisitors;
}

function setupAnalyticsControls() {
    // Refresh button
    document.getElementById('refreshAnalytics').addEventListener('click', () => {
        loadAnalyticsData();
        showNotification('Analytics data refreshed!', 'success');
    });
    
    // Export button
    document.getElementById('exportAnalytics').addEventListener('click', () => {
        exportAnalyticsReport();
    });
    
    // Reset button
    document.getElementById('resetAnalytics').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
            resetAnalyticsData();
        }
    });
}

function exportAnalyticsReport() {
    const analyticsData = JSON.parse(localStorage.getItem('analyticsData')) || {};
    
    // Create CSV content
    let csvContent = 'Data Type,Value,Count\n';
    
    // Add visitor stats
    csvContent += `Total Visits,,${analyticsData.totalVisits || 0}\n`;
    csvContent += `Unique Visitors,,${analyticsData.uniqueVisitors || 0}\n`;
    
    // Add location data
    Object.entries(analyticsData.locations || {}).forEach(([location, count]) => {
        csvContent += `Location,${location},${count}\n`;
    });
    
    // Add device data
    Object.entries(analyticsData.devices || {}).forEach(([device, count]) => {
        csvContent += `Device,${device},${count}\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Analytics report exported successfully!', 'success');
}

function resetAnalyticsData() {
    localStorage.removeItem('analyticsData');
    loadAnalyticsData();
    showNotification('Analytics data has been reset!', 'info');
}

function startRealTimeUpdates() {
    // Update current visitors every 30 seconds
    setInterval(updateCurrentVisitors, 30000);
    
    // Simulate new visitors occasionally
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 30 seconds
            trackNewVisitor();
            loadAnalyticsData();
        }
    }, 30000);
}

// Certificate Modal Functions
function openCertificate(fileSrc) {
    const modal = document.getElementById('certificateModal');
    const modalContent = document.getElementById('modalContent');
    
    // Check if it's a PDF or image file
    if (fileSrc.toLowerCase().endsWith('.pdf')) {
        // For PDF files, create an iframe or download link
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-file-pdf" style="font-size: 5rem; color: #e74c3c; margin-bottom: 20px;"></i>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">PDF Certificate</h3>
                <p style="color: #64748b; margin-bottom: 25px;">This is a PDF certificate file.</p>
                <a href="${fileSrc}" download class="view-certificate-btn" style="text-decoration: none; display: inline-block;">
                    <i class="fas fa-download"></i> Download PDF Certificate
                </a>
            </div>
        `;
    } else {
        // For image files, display the image
        modalContent.innerHTML = `<img src="${fileSrc}" alt="Certificate" class="certificate-modal-image">`;
    }
    
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add click outside modal to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificate();
        }
    });
    
    // Add escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificate();
        }
    });
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Clear the modal content
    document.getElementById('modalContent').innerHTML = '';
}

// Download PDF Certificate Function
function downloadPDFCertificate(pdfPath) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'Data_Science_Certificate.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    showNotification('PDF certificate download started!', 'success');
}

// Google Analytics Integration Functions
function loadGoogleAnalyticsData() {
    // Check if Google Analytics is loaded
    if (typeof gtag !== 'undefined') {
        // Google Analytics detected - loading real data
        
        // Track page view
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Try to get real-time data if available
        getRealTimeData();
        
        // Show Google Analytics status
        showGoogleAnalyticsStatus(true);
    } else {
        // Google Analytics not detected - using simulated data
        showGoogleAnalyticsStatus(false);
    }
}

function getRealTimeData() {
    // This function would integrate with Google Analytics Real-Time API
    // For now, we'll simulate the integration
    if (typeof gtag !== 'undefined') {
        // Track custom events for better analytics
        gtag('event', 'profile_view', {
            event_category: 'engagement',
            event_label: 'profile_visit'
        });
        
        // Track section views
        trackSectionViews();
    }
}

function trackSectionViews() {
    // Track when users view different sections
            const sections = ['overview', 'education', 'experience', 'projects', 'skills', 'certificates'];
    
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && typeof gtag !== 'undefined') {
                        gtag('event', 'section_view', {
                            event_category: 'engagement',
                            event_label: section,
                            value: 1
                        });
                    }
                });
            });
            
            observer.observe(sectionElement);
        }
    });
}

function showGoogleAnalyticsStatus(isActive) {
    // Create or update status indicator
    let statusElement = document.getElementById('gaStatus');
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.id = 'gaStatus';
        statusElement.className = 'ga-status';
        statusElement.innerHTML = `
            <i class="fas ${isActive ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>Google Analytics: ${isActive ? 'Active' : 'Not Connected'}</span>
        `;
        
        // Insert after the analytics title
        const titleElement = document.querySelector('#analytics .section-title');
        if (titleElement) {
            titleElement.parentNode.insertBefore(statusElement, titleElement.nextSibling);
        }
    } else {
        statusElement.innerHTML = `
            <i class="fas ${isActive ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>Google Analytics: ${isActive ? 'Active' : 'Not Connected'}</span>
        `;
    }
}

// Enhanced analytics with real data support
function enhanceAnalyticsWithRealData() {
    // This function can be called to enhance analytics with real data sources
    if (typeof gtag !== 'undefined') {
        // Add more sophisticated tracking
        gtag('event', 'analytics_enhanced', {
            event_category: 'system',
            event_label: 'real_data_integration'
        });
        
        showNotification('Real-time analytics enhanced with Google Analytics!', 'success');
    }
}

// Toggle Google Analytics setup guide
function toggleGASetup() {
    const content = document.querySelector('.ga-setup-content');
    content.classList.toggle('show');
    
    const btn = document.querySelector('.ga-setup-btn');
    if (content.classList.contains('show')) {
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Setup Guide';
    } else {
        btn.innerHTML = '<i class="fas fa-eye"></i> Show Setup Guide';
    }
}

// Enhanced Interactive Features
function initializeEnhancedFeatures() {
    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add typing effect to profile title
    const profileTitle = document.querySelector('.profile-details h1');
    if (profileTitle) {
        const text = profileTitle.textContent;
        profileTitle.textContent = '';
        profileTitle.style.borderRight = '2px solid #fff';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                profileTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                profileTitle.style.borderRight = 'none';
            }
        };
        typeWriter();
    }

    // Add floating particles effect
    createFloatingParticles();

    // Add smooth reveal animations
    initializeSmoothReveals();
}

// Create floating particles background
function createFloatingParticles() {
    const container = document.querySelector('.container');
    if (!container) return;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

// Initialize smooth reveal animations
function initializeSmoothReveals() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all project cards and sections
    document.querySelectorAll('.project-card, .section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add ripple effect to buttons
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Initialize ripple effects
document.addEventListener('DOMContentLoaded', function() {
    // Only add ripple effect to buttons, not to actual links
    // Temporarily disabled to test link functionality
    // document.querySelectorAll('button, .project-link:not([href])').forEach(addRippleEffect);
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Education Chart Initialization
function initializeEducationChart() {
    const ctx = document.getElementById('educationChart');
    if (!ctx) return;
    
    // Fix blurry chart on high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = ctx.getBoundingClientRect();
    
    // Set canvas size to actual display size
    ctx.width = rect.width * devicePixelRatio;
    ctx.height = rect.height * devicePixelRatio;
    
    // Scale the canvas back down using CSS
    ctx.style.width = rect.width + 'px';
    ctx.style.height = rect.height + 'px';
    
    // Scale the drawing context so everything draws at the correct size
    const context = ctx.getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);
    
    // Education data with proper scale conversion, trend visualization, and predictions
    // Convert diploma score from 1-10 scale to 0-100 scale: (7.73/10) * 100 = 77.3
    const educationData = {
        labels: ['2026', '2025', '2021', '2014', '2010'],
        datasets: [
            {
                label: 'Academic Performance',
                type: 'bar',
                data: [75.0, 72.5, 65.00, 77.3, 80.17],
                backgroundColor: [
                    'linear-gradient(135deg, #10b981, #059669)',   // Gradient green for graduation
                    'linear-gradient(135deg, #3b82f6, #1d4ed8)',   // Gradient blue for 5th sem
                    'linear-gradient(135deg, #ef4444, #dc2626)',   // Gradient red for HSC
                    'linear-gradient(135deg, #10b981, #059669)',   // Gradient green for diploma
                    'linear-gradient(135deg, #10b981, #059669)'    // Gradient green for SSC
                ],
                borderColor: [
                    '#10b981',
                    '#3b82f6',
                    '#ef4444',
                    '#10b981',
                    '#10b981'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 35,
                maxBarThickness: 45,
                order: 2,
                hoverBackgroundColor: [
                    'rgba(16, 185, 129, 0.9)',
                    'rgba(59, 130, 246, 0.9)',
                    'rgba(239, 68, 68, 0.9)',
                    'rgba(16, 185, 129, 0.9)',
                    'rgba(16, 185, 129, 0.9)'
                ],
                hoverBorderWidth: 3
            },
            {
                label: 'Performance Trend',
                type: 'line',
                data: [75.0, 72.5, 65.00, 77.3, 80.17], // Updated with predictions
                borderColor: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 3,
                fill: {
                    target: 'origin',
                    above: 'rgba(255, 255, 255, 0.1)',
                    below: 'rgba(255, 255, 255, 0.05)'
                },
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 10,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#8B5CF6',
                pointHoverBorderWidth: 4,
                order: 1
            }
        ]
    };
    
    const config = {
        type: 'bar',
        data: educationData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: devicePixelRatio,
            plugins: {
                title: {
                    display: true,
                    text: 'Academic Performance Analysis with Trend',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#8B5CF6',
                    borderWidth: 2,
                    callbacks: {
                        title: function(context) {
                            const year = context[0].label;
                            const educationTitles = {
                                '2026': 'BSc Applied Data Science (Predicted Graduation)',
                                '2025': 'BSc Applied Data Science (Predicted 5th Semester)',
                                '2021': 'Higher Secondary Certificate',
                                '2014': 'Diploma in Computer Science', 
                                '2010': 'Secondary School Certificate'
                            };
                            return educationTitles[year] || year;
                        },
                        label: function(context) {
                            const year = context.label;
                            const institutions = {
                                '2026': 'Modul University, Vienna (Predicted)',
                                '2025': 'Modul University, Vienna (Predicted)',
                                '2021': 'NIOS, Rajkot, Gujarat',
                                '2014': 'S.B. Polytechnic Vadodara',
                                '2010': 'GSEB, Amreli, Gujarat'
                            };
                            
                            // Show original score format for diploma (1-10 scale)
                            let scoreText = `Score: ${context.parsed.y}`;
                            if (year === '2014') {
                                scoreText = `SPI: 7.73 (out of 10)`;
                            }
                            
                            return [
                                scoreText,
                                `Institution: ${institutions[year]}`,
                                year === '2026' ? 'Status: Predicted Graduation' : 
                                year === '2025' ? 'Status: Predicted 5th Semester' :
                                'Status: Completed'
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        color: '#ffffff',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        display: false
                    },
                    categoryPercentage: 0.6,
                    barPercentage: 0.7
                },
                y: {
                    title: {
                        display: true,
                        text: 'Academic Score',
                        color: '#ffffff',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    min: 0,
                    max: 100
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 3000,
                easing: 'easeOutElastic',
                delay: (context) => {
                    if (context.datasetIndex === 0) {
                        return context.dataIndex * 400; // Bars animate with elastic effect
                    }
                    return 2000 + (context.dataIndex * 300); // Line animates after bars
                },
                onComplete: () => {
                    // Add sparkle effect after animation completes
                    addSparkleEffect();
                }
            }
        }
    };
    
    // Create the chart
    const educationChart = new Chart(ctx, config);
    
    // Add sparkle effect function
    function addSparkleEffect() {
        const chartContainer = document.querySelector('.chart-container');
        if (!chartContainer) return;
        
        // Create sparkle elements
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: sparkle 2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            chartContainer.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }
    }
    
    // Add click interaction to highlight education cards
    educationChart.canvas.addEventListener('click', function(event) {
        const points = educationChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (points.length) {
            const year = educationData.labels[points[0].index];
            
            // Remove active class from all cards
            document.querySelectorAll('.education-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Add active class to corresponding card
            const targetCard = document.querySelector(`[data-year="${year}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Add hover effects to education cards
    document.querySelectorAll('.education-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const year = this.getAttribute('data-year');
            const yearIndex = educationData.labels.indexOf(year);
            if (yearIndex !== -1) {
                educationChart.setActiveElements([{
                    datasetIndex: 0,
                    index: yearIndex
                }]);
                educationChart.update('none');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            educationChart.setActiveElements([]);
            educationChart.update('none');
        });
        
        card.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const yearIndex = educationData.labels.indexOf(year);
            if (yearIndex !== -1) {
                educationChart.setActiveElements([{
                    datasetIndex: 0,
                    index: yearIndex
                }]);
                educationChart.update('none');
            }
        });
    });
}

// Initialize skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill level colors
function initializeSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const text = level.textContent.trim();
        
        if (text === 'Expert') {
            level.style.color = '#10B981';
            level.style.background = 'rgba(16, 185, 129, 0.1)';
            level.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        } else if (text === 'Advanced') {
            level.style.color = '#3B82F6';
            level.style.background = 'rgba(59, 130, 246, 0.1)';
            level.style.borderColor = 'rgba(59, 130, 246, 0.2)';
        } else if (text === 'Intermediate') {
            level.style.color = '#F59E0B';
            level.style.background = 'rgba(245, 158, 11, 0.1)';
            level.style.borderColor = 'rgba(245, 158, 11, 0.2)';
        }
    });
}

// Initialize Skills Radar Chart
function initializeSkillsRadarChart() {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;
    
    // Fix blurry chart on high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = ctx.getBoundingClientRect();
    
    // Set canvas size to actual display size
    ctx.width = rect.width * devicePixelRatio;
    ctx.height = rect.height * devicePixelRatio;
    
    // Scale the canvas back down using CSS
    ctx.style.width = rect.width + 'px';
    ctx.style.height = rect.height + 'px';
    
    // Scale the drawing context so everything draws at the correct size
    const context = ctx.getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);
    
    // Skills data for radar chart
    const skillsData = {
        labels: [
            'Programming',
            'Databases', 
            'Machine Learning',
            'Data Analysis',
            'Research Skills',
            'Business Skills',
            'Web Development',
            'Statistical Analysis'
        ],
        datasets: [{
            label: 'Current Skills Level',
            data: [90, 85, 88, 92, 95, 80, 70, 90],
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(139, 92, 246, 1)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
            pointHoverBorderWidth: 3
        }, {
            label: 'Target Skills Level',
            data: [95, 90, 95, 95, 98, 85, 80, 95],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.8)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: 'rgba(59, 130, 246, 0.8)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: 'rgba(59, 130, 246, 0.8)',
            pointHoverBorderWidth: 2
        }]
    };
    
    const config = {
        type: 'radar',
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: devicePixelRatio,
            plugins: {
                title: {
                    display: true,
                    text: 'Skills Radar Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#8B5CF6',
                    borderWidth: 2,
                    callbacks: {
                        label: function(context) {
                            const skillNames = [
                                'Programming Languages',
                                'Database Management', 
                                'Machine Learning & AI',
                                'Data Analysis & Visualization',
                                'Research & Critical Thinking',
                                'Business Administration',
                                'Web Development',
                                'Statistical Analysis'
                            ];
                            return `${skillNames[context.dataIndex]}: ${context.parsed.r}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 10
                        },
                        stepSize: 20
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            size: 11,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 3000,
                easing: 'easeOutQuart',
                delay: (context) => context.dataIndex * 200
            },
            interaction: {
                intersect: false
            }
        }
    };
    
    // Create the radar chart
    const skillsRadarChart = new Chart(ctx, config);
    
    // Add click interaction to highlight skill categories
    skillsRadarChart.canvas.addEventListener('click', function(event) {
        const points = skillsRadarChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (points.length) {
            const pointIndex = points[0].index;
            const skillNames = [
                'Programming Languages',
                'Database Management', 
                'Machine Learning & AI',
                'Data Analysis & Visualization',
                'Research & Critical Thinking',
                'Business Administration',
                'Web Development',
                'Statistical Analysis'
            ];
            
            // Show skill details
            showSkillDetails(skillNames[pointIndex], skillsData.datasets[0].data[pointIndex]);
        }
    });
    
    // Function to show skill details
    function showSkillDetails(skillName, level) {
        const skillLevel = level >= 90 ? 'Expert' : level >= 80 ? 'Advanced' : level >= 70 ? 'Intermediate' : 'Beginner';
        const color = level >= 90 ? '#10B981' : level >= 80 ? '#3B82F6' : level >= 70 ? '#F59E0B' : '#EF4444';
        
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            border: 2px solid ${color};
            z-index: 1000;
            font-size: 16px;
            text-align: center;
            backdrop-filter: blur(10px);
            animation: fadeInOut 3s ease-in-out;
        `;
        
        notification.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: ${color};">${skillName}</h4>
            <p style="margin: 0; font-size: 14px;">Level: <strong style="color: ${color};">${skillLevel}</strong> (${level}%)</p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize Language Pie Chart
function initializeLanguageChart() {
    const ctx = document.getElementById('languageChart');
    if (!ctx) return;
    
    // Fix blurry chart on high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = ctx.getBoundingClientRect();
    
    // Set canvas size to actual display size
    ctx.width = rect.width * devicePixelRatio;
    ctx.height = rect.height * devicePixelRatio;
    
    // Scale the canvas back down using CSS
    ctx.style.width = rect.width + 'px';
    ctx.style.height = rect.height + 'px';
    
    // Scale the drawing context so everything draws at the correct size
    const context = ctx.getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);
    
    // Language data for pie chart with speaking/writing breakdown
    const languageData = {
        labels: ['English', 'Hindi', 'Gujarati', 'German'],
        datasets: [{
            data: [90, 95, 100, 30],
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',   // Blue for English
                'rgba(16, 185, 129, 0.8)',   // Green for Hindi
                'rgba(139, 92, 246, 0.8)',   // Purple for Gujarati
                'rgba(245, 158, 11, 0.8)'    // Orange for German
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(139, 92, 246, 1)',
                'rgba(245, 158, 11, 1)'
            ],
            borderWidth: 3,
            hoverBackgroundColor: [
                'rgba(59, 130, 246, 0.9)',
                'rgba(16, 185, 129, 0.9)',
                'rgba(139, 92, 246, 0.9)',
                'rgba(245, 158, 11, 0.9)'
            ],
            hoverBorderWidth: 4
        }]
    };
    
    // Language details with speaking/writing breakdown
    const languageDetails = {
        'English': { overall: 90, speaking: 85, writing: 95, level: 'Advanced (C1)', flag: '🇺🇸' },
        'Hindi': { overall: 95, speaking: 98, writing: 92, level: 'Proficient (C2)', flag: '🇮🇳' },
        'Gujarati': { overall: 100, speaking: 100, writing: 100, level: 'Proficient (C2)', flag: '🇮🇳' },
        'German': { overall: 30, speaking: 25, writing: 35, level: 'Beginner (A1)', flag: '🇩🇪' }
    };
    
    const config = {
        type: 'doughnut',
        data: languageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: devicePixelRatio,
            plugins: {
                title: {
                    display: true,
                    text: 'Language Proficiency Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#8B5CF6',
                    borderWidth: 2,
                    callbacks: {
                        title: function(context) {
                            const languageName = context[0].label;
                            const details = languageDetails[languageName];
                            return `${details.flag} ${languageName}`;
                        },
                        label: function(context) {
                            const languageName = context.label;
                            const details = languageDetails[languageName];
                            return [
                                `Overall: ${details.overall}% (${details.level})`,
                                `Speaking: ${details.speaking}%`,
                                `Writing: ${details.writing}%`
                            ];
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart',
                animateRotate: true,
                animateScale: true
            },
            interaction: {
                intersect: false
            },
            cutout: '60%'
        }
    };
    
    // Create the language chart
    const languageChart = new Chart(ctx, config);
    
    // Add click interaction
    languageChart.canvas.addEventListener('click', function(event) {
        const points = languageChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (points.length) {
            const pointIndex = points[0].index;
            const languageNames = ['English', 'Hindi', 'Gujarati', 'German'];
            const languageName = languageNames[pointIndex];
            const details = languageDetails[languageName];
            
            // Show detailed language information
            showLanguageDetails(languageName, details);
        }
    });
    
    // Function to show detailed language information
    function showLanguageDetails(languageName, details) {
        const colors = {
            'English': '#3B82F6',
            'Hindi': '#10B981',
            'Gujarati': '#8B5CF6',
            'German': '#F59E0B'
        };
        
        const color = colors[languageName];
        
        // Create a detailed notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 25px 35px;
            border-radius: 15px;
            border: 2px solid ${color};
            z-index: 1000;
            font-size: 16px;
            text-align: center;
            backdrop-filter: blur(10px);
            animation: fadeInOut 4s ease-in-out;
            min-width: 250px;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">${details.flag}</div>
            <h4 style="margin: 0 0 15px 0; color: ${color}; font-size: 1.3rem;">${languageName}</h4>
            <div style="display: flex; flex-direction: column; gap: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Overall:</span>
                    <strong style="color: ${color};">${details.overall}% (${details.level})</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Speaking:</span>
                    <strong style="color: ${color};">${details.speaking}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Writing:</span>
                    <strong style="color: ${color};">${details.writing}%</strong>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }
}

// Initialize Project Filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card.enhanced');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    // Stagger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 100);
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });
}

// Initialize Project Stats Animation
function initializeProjectStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Count actual projects by category
    const projectCards = document.querySelectorAll('.project-card.enhanced');
    const stats = {
        total: projectCards.length,
        machineLearning: 0,
        webApplications: 0,
        research: 0
    };
    
    // Count projects by category
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (categories.includes('machine-learning')) stats.machineLearning++;
        if (categories.includes('web-development')) stats.webApplications++;
        if (categories.includes('research')) stats.research++;
    });
    
    // Update data targets with real counts
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        const numberElement = item.querySelector('.stat-number');
        let targetValue = 0;
        
        switch(index) {
            case 0: targetValue = stats.total; break;
            case 1: targetValue = stats.machineLearning; break;
            case 2: targetValue = stats.webApplications; break;
            case 3: targetValue = stats.research; break;
        }
        
        numberElement.setAttribute('data-target', targetValue);
    });
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    // Animate stats when projects section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500); // Small delay for better effect
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        observer.observe(projectsSection);
    }
    
    // Fallback: animate stats after a delay if observer doesn't trigger
    setTimeout(() => {
        if (statNumbers[0].textContent === '0') {
            animateStats();
        }
    }, 3000);
}