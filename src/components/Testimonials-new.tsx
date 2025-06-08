import { Star, Quote, Shield, Target, Users, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.value-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechStart Inc.",
      role: "CEO & Founder",
      quote: "Intruitia transformed our vision into reality with their innovative approach and professional execution. Their team's dedication to quality is unmatched.",
      rating: 5,
      avatar: "S",
      project: "E-commerce Platform"
    },
    {
      name: "Michael Rodriguez",
      company: "GrowthLab",
      role: "Marketing Director",
      quote: "The content creation and branding work exceeded our expectations. Our engagement rates increased by 300% after implementing their strategies.",
      rating: 5,
      avatar: "M",
      project: "Brand Identity & Content"
    },
    {
      name: "Emily Johnson",
      company: "DataFlow Solutions",
      role: "CTO",
      quote: "Professional, reliable, and technically excellent. Intruitia delivered our SaaS platform on time and under budget with exceptional quality.",
      rating: 5,
      avatar: "E",
      project: "SaaS Development"
    }
  ];

  const values = [
    {
      title: "Quality Excellence",
      description: "We deliver premium quality solutions that meet the highest industry standards and exceed client expectations.",
      icon: <Award className="w-8 h-8" />,
      color: "blue"
    },
    {
      title: "Client-Focused Approach",
      description: "Your success is our priority. We work closely with you to understand your goals and deliver tailored solutions.",
      icon: <Users className="w-8 h-8" />,
      color: "green"
    },
    {
      title: "Proven Results",
      description: "Our track record speaks for itself with successful projects that have driven real business growth for our clients.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "purple"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-slate-50 relative"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Client 
              <span className="gradient-text-professional"> Testimonials</span>
            </h2>
          </div>
          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients say about 
              working with Intruitia and the results we've achieved together.
            </p>
          </div>
        </div>

        {/* Professional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`value-card card-professional p-8 hover-lift ${
                visibleCards.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="text-blue-200 mb-6">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 mb-8 leading-relaxed text-lg italic">
                "{testimonial.quote}"
              </p>

              {/* Profile */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-600 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    Project: {testimonial.project}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Intruitia?
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional results that drive your business forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
              >
                <div className={`bg-${value.color}-100 text-${value.color}-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Stats Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-slate-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24h</div>
              <div className="text-slate-600">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-slate-600">On-Time Delivery</div>
            </div>
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="text-center mt-16">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with innovative solutions 
              and dedicated partnership.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-professional">
                Start Your Project
                <CheckCircle className="w-5 h-5 ml-2" />
              </button>
              <button className="btn-secondary">
                View Case Studies
                <Award className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
