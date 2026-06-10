"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  X,
  MessageSquare,
  Sparkles,
  Phone,
  ArrowRight,
  Volume2,
  VolumeX,
  RefreshCw,
  HelpCircle,
  ShoppingBag,
  Info,
  Bird,
  Heart,
  Star,
  Bone,
} from "lucide-react";
import { products, productWhatsappHref, site, CategoryId } from "@/lib/site-data";
import { chatbotEngine } from "@/services/chatbot-engine";

// Premium Custom Web Audio API Bird Chirp Sound
const playBirdChirp = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(900, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.12);
    
    gain1.gain.setValueAtTime(0.04, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.12);

    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(3800, ctx.currentTime + 0.1);
      
      gain2.gain.setValueAtTime(0.03, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.1);
    }, 80);
  } catch (e) {}
};

// Premium Custom Web Audio API Puppy Woof Sound
const playPuppyWoof = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Woof 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(220, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.11);
    
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.11);

    // Woof 2
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(190, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.11);
      
      gain2.gain.setValueAtTime(0.1, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.11);
    }, 130);
  } catch (e) {}
};

// Premium Custom Web Audio API Cat Meow Sound
const playCatMeow = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.28);
    
    gain.gain.setValueAtTime(0.005, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch (e) {}
};

// Premium Custom Web Audio API Hamster Squeak Sound
const playHamsterSqueak = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(4200, ctx.currentTime + 0.07);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {}
};

// Unified Router to play correct animal sounds
const playAnimalSound = (animal: string) => {
  if (animal === "puppy") playPuppyWoof();
  else if (animal === "cat") playCatMeow();
  else if (animal === "hamster") playHamsterSqueak();
  else playBirdChirp();
};

// Realistic Image-based Mascot component
function MacawMascot({ isSpeaking, size = 64, src = "/images/macaw_avatar.png" }: { isSpeaking: boolean; size?: number; src?: string }) {
  return (
    <div 
      style={{ width: size, height: size }}
      className={`relative overflow-hidden rounded-full border-2 border-white/30 bg-emerald-950/20 shadow-lg shrink-0 select-none transition-transform duration-300 hover:rotate-3 flex items-center justify-center`}
    >
      <Image
        src={src}
        alt="Exotic Pets Store Mascot"
        fill
        className={`object-cover transition-transform duration-500 ${
          isSpeaking ? "animate-pulse scale-105" : "group-hover:scale-110"
        }`}
        sizes={`${size}px`}
      />
    </div>
  );
}


interface Message {
  id: string;
  sender: "user" | "polly";
  text: string;
  timestamp: Date;
  products?: typeof products;
  actions?: Array<{ label: string; actionKey: string; isWhatsApp?: boolean }>;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bounceAlert, setBounceAlert] = useState(false);
  const [tooltipText, setTooltipText] = useState("Squawk! Chat with Polly");
  const [tooltipIcon, setTooltipIcon] = useState("bird");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [widgetAvatarSrc, setWidgetAvatarSrc] = useState("/images/macaw_avatar.png");
  const [lastDiscussedProduct, setLastDiscussedProduct] = useState<typeof products[0] | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [lastCategory, setLastCategory] = useState<CategoryId | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with greeting if empty
  useEffect(() => {
    const saved = sessionStorage.getItem("polly_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map string dates back to Date objects
        const formatted = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(formatted);
        return;
      } catch (e) {
        console.log("Failed to restore history", e);
      }
    }

    // Default initial messages
    const welcomeMessages: Message[] = [
      {
        id: "welcome-1",
        sender: "polly",
        text: "Squawk! Hello human! 🦜 I'm Polly, the talking Macaw and your feathered shopping assistant at Exotic Pets World! Chirp!",
        timestamp: new Date(),
      },
      {
        id: "welcome-2",
        sender: "polly",
        text: "I can help you fly through our catalog of exotic birds, adorable puppies, lively aquariums, premium foods (like Drools or Pedigree), or expert care tips! Squaaaawk! What are we looking for today?",
        timestamp: new Date(Date.now() + 50),
        actions: [
          { label: "Show Birds 🦜", actionKey: "show_birds" },
          { label: "Show Puppies 🐶", actionKey: "show_puppies" },
          { label: "Aquarium Fishes 🐠", actionKey: "show_aquarium" },
          { label: "Find Premium Food 🍖", actionKey: "show_food" },
          { label: "Supplements & Health 💊", actionKey: "show_supplements" },
          { label: "Delivery & Ordering 📦", actionKey: "faq_delivery" },
          { label: "WhatsApp Us 📞", actionKey: "whatsapp_direct", isWhatsApp: true },
        ],
      },
    ];
    setMessages(welcomeMessages);
  }, []);

  // Save to Session Storage
  const saveHistory = (newHistory: Message[]) => {
    sessionStorage.setItem("polly_chat_history", JSON.stringify(newHistory));
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Periodic chattering tooltip (cycles through different pets: puppy, cat, parrot, hamster when closed)
  useEffect(() => {
    if (isOpen) {
      setIsTooltipVisible(false);
      setWidgetAvatarSrc("/images/macaw_avatar.png");
      return;
    }

    const chatterList = [
      {
        text: "Squawk! Hand-tamed Blue & Gold Macaws are in stock!",
        avatar: "/images/macaw_avatar.png",
        animal: "parrot",
        icon: "bird"
      },
      {
        text: "Woof! Looking for a healthy German Shepherd or Retriever puppy?",
        avatar: "/images/puppy_avatar.png",
        animal: "puppy",
        icon: "heart"
      },
      {
        text: "Meow! Looking for premium, grain-free food for your kitty?",
        avatar: "/images/cat_avatar.png",
        animal: "cat",
        icon: "star"
      },
      {
        text: "Squeak! Cute and friendly Syrian Hamsters are ready to play!",
        avatar: "/images/hamster_avatar.png",
        animal: "hamster",
        icon: "sparkles"
      },
      {
        text: "Squawk! Buy high-protein Drools Focus puppy food!",
        avatar: "/images/macaw_avatar.png",
        animal: "parrot",
        icon: "bone"
      },
      {
        text: "Woof woof! Fully vaccinated puppies ready for forever homes!",
        avatar: "/images/puppy_avatar.png",
        animal: "puppy",
        icon: "heart"
      },
      {
        text: "Meow! Keep your cat healthy with our vet-approved recipes!",
        avatar: "/images/cat_avatar.png",
        animal: "cat",
        icon: "sparkles"
      }
    ];

    let chatterIndex = 0;

    // Initial trigger at 5 seconds, then repeat every 12 seconds
    const initialTimer = setTimeout(() => {
      triggerChatter();
    }, 5000);

    const interval = setInterval(() => {
      triggerChatter();
    }, 12000);

    function triggerChatter() {
      const chatter = chatterList[chatterIndex];
      setTooltipText(chatter.text);
      setTooltipIcon(chatter.icon);
      setWidgetAvatarSrc(chatter.avatar);
      setIsTooltipVisible(true);
      setBounceAlert(true);
      
      if (soundEnabled) {
        playAnimalSound(chatter.animal);
      }

      // Increment/cycle index
      chatterIndex = (chatterIndex + 1) % chatterList.length;

      // Hide tooltip and stop shake after 4 seconds
      setTimeout(() => {
        setIsTooltipVisible(false);
        setBounceAlert(false);
      }, 4000);
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen, soundEnabled]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveHistory(updated);
    setInputValue("");

    // Trigger Polly typing effect
    setIsTyping(true);
    if (soundEnabled) playBirdChirp();

    setTimeout(() => {
      const response = chatbotEngine.processMessage(textToSend, {
        lastDiscussedProduct,
        pendingQuestion,
        lastCategory
      });
      
      setLastDiscussedProduct(response.newContext.lastDiscussedProduct);
      setPendingQuestion(response.newContext.pendingQuestion);
      setLastCategory(response.newContext.lastCategory);
      
      const pollyMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "polly",
        text: response.text,
        timestamp: new Date(),
        products: response.products,
        actions: response.actions as any,
      };

      const finalMessages = [...updated, pollyMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);
      setIsTyping(false);
      
      if (soundEnabled) {
        setTimeout(playBirdChirp, 100);
      }
    }, 1200);
  };

  const handleActionClick = (action: any) => {
    if (action.isWhatsApp) {
      let href = site.whatsappHref;
      if (action.actionKey === "whatsapp_grooming") href = "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20book%20Grooming%20%26%20Spa.";
      else if (action.actionKey === "whatsapp_consult") href = "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Pet%20Consultation.";
      else if (action.actionKey === "whatsapp_tank_link") href = "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Tank%20Maintenance.";
      window.open(href, "_blank");
      return;
    }
    if (action.link) {
      window.location.href = action.link;
      return;
    }

    handleSend(action.label);
    
    setIsTyping(true);
    setTimeout(() => {
      const response = chatbotEngine.processMessage(action.actionKey || action.label, {
        lastDiscussedProduct,
        pendingQuestion,
        lastCategory
      });
      
      setLastDiscussedProduct(response.newContext.lastDiscussedProduct);
      setPendingQuestion(response.newContext.pendingQuestion);
      setLastCategory(response.newContext.lastCategory);
      
      const pollyMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "polly",
        text: response.text,
        timestamp: new Date(),
        products: response.products,
        actions: response.actions as any,
      };
      
      setMessages(prev => {
        const next = [...prev, pollyMsg];
        saveHistory(next);
        return next;
      });
      setIsTyping(false);
      if (soundEnabled) {
        setTimeout(playBirdChirp, 100);
      }
    }, 900);
  };
  const resetChat = () => {
    if (confirm("Reset conversation with Polly?")) {
      sessionStorage.removeItem("polly_chat_history");
      const defaultMsgs: Message[] = [
        {
          id: "welcome-1",
          sender: "polly",
          text: "Squawk! Polly has restarted! 🦜 Let's start fresh. How can I help you find gorgeous pets or high-quality feeds today, chirp?",
          timestamp: new Date(),
        },
        {
          id: "welcome-2",
          sender: "polly",
          text: "Select a topic or type any question below!",
          timestamp: new Date(Date.now() + 50),
          actions: [
            { label: "Show Birds 🦜", actionKey: "show_birds" },
            { label: "Show Puppies 🐶", actionKey: "show_puppies" },
            { label: "Find Premium Food 🍖", actionKey: "show_food" },
            { label: "WhatsApp Direct 📞", actionKey: "whatsapp_direct", isWhatsApp: true },
          ],
        },
      ];
      setMessages(defaultMsgs);
      if (soundEnabled) playBirdChirp();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-auto z-50 flex h-[78vh] w-full flex-col overflow-hidden rounded-t-[1.8rem] border-t border-gray-100 bg-white shadow-2xl transition-all duration-300 sm:absolute sm:bottom-20 sm:right-0 sm:left-auto sm:h-[460px] sm:w-[325px] sm:rounded-3xl sm:border">
          {/* Header Panel */}
          <div className="bg-gradient-to-r from-forest to-emerald-950 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative rounded-full bg-white/10 p-0.5 border border-white/20">
                  <MacawMascot isSpeaking={isTyping} size={44} />
                  <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-forest bg-green-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm leading-tight tracking-wide">Polly the Macaw</h3>
                   
                  </div>
                  <p className="text-[11px] text-emerald-200">Exotic Pets AI Assistant • Online</p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1 text-gray-300">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="rounded-full p-1.5 hover:bg-white/10 hover:text-white transition-all"
                  title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
                >
                  {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
                </button>
                <button
                  onClick={resetChat}
                  className="rounded-full p-1.5 hover:bg-white/10 hover:text-white transition-all"
                  title="Restart chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-1 rounded-full p-1.5 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div
            ref={scrollRef}
            className="chat-scrollbar flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4"
          >
            {messages.map((msg) => {
              const isPolly = msg.sender === "polly";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isPolly ? "justify-start" : "justify-end"}`}
                >
                  {/* Avatar left */}
                  {isPolly && (
                    <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-forest-light border border-forest/10 p-0.5">
                      <MacawMascot isSpeaking={false} size={24} />
                    </div>
                  )}

                  <div className="max-w-[82%] space-y-2">
                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        isPolly
                          ? "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm"
                          : "bg-forest text-white shadow-md rounded-tr-sm"
                      }`}
                    >
                      <p className="whitespace-pre-line font-medium">{msg.text}</p>
                    </div>

                    {/* Render matching product cards (if any) */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="no-scrollbar -mx-2 flex gap-3 overflow-x-auto px-2 py-1">
                        {msg.products.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => window.location.href = `/product/${p.id}`}
                            className="w-48 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 shadow-md transition-all hover:shadow-lg hover:border-forest/20 flex flex-col group cursor-pointer"
                          >
                            <div className="relative h-28 w-full overflow-hidden rounded-xl bg-gray-50">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                                  p.imageFit === "contain" ? "object-contain p-2 mix-blend-multiply" : ""
                                }`}
                              />
                              <span className="absolute right-1.5 top-1.5 rounded-full bg-forest/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                                {p.category}
                              </span>
                            </div>
                            <h4 className="mt-2 truncate text-xs font-bold text-gray-900 group-hover:text-forest transition-colors">{p.name}</h4>
                            <p className="mt-0.5 text-[10px] text-gray-500 truncate">{p.description}</p>
                            <div className="mt-2.5 flex items-center justify-between border-t border-gray-50 pt-2" onClick={(e) => e.stopPropagation()}>
                              <span className="text-xs font-black text-forest">
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                              <a
                                href={productWhatsappHref(p.name)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center rounded-lg bg-leaf p-1.5 text-white hover:bg-leaf-hover transition-colors"
                                title="Buy via WhatsApp"
                              >
                                <Phone className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Replies Action Buttons */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {msg.actions.map((act, index) => (
                          <button
                            key={index}
                            onClick={() => handleActionClick(act)}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                              act.isWhatsApp
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-100"
                                : "bg-white text-forest border border-gray-200 hover:border-forest/30 hover:bg-forest-light"
                            }`}
                          >
                            {act.isWhatsApp && <Phone className="h-3 w-3" />}
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="block text-[9px] text-gray-400 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator bubble */}
            {isTyping && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-forest-light border border-forest/10 p-0.5">
                  <MacawMascot isSpeaking={true} size={24} />
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-3 py-2 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Typing Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="border-t border-gray-100 bg-white px-3 py-2.5 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Polly... (e.g., 'show puppies')"
              className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white hover:bg-emerald-950 transition-colors disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Widget */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && soundEnabled) {
            playBirdChirp();
          }
        }}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-forest to-emerald-900 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group border border-white/10 ${
          bounceAlert ? "animate-chirp-shake" : "animate-parrot-float"
        }`}
        aria-label="Open Polly Chatbot"
      >
        {/* Animated outer ring */}
        <span className="absolute inset-0 rounded-full bg-leaf opacity-20 group-hover:animate-ping" />

        {/* Mascot Face */}
        <MacawMascot isSpeaking={isOpen && isTyping} size={50} src={widgetAvatarSrc} />

        {/* Small badge / notification dot */}
        {!isOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white border border-white animate-bounce shadow">
            1
          </span>
        )}

        {/* Floating tooltip on hover & dynamic chatter */}
        {!isOpen && (
          <div 
            className={`absolute right-full mr-3.5 top-1/2 -translate-y-1/2 rounded-2xl bg-white/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-xl pointer-events-none transition-all duration-500 border border-forest/10 w-[190px] xs:w-[230px] sm:w-max sm:max-w-sm whitespace-normal sm:whitespace-nowrap ${
              isTooltipVisible 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 translate-x-2 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] sm:text-xs font-bold leading-normal text-forest">
                {tooltipText}
              </span>
              {tooltipIcon && (
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-forest-light text-leaf shadow-sm animate-pulse">
                  {tooltipIcon === "bird" && <Bird className="h-3.5 w-3.5" />}
                  {tooltipIcon === "heart" && <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />}
                  {tooltipIcon === "star" && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                  {tooltipIcon === "sparkles" && <Sparkles className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
                  {tooltipIcon === "bone" && <Bone className="h-3.5 w-3.5 text-orange-700" />}
                </span>
              )}
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-white/95" />
          </div>
        )}
      </button>
    </div>
  );
}
