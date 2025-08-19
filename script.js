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

    initializeDownloadFunctions();
    initializeEnhancedAnimations();
    
    // Initialize enhanced interactive features
    initializeEnhancedFeatures();

    
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

// Initialize print functionality
function initializePrintFunctionality() {
    // Add print button functionality if needed
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Profile';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
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
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
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
    const navTabs = document.querySelectorAll('.nav-tab');
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
            console.log('Contact Form Submission:', { name, email, subject, message });
        });
    }
}



// Download CV Functions
function initializeDownloadFunctions() {
    // These functions will be called by the onclick events in HTML
    window.downloadCV = function(format) {
        if (format === 'pdf') {
            showNotification('Preparing PDF download...', 'info');
            // Add actual PDF generation logic here
            setTimeout(() => {
                showNotification('PDF download started!', 'success');
            }, 2000);
        } else if (format === 'docx') {
            showNotification('Preparing DOCX download...', 'info');
            // Add actual DOCX generation logic here
            setTimeout(() => {
                showNotification('DOCX download started!', 'success');
            }, 2000);
        }
    };
    
    window.printCV = function() {
        showNotification('Opening print dialog...', 'info');
        window.print();
    };
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
        console.log('Google Analytics detected! Loading real data...');
        
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
        console.log('Google Analytics not detected. Using simulated data.');
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
    document.querySelectorAll('button, .project-link').forEach(addRippleEffect);
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