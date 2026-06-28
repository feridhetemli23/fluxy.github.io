const USERS_KEY = 'fluxy-users';
const SESSION_KEY = 'fluxy-session';
const POSTS_KEY = 'fluxy-posts';
const DM_KEY = 'fluxy-dms';

const authCard = document.getElementById('auth-card');
const appShell = document.getElementById('app-shell');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageBox = document.getElementById('message');
const logoutBtn = document.getElementById('logout-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const emailField = document.querySelector('.email-field');
const submitBtn = document.querySelector('#auth-form .submit-btn');
const appUserName = document.getElementById('app-user-name');
const sidebarUser = document.getElementById('sidebar-user');
const sidebarHandle = document.getElementById('sidebar-handle');
const postText = document.getElementById('post-text');
const postBtn = document.getElementById('post-btn');
const postsList = document.getElementById('posts-list');
const composerFeedback = document.getElementById('composer-feedback');
const profileForm = document.getElementById('profile-form');
const profileDisplayName = document.getElementById('profile-display-name');
const profileHandleInput = document.getElementById('profile-handle-input');
const profileBio = document.getElementById('profile-bio');
const profileAvatar = document.getElementById('profile-avatar');
const profileFeedback = document.getElementById('profile-feedback');
const profileBioPreview = document.getElementById('profile-bio-preview');
const statFollowers = document.getElementById('stat-followers');
const statFollowing = document.getElementById('stat-following');
const statPosts = document.getElementById('stat-posts');
const navItems = document.querySelectorAll('.nav-item');
const privacyBadge = document.getElementById('privacy-badge');
const privacyToggle = document.getElementById('privacy-toggle');
const verificationCard = document.getElementById('verification-card');
const verificationQuestion = document.getElementById('verification-question');
const verificationAnswerInput = document.getElementById('verification-answer-input');
const verifyBtn = document.getElementById('verify-btn');
const privacyStatus = document.getElementById('privacy-status');
const verificationStatusText = document.getElementById('verification-status-text');
const presenceChip = document.getElementById('presence-chip');
const exploreList = document.getElementById('explore-list');
const conversationList = document.getElementById('conversation-list');
const messageThread = document.getElementById('message-thread');
const threadName = document.getElementById('thread-name');
const threadHandle = document.getElementById('thread-handle');
const threadStatus = document.getElementById('thread-status');
const dmForm = document.getElementById('dm-form');
const dmInput = document.getElementById('dm-input');

const initialUsers = [
  {
    id: 'user-1',
    username: 'nova',
    displayName: 'Nova',
    email: 'nova@fluxy.app',
    password: encodePassword('Fluxy123'),
    handle: 'nova',
    bio: 'Quiet creator building calm digital spaces.',
    avatar: 'N',
    joinedAt: '2026-01-01T12:00:00.000Z',
    followers: 132,
    following: 88,
    posts: 4,
    verified: true,
    privacyMode: false
  }
];

const initialPosts = [
  {
    id: '1',
    author: 'nova',
    handle: 'nova',
    time: '10m ago',
    text: 'Built a calm corner for deep work and honest conversation. Fluxy feels like a place for real voices.',
    likes: 24,
    comments: 6,
    liked: false
  },
  {
    id: '2',
    author: 'Milo Reed',
    handle: 'milo',
    time: '1h ago',
    text: 'Privacy-first social design should feel soft, fast, and human — not noisy. That is the goal.',
    likes: 18,
    comments: 4,
    liked: true
  }
];

const initialConversations = [
  {
    id: 'conv-1',
    participant: 'Milo Reed',
    handle: 'milo',
    isOnline: true,
    messages: [{ sender: 'them', text: 'The privacy layer feels excellent.', time: '9:34' }]
  },
  {
    id: 'conv-2',
    participant: 'Nora Blaze',
    handle: 'nora',
    isOnline: false,
    messages: [{ sender: 'them', text: 'I love what you are building here.', time: 'Yesterday' }]
  }
];

let mode = 'login';
let activePage = 'home';
let selectedConversationId = null;
const verificationState = { pendingAction: null, answer: null, isVerified: false };

function encodePassword(password) {
  return btoa(unescape(encodeURIComponent(password)));
}

function getUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || 'null');
    if (stored && Array.isArray(stored)) {
      return stored;
    }
  } catch {
    // ignore and fall back to seed data
  }

  saveUsers(initialUsers);
  return initialUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getPosts() {
  try {
    const stored = JSON.parse(localStorage.getItem(POSTS_KEY) || 'null');
    if (stored && Array.isArray(stored)) {
      return stored;
    }
  } catch {
    // ignore and fall back to seed data
  }

  savePosts(initialPosts);
  return initialPosts;
}

function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function getConversations() {
  try {
    const stored = JSON.parse(localStorage.getItem(DM_KEY) || 'null');
    if (stored && Array.isArray(stored)) {
      return stored;
    }
  } catch {
    // ignore and fall back to seed data
  }

  saveConversations(initialConversations);
  return initialConversations;
}

function saveConversations(conversations) {
  localStorage.setItem(DM_KEY, JSON.stringify(conversations));
}

function setMessage(text, isError = false) {
  messageBox.textContent = text;
  messageBox.classList.toggle('error', isError);
}

function setComposerFeedback(text, isError = false) {
  composerFeedback.textContent = text;
  composerFeedback.classList.toggle('error', isError);
}

function setProfileFeedback(text, isError = false) {
  profileFeedback.textContent = text;
  profileFeedback.classList.toggle('error', isError);
}

function sanitizeInput(value) {
  return String(value || '').replace(/[<>"'`]/g, '').trim();
}

function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password should include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password should include a number.';
  return '';
}

function setMode(nextMode) {
  mode = nextMode;
  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === nextMode);
  });
  emailField.classList.toggle('hidden', nextMode !== 'register');
  emailInput.required = nextMode === 'register';
  submitBtn.textContent = nextMode === 'register' ? 'Create Account' : 'Login';
  setMessage('');
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

function generateVerificationChallenge() {
  const first = Math.floor(Math.random() * 9) + 1;
  const second = Math.floor(Math.random() * 9) + 1;
  const operation = Math.random() > 0.5 ? '+' : '-';
  let answer = 0;
  if (operation === '+') {
    answer = first + second;
  } else {
    answer = first - second;
  }
  verificationState.answer = answer;
  verificationQuestion.textContent = `Solve this to continue: ${first} ${operation} ${second} = ?`;
  verificationAnswerInput.value = '';
}

function showVerificationChallenge() {
  verificationCard.classList.remove('hidden');
  generateVerificationChallenge();
}

function updatePrivacyUi(user) {
  const privacyMode = Boolean(user?.privacyMode);
  privacyBadge.textContent = privacyMode ? 'Private mode on' : 'Private mode off';
  privacyStatus.textContent = privacyMode ? 'Private' : 'Open';
  privacyToggle.checked = privacyMode;
  verificationStatusText.textContent = user?.verified ? 'Your account is verified and ready.' : 'Verification keeps this space protected.';
  presenceChip.textContent = privacyMode ? '● Hidden' : '● Online';
}

function showPage(page) {
  activePage = page;
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.page === page));
  document.querySelectorAll('.page-panel').forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== `${page}-page`);
  });
  if (page === 'messages') {
    renderMessages();
  }
  if (page === 'settings') {
    updatePrivacyUi(loadSession());
  }
}

function showApp(user) {
  authCard.classList.add('hidden');
  appShell.classList.remove('hidden');
  const displayName = user.displayName || user.username;
  const handle = user.handle || user.username.toLowerCase().replace(/\s+/g, '_');
  const avatar = user.avatar || displayName.charAt(0).toUpperCase();
  appUserName.textContent = displayName;
  sidebarUser.textContent = displayName;
  sidebarHandle.textContent = handle;
  document.getElementById('avatar-badge').textContent = avatar;
  profileBioPreview.textContent = user.bio || 'A calm voice shaping a private social space.';
  statFollowers.textContent = user.followers ?? 0;
  statFollowing.textContent = user.following ?? 0;
  statPosts.textContent = user.posts ?? 0;
  profileDisplayName.value = displayName;
  profileHandleInput.value = handle;
  profileBio.value = user.bio || '';
  profileAvatar.value = avatar;
  updatePrivacyUi(user);
  renderPosts();
  renderExplore();
  showPage(activePage || 'home');
}

function showAuth() {
  appShell.classList.add('hidden');
  authCard.classList.remove('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
  emailInput.value = '';
  verificationCard.classList.add('hidden');
  setComposerFeedback('');
  verificationState.pendingAction = null;
  verificationState.isVerified = false;
}

function renderPosts() {
  const posts = getPosts();
  postsList.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-header">
            <div class="post-user">
              <div class="avatar alt">${post.author.charAt(0).toUpperCase()}</div>
              <div>
                <strong>${post.author}</strong>
                <div class="post-meta">@${post.handle} · ${post.time}</div>
              </div>
            </div>
          </div>
          <p class="post-text">${post.text}</p>
          <div class="post-actions">
            <button class="like-btn ${post.liked ? 'active' : ''}" data-id="${post.id}" type="button">♡ ${post.likes}</button>
            <button class="like-btn" type="button">💬 ${post.comments}</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderExplore() {
  const users = getUsers().filter((user) => user.username !== 'nova');
  exploreList.innerHTML = users
    .map(
      (user) => `
        <div class="explore-item">
          <div class="explore-meta">
            <div class="avatar alt">${user.avatar || user.username.charAt(0).toUpperCase()}</div>
            <div>
              <strong>${user.displayName || user.username}</strong>
              <div class="post-meta">@${user.handle}</div>
            </div>
          </div>
          <button class="ghost-btn" type="button">Follow</button>
        </div>
      `
    )
    .join('');
}

function renderMessages() {
  const conversations = getConversations();
  if (!selectedConversationId && conversations.length) {
    selectedConversationId = conversations[0].id;
  }
  conversationList.innerHTML = conversations
    .map(
      (conversation) => `
        <button class="conversation-item ${conversation.id === selectedConversationId ? 'active' : ''}" data-conversation-id="${conversation.id}" type="button">
          <strong>${conversation.participant}</strong>
          <div class="post-meta">${conversation.messages[conversation.messages.length - 1]?.text || 'No messages yet'}</div>
        </button>
      `
    )
    .join('');

  const activeConversation = conversations.find((conversation) => conversation.id === selectedConversationId) || conversations[0];
  if (!activeConversation) {
    messageThread.innerHTML = '<p class="post-meta">No conversation selected.</p>';
    return;
  }

  threadName.textContent = activeConversation.participant;
  threadHandle.textContent = `@${activeConversation.handle}`;
  threadStatus.textContent = activeConversation.isOnline ? '● Online' : '● Away';
  messageThread.innerHTML = activeConversation.messages
    .map((message) => `<div class="message-bubble ${message.sender === 'me' ? 'me' : 'them'}">${message.text}</div>`)
    .join('');
  messageThread.scrollTop = messageThread.scrollHeight;
}

function toggleLike(postId) {
  const posts = getPosts();
  const target = posts.find((post) => post.id === postId);
  if (!target) return;

  target.liked = !target.liked;
  target.likes += target.liked ? 1 : -1;
  savePosts(posts);
  renderPosts();
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const username = sanitizeInput(usernameInput.value);
  const email = sanitizeInput(emailInput.value);
  const password = passwordInput.value;

  if (!username || !password) {
    setMessage('Please fill in the required fields.', true);
    return;
  }

  if (username.length < 3) {
    setMessage('Username must be at least 3 characters.', true);
    return;
  }

  const users = getUsers();

  if (mode === 'register') {
    if (!email) {
      setMessage('Please enter an email address.', true);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError, true);
      return;
    }

    const exists = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase() || user.email?.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      setMessage('That username or email is already registered.', true);
      return;
    }

    if (!verificationState.isVerified) {
      verificationState.pendingAction = 'auth';
      showVerificationChallenge();
      setMessage('Complete the verification challenge to create an account.', true);
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password: encodePassword(password),
      displayName: username,
      handle: username.toLowerCase().replace(/\s+/g, '_'),
      bio: 'Fresh voice on Fluxy',
      avatar: username.charAt(0).toUpperCase(),
      joinedAt: new Date().toISOString(),
      followers: 0,
      following: 0,
      posts: 0,
      verified: true,
      privacyMode: false
    };
    users.push(newUser);
    saveUsers(users);
    saveSession(newUser);
    setMessage('Account created successfully.');
    showApp(newUser);
  } else {
    const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
    if (!user || user.password !== encodePassword(password)) {
      setMessage('Invalid username or password.', true);
      return;
    }

    if (!user.verified && !verificationState.isVerified) {
      verificationState.pendingAction = 'auth';
      showVerificationChallenge();
      setMessage('Complete the verification challenge to continue.', true);
      return;
    }

    saveSession(user);
    setMessage('Login successful.');
    showApp(user);
  }
}

function handleCreatePost() {
  const sessionUser = loadSession();
  if (!sessionUser) return;

  const text = sanitizeInput(postText.value);
  if (!text) {
    setComposerFeedback('Write a thought before publishing.', true);
    return;
  }

  const posts = getPosts();
  posts.unshift({
    id: `${Date.now()}`,
    author: sessionUser.displayName || sessionUser.username,
    handle: sessionUser.handle || sessionUser.username.toLowerCase().replace(/\s+/g, '_'),
    time: 'just now',
    text,
    likes: 0,
    comments: 0,
    liked: false
  });

  const users = getUsers();
  const currentUser = users.find((user) => user.id === sessionUser.id);
  if (currentUser) {
    currentUser.posts = (currentUser.posts || 0) + 1;
    saveUsers(users);
  }

  savePosts(posts);
  postText.value = '';
  renderPosts();
  setComposerFeedback('Published to your Fluxy feed.');
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const sessionUser = loadSession();
  if (!sessionUser) return;

  const displayName = sanitizeInput(profileDisplayName.value) || sessionUser.username;
  const handle = sanitizeInput(profileHandleInput.value).replace(/\s+/g, '_').toLowerCase() || sessionUser.username.toLowerCase().replace(/\s+/g, '_');
  const bio = sanitizeInput(profileBio.value);
  const avatar = sanitizeInput(profileAvatar.value).slice(0, 2).toUpperCase() || (displayName.charAt(0) || 'F').toUpperCase();

  const users = getUsers();
  const currentUser = users.find((user) => user.id === sessionUser.id);
  if (!currentUser) return;

  currentUser.displayName = displayName;
  currentUser.handle = handle;
  currentUser.bio = bio;
  currentUser.avatar = avatar;
  currentUser.posts = currentUser.posts ?? 0;
  currentUser.followers = currentUser.followers ?? 0;
  currentUser.following = currentUser.following ?? 0;
  saveUsers(users);

  const updatedSessionUser = { ...sessionUser, displayName, handle, bio, avatar };
  saveSession(updatedSessionUser);
  showApp(updatedSessionUser);
  setProfileFeedback('Profile updated.');
}

function handlePrivacyToggle(event) {
  const sessionUser = loadSession();
  if (!sessionUser) return;
  const privacyMode = event.target.checked;
  const users = getUsers();
  const currentUser = users.find((user) => user.id === sessionUser.id);
  if (!currentUser) return;
  currentUser.privacyMode = privacyMode;
  saveUsers(users);
  const updatedSessionUser = { ...sessionUser, privacyMode };
  saveSession(updatedSessionUser);
  updatePrivacyUi(updatedSessionUser);
}

function handleVerificationSubmit() {
  const providedAnswer = Number(verificationAnswerInput.value);
  if (providedAnswer === verificationState.answer) {
    verificationState.isVerified = true;
    verificationCard.classList.add('hidden');
    setMessage('');
    if (verificationState.pendingAction === 'auth') {
      handleAuthSubmit({ preventDefault() {} });
    }
    verificationState.pendingAction = null;
  } else {
    setMessage('That verification answer was incorrect. Try again.', true);
    generateVerificationChallenge();
  }
}

function handleDmSubmit(event) {
  event.preventDefault();
  const text = sanitizeInput(dmInput.value);
  if (!text || !selectedConversationId) return;
  const conversations = getConversations();
  const currentConversation = conversations.find((conversation) => conversation.id === selectedConversationId);
  if (!currentConversation) return;
  currentConversation.messages.push({ sender: 'me', text, time: 'Now' });
  saveConversations(conversations);
  dmInput.value = '';
  renderMessages();
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode));
});

navItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    showPage(item.dataset.page);
  });
});

authForm.addEventListener('submit', handleAuthSubmit);
verifyBtn.addEventListener('click', handleVerificationSubmit);
profileForm.addEventListener('submit', handleProfileSubmit);
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem(SESSION_KEY);
  showAuth();
  setMode('login');
  setMessage('You have been logged out.');
});

postBtn.addEventListener('click', handleCreatePost);
postText.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    handleCreatePost();
  }
});

postsList.addEventListener('click', (event) => {
  const button = event.target.closest('.like-btn[data-id]');
  if (button) {
    toggleLike(button.dataset.id);
  }
});

exploreList.addEventListener('click', (event) => {
  const button = event.target.closest('.ghost-btn');
  if (button) {
    button.textContent = 'Following';
    button.disabled = true;
  }
});

conversationList.addEventListener('click', (event) => {
  const button = event.target.closest('.conversation-item');
  if (button) {
    selectedConversationId = button.dataset.conversationId;
    renderMessages();
  }
});

dmForm.addEventListener('submit', handleDmSubmit);
privacyToggle.addEventListener('change', handlePrivacyToggle);

const sessionUser = loadSession();
if (sessionUser) {
  showApp(sessionUser);
} else {
  showAuth();
  setMode('login');
  generateVerificationChallenge();
}
