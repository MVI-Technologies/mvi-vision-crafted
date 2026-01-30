/**
 * Lazy Chatbot Loader
 * 
 * Loads the chatbot widget with optimal performance:
 * - On click (immediate)
 * - After 10s idle time (requestIdleCallback)
 * - When button enters viewport (IntersectionObserver)
 */

import { useState, useEffect, useRef, lazy, Suspense, memo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';

// Lazy load the actual chatbot widget
const ChatbotWidget = lazy(() => import('./ChatbotWidget'));

function LazyChatbot() {
  const { t } = useI18n();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    // Strategy 1: Load after idle time (10 seconds)
    let idleCallbackId: number | NodeJS.Timeout;
    
    if ('requestIdleCallback' in window) {
      const timeoutId = setTimeout(() => {
        idleCallbackId = window.requestIdleCallback(() => {
          setShouldLoad(true);
        }, { timeout: 2000 });
      }, 10000);
      
      return () => {
        clearTimeout(timeoutId);
        if (typeof idleCallbackId === 'number') {
          window.cancelIdleCallback(idleCallbackId);
        }
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      idleCallbackId = setTimeout(() => {
        setShouldLoad(true);
      }, 12000);
      
      return () => clearTimeout(idleCallbackId as NodeJS.Timeout);
    }
  }, [shouldLoad]);

  // Strategy 2: Load when button enters viewport
  useEffect(() => {
    if (shouldLoad || !buttonRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  // Strategy 3: Load on click (immediate)
  const handleClick = () => {
    if (!shouldLoad) {
      setShouldLoad(true);
    }
    setIsClicked(true);
  };

  // Show placeholder button until loaded
  if (!shouldLoad) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          aria-label={t('chatbot.tooltip')}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center animate-pulse"
            aria-label={t('chatbot.tooltip')}
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      }
    >
      <ChatbotWidgetWithAutoOpen autoOpen={isClicked} />
    </Suspense>
  );
}

// Wrapper to handle auto-open on first click
const ChatbotWidgetWithAutoOpen = memo(function ChatbotWidgetWithAutoOpen({ 
  autoOpen 
}: { 
  autoOpen: boolean;
}) {
  const [forceOpen, setForceOpen] = useState(autoOpen);
  
  useEffect(() => {
    if (autoOpen) {
      // Trigger open after component mounts
      setForceOpen(true);
    }
  }, [autoOpen]);

  // The ChatbotWidget handles its own state, but we need to trigger it
  // We'll modify ChatbotWidget to accept an initialOpen prop
  return <ChatbotWidget />;
});

export default memo(LazyChatbot);
