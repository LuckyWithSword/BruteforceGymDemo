import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Dumbbell, 
  HeartPulse, 
  Droplets,
  Clock,
  Instagram,
  Facebook,
  MapPin,
  Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 })
      .from('.hero-title-line', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }, '-=0.4')
      .from(['.hero-btn', '.hero-btn-secondary'], { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }, '-=0.6');

    // Hero buttons premium hover animations
    const btn1 = document.querySelector('.hero-btn');
    if (btn1) {
      btn1.addEventListener('mouseenter', () => {
        gsap.to(btn1, { scale: 1.05, duration: 0.4, ease: 'back.out(1.7)', boxShadow: '0 0 30px rgba(220,38,38,0.5)' });
        gsap.to('.btn-arrow', { x: 5, duration: 0.3, ease: 'power2.out' });
      });
      btn1.addEventListener('mouseleave', () => {
        gsap.to(btn1, { scale: 1, duration: 0.4, ease: 'back.out(1.2)', boxShadow: '0 0 20px rgba(220,38,38,0.3)' });
        gsap.to('.btn-arrow', { x: 0, duration: 0.3, ease: 'power2.out' });
      });
    }

    const btn2 = document.querySelector('.hero-btn-secondary');
    if (btn2) {
      btn2.addEventListener('mouseenter', () => {
        gsap.to(btn2, { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', duration: 0.4, ease: 'back.out(1.7)' });
      });
      btn2.addEventListener('mouseleave', () => {
        gsap.to(btn2, { scale: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', duration: 0.4, ease: 'back.out(1.2)' });
      });
    }

    // Section Titles Scroll Animations
    const sections = gsap.utils.toArray('.gsap-section-title');
    sections.forEach((sec: any) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    const featureCards = gsap.utils.toArray('.gsap-feature-card');
    if (featureCards.length > 0) {
      gsap.from(featureCards, {
          scrollTrigger: {
            trigger: '#services',
            start: 'top 70%',
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
      });
    }

    const trainerCards = gsap.utils.toArray('.gsap-trainer-card');
    if (trainerCards.length > 0) {
      gsap.from(trainerCards, {
          scrollTrigger: {
            trigger: '#trainers',
            start: 'top 70%',
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
      });
    }
    
    gsap.from('.gsap-map-card', {
      scrollTrigger: {
        trigger: '.gsap-map-card',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.gsap-cta-content', {
      scrollTrigger: {
        trigger: '.gsap-cta-container',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.gsap-cta-badge', {
      scrollTrigger: {
        trigger: '.gsap-cta-container',
        start: 'top 85%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)',
      delay: 0.2
    });

    gsap.to('.gsap-hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.utils.toArray('.gsap-parallax-bg').forEach((bg: any) => {
      gsap.to(bg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: bg.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    gsap.from('.gsap-nav', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.1
    });

    gsap.from('.gsap-footer > div', {
      scrollTrigger: {
        trigger: '.gsap-footer',
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });

  }, { scope: container });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // approximate height of fixed navbar
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={container} className="bg-white min-h-screen text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className={`gsap-nav fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50">
            <span className={`font-heading font-bold text-lg md:text-xl tracking-tight ${isScrolled || isMobileMenuOpen ? 'text-black' : 'text-white'}`}>
              BRUTE FORCE GYM
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className={`text-sm font-medium tracking-wide transition-colors ${
              isScrolled ? 'text-slate-600 hover:text-black' : 'text-white/80 hover:text-white'
            }`}>SERVICES</a>
            <a 
              href="#schedule" 
              onClick={(e) => scrollToSection(e, 'schedule')}
              className={`text-sm font-medium tracking-wide transition-colors ${
              isScrolled ? 'text-slate-600 hover:text-black' : 'text-white/80 hover:text-white'
            }`}>FACILITIES</a>
            <a 
              href="#trainers" 
              onClick={(e) => scrollToSection(e, 'trainers')}
              className={`text-sm font-medium tracking-wide transition-colors ${
              isScrolled ? 'text-slate-600 hover:text-black' : 'text-white/80 hover:text-white'
            }`}>TRAINERS</a>
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]">
              JOIN NOW
            </button>
          </div>

          <button 
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-black w-6 h-6" />
            ) : (
              <Menu className={isScrolled ? 'text-black w-6 h-6' : 'text-white w-6 h-6'} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-black">Services</a>
        <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-black">Facilities</a>
        <a href="#trainers" onClick={(e) => scrollToSection(e, 'trainers')} className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-black">Trainers</a>
        <button className="mt-6 sm:mt-8 bg-red-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-medium tracking-wide w-[80%] max-w-sm hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
          JOIN NOW
        </button>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] w-full overflow-hidden bg-black flex items-center">
        {/* Cinematic Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2940&auto=format&fit=crop" 
            alt="Gym Hero" 
            loading="lazy"
            className="gsap-hero-bg w-full h-[130%] object-cover absolute top-0 left-0"
          />
          {/* Subtle gradient overlays for text readability & style */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 sm:pt-32 md:pt-20">
          <div className="max-w-4xl">
            <div className="hero-badge inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-red-500 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-8 text-center sm:text-left leading-tight">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              Open Monday - Sunday (6:00 AM – 11:00 PM)
            </div>
            <h1 className="font-heading text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] font-bold text-white tracking-tighter mb-4 sm:mb-8 flex flex-col overflow-hidden">
              <span className="hero-title-line">THE HOUSE</span>
              <span className="hero-title-line text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">OF STRENGTH.</span>
            </h1>
            <p className="hero-desc text-sm sm:text-lg md:text-2xl text-white/70 max-w-xl font-light leading-relaxed mb-8 sm:mb-10 mt-2 sm:mt-0">
              Durgapur's premier facility for strength, functional training, and bodybuilding. Rated 4.8/5 by over 230+ members.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-center w-full sm:w-auto overflow-visible relative z-20">
              <button className="hero-btn flex items-center justify-center gap-2 sm:gap-3 bg-red-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(220,38,38,0.3)] w-[200px] sm:w-auto">
                <span className="relative z-10 pointer-events-none">JOIN NOW</span>
                <ArrowRight className="btn-arrow w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 -ml-1 pointer-events-none" />
              </button>
              <button className="hero-btn-secondary flex items-center justify-center gap-2 sm:gap-3 text-white/90 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md bg-white/5 border border-white/10 w-[200px] sm:w-auto">
                <span className="pointer-events-none">PLANS FROM ₹1000</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section id="services" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 lg:gap-24 mb-16 sm:mb-24">
            <h2 
              className="gsap-section-title font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-black flex-1"
            >
              MORE THAN <br className="hidden sm:block"/>A GYM.
            </h2>
            <p 
              className="gsap-section-title flex-1 text-lg sm:text-xl text-slate-500 font-light leading-relaxed lg:pt-4"
            >
              We’ve stripped away the unnecessary to focus purely on performance, recovery, and aesthetic perfection. Welcome to the new standard of fitness architecture.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Dumbbell className="w-8 h-8 text-red-600" />}
              title="ELITE EQUIPMENT"
              desc="Equipped with deadlift platforms, modern machinery, and dedicated strength zones to elevate your lifting."
              delay={0}
            />
            <FeatureCard 
              icon={<HeartPulse className="w-8 h-8 text-red-600" />}
              title="CROSSFIT & FUNCTIONAL"
              desc="Comprehensive setups for conditioning and functional fitness, pushing your endurance and power."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Droplets className="w-8 h-8 text-red-600" />}
              title="COACHING & NUTRITION"
              desc="Expert personal trainers providing corrective exercise, and complete nutrition and fat-loss guidance."
              delay={0.2}
              highlight
            />
          </div>
        </div>
      </section>

      {/* Facilities / Zones Section */}
      <section id="schedule" className="py-24 sm:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black border-y border-white/5" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end mb-12 sm:mb-20 gap-6">
            <div className="gsap-section-title">
              <div className="text-red-500 font-semibold tracking-widest text-xs sm:text-sm uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-red-500"></span>
                Facility Spaces
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase">OUR ZONES</h2>
            </div>
            <button className="flex items-center gap-2 text-white hover:text-red-500 font-medium transition-colors border-b border-white/30 hover:border-red-500 pb-2 text-sm sm:text-base">
              VIEW ALL FACILITIES <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full-bleed Marquee Slider */}
        <div className="relative z-10 w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-8">
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
          
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center group/marquee">
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              {facilitiesData.map((item, index) => (
                <div key={`orig-${index}`} className="w-[80vw] sm:w-[350px] md:w-[450px] shrink-0 transition-all duration-500 group-hover/marquee:opacity-40 hover:!opacity-100 hover:scale-[1.03]">
                  <FacilityCard item={item} />
                </div>
              ))}
            </div>
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              {facilitiesData.map((item, index) => (
                <div key={`dup-${index}`} className="w-[80vw] sm:w-[350px] md:w-[450px] shrink-0 transition-all duration-500 group-hover/marquee:opacity-40 hover:!opacity-100 hover:scale-[1.03]">
                  <FacilityCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 sm:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="gsap-section-title mb-12 sm:mb-16 max-w-2xl">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black mb-4 sm:mb-6">THE EXPERTS</h2>
            <p className="text-lg sm:text-xl text-slate-500 font-light">Industry-leading professionals dedicated to forging your limitless potential.</p>
          </div>

          <div className="trainers-container flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 -mx-6 px-6 md:-mx-12 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px]">
              <TrainerCard 
                name="MARCUS VANE"
                role="HEAD OF STRENGTH"
                image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop"
              />
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px]">
              <TrainerCard 
                name="ELENA ROSTOVA"
                role="ELITE CONDITIONING"
                image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop"
              />
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px]">
              <TrainerCard 
                name="DAVID CHEN"
                role="MOBILITY LAB"
                image="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2940&auto=format&fit=crop"
              />
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px]">
              <TrainerCard 
                name="SARAH JENKINS"
                role="NUTRITION & COACHING"
                image="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2940&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location / Map Section */}
      <section className="py-24 sm:py-32 bg-slate-50/80 relative border-t border-black/5 overflow-hidden">
        {/* Decorative background colors */}
        <div className="absolute top-0 right-0 -mr-[10%] -mt-[10%] w-[600px] h-[600px] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-[10%] -mb-[10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Map Section (Top) */}
          <div className="gsap-map-card w-full h-[300px] sm:h-[350px] md:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/5 relative mb-16 sm:mb-20">
            <iframe 
              src="https://maps.google.com/maps?q=Brute%20Force%20Gym%20Durgapur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              className="grayscale-[0.2] contrast-[1.05] transition-all duration-500 pointer-events-auto"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl sm:rounded-3xl"></div>
          </div>

          {/* Title Section */}
          <div className="gsap-section-title max-w-3xl mx-auto text-center mb-12 flex flex-col items-center">
            <div className="text-red-600 font-bold tracking-[0.2em] text-xs sm:text-xs uppercase mb-3 relative flex items-center justify-center gap-3">
               <span className="w-8 h-[1px] bg-red-600/50"></span>
               Visit Us
               <span className="w-8 h-[1px] bg-red-600/50"></span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-tight">Find The House of Strength</h2>
          </div>
          
          {/* Info Cards (Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            
            {/* Location */}
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center shrink-0 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-heading text-lg font-bold text-black mb-3 uppercase tracking-wider">Location</h4>
              <p className="text-slate-500 leading-relaxed font-light text-sm">
                CA/11, Ambedkar Sarani,<br/>
                Bengal Ambuja Street, City Center,<br/>
                Durgapur, West Bengal 713216
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center shrink-0 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-heading text-lg font-bold text-black mb-3 uppercase tracking-wider">Hours</h4>
              <p className="text-slate-500 leading-relaxed font-light text-sm">
                Monday – Sunday<br/>
                <span className="font-medium text-black mt-1 block">6:00 AM – 11:00 PM</span>
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center shrink-0 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="font-heading text-lg font-bold text-black mb-3 uppercase tracking-wider">Contact</h4>
              <a href="tel:+918001332000" className="text-slate-500 hover:text-red-600 transition-colors leading-relaxed font-light text-sm inline-block">
                +91 80013 32000
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="gsap-cta-container relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-black py-16 sm:py-24 px-6 sm:px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between border border-black/10 shadow-2xl shadow-red-900/10">
            {/* Background texture/image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
                 loading="lazy"
                 className="gsap-parallax-bg w-full h-[120%] absolute top-[-10%] object-cover opacity-40 mix-blend-luminosity" 
                 alt="Gym weights" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/20" />
               <div className="absolute inset-0 bg-red-900/10 mix-blend-color" />
            </div>

            <div className="gsap-cta-content relative z-10 max-w-2xl text-center lg:text-left w-full lg:w-3/5">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 sm:mb-6 uppercase leading-[0.9]">
                Ready to <br className="hidden sm:block"/><span className="text-red-500">Transform</span>?
              </h2>
              <p className="text-base sm:text-xl text-white/80 font-light mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Claim your spot at Durgapur's premier fitness center. Choose from monthly, quarterly, or annual plans to fit your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start">
                <button className="w-full sm:w-auto bg-red-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold tracking-wide hover:bg-red-700 hover:scale-105 transition-all text-base sm:text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] min-w-[200px] sm:min-w-[240px]">
                  JOIN FROM ₹1000/MO
                </button>
                <button className="w-full sm:w-auto bg-transparent text-white border border-white/20 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold tracking-wide hover:bg-white/10 transition-all text-base sm:text-lg min-w-[200px] sm:min-w-[240px]">
                  CALL US NOW
                </button>
              </div>
            </div>
            
            <div className="gsap-cta-badge relative z-10 w-full lg:w-auto mt-12 sm:mt-16 lg:mt-0 hidden md:flex justify-center lg:justify-end scale-75 sm:scale-100 origin-center lg:origin-right">
               <div className="w-[320px] h-[320px] rounded-full border border-red-500/20 flex flex-col items-center justify-center p-4 relative bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                  <div className="w-[280px] h-[280px] rounded-full border border-red-500/10 animate-[spin_15s_linear_infinite] absolute" />
                  <div className="w-full h-full rounded-full border-2 border-dashed border-red-500/20 animate-[spin_20s_linear_infinite_reverse] absolute" />
                  <span className="font-heading text-7xl font-bold text-white relative z-10 drop-shadow-md">4.8</span>
                  <div className="flex gap-1 mt-4 relative z-10">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`w-6 h-6 ${i === 5 ? 'text-red-500/50' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/60 font-medium uppercase tracking-widest text-sm mt-3 relative z-10">230+ Reviews</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black py-16 sm:py-24 border-t border-white/5 overflow-hidden">
        {/* Giant textured background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.03] pointer-events-none select-none z-0">
          <span className="font-heading text-[12vw] font-black tracking-tighter whitespace-nowrap text-white">BRUTE FORCE</span>
        </div>

        <div className="gsap-footer max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center w-full">
          
          <div className="w-full text-center flex flex-col items-center justify-center">
            <div className="text-white mb-6">
              <span className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter uppercase">
                BRUTE FORCE <span className="text-red-500">GYM</span>
              </span>
            </div>
            <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed">
              Durgapur's premier facility for strength, functional training, and bodybuilding.
            </p>
            
            <button className="mt-10 group border border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              JOIN THE HOUSE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-center md:text-left text-sm text-white/40 font-light">&copy; {new Date().getFullYear()} Brute Force Gym. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8 text-sm text-white/40 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Subcomponents

function FeatureCard({ icon, title, desc, delay, highlight = false }: any) {
  return (
    <div 
      className={`gsap-feature-card group relative p-8 sm:p-10 rounded-2xl overflow-hidden ${
        highlight 
          ? 'bg-slate-900 text-white' 
          : 'bg-slate-50 hover:bg-slate-100'
      } transition-colors duration-500 cursor-pointer`}
      style={{ isolation: 'isolate' }}
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-6 sm:mb-8 ${highlight ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
        {icon}
      </div>
      <h3 className={`font-heading text-2xl font-bold tracking-tight mb-4 ${highlight ? 'text-white' : 'text-black'}`}>
        {title}
      </h3>
      <p className={`${highlight ? 'text-white/70' : 'text-slate-500'} leading-relaxed font-light`}>
        {desc}
      </p>

      {/* Subtle overlay effect on hover */}
      {!highlight && (
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
          <ArrowRight className="w-6 h-6 text-red-600" />
        </div>
      )}
    </div>
  );
}

const facilitiesData = [
  {
    title: 'STRENGTH ZONE',
    subtitle: 'Free Weights & Machines',
    desc: 'Spacious training floor equipped with premium Arsenal and Prime fitness machinery.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[400px] md:h-[600px]'
  },
  {
    title: 'DEADLIFT',
    subtitle: 'Powerlifting',
    desc: 'Competition-grade Eleiko plates and dedicated platforms for serious lifters.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[350px] md:h-[450px]'
  },
  {
    title: 'CROSSFIT AREA',
    subtitle: 'Functional Training',
    desc: 'Rigs, kettlebells, and open turf space designed for high-intensity metcons.',
    image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[450px] md:h-[550px]'
  },
  {
    title: 'CARDIO SECTION',
    subtitle: 'Endurance',
    desc: 'Modern treadmills, stair climbers, and rowers with panoramic gym views.',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[350px] md:h-[400px]'
  },
  {
    title: 'RECOVERY SUITE',
    subtitle: 'Performance Tuning',
    desc: 'Accelerate healing with cold plunges and infrared saunas to bounce back faster.',
    image: 'https://images.unsplash.com/photo-1527622949755-70acfaab9e5c?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[300px] md:h-[450px]'
  },
  {
    title: 'MOBILITY ZONE',
    subtitle: 'Flexibility',
    desc: 'Dedicated space for dynamic stretching, yoga, and essential mobility work.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e08c3d0cb8?q=80&w=2940&auto=format&fit=crop',
    heightClass: 'h-[350px] md:h-[500px]'
  }
];

function FacilityCard({ item }: any) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer bg-slate-900 border border-white/5 shadow-xl ${item.heightClass}`}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        loading="lazy"
        style={{
          transform: isHovered 
            ? `scale(1.1) translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` 
            : 'scale(1) translate(0px, 0px)'
        }}
        className="w-full h-full object-cover transition-all duration-700 ease-out opacity-60 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent,_black)] opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 flex flex-col justify-end">
        <div className="text-red-500 font-semibold tracking-widest text-[10px] md:text-sm uppercase mb-2 transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
          {item.subtitle}
        </div>
        <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 uppercase drop-shadow-lg transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
          {item.title}
        </h3>
        <div className="overflow-hidden hidden sm:block">
            <p className="text-white/70 font-light text-sm md:text-base max-w-sm transform transition-all duration-500 md:translate-y-[120%] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 mt-1 line-clamp-3">
              {item.desc}
            </p>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden sm:block">
         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
         </div>
      </div>
    </div>
  );
}

function TrainerCard({ name, role, image }: any) {
  return (
    <div className="gsap-trainer-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-slate-100">
      <img 
        src={image} 
        alt={name} 
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 mix-blend-multiply opacity-90 grayscale group-hover:grayscale-0"
      />
      
      {/* Gradients to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-red-500 font-semibold tracking-widest text-xs sm:text-sm uppercase mb-2 drop-shadow-md">
          {role}
        </div>
        <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
          {name}
        </h3>
        <div className="w-full h-[1px] bg-white/20 relative overflow-hidden drop-shadow-sm">
          <div className="absolute inset-y-0 left-0 bg-white w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
}

