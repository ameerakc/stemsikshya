# VibeChat - Complete Project Documentation

> Real-time encrypted chat application. Django + Channels + PostgreSQL + Redis backend, React + Vite frontend.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Data Models](#data-models)
6. [API Endpoints](#api-endpoints)
7. [WebSocket Protocol](#websocket-protocol)
8. [Authentication & Security](#authentication--security)
9. [Realtime System](#realtime-system)
10. [Client Caching Strategy](#client-caching-strategy)
11. [Design System](#design-system)
12. [Key Design Decisions](#key-design-decisions)
13. [Bugs Fixed](#bugs-fixed)

---

## Tech Stack

### Backend
- **Framework:** Django 5.2 (ASGI via Daphne)
- **Database:** PostgreSQL (psycopg2-binary)
- **Cache / Channel Layer / Broker:** Redis (3 logical DBs on one instance)
- **Auth:** JWT (SimpleJWT) + Google OAuth (django-allauth)
- **Realtime:** Django Channels (WebSocket)
- **Task Queue:** Celery (Redis broker)
- **Media:** Cloudinary or local disk (switchable via `MEDIA_BACKEND`)
- **Encryption:** Fernet (cryptography) with key rotation via MultiFernet
- **OTP:** TOTP (pyotp) for password reset

### Frontend
- **Framework:** React 19 + React Router 7 (BrowserRouter)
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (custom design tokens in CSS)
- **State / Cache:** React Query (TanStack Query) + localStorage persistence
- **HTTP:** Axios with interceptors
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Font:** Inter Variable (self-hosted via @fontsource-variable/inter)
- **Testing:** Vitest + Testing Library (jsdom)

---

## Project Structure

```
VibeChat/
├── Backend/
│   ├── .env.example
│   ├── requirements.txt
│   └── System/                      # Django project root
│       ├── manage.py
│       ├── System/                  # Project settings
│       │   ├── __init__.py          # Exports celery_app
│       │   ├── settings.py
│       │   ├── urls.py
│       │   ├── asgi.py
│       │   ├── wsgi.py
│       │   └── celery.py
│       ├── authentication/          # Auth app
│       │   ├── models.py            # User, PasswordResetOtp
│       │   ├── serializers.py
│       │   ├── urls.py
│       │   ├── tasks.py             # Celery: send_otp_email_task
│       │   ├── view/                # Split by concern
│       │   │   ├── login_views.py
│       │   │   ├── registration_view.py
│       │   │   ├── otp_password_views.py
│       │   │   ├── token_views.py
│       │   │   ├── social_views.py
│       │   │   ├── user_logout_views.py
│       │   │   └── user_profile_views.py
│       │   ├── services/            # Business logic
│       │   │   ├── login_services.py
│       │   │   ├── registration_service.py
│       │   │   ├── otp_password_services.py
│       │   │   ├── token_service.py
│       │   │   └── user_logout_services.py
│       │   └── utils/
│       │       └── set_refiresh.py  # HttpOnly cookie helper
│       ├── chatapp/                 # Chat & social app
│       │   ├── models.py            # Profile, FriendRequest, ChatRoom, Message, BlockedUser
│       │   ├── serializer.py
│       │   ├── urls.py
│       │   ├── consumers.py         # WebSocket consumers
│       │   ├── routing.py           # WS URL patterns
│       │   ├── middleware.py        # JWT WebSocket auth
│       │   ├── realtime.py          # Event bus (single source of truth)
│       │   ├── presence.py          # Connection-counting presence
│       │   ├── cache_utils.py       # Safe Redis wrappers
│       │   ├── storage.py           # Media backend switch
│       │   ├── checks.py            # Startup warnings
│       │   ├── exceptions.py        # Custom error handler
│       │   ├── pagination.py        # Standard + cursor pagination
│       │   ├── signals.py           # Profile creation, login/logout
│       │   ├── view/                # Split by concern
│       │   │   ├── mixins.py
│       │   │   ├── attachment_views.py
│       │   │   ├── block_views.py
│       │   │   ├── chatroom_views.py
│       │   │   ├── friend_views.py
│       │   │   ├── friend_update_views.py
│       │   │   ├── friendrequest_views.py
│       │   │   ├── message_list_view.py
│       │   │   ├── online_user_views.py
│       │   │   ├── profile_views.py
│       │   │   ├── profile_update.py
│       │   │   ├── user_detail_views.py
│       │   │   ├── user_search_view.py
│       │   │   └── user_status_view.py
│       │   ├── services/            # Business logic
│       │   │   ├── attachment_services.py
│       │   │   ├── block_service.py
│       │   │   ├── blocking.py
│       │   │   ├── chat_services.py
│       │   │   ├── conversation_services.py
│       │   │   ├── friend_services.py
│       │   │   ├── friend_update_service.py
│       │   │   ├── friendrequest_service.py
│       │   │   ├── message_view_services.py
│       │   │   ├── online_user_services.py
│       │   │   ├── profile_services.py
│       │   │   ├── user_search_services.py
│       │   │   └── user_status_services.py
│       │   ├── utils/
│       │   │   └── encryption.py    # Fernet encrypt/decrypt
│       │   └── tests.py
│       └── media/                   # Local uploads
│           ├── avatars/
│           ├── attachments/
│           └── images/
└── Frontend/
    ├── chat/
        ├── index.html
        ├── vite.config.js
        ├── eslint.config.js
        ├── .env.example
        └── src/
            ├── main.jsx             # Provider tree root
            ├── App.jsx              # Route definitions (lazy-loaded)
            ├── config.js            # Runtime config from VITE_* env vars
            ├── index.css            # Design tokens, glass utilities, animations
            ├── api/
            │   ├── client.js        # Axios instance, token management, refresh logic
            │   ├── endpoints.js     # All backend routes in one place
            │   └── index.js         # Typed wrappers (authApi, chatApi, peopleApi, etc.)
            ├── auth/
            │   ├── AuthProvider.jsx  # Session state, bootstrap, login/logout
            │   └── ProtectedRoute.jsx # Route guards (Protected, PublicOnly, Landing)
            ├── realtime/
            │   ├── socket.js        # ChatSocket class (reconnect, heartbeat, queue)
            │   └── RealtimeProvider.jsx # Bridges WebSocket to React Query cache
            ├── lib/
            │   ├── queryClient.js   # QueryClient + localStorage persister
            │   ├── queryKeys.js     # Hierarchical query key factory
            │   ├── cacheUpdates.js  # Direct cache writes from realtime events
            │   ├── utils.js         # cn, initials, accentFor, date formatters, etc.
            │   └── people.js        # Stale-while-revalidate person directory
            ├── hooks/
            │   ├── useChat.js       # Conversations, messages, send, upload, markRead
            │   ├── useSocial.js     # Friends, requests, people, profiles, blocking
            │   └── ui.js            # Debounce, media query, theme, intersection, etc.
            ├── components/
            │   ├── ui.jsx           # Reusable primitives (Button, Input, Avatar, Badge, etc.)
            │   ├── Toaster.jsx      # Toast notification system
            │   ├── ThemeToggle.jsx  # Dark/light toggle
            │   ├── ConfirmDialog.jsx # Confirmation modals
            │   ├── FullScreenLoader.jsx # Splash/loading screen
            │   ├── Navbar.jsx
            │   ├── Hero.jsx, Features.jsx, Demo.jsx, Footer.jsx  # Landing page
            │   ├── GoogleButton.jsx
            │   ├── layout/
            │   │   ├── AppShell.jsx   # Main authenticated layout (rail + sidebar + main)
            │   │   └── AuthLayout.jsx # Split auth screens (poster + form)
            │   ├── chat/
            │   │   ├── ConversationList.jsx
            │   │   ├── ChatHeader.jsx
            │   │   ├── MessageList.jsx
            │   │   ├── MessageComposer.jsx
            │   │   ├── MessageBubble.jsx
            │   │   └── ImageLightbox.jsx
            │   ├── people/
            │   │   ├── PeoplePanel.jsx
            │   │   ├── PersonRow.jsx
            │   │   ├── ProfileModal.jsx
            │   │   └── NewGroupModal.jsx
            │   └── landing/
            │       └── ChatPreview.jsx
            ├── pages/
            │   ├── Landing.jsx, Login.jsx, Register.jsx, ForgotPassword.jsx
            │   ├── SocialCallback.jsx
            │   ├── ChatWelcome.jsx, ChatRoom.jsx
            │   ├── Settings.jsx
            │   └── NotFound.jsx
            └── test/
                ├── setup.js, TestRoot.jsx
                ├── config.test.js, designSystem.test.js
                ├── authProvider.test.jsx, app.test.jsx
                └── (tests use StrictMode to catch bootstrap races)
```

---

## Backend Architecture

### ASGI Protocol Routing
```
ProtocolTypeRouter:
  http  → Django ASGI app (REST API + admin)
  websocket → JWTAuthMiddleware → URLRouter(websocket_urlpatterns)
```

### Redis Layout (single instance, 3 logical DBs)
```
DB 0: Django Channels (channel layer)
DB 1: Django Cache (presence, rate limits, block cache)
DB 2: Celery (broker + results)
```

All three derive from a single `REDIS_URL`. Multiple workers share the cache and channel layer via Redis, which is what makes horizontal scaling correct.

### Service Layer Pattern
Views are thin dispatchers. Business logic lives in `services/` modules. A unified `realtime.py` event bus ensures HTTP views and WebSocket consumers publish identical event payloads.

### Startup Checks (`chatapp/checks.py`)
- **W001:** `CONN_MAX_AGE > 0` without `DB_BEHIND_POOLER` (connection exhaustion under ASGI)
- **W002:** No Fernet encryption key configured
- **W003:** `CACHE_BACKEND=locmem` (per-process, breaks presence/OTP)
- **W004:** `CHANNEL_LAYER_BACKEND=inmemory` (per-process, breaks realtime)
- **W005:** Google OAuth half-configured
- **I001:** Google sign-in enabled (reports redirect URI)

---

## Frontend Architecture

### Provider Tree (order matters)
```
StrictMode
  BrowserRouter
    PersistQueryClientProvider     ← React Query + localStorage persist
      ToastProvider                ← Toaster context
        ConfirmProvider            ← Confirmation dialog context
          AuthProvider             ← Session state, JWT bootstrap
            RealtimeProvider       ← WebSocket, bridges events to cache
              App                  ← Routes (lazy-loaded)
```

### Route Structure
| Path | Guard | Component |
|------|-------|-----------|
| `/` | LandingRoute (redirects if authenticated) | Landing |
| `/login` | PublicOnlyRoute | Login |
| `/register` | PublicOnlyRoute | Register |
| `/forgot-password` | PublicOnlyRoute | ForgotPassword |
| `/auth/social/callback` | None | SocialCallback |
| `/app` | ProtectedRoute | AppShell → ChatWelcome |
| `/app/c/:roomId` | ProtectedRoute | AppShell → ChatRoom |
| `/app/settings` | ProtectedRoute | Settings |
| `*` | None | NotFound |

### Lazy Loading
Every page and the AppShell are lazy-loaded. First-time visitors download only the landing page; the chat shell arrives on sign-in.

---

## Data Models

### `User` (extends AbstractBaseUser)
| Field | Type | Notes |
|-------|------|-------|
| `email` | EmailField(255) | unique, USERNAME_FIELD |
| `name` | CharField(200) | REQUIRED_FIELDS |
| `is_active` | BooleanField | default=True |
| `is_admin` | BooleanField | default=False |
| `is_superuser` | BooleanField | default=False |
| `created_at` | DateTimeField | auto_now_add |
| `updated_at` | DateTimeField | auto_now |

Custom manager: `UserManager` with `create_user()` / `create_superuser()`. No username column.

### `PasswordResetOtp`
| Field | Type | Notes |
|-------|------|-------|
| `user` | ForeignKey(User) | CASCADE |
| `is_used` | BooleanField | default=False |
| `otp_hash` | CharField(255) | TOTP secret (not the code itself) |
| `created_at` | DateTimeField | auto_now_add |
| `attempts` | IntegerField | default=0, MAX_ATTEMPTS=5 |

Constants: `OTP_VALIDITY_MINUTES=10`, `OTP_INTERVAL_SECONDS=600`, `OTP_VALID_WINDOW=1`. Uses `pyotp.TOTP`. On save, retires all previous unused codes for that user.

### `Profile`
| Field | Type | Notes |
|-------|------|-------|
| `user` | OneToOneField(User) | CASCADE, related_name="profile" |
| `friends` | ManyToManyField(User) | related_name="friends" |
| `is_online` | BooleanField | default=False |
| `bio` | TextField | blank, nullable |
| `photo` | ImageField | upload_to='avatars/', storage=image_storage |

Methods: `for_user(user)` (get_or_create), `add_friend(friend)` (symmetric), `remove_friend(friend)` (symmetric).

### `FriendRequest`
| Field | Type | Notes |
|-------|------|-------|
| `from_user` | ForeignKey(User) | CASCADE |
| `to_user` | ForeignKey(User) | CASCADE |
| `status` | CharField(10) | choices: pending/accepted/rejected |
| `created_at` | DateTimeField | auto_now_add |

Meta: `unique_together = ('from_user', 'to_user')`.

### `ChatRoom`
| Field | Type | Notes |
|-------|------|-------|
| `name` | CharField(255) | blank, nullable |
| `is_group` | BooleanField | default=False |
| `participants` | ManyToManyField(User) | related_name="chat_rooms" |
| `admin` | ForeignKey(User) | SET_NULL, nullable |
| `group_image` | ImageField | blank, nullable |
| `created_at` | DateTimeField | auto_now_add |

Key class methods:
- `find_private_chat(user1, user2)` — read-only lookup with Python-side participant count check (avoids Django ORM join reuse issue)
- `get_private_chat(user1, user2)` — get-or-create with atomic double-check
- `display_name_for(user)` — group name or other participant's name

### `Message`
| Field | Type | Notes |
|-------|------|-------|
| `chat_room` | ForeignKey(ChatRoom) | CASCADE |
| `sender` | ForeignKey(User) | CASCADE |
| `content` | TextField | blank (encrypted on save) |
| `attachment` | FileField | upload_to='attachments/', storage=raw_storage |
| `images` | ImageField | upload_to='images/', storage=image_storage |
| `timestamp` | DateTimeField | auto_now_add |
| `read_by` | ManyToManyField(User) | related_name="read_messages" |
| `is_read` | BooleanField | default=False |

Custom manager: `MessageQuerySet` with `with_sender()` (select_related) and `unread_for(user)`. `save()` encrypts content if not already encrypted (idempotent). `decrypted_content` property decrypts on read.

### `BlockedUser`
| Field | Type | Notes |
|-------|------|-------|
| `blocker` | ForeignKey(User) | CASCADE |
| `blocked` | ForeignKey(User) | CASCADE |
| `blocked_at` | DateTimeField | auto_now_add |

Meta: `unique_together = ('blocker', 'blocked')`. Static `blocked_ids_for(user)` returns symmetric set.

---

## API Endpoints

### Authentication (`/api/`)
| Method | Path | View | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/register/` | UserRegistrationView | AllowAny, throttle=auth | Register, returns access token + refresh cookie |
| POST | `/login/` | UserLoginView | AllowAny, throttle=auth | Email/password login |
| POST | `/logout/` | UserLogoutView | IsAuthenticated | Blacklist refresh token, clear presence |
| POST | `/refresh-token/` | RefreshTokenView | AllowAny | Rotate refresh, return new access token |
| GET | `/profile/` | UserProfileView | IsAuthenticated | Current user's account basics |
| POST | `/auth/session-token/` | SessionTokenExchangeView | SessionAuth + IsAuthenticated | Exchange allauth session for JWT |
| POST | `/password/forgot/` | ForgotPasswordView | AllowAny, throttle=otp | Send TOTP email |
| POST | `/password/verify-otp/` | VerifyOTPView | AllowAny, throttle=otp | Verify OTP (peek, no consume) |
| POST | `/password/reset/` | ResetPasswordView | AllowAny, throttle=otp | Verify OTP + set new password, revoke sessions |
| POST | `/password/change/` | ChangePasswordView | IsAuthenticated | Change password (old + new) |

### Chat & Social (`/api/`)
| Method | Path | View | Description |
|--------|------|------|-------------|
| GET | `/chatrooms/` | ConversationListView | Sidebar: rooms by activity, unread counts |
| POST | `/chatrooms/create/` | ChatRoomCreateView | Create/open private or group (idempotent) |
| GET | `/chatrooms/unread-count/` | UnreadCountView | Total unread across all conversations |
| GET | `/message-list/<room_id>/` | MessageListView | Cursor-paginated message history (decrypted) |
| POST | `/chat/<room_id>/messages/` | AttachmentView | Upload message with image/file |
| GET | `/friends/` | FriendListView | List friends with search |
| DELETE | `/friends/<user_id>/` | FriendDetailView | Remove friend (symmetric) |
| GET/POST | `/friendrequests/` | FriendRequestView | List or send friend request |
| PUT | `/friendrequests/update/<id>/` | FriendRequestUpdateView | Accept or reject |
| GET | `/online-users/` | OnlineUsersView | Discoverable people |
| GET | `/users/all-status/` | AllUsersStatusView | Every account with presence, paginated |
| GET | `/user-search/` | UserSearchView | Search by name/email |
| GET | `/chat-profile/` | UserDetailView | Own profile with friend count |
| PATCH | `/chat-profile/update/` | ProfileUpdateView | Update name, bio, avatar |
| GET | `/chat-profile/<user_id>/` | ProfileAPIView | Any user's profile with relationship |
| GET | `/blocked-users/` | BlockedUserListView | List blocked users |
| POST | `/block-user/<blocked_id>/` | BlockUserView | Block a user |
| DELETE | `/unblock-user/<blocked_id>/` | UnblockUserView | Unblock a user |

---

## WebSocket Protocol

### Routes
| Pattern | Consumer | Description |
|---------|----------|-------------|
| `ws/stream/?token=<jwt>` | StreamConsumer | Multiplexed per-user (all conversations) |
| `ws/chat/<room_id>/?token=<jwt>` | ChatConsumer | Single-room (legacy) |

Token is also accepted via `Sec-WebSocket-Protocol: ["access_token", "<jwt>"]` or `Authorization: Bearer <jwt>`.

### Client → Server Events
| Type | Fields | Description |
|------|--------|-------------|
| `message.send` | `room_id, content, client_id` | Send a message |
| `message.read` | `room_id, message_ids?` | Mark messages read |
| `typing` | `room_id, is_typing` | Typing indicator |
| `room.subscribe` | `room_id` | Dynamically join a room |
| `ping` | `ts` | Application-level heartbeat |

### Server → Client Events
| Type | Key Fields | Description |
|------|-----------|-------------|
| `ready` | `user_id, rooms, blocked_ids` | Connection established |
| `message.new` | `room_id, message, client_id?` | New message |
| `message.read` | `room_id, user_id, message_ids` | Read receipt |
| `typing` | `room_id, user_id, name, is_typing` | Typing indicator |
| `presence` | `user_id, is_online` | Online/offline status |
| `conversation.new` | `room_id` | New room created |
| `friend.request` | `from_user` | Incoming friend request |
| `friend.update` | `status, by_user` | Friend request accepted/rejected |
| `block` | `blocked_id, blocked` | Block/unblock notification |
| `error` | `detail, code` | Error (including rate limiting) |
| `pong` | — | Heartbeat response |

### Rate Limiting
Sliding window: 25 messages per 10 seconds per connection. Content limit: 5000 characters.

### Close Codes
| Code | Meaning |
|------|---------|
| 4401 | Unauthenticated |
| 4403 | Forbidden |
| 4404 | Not found |
| 4405 | Blocked |

---

## Authentication & Security

### Token Strategy
- **Access token:** In memory only (never persisted). 50-minute lifetime.
- **Refresh token:** HttpOnly cookie (never exposed to JavaScript). 7-day lifetime.
- **Token rotation:** Enabled. Each refresh issues a new pair and blacklists the old refresh token.

### Session Bootstrap Flow
1. SPA loads, `AuthProvider` calls `/refresh-token/` once.
2. The refresh cookie is sent automatically; server returns a new access token.
3. If no cookie or it's expired → `status: 'anonymous'`, show login.
4. A `vibechat.session` marker in localStorage records known session state (`'1'` = signed in, `'0'` = no session, absent = unknown). Unknown always probes the server.

### Single-Flight Refresh Guard
A 401 triggers exactly one refresh no matter how many requests fail simultaneously. Without this, six concurrent queries would fire six refreshes, and with rotation enabled they'd invalidate each other.

### Cross-Tab Handling
If a refresh 401s while the marker says `'1'`, it retries once after 500ms (covers the case where another tab rotated the cookie moments earlier).

### StrictMode Bootstrap Fix
The bootstrap has **no cancellation flag**. A previous version paired a run-once ref with a cancel-on-cleanup flag: under StrictMode the effect runs, the cleanup sets `cancelled = true`, the effect re-runs and short-circuits on the ref, and the settled request is discarded — leaving the app on the splash screen forever.

### Google OAuth
Session-based login through allauth → SPA exchanges Django session for JWT at `/api/auth/session-token/` → session immediately destroyed.

### CORS
Explicit allow list (no wildcards), `CORS_ALLOW_CREDENTIALS=True`. Required for credentialed requests.

---

## Realtime System

### Connection Model
One WebSocket per signed-in user at `ws/stream/`, carrying every conversation plus presence, typing, and notifications. Alternative (socket per open conversation) multiplies connections and leaves the sidebar blind to activity.

### Presence (`chatapp/presence.py`)
- **Connection-counting:** Each WebSocket increments a per-user counter in Redis.
- **DB writes only on transitions:** 0→1 (online) and 1→0 (offline).
- **TTL:** 12 hours (survives worker restarts, expires leaked counters).
- **Multi-tab safe:** Closing one tab does NOT mark user offline.
- **Graceful degradation:** Falls back to persisted `Profile.is_online` if cache is down.

### Event Bus (`chatapp/realtime.py`)
Single source of truth for all channel-layer events. Both consumers and HTTP views publish through this, so the two paths cannot drift.

### Client-Side Socket (`socket.js` → `ChatSocket` class)
- Exponential backoff with jitter on reconnect.
- Outbound frames queue while socket is down, flush on reconnect.
- Application-level ping every 25s (detects half-open TCP).
- Token read fresh on every reconnect attempt.
- Bounded queue (max 100 messages).

### Client-Side Provider (`RealtimeProvider.jsx`)
Bridges WebSocket events to React Query cache:
- `message.new` → `upsertMessage()` + `bumpConversation()`
- `message.read` → `applyReadReceipt()`
- `typing` → typing state with self-expiring timers
- `presence` → `applyPresence()` across all cached queries
- `friend.request/update`, `block`, `conversation.new` → targeted cache invalidations
- Tab visibility / online events trigger reconnection.

---

## Client Caching Strategy

### Two Layers
1. **In-memory (React Query):** Revisiting a conversation renders instantly from cache while a background refetch confirms.
2. **Persisted (localStorage):** Same data survives a reload, painting real content immediately.

### Persisted Query Prefixes
`['me', 'conversations', 'messages', 'friends']` — volatile data like typing indicators is refetched instead.

### Direct Cache Writes (from `cacheUpdates.js`)
Realtime events and optimistic mutations patch the cache in place rather than invalidating and refetching. This is what makes the UI feel instant.

### Optimistic Sends
1. `addPendingMessage()` inserts a bubble with `client_id` and `status: 'sending'`.
2. Server echoes the `client_id` back → `upsertMessage()` swaps the optimistic row for the stored one.
3. If no echo after 15s → `markMessageFailed()` shows retry button.

### Upload Flow
Images/files go over HTTP (not WebSocket) so progress can be reported. Uses `AbortController` for cancellation. The queued attachment can be removed at any point, including mid-flight.

### Stale Person Directory (`people.js`)
A `useSyncExternalStore`-based external store that tracks the latest known name/photo for each person. Refetched sources (sidebar, profiles) write here; message rows deliberately never do (they stay immutable). Identity is resolved at render time, keeping cached message rows consistent with current avatars.

---

## Design System

### Typography
One family: **Inter Variable** (self-hosted). Four weights used: 400 (body), 500 (buttons/nav), 600 (headings/usernames), 700 (major headings). Applied globally via `index.css` with `font-family: inherit` catch-all for third-party markup.

### Color System (OKLCH)
- **Light theme:** Layered surfaces (not flat), neutrals tinted with the brand hue (258.8).
- **Dark theme:** Same token names, re-tuned values. Status colors use three-part structure (soft ground, text, border).
- **All tokens** defined as CSS custom properties, wired into Tailwind via `@theme inline`.

### Elevation
Four levels (`--elev-0` through `--elev-4`), tinted with the neutral hue instead of black.

### Glass Surfaces
Four tiers (limited to non-scrolling chrome for performance):
- `glass` — standard glass
- `glass-strong` — more opaque
- `glass-crystal` — floating chat header (translated to compositor layer)
- `glass-crystal-panel` — flush chrome (rail, sidebar)

### Icon Scale
Five named steps by role: `icon-xs` (14px), `icon-sm` (16px), `icon-md` (20px), `icon-lg` (24px), `icon-xl` (28px).

### Theme Toggle
- Stored in localStorage, defaults to OS preference.
- Scoped to authenticated area via `useScopedTheme()`.
- Cross-fade animation (180ms) on toggle.
- Public pages always dark.
- Respects `prefers-reduced-motion`.

### Chat Pane Texture
- Line grid (primary hue, blurred)
- Doodle wallpaper (SVG mask, theme-aware ink color)
- Two radial color washes
- All behind the conversation, never competing with message bubbles

---

## Key Design Decisions

1. **Single multiplexed WebSocket** instead of one per conversation — fewer connections, sidebar sees all activity.
2. **Fernet encryption at rest** with key rotation via `MultiFernet` — messages are encrypted on save, decrypted on read, never double-encrypted.
3. **Storage-backed fields** (not `CloudinaryField`) — switching media backends doesn't produce migrations.
4. **Service layer pattern** — views are thin, business logic in `services/`, unified `realtime.py` event bus.
5. **Cursor pagination** for messages — offset shifts under concurrent writes; cursors stay O(1) on the index.
6. **Block cache** (5 min, explicitly invalidated) — the check on every message send is not a DB round trip.
7. **`CONN_MAX_AGE=0`** unless behind a pooler — prevents connection exhaustion under ASGI.
8. **No comments in code** (by convention) — the code is self-documenting through naming.
9. **Provider order matters** — documented in `main.jsx`: router → query cache → toasts → confirmations → auth → realtime.
10. **Every endpoint is wired in the UI** — no dead routes.

---

## Bugs Fixed

### Critical (broke the app outright)
- Signals never registered (Profile not created for new users)
- Token refresh returned no access token
- Avatar uploads silently discarded (read-only SerializerMethodField)
- Read receipts never recorded (queryset consumed before iteration)
- `find_private_chat` matched nothing (ORM join reuse + Count)
- `useParams()` in layout route returned no `roomId`
- App hung on splash screen (StrictMode bootstrap race)
- Valid session treated as signed out (absent session marker)
- Avatars collapsed layout and overlapped text
- Invalid media account returned unhandled 500
- Uploads required working Cloudinary account
- Every avatar-less user produced a 404
- WebSocket connections failed (trailing slash mismatch)
- CORS with credentials (wildcard can't send cookies)
- Footer unrenderable (Link href instead of to)

### Data Corruption
- Messages re-encrypted on every save (double Fernet layer)
- Attachment broadcasts leaked ciphertext

### Wrong Identifiers
- Person serializers exposed Profile id as `id` instead of `user_id`

### Errors Reported as 500s
- PermissionError swallowed by bare except
- AttachmentView ignored is_valid()
- user_search returned dict on bad input
- participant_ids string measured with len()
- Cloudinary raises without cloud_name

### Security
- WebSocket auth accepted refresh tokens (UntypedToken)
- Password-reset endpoints needed explicit AllowAny
- Logout did not blacklist refresh token
- Password reset did not revoke sessions
- Password changes bypassed Django validators
- Login leaked whether email exists

### Correctness
- Presence flipped offline when any one socket closed
- Presence and blocking created chat rooms as side effect
- Blocking announced before writing DB
- OTP codes expired early (TOTP time alignment)
- Rate limiting was read-then-write (concurrent bypass)
- Accepting friend request twice added friendship twice
- Opening existing direct chat returned 400
- `CELERY_TASK_QUEUES` was a dict (unroutable)
- `DEFAULT_FILE_STORAGE` removed in Django 5
- Default avatar ids pointed at non-existent assets
- Six packages missing `__init__.py`
- `requirements.txt` omitted celery, pyotp, django-allauth
