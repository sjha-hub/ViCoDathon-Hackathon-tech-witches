// ============================================================
// FRIENDS PAGE - DATA & FUNCTIONALITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // FRIENDS DATA
    // ============================================================

    const friendsData = [
        {
            id: 1,
            name: "Alex Chen",
            emoji: "👨‍💻",
            status: "online",
            badge: "🔥 12-day streak",
            bio: "Full-stack developer | React + Node.js",
            task: "Build a Weather App",
            progress: 75,
            lastActive: "Active now",
            day: "Day 45/60"
        },
        {
            id: 2,
            name: "Sarah Kim",
            emoji: "👩‍💻",
            status: "online",
            badge: "💪 8-day streak",
            bio: "UI/UX Designer | Figma + Tailwind",
            task: "Portfolio Website",
            progress: 90,
            lastActive: "Active now",
            day: "Day 38/60"
        },
        {
            id: 3,
            name: "Marcus Johnson",
            emoji: "🧑‍🎓",
            status: "active",
            badge: "🌱 Getting Started",
            bio: "CS Student | Python + JavaScript",
            task: "JavaScript Fundamentals",
            progress: 30,
            lastActive: "2 hours ago",
            day: "Day 12/60"
        },
        {
            id: 4,
            name: "Priya Patel",
            emoji: "👨‍🎨",
            status: "online",
            badge: "🎯 Day 45",
            bio: "Frontend Developer | React + TypeScript",
            task: "React Dashboard",
            progress: 60,
            lastActive: "5 min ago",
            day: "Day 45/60"
        },
        {
            id: 5,
            name: "Emily Davis",
            emoji: "👩‍🔧",
            status: "offline",
            badge: "✅ Completed",
            bio: "DevOps Engineer | AWS + Docker",
            task: "CSS Animations 🎉",
            progress: 100,
            lastActive: "1 day ago",
            day: "✅ Completed"
        },
        {
            id: 6,
            name: "James Wilson",
            emoji: "🧑‍💻",
            status: "active",
            badge: "⚡ Fast Learner",
            bio: "Mobile Developer | React Native",
            task: "Mobile App Prototype",
            progress: 50,
            lastActive: "1 hour ago",
            day: "Day 28/60"
        }
    ];

    // ============================================================
    // FRIEND REQUESTS DATA
    // ============================================================

    const requestsData = [
        {
            id: 1,
            name: "Maya Rodriguez",
            emoji: "👩‍🎨",
            role: "UI/UX Designer",
            mutual: "5 mutual friends"
        },
        {
            id: 2,
            name: "David Park",
            emoji: "👨‍🔬",
            role: "Data Scientist",
            mutual: "3 mutual friends"
        },
        {
            id: 3,
            name: "Lisa Chen",
            emoji: "👨‍💼",
            role: "Product Manager",
            mutual: "8 mutual friends"
        }
    ];

    // ============================================================
    // RENDER FUNCTIONS
    // ============================================================

    function renderFriends(friends) {
        const container = document.getElementById('friendsList');
        
        if (friends.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No friends found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = friends.map(friend => `
            <div class="friend-card" data-status="${friend.status}">
                <div class="friend-avatar-wrapper">
                    <div class="friend-avatar large">
                        <span class="avatar-emoji">${friend.emoji}</span>
                        <span class="status-dot ${friend.status}"></span>
                    </div>
                </div>
                <div class="friend-details">
                    <div class="friend-name-row">
                        <h3>${friend.name}</h3>
                        <span class="friend-badge">${friend.badge}</span>
                    </div>
                    <p class="friend-bio">${friend.bio}</p>
                    <div class="friend-activity">
                        <span class="activity-label">Currently working on:</span>
                        <span class="activity-task">${friend.task}</span>
                    </div>
                    <div class="friend-meta-row">
                        <span class="friend-last-active">
                            <i class="far fa-clock"></i> ${friend.lastActive}
                        </span>
                        <span class="friend-progress-label">${friend.day}</span>
                    </div>
                    <div class="friend-progress-bar">
                        <div class="friend-progress-fill" style="width: ${friend.progress}%; ${friend.progress === 100 ? 'background: var(--success);' : ''}">
                            <span class="progress-text">${friend.progress}%</span>
                        </div>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="friend-action-btn" data-action="message" data-id="${friend.id}" title="Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="friend-action-btn" data-action="profile" data-id="${friend.id}" title="View Profile">
                        <i class="fas fa-user"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderRequests(requests) {
        const container = document.getElementById('requestsList');
        const countBadge = document.getElementById('requestsCount');
        
        countBadge.textContent = requests.length;

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: 20px;">
                    <p style="color: var(--text-muted); font-size: 0.85rem;">No pending friend requests 🎉</p>
                </div>
            `;
            return;
        }

        container.innerHTML = requests.map(request => `
            <div class="request-item" data-id="${request.id}">
                <div class="request-user">
                    <div class="friend-avatar small">
                        <span class="avatar-emoji">${request.emoji}</span>
                    </div>
                    <div>
                        <strong>${request.name}</strong>
                        <p>${request.role} · ${request.mutual}</p>
                    </div>
                </div>
                <div class="request-actions">
                    <button class="btn btn-primary btn-sm accept-request" data-id="${request.id}">Accept</button>
                    <button class="btn btn-secondary btn-sm decline-request" data-id="${request.id}">Decline</button>
                </div>
            </div>
        `).join('');
    }

    // ============================================================
    // FILTER & SEARCH FUNCTIONALITY
    // ============================================================

    let currentFilter = 'all';
    let currentSearch = '';

    function filterAndSearch() {
        let filtered = [...friendsData];

        // Apply filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(f => f.status === currentFilter);
        }

        // Apply search
        if (currentSearch.trim() !== '') {
            const query = currentSearch.toLowerCase().trim();
            filtered = filtered.filter(f => 
                f.name.toLowerCase().includes(query) ||
                f.bio.toLowerCase().includes(query) ||
                f.task.toLowerCase().includes(query)
            );
        }

        renderFriends(filtered);
        updateStats(filtered);
    }

    function updateStats(filteredFriends) {
        const total = document.getElementById('totalFriends');
        const online = document.getElementById('onlineFriends');
        const active = document.getElementById('activeFriends');
        
        total.textContent = friendsData.length;
        online.textContent = friendsData.filter(f => f.status === 'online').length;
        active.textContent = friendsData.filter(f => f.status === 'online' || f.status === 'active').length;
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================

    // Search
    const searchInput = document.getElementById('friendSearch');
    searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        filterAndSearch();
    });

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterAndSearch();
        });
    });

    // Friend action buttons (delegated)
    document.getElementById('friendsList').addEventListener('click', function(e) {
        const btn = e.target.closest('.friend-action-btn');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = parseInt(btn.dataset.id);
        const friend = friendsData.find(f => f.id === id);

        if (action === 'message') {
            alert(`💬 Send a message to ${friend.name}!\n\nThis feature is coming soon!`);
        } else if (action === 'profile') {
            alert(`👤 View ${friend.name}'s profile!\n\nThis feature is coming soon!`);
        }
    });

    // Add Friend button
    document.getElementById('addFriendBtn').addEventListener('click', function() {
        alert('👥 Find and add friends!\n\nThis feature is coming soon!');
    });

    // Friend requests (delegated)
    document.getElementById('requestsList').addEventListener('click', function(e) {
        const acceptBtn = e.target.closest('.accept-request');
        const declineBtn = e.target.closest('.decline-request');
        
        if (acceptBtn) {
            const id = parseInt(acceptBtn.dataset.id);
            const request = requestsData.find(r => r.id === id);
            if (confirm(`Accept friend request from ${request.name}?`)) {
                // Remove from requests
                const index = requestsData.indexOf(request);
                requestsData.splice(index, 1);
                
                // Add to friends
                friendsData.push({
                    id: friendsData.length + 1,
                    name: request.name,
                    emoji: request.emoji,
                    status: 'online',
                    badge: '🆕 New Friend',
                    bio: request.role,
                    task: 'Getting started',
                    progress: 0,
                    lastActive: 'Just now',
                    day: 'Day 0/60'
                });
                
                renderRequests(requestsData);
                filterAndSearch();
                alert(`✅ You are now friends with ${request.name}!`);
            }
        }
        
        if (declineBtn) {
            const id = parseInt(declineBtn.dataset.id);
            const request = requestsData.find(r => r.id === id);
            if (confirm(`Decline friend request from ${request.name}?`)) {
                const index = requestsData.indexOf(request);
                requestsData.splice(index, 1);
                renderRequests(requestsData);
                alert(`❌ Friend request from ${request.name} declined.`);
            }
        }
    });

    // ============================================================
    // INITIALIZE
    // ============================================================

    renderFriends(friendsData);
    renderRequests(requestsData);
    updateStats(friendsData);

});