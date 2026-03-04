import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  MoreHorizontal, 
  Mail, 
  MessageCircle, 
  Repeat2, 
  Heart, 
  BarChart2, 
  Share, 
  Bookmark,
  Search,
  Home,
  Bell,
  User,
  CircleEllipsis,
  X,
} from 'lucide-react';

const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#1d9bf0] fill-current inline-block ml-1">
    <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.01s-2.62-1.27-4.01-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.98-.2-4.02.81s-1.27 2.62-.81 4.01c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.01s2.62 1.27 4.01.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.98.2 4.02-.81s1.27-2.62.81-4.01c1.31-.67 2.19-3.34 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.35-6.2 6.78z"></path></g>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [replyModalPost, setReplyModalPost] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const profileData = {
    displayName: "Anatoly | CoinVision",
    username: "novaxalpha",
    followers: "726K",
    following: "56",
    joined: "March 2021",
    location: "Global",
    bio: "Institutional Alpha. Market psychology. Web3 insights. Building in silence. Bullish on the future of decentralized finance.",
    bannerUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    avatarUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=200"
  };

  const cryptoPhrases = [
    "Bitcoin is the only life raft in a sea of fiat inflation.",
    "Solana's performance metrics are making it impossible for institutional funds to ignore.",
    "The rotation from ETH to Alts is beginning. Watch the dominance chart closely.",
    "L2s are cannibalizing mainnet liquidity. This is a feature, not a bug.",
    "Market psychology: Most people buy the top because of FOMO and sell the bottom because of fear.",
    "RWA (Real World Assets) will be the trillion-dollar narrative of 2026.",
    "The 4-year cycle is still very much alive, just slightly front-run this time.",
    "AI + Blockchain is the most powerful technology stack ever created.",
    "Your seed phrase is your private key to freedom. Protect it at all costs."
  ];

  const images = [
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1611974714024-4607a50d6c2a?auto=format&fit=crop&q=80&w=800"
  ];

  const generatePosts = (count, startIndex) => {
    return Array.from({ length: count }).map((_, i) => {
      const id = startIndex + i;
      const phrase = cryptoPhrases[Math.floor(Math.random() * cryptoPhrases.length)];
      const hasImage = Math.random() > 0.7;
      const imageUrl = hasImage ? images[Math.floor(Math.random() * images.length)] : null;
      
      return {
        id,
        content: phrase,
        image: imageUrl,
        timestamp: `${Math.floor(Math.random() * 23) + 1}h`,
        replies: Math.floor(Math.random() * 500),
        reposts: (Math.random() * 5).toFixed(1) + 'K',
        likes: (Math.random() * 20).toFixed(1) + 'K',
        views: (Math.random() * 900).toFixed(1) + 'K'
      };
    });
  };

  useEffect(() => {
    setPosts(generatePosts(15, 0));
  }, []);

  const lastPostElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsLoading(true);
        setTimeout(() => {
          setPosts(prev => [...prev, ...generatePosts(10, prev.length)]);
          setIsLoading(false);
        }, 800);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, posts.length]);

  const toggleLike = (postId) => setLikes(prev => ({ ...prev, [postId]: !prev[postId] }));
  const toggleBookmark = (postId) => setBookmarks(prev => ({ ...prev, [postId]: !prev[postId] }));

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#1d9bf0]/30">
      <div className="max-w-[1300px] mx-auto flex justify-center">
        
        {/* Navigation Sidebar */}
        <nav className="hidden sm:flex flex-col items-end xl:items-start w-20 xl:w-[275px] sticky top-0 h-screen p-2 border-r border-gray-800">
          <div className="p-3 hover:bg-white/10 rounded-full cursor-pointer transition-colors mb-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
              <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
            </svg>
          </div>
          {[
            { icon: Home, label: "Home" },
            { icon: Search, label: "Explore" },
            { icon: Bell, label: "Notifications" },
            { icon: Mail, label: "Messages" },
            { icon: User, label: "Profile", active: true },
            { icon: CircleEllipsis, label: "More" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-full cursor-pointer transition-colors w-max xl:pr-6">
              <item.icon className={`w-7 h-7 ${item.active ? 'stroke-[2.5px]' : ''}`} />
              <span className={`hidden xl:block text-xl ${item.active ? 'font-bold' : ''}`}>{item.label}</span>
            </div>
          ))}
          <button className="bg-[#1d9bf0] mt-4 w-full py-3 rounded-full font-bold text-lg hidden xl:block hover:bg-[#1a8cd8] transition-all">Post</button>
        </nav>

        {/* Main Feed */}
        <main className="flex-1 max-w-[600px] min-h-screen border-r border-gray-800 relative">
          <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md flex items-center px-4 h-14 gap-8">
            <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center leading-tight">
                {profileData.displayName} <VerifiedBadge />
              </h2>
              <span className="text-xs text-[#71767b]">14.2K posts</span>
            </div>
          </div>

          <div className="h-48 w-full bg-[#333639] relative">
            <img src={profileData.bannerUrl} className="w-full h-full object-cover" alt="banner" />
          </div>

          <div className="px-4 pb-4">
            <div className="flex justify-between items-start">
              <div className="w-[22%] aspect-square -mt-[11%] rounded-full border-4 border-black overflow-hidden bg-black z-10 shadow-xl">
                <img src={profileData.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="p-2 border border-gray-600 rounded-full hover:bg-white/10 cursor-pointer">
                  <MoreHorizontal className="w-5 h-5" />
                </div>
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 rounded-full font-bold transition-all text-sm h-9 min-w-[105px]
                    ${isFollowing ? 'bg-black text-white border border-gray-600 hover:border-red-600 hover:text-red-600' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h1 className="text-[20px] font-extrabold flex items-center">{profileData.displayName} <VerifiedBadge /></h1>
              <p className="text-[#71767b]">@{profileData.username}</p>
            </div>

            <p className="mt-3 text-[15px] text-white leading-relaxed">{profileData.bio}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[#71767b] text-[14px]">
              <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profileData.location}</div>
              <div className="flex items-center gap-1 text-[#1d9bf0] hover:underline cursor-pointer"><LinkIcon className="w-4 h-4" /> novax.alpha</div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {profileData.joined}</div>
            </div>

            <div className="flex gap-4 mt-3 text-[14px]">
              <div className="hover:underline cursor-pointer"><span className="font-bold text-white">{profileData.following}</span><span className="text-[#71767b] ml-1">Following</span></div>
              <div className="hover:underline cursor-pointer"><span className="font-bold text-white">{profileData.followers}</span><span className="text-[#71767b] ml-1">Followers</span></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 sticky top-14 bg-black/80 backdrop-blur-md z-20">
            {['Posts', 'Replies', 'Highlights', 'Media', 'Likes'].map((tab) => (
              <div key={tab} onClick={() => setActiveTab(tab)} className="flex-1 flex justify-center hover:bg-white/10 cursor-pointer relative h-14 items-center">
                <span className={`text-[15px] ${activeTab === tab ? 'font-bold text-white' : 'font-medium text-[#71767b]'}`}>{tab}</span>
                {activeTab === tab && <div className="absolute bottom-0 w-[56px] h-[4px] bg-[#1d9bf0] rounded-full" />}
              </div>
            ))}
          </div>

          {/* Post Content */}
          <div className="pb-32">
            {activeTab === 'Posts' ? (
              posts.map((post, index) => (
                <article 
                  ref={posts.length === index + 1 ? lastPostElementRef : null}
                  key={post.id} 
                  className="p-4 border-b border-gray-800 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    <img src={profileData.avatarUrl} className="w-10 h-10 rounded-full" alt="avatar" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="font-bold hover:underline">Anatoly | CoinVision</span>
                          <VerifiedBadge />
                          <span className="text-[#71767b]">@{profileData.username} · {post.timestamp}</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
                      </div>
                      <p className="text-[15px] mt-1 text-white leading-normal">{post.content}</p>
                      {post.image && (
                        <div className="mt-3 rounded-2xl border border-gray-800 overflow-hidden bg-gray-900">
                          <img src={post.image} className="w-full h-auto object-cover max-h-[510px]" alt="post" />
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3 text-[#71767b] max-w-md">
                        <div className="flex items-center gap-2 hover:text-[#1d9bf0]" onClick={(e) => { e.stopPropagation(); setReplyModalPost(post); }}>
                          <MessageCircle className="w-[18px] h-[18px]" /> {post.replies}
                        </div>
                        <div className="flex items-center gap-2 hover:text-[#00ba7c]"><Repeat2 className="w-[18px] h-[18px]" /> {post.reposts}</div>
                        <div className={`flex items-center gap-2 ${likes[post.id] ? 'text-[#f91880]' : 'hover:text-[#f91880]'}`} onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}>
                          <Heart className={`w-[18px] h-[18px] ${likes[post.id] ? 'fill-current' : ''}`} /> {post.likes}
                        </div>
                        <div className="flex items-center gap-2 hover:text-[#1d9bf0]"><BarChart2 className="w-[18px] h-[18px]" /> {post.views}</div>
                        <div className="flex items-center gap-1">
                           <div className={`p-2 rounded-full hover:bg-[#1d9bf0]/10 ${bookmarks[post.id] ? 'text-[#1d9bf0]' : ''}`} onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}>
                             <Bookmark className={`w-[18px] h-[18px] ${bookmarks[post.id] ? 'fill-current' : ''}`} />
                           </div>
                           <div className="p-2 rounded-full hover:bg-[#1d9bf0]/10"><Share className="w-[18px] h-[18px]" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-12 text-center text-[#71767b]">No content available in this tab.</div>
            )}
          </div>
        </main>

        {/* Widgets */}
        <aside className="hidden lg:block w-[350px] p-4 space-y-4">
          <div className="bg-[#16181c] rounded-2xl overflow-hidden p-4">
            <h3 className="text-xl font-bold mb-4">What's happening</h3>
            {['#Bitcoin100K', 'Solana Alpenglow', 'BlackRock ETF'].map(trend => (
              <div key={trend} className="py-3 hover:bg-white/5 cursor-pointer -mx-4 px-4 transition-colors">
                <span className="text-xs text-[#71767b]">Trending in Crypto</span>
                <div className="font-bold">{trend}</div>
                <div className="text-xs text-[#71767b]">50.4K posts</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Reply Modal Overlay */}
        {replyModalPost && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-gray-500/20 backdrop-blur-sm" onClick={() => setReplyModalPost(null)}>
            <div className="bg-black w-full max-w-[600px] rounded-2xl p-4 border border-gray-800 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setReplyModalPost(null)}><X className="w-5 h-5" /></button>
                <button className="bg-[#1d9bf0] text-white px-4 py-1.5 rounded-full font-bold">Post</button>
              </div>
              <div className="flex gap-3 mb-4">
                <img src={profileData.avatarUrl} className="w-10 h-10 rounded-full" alt="avatar" />
                <textarea 
                  autoFocus 
                  placeholder="Post your reply" 
                  className="bg-transparent flex-1 text-xl outline-none resize-none min-h-[120px]"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

