document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. LOGIN TRANSITION LOGIC ---
    const loginBtn = document.getElementById('login-btn');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // Visual feedback on the button
            loginBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Authenticating...';
            loginBtn.style.pointerEvents = 'none'; 
            
            // Simulate a brief network delay (800ms)
            setTimeout(() => {
                // Trigger the CSS animations
                loginView.classList.add('exit');
                dashboardView.classList.add('active');
                
                // Cleanup: Hide the login view completely after animation ends
                setTimeout(() => {
                    loginView.style.display = 'none';
                }, 800); 
                
            }, 800);
        });
    }

    // ... [Keep all your existing JS below this, like Dynamic Greeting, Navigation, etc.] ...



    
    // 1. Dynamic Greeting based on time of day
    const greetingElement = document.getElementById('dynamic-greeting');
    const hour = new Date().getHours();
    
    let greetingText = 'Good evening,';
    if (hour >= 5 && hour < 12) {
        greetingText = 'Good morning,';
    } else if (hour >= 12 && hour < 18) {
        greetingText = 'Good afternoon,';
    }
    greetingElement.textContent = greetingText;

    // 2. Navigation Item Switching
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top for empty anchors
            
            // Remove active class from all items
            navItems.forEach(nav => {
                nav.classList.remove('active');
                // Swap back to outline icon
                const icon = nav.querySelector('i');
                if(icon.classList.contains('ph-fill')) {
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                }
            });

            // Add active class to clicked item
            item.classList.add('active');
            
            // Swap to filled icon for active state
            const activeIcon = item.querySelector('i');
            if(activeIcon.classList.contains('ph')) {
                activeIcon.classList.remove('ph');
                activeIcon.classList.add('ph-fill');
            }
        });
    });

    // 3. Floating Action Button (FAB) interaction
    const fabButton = document.querySelector('.nav-fab');
    fabButton.addEventListener('click', () => {
        // Haptic feedback simulation (creates a quick scale effect)
        fabButton.style.transform = 'scale(0.85)';
        setTimeout(() => {
            fabButton.style.transform = 'scale(1)';
        }, 150);
        
        console.log("FAB Clicked: Open action menu");
    });
});

            // --- 4. MAGNETIC FAB LOGIC ---
            const magneticFab = document.getElementById('magnetic-fab');
            if (magneticFab) {
                document.addEventListener('mousemove', e => {
                    const rect = magneticFab.getBoundingClientRect();
                    const distX = e.clientX - (rect.left + rect.width / 2);
                    const distY = e.clientY - (rect.top + rect.height / 2);
                    if (Math.sqrt(distX * distX + distY * distY) < 80) {
                        magneticFab.style.transform = `translate(${distX * 0.3}px, ${distY * 0.3}px) scale(1.1)`;
                        magneticFab.style.transition = 'transform 0.1s ease-out';
                    } else {
                        magneticFab.style.transform = `translate(0px, 0px) scale(1)`;
                        magneticFab.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    }
                });
            }

            // --- PLUS BUTTON DEVICE SCANNER LOGIC ---
            const mainFab = document.getElementById('main-fab');
            const scannerOverlay = document.getElementById('scanner-overlay');
            const closeScannerBtn = document.getElementById('close-scanner-btn');
            const scannerText = document.getElementById('scanner-text');

            if (mainFab && scannerOverlay) {
                mainFab.addEventListener('click', () => {
                    // Reset text and show overlay
                    scannerText.textContent = "Scanning for devices...";
                    scannerText.style.color = "var(--overlay-text)";
                    scannerOverlay.classList.add('active');
                    
                    // Simulate finding a device after 3 seconds
                    setTimeout(() => {
                        if(scannerOverlay.classList.contains('active')) {
                            scannerText.textContent = "Aura Smartwatch V2 Found!";
                            scannerText.style.color = "var(--accent-cyan)";
                            
                            // Auto close after showing success
                            setTimeout(() => {
                                scannerOverlay.classList.remove('active');
                            }, 2000);
                        }
                    }, 3000);
                });

                closeScannerBtn.addEventListener('click', () => {
                    scannerOverlay.classList.remove('active');
                });
            }
