import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Services() {
  const serviceBlocks = [
    { num: "01", title: "Catering & Event Management", details: "From weddings to corporate dinners across Rawalpindi and Islamabad, we design custom food stalls featuring premium Live Karahi stations and smoking tandoors handled entirely by expert chefs.", color: "bg-orange-50" },
    { num: "02", title: "Corporate Lunch Box Pipeline", details: "Get customized weekly sub-plans for corporate teams. Clean, premium packaging with fresh high-contrast labels containing rotational items from Biryani to premium side salads.", color: "bg-yellow-50" },
    { num: "03", title: "20-Minute Express Dispatch Routing", details: "Our private fleet routes use premium thermal insulated bags to ensure your cheese stays melting hot and your lassi stays crisp and cold throughout transport.", color: "bg-red-50" },
    { num: "04", title: "Customizable Spice Tolerances", details: "We understand localized palettes perfectly. Choose from 'Mild, Medium, or Authentic Desi Spice Levels' for all food items right at the shopping checkout panel.", color: "bg-amber-50" }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-24">
      <Header />
      
      <div className="max-w-5xl mx-auto px-6 py-16 w-full flex-1 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-black text-orange-600 tracking-widest bg-orange-100 px-3 py-1 rounded-md border border-gray-950">Enterprise Capabilities</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gray-950">Our Operational Services</h1>
          <p className="text-gray-950 font-bold max-w-xl mx-auto">We do not just drop off fast food—we engineer premier localized dining experiences tailored for modern Pakistani households.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {serviceBlocks.map((s, idx) => (
            <div key={idx} className={`${s.color} border-2 border-gray-950 p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4`}>
              <div className="text-3xl font-black text-gray-950 bg-white border-2 border-gray-950 w-12 h-12 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{s.num}</div>
              <h3 className="text-2xl font-black text-gray-950 tracking-tight">{s.title}</h3>
              <p className="text-sm text-gray-950 font-bold leading-relaxed">{s.details}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Services;