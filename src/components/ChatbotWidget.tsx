/**
 * MVI Tech Chatbot Widget
 * 
 * LLM-powered business chatbot with strict scope and WhatsApp integration.
 */

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2 } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import WhatsAppIcon from './icons/WhatsAppIcon';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  version: number;
  expiresAt: number;
}

// Constants
const STORAGE_KEY = 'mvi_chat_v1';
const STORAGE_VERSION = 1;
const EXPIRY_DAYS = 7;
const WHATSAPP_NUMBER = '5544999641464';
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-chat`;

// Storage utilities
function getStoredChat(): ChatState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed: ChatState = JSON.parse(stored);
    
    if (parsed.version !== STORAGE_VERSION || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}

function saveChat(messages: Message[]) {
  const state: ChatState = {
    messages,
    version: STORAGE_VERSION,
    expiresAt: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearStoredChat() {
  localStorage.removeItem(STORAGE_KEY);
}

// Generate WhatsApp URL
function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Typing indicator component
const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-[bounce_1s_infinite_0ms]" />
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-[bounce_1s_infinite_150ms]" />
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-[bounce_1s_infinite_300ms]" />
      </div>
    </div>
  );
});

// Quick chip component
const QuickChip = memo(function QuickChip({ 
  text, 
  onClick 
}: { 
  text: string; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors whitespace-nowrap"
    >
      {text}
    </button>
  );
});

// Message component
const ChatMessage = memo(function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-secondary text-secondary-foreground rounded-bl-md'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
});

// Stream chat from LLM
async function streamChat({
  messages,
  lang,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  lang: string;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, lang }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      onError(errorData.error || 'Failed to connect');
      return;
    }

    if (!resp.body) {
      onError('No response body');
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }

    // Flush remaining buffer
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split('\n')) {
        if (!raw) continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (raw.startsWith(':') || raw.trim() === '') continue;
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    console.error('Stream error:', e);
    onError(e instanceof Error ? e.message : 'Connection error');
  }
}

// Main Chatbot component
function ChatbotWidget() {
  const { t, lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load stored messages on mount
  useEffect(() => {
    const stored = getStoredChat();
    if (stored) {
      setMessages(stored.messages);
    }
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      saveChat(messages);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      if (messages.length === 0) {
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: t('chatbot.welcome'),
          timestamp: Date.now(),
        }]);
      }
    }
  }, [isOpen, t, messages.length]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      
      if (e.key === 'Tab' && chatRef.current) {
        const focusableElements = chatRef.current.querySelectorAll(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle send message with LLM streaming
  const handleSend = useCallback(async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    let assistantContent = '';
    
    const chatHistory = [...messages, userMessage]
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, content: m.content }));

    await streamChat({
      messages: chatHistory,
      lang,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && last.id.startsWith('bot-stream-')) {
            return prev.map((m, i) => 
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, {
            id: `bot-stream-${Date.now()}`,
            role: 'assistant',
            content: assistantContent,
            timestamp: Date.now(),
          }];
        });
      },
      onDone: () => {
        setIsTyping(false);
      },
      onError: (error) => {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, {
          id: `bot-error-${Date.now()}`,
          role: 'assistant',
          content: t('chatbot.outOfScope'),
          timestamp: Date.now(),
        }]);
        setIsTyping(false);
      },
    });
  }, [input, messages, lang, isTyping, t]);

  // Handle quick chip click
  const handleChipClick = useCallback((chip: string) => {
    if (isTyping) return;
    setInput(chip);
    setTimeout(() => {
      const syntheticEvent = { target: { value: chip } };
      setInput(chip);
    }, 50);
  }, [isTyping]);

  // Handle clear chat
  const handleClearChat = useCallback(() => {
    clearStoredChat();
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: t('chatbot.welcome'),
      timestamp: Date.now(),
    }]);
  }, [t]);

  // Handle WhatsApp click
  const handleWhatsAppClick = useCallback(() => {
    const message = t('chatbot.whatsappMessageGeneric');
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }, [t]);

  // Quick chips
  const chips = [
    t('chatbot.chip1'),
    t('chatbot.chip2'),
    t('chatbot.chip3'),
    t('chatbot.chip4'),
    t('chatbot.chip5'),
  ];

  return (
    <>
      {/* Floating button - WhatsApp style */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              {t('chatbot.tooltip')}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#22c35e] transition-all flex items-center justify-center ${
            isOpen ? 'hidden' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('chatbot.tooltip')}
        >
          <WhatsAppIcon size={28} />
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[380px] h-[min(600px,85vh)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden sm:w-[380px]"
            role="dialog"
            aria-label={t('chatbot.title')}
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/95 backdrop-blur-sm">
              <div>
                <h3 className="font-semibold text-foreground">{t('chatbot.title')}</h3>
                <p className="text-xs text-muted-foreground">{t('chatbot.subtitle')}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleWhatsAppClick}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  aria-label={t('chatbot.whatsapp')}
                  title={t('chatbot.whatsapp')}
                >
                  <WhatsAppIcon size={16} />
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  aria-label={t('chatbot.clearChat')}
                  title={t('chatbot.clearChat')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  aria-label={t('chatbot.close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick chips */}
            <div className="px-4 py-3 border-b border-border overflow-x-auto scrollbar-hide">
              <div className="flex gap-2">
                {chips.map((chip, index) => (
                  <QuickChip key={index} text={chip} onClick={() => handleChipClick(chip)} />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp CTA */}
            <div className="px-4 py-2 border-t border-border">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-2 px-4 bg-[#25D366] hover:bg-[#22c35e] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={16} />
                {t('chatbot.whatsapp')}
              </button>
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border bg-card/95 backdrop-blur-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-4 py-2.5 bg-secondary text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label={t('chatbot.placeholder')}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  aria-label={t('chatbot.send')}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(ChatbotWidget);
