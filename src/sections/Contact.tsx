import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState('success');
      
      setTimeout(() => {
        setFormState('idle');
        (e.target as HTMLFormElement).reset();
      }, 5000);
    } catch (error) {
      console.error(error);
      setFormState('idle');
      alert('Failed to send message. Please check if your RESEND_API_KEY is configured correctly.');
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 relative w-full overflow-hidden border-t border-white/5 bg-surface/30 perspective-1000">
      {/* Background glow */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, rotateX: -15, scale: 0.95 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 preserve-3d"
        >
          {/* Left Column: Info */}
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Let's build something <span className="text-gradient-ai">intelligent.</span>
            </h2>
            <p className="text-lg text-accent-dim mb-12 max-w-lg">
              Whether you need robust software engineering, cloud-native data pipelines, or AI integration, I'm open to exploring new opportunities and collaborations.
            </p>

            <div className="space-y-6">
              <a 
                href="mailto:heinn2004@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-accent hover:text-brand transition-colors w-fit group"
              >
                <div className="p-4 glass-panel rounded-full group-hover:bg-white/10 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium">heinn2004@gmail.com</span>
              </a>
              
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://github.com/Koheinn" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors group border-white/20"
                >
                  <Github className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/heinn-htet-zan-040794291" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors group border-white/20"
                >
                  <Linkedin className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-1/2">
            <form 
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden"
            >
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-surface/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center p-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-data mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="text-accent-dim">Thank you for reaching out. I'll get back to you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-accent">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="w-full bg-surface-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-accent">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-surface-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-accent">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-surface-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button 
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full py-4 mt-2 bg-white text-black font-semibold rounded-xl hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
