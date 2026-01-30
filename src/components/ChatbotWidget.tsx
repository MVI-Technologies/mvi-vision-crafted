/**
 * MVI Tech Chatbot Widget
 * 
 * Performance-focused business chatbot with WhatsApp integration.
 * 
 * HOW TO EDIT FAQ:
 * - Edit the translations file (src/i18n/translations.ts) to update FAQ answers
 * - Keywords are defined in getIntentFromMessage function below
 */

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Phone } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';

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

// Intent keywords for routing (works for both PT and EN)
const INTENT_KEYWORDS: Record<string, string[]> = {
  price: ['preço', 'preco', 'valor', 'custo', 'quanto', 'custa', 'orçamento', 'orcamento', 'price', 'cost', 'how much', 'budget', 'quote'],
  timeline: ['prazo', 'tempo', 'demora', 'quanto tempo', 'timeline', 'how long', 'deadline', 'delivery'],
  app: ['app', 'aplicativo', 'mobile', 'celular', 'ios', 'android', 'react native'],
  process: ['processo', 'funciona', 'como funciona', 'etapas', 'process', 'how does', 'steps', 'workflow'],
  stack: ['tecnologia', 'stack', 'linguagem', 'framework', 'react', 'node', 'python', 'technology', 'technologies', 'tech'],
  support: ['suporte', 'manutenção', 'manutencao', 'support', 'maintenance', 'after', 'post-launch'],
  branding: ['branding', 'marca', 'logo', 'identidade', 'visual', 'brand', 'identity'],
  ecommerce: ['ecommerce', 'e-commerce', 'loja', 'shopify', 'vendas', 'shop', 'store', 'sales'],
};

// Normalize text for matching (remove accents, lowercase)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Get intent from message
function getIntentFromMessage(message: string): string | null {
  const normalized = normalizeText(message);
  
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        return intent;
      }
    }
  }
  
  return null;
}

// Storage utilities
function getStoredChat(): ChatState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed: ChatState = JSON.parse(stored);
    
    // Check version and expiry
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
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
      
      // Add welcome message if no messages
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

  // Get bot response based on intent
  const getBotResponse = useCallback((userMessage: string): string => {
    const intent = getIntentFromMessage(userMessage);
    
    if (!intent) {
      return `${t('chatbot.faq.unknown' as TranslationKey)}\n\n${t('chatbot.budgetCta')}`;
    }
    
    const faqKey = `chatbot.faq.${intent}` as TranslationKey;
    const followUpKey = `chatbot.followUp.${intent}` as TranslationKey;
    
    const answer = t(faqKey);
    const followUp = t(followUpKey);
    
    if (answer === faqKey) {
      return `${t('chatbot.outOfScope')}\n\n${t('chatbot.budgetCta')}`;
    }
    
    return followUp && followUp !== followUpKey 
      ? `${answer}\n\n${followUp}`
      : `${answer}\n\n${t('chatbot.budgetCta')}`;
  }, [t]);

  // Handle send message
  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userMessage.content);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }, [input, getBotResponse]);

  // Handle quick chip click
  const handleChipClick = useCallback((chip: string) => {
    setInput(chip);
    setTimeout(() => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: chip,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      
      setTimeout(() => {
        const response = getBotResponse(chip);
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 700);
    }, 100);
  }, [getBotResponse]);

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
      {/* Floating button */}
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
          className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center ${
            isOpen ? 'hidden' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('chatbot.tooltip')}
        >
          <MessageCircle className="w-6 h-6" />
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
                  <Phone className="w-4 h-4" />
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
                <Phone className="w-4 h-4" />
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
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
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
