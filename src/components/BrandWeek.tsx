import { useState } from 'react';
import { Palette, Zap, CheckCircle, ArrowRight, Timer, Sparkles, Target, Users } from 'lucide-react';

const BrandWeek = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  const weekPlan = [
    {
      day: 1,
      title: "Brand Discovery",
      tasks: ["Brand questionnaire", "Competitor analysis", "Target audience research", "Brand positioning"],
      deliverable: "Brand Strategy Document"
    },
    {
      day: 2,
      title: "Visual Identity",
      tasks: ["Logo concepts", "Color palette", "Typography selection", "Visual style guide"],
      deliverable: "Logo & Visual Identity Package"
    },
    {
      day: 3,
      title: "Brand Assets",
      tasks: ["Business cards", "Letterhead", "Email signatures", "Social media templates"],
      deliverable: "Branded Collateral Set"
    },
    {
      day: 4,
      title: "Digital Presence",
      tasks: ["Website mockups", "Social media branding", "Favicon & app icons", "Brand guidelines"],
      deliverable: "Digital Brand Assets"
    },
    {
      day: 5,
      title: "Content Strategy",
      tasks: ["Brand voice & tone", "Content templates", "Messaging framework", "Brand story"],
      deliverable: "Content Strategy Guide"
    },
    {
      day: 6,
      title: "Marketing Materials",
      tasks: ["Presentation templates", "Brochure design", "Ad templates", "Brand photoshoot guide"],
      deliverable: "Marketing Toolkit"
    },
    {
      day: 7,
      title: "Launch Package",
      tasks: ["Final brand book", "Usage guidelines", "Launch checklist", "Handover session"],
      deliverable: "Complete Brand Package"
    }
  ];

  const features = [
    { icon: Timer, title: "7-Day Delivery", description: "Complete brand identity in just one week" },
    { icon: Sparkles, title: "Premium Quality", description: "Professional design standards maintained" },
    { icon: Target, title: "Market-Ready", description: "Tested and validated brand concepts" },
    { icon: Users, title: "Collaborative", description: "Daily check-ins and feedback sessions" }
  ];

  return (
    <section id="brand-week" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-6">
            <Palette className="w-5 h-5 mr-2" />
            Brand-in-a-Week
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Zero to <span className="text-gradient">Brand Hero</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a complete, market-ready brand identity in just 7 days. Perfect for startups and businesses ready to make their mark.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* 7-Day Timeline */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
          <h3 className="text-2xl font-bold text-center mb-8">Your 7-Day Brand Journey</h3>
          
          {/* Day Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {weekPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedDay === day.day
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Selected Day Details */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Day {selectedDay}: {weekPlan[selectedDay - 1].title}
              </h4>
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                {weekPlan[selectedDay - 1].deliverable}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">Daily Tasks</h5>
                <ul className="space-y-3">
                  {weekPlan[selectedDay - 1].tasks.map((task, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">What You'll Receive</h5>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <span className="font-medium text-gray-900">{weekPlan[selectedDay - 1].deliverable}</span>
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Brand?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join dozens of successful brands who launched with our 7-day program
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center">
              Start Your Brand Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandWeek;
