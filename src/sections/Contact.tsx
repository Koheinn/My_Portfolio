import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative w-full overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Let's build something <span className="text-gradient-ai">intelligent.</span>
          </h2>
          <p className="text-xl text-accent-dim mb-12 max-w-2xl mx-auto">
            Whether you need robust software engineering, data-driven insights, or AI integration, I'm open to exploring new opportunities and collaborations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:heinn2004@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              heinn2004@gmail.com
            </a>
            
            <div className="flex gap-4">
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
        </motion.div>
      </div>
    </section>
  );
}
