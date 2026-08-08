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
    // PEOPLE YOU CAN ADD
    // ============================================================

    const peopleData = [
        {
            id: 101,
            name: "Riya Sharma",
            emoji: "👩‍💻",
            role: "CSE Student",
            bio: "Learning C++ and building creative web projects.",
            mutual: 4
        },
        {
            id: 102,
            name: "Arjun Mehta",
            emoji: "🧑‍💻",
            role: "Software Developer",
            bio: "Interested in DSA, JavaScript and open-source projects.",
            mutual: 6
        },
        {
            id: 103,
            name: "Neha Verma",
            emoji: "👩‍🎨",
            role: "UI/UX Enthusiast",
            bio: "Exploring design systems and frontend development.",
            mutual: 3
        },
        {
            id: 104,
            name: "Kabir Singh",
            emoji: "🧑‍🎓",
            role: "Engineering Student",
            bio: "Practicing problem solving and competitive programming.",
            mutual: 2
        },
        {
            id: 105,
            name: "Ananya Joshi",
            emoji: "👩‍🔬",
            role: "Data Science Student",
            bio: "Interested in Python, AI and data visualization.",
            mutual: 5
        }
    ];

    const chatMessages = {};
    let activeChatFriend = null;


    // ============================================================
    // ADD FRIEND / PROFILE / CHAT FUNCTIONS
    // ============================================================

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');

        if (!document.querySelector('.friend-modal.open')) {
            document.body.style.overflow = '';
        }
    }

    function renderPeople(query = '') {
        const container = document.getElementById('peopleList');
        const search = query.toLowerCase().trim();

        const availablePeople = peopleData.filter(person => {
            const alreadyFriend = friendsData.some(friend => friend.name === person.name);
            return !alreadyFriend && (
                person.name.toLowerCase().includes(search) ||
                person.role.toLowerCase().includes(search) ||
                person.bio.toLowerCase().includes(search)
            );
        });

        if (availablePeople.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No people found</h3>
                    <p>Try another name or keyword.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = availablePeople.map(person => `
            <div class="person-item">
                <div class="person-info">
                    <div class="friend-avatar small">
                        <span class="avatar-emoji">${person.emoji}</span>
                    </div>
                    <div>
                        <strong>${person.name}</strong>
                        <p>${person.role} · ${person.mutual} mutual friends</p>
                    </div>
                </div>
                <div class="person-action">
                    <button class="btn btn-primary btn-sm add-person-btn" data-id="${person.id}">
                        <i class="fas fa-user-plus"></i> Add
                    </button>
                </div>
            </div>
        `).join('');
    }

    function addFriendFromPeople(personId, button) {
        const person = peopleData.find(p => p.id === personId);
        if (!person) return;

        if (friendsData.some(friend => friend.name === person.name)) {
            button.textContent = 'Added';
            return;
        }

        friendsData.push({
            id: Date.now(),
            name: person.name,
            emoji: person.emoji,
            status: 'online',
            badge: '🆕 New Friend',
            bio: person.bio,
            task: 'Getting started',
            progress: 0,
            lastActive: 'Just now',
            day: 'Day 0/60'
        });

        button.classList.add('sent');
        button.innerHTML = '<i class="fas fa-check"></i> Added';

        filterAndSearch();
        renderPeople(document.getElementById('addFriendSearch').value);
        showToast(`✅ ${person.name} added to your friends!`);
    }

    function openProfile(friend) {
        const content = document.getElementById('profileContent');

        content.innerHTML = `
            <div class="profile-content">
                <div class="friend-avatar large profile-avatar">
                    <span class="avatar-emoji">${friend.emoji}</span>
                    <span class="status-dot ${friend.status}"></span>
                </div>
                <h2 id="profileTitle">${friend.name}</h2>
                <p class="profile-role">${friend.bio}</p>
                <p class="profile-bio">
                    ${friend.name} is currently working on <strong>${friend.task}</strong>.
                    Keep learning, stay active and build together on ABTalks.
                </p>

                <div class="profile-stats">
                    <div class="profile-stat">
                        <strong>${friend.progress}%</strong>
                        <span>Progress</span>
                    </div>
                    <div class="profile-stat">
                        <strong>${friend.day}</strong>
                        <span>Journey</span>
                    </div>
                    <div class="profile-stat">
                        <strong>${friend.lastActive}</strong>
                        <span>Status</span>
                    </div>
                </div>

                <div class="profile-current">
                    <span class="activity-label">Currently working on</span>
                    <strong>${friend.task}</strong>
                </div>

                <div class="profile-actions">
                    <button class="btn btn-primary profile-message-btn" data-id="${friend.id}">
                        <i class="fas fa-comment"></i> Message
                    </button>
                </div>
            </div>
        `;

        openModal('profileModal');
    }

    function getChatTime() {
        return new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function renderChat(friend) {
        const container = document.getElementById('chatMessages');
        const messages = chatMessages[friend.id] || [];

        document.getElementById('chatFriendInfo').innerHTML = `
            <div class="chat-person">
                <div class="friend-avatar small">
                    <span class="avatar-emoji">${friend.emoji}</span>
                    <span class="status-dot ${friend.status}"></span>
                </div>
                <div>
                    <strong id="chatTitle">${friend.name}</strong>
                    <span>${friend.status === 'online' ? '● Online' : friend.lastActive}</span>
                </div>
            </div>
        `;

        if (messages.length === 0) {
            container.innerHTML = `
                <div class="chat-empty">
                    <div style="font-size: 2rem; margin-bottom: 8px;">💬</div>
                    Start a conversation with ${friend.name}
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(message => `
            <div class="chat-message ${message.sender}">
                ${message.text}
                <span class="chat-time">${message.time}</span>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    function openChat(friend) {
        activeChatFriend = friend;

        if (!chatMessages[friend.id]) {
            chatMessages[friend.id] = [];
        }

        renderChat(friend);
        openModal('chatModal');

        setTimeout(() => document.getElementById('chatInput').focus(), 100);
    }

    function showToast(message) {
        let toast = document.getElementById('friendToast');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'friendToast';
            toast.style.cssText = `
                position: fixed;
                left: 50%;
                bottom: 28px;
                transform: translateX(-50%) translateY(20px);
                z-index: 3000;
                padding: 11px 16px;
                background: var(--bg-card);
                color: var(--text-primary);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                box-shadow: 0 12px 35px rgba(0,0,0,.35);
                font-size: .8rem;
                opacity: 0;
                transition: all .25s ease;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2200);
    }

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
            openChat(friend);
        } else if (action === 'profile') {
            openProfile(friend);
        }
    });

    // Add Friend button
    document.getElementById('addFriendBtn').addEventListener('click', function() {
        renderPeople();
        document.getElementById('addFriendSearch').value = '';
        openModal('addFriendModal');
        setTimeout(() => document.getElementById('addFriendSearch').focus(), 100);
    });

    // Search people while adding friends
    document.getElementById('addFriendSearch').addEventListener('input', function() {
        renderPeople(this.value);
    });

    // Add people from the Find Friends modal
    document.getElementById('peopleList').addEventListener('click', function(e) {
        const btn = e.target.closest('.add-person-btn');
        if (!btn) return;

        const personId = parseInt(btn.dataset.id);
        addFriendFromPeople(personId, btn);
    });

    // Close modals from close buttons and backdrops
    document.querySelectorAll('[data-close-modal]').forEach(element => {
        element.addEventListener('click', function() {
            closeModal(this.dataset.closeModal);
        });
    });

    // Escape key closes any open modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.friend-modal.open').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });

    // Profile -> Message
    document.getElementById('profileContent').addEventListener('click', function(e) {
        const btn = e.target.closest('.profile-message-btn');
        if (!btn) return;

        const id = parseInt(btn.dataset.id);
        const friend = friendsData.find(f => f.id === id);

        if (friend) {
            closeModal('profileModal');
            openChat(friend);
        }
    });

    // Chat message sending
    document.getElementById('chatForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message || !activeChatFriend) return;

        if (!chatMessages[activeChatFriend.id]) {
            chatMessages[activeChatFriend.id] = [];
        }

        chatMessages[activeChatFriend.id].push({
            sender: 'me',
            text: message.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            time: getChatTime()
        });

        input.value = '';
        renderChat(activeChatFriend);

        // Local demo response so the chat feels interactive.
        setTimeout(() => {
            if (!activeChatFriend) return;

            chatMessages[activeChatFriend.id].push({
                sender: 'friend',
                text: `Hey! Thanks for your message 😊`,
                time: getChatTime()
            });

            if (document.getElementById('chatModal').classList.contains('open')) {
                renderChat(activeChatFriend);
            }
        }, 700);
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
                    id: Date.now(),
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