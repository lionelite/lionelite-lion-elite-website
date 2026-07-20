"use client";

import { useMemo, useState } from "react";

const OLD_ASSET_BASE = "https://peptide-science-animations-store-nqfz77bs7.vercel.app";

const products = [
  { slug:"retatrutide-5mg", group:"retatrutide", name:"Retatrutide", category:"Metabolic", price:89.99, concentration:"5mg/vial", description:"Triple receptor agonist (GLP-1, GIP, Glucagon) — 5mg entry-level vial for dose-titration research.", image:"/products/retatrutide-10mg.png", coa:true, variants:3 },
  { slug:"tirzepatide-10mg", name:"Tirzepatide", category:"Metabolic", price:139.99, concentration:"10mg/vial", description:"Dual GLP-1 / GIP receptor agonist for glycemic and metabolic research.", image:"/products/tirzepatide-10mg.png", coa:true },
  { slug:"aod-9604", name:"AOD-9604", category:"Metabolic", price:99.99, concentration:"5mg/vial", description:"C-terminal HGH fragment investigated for lipolytic activity without affecting blood glucose or IGF-1." },
  { slug:"igf-1-lr3", name:"IGF-1 LR3", category:"Growth Hormone", price:189.99, concentration:"1mg/vial", description:"Long-R3 analogue of IGF-1 with extended half-life for downstream GH axis research.", image:"/products/igf-1-lr3.png", coa:true },
  { slug:"cjc-1295-ipamorelin", name:"CJC-1295 / Ipamorelin Blend", category:"Growth Hormone", price:109.99, concentration:"10mg/vial (5mg+5mg)", description:"Synergistic GHRH + GHRP blend for pulsatile GH axis research.", image:"/products/cjc-ipa-blend.png", coa:true },
  { slug:"tesamorelin-5mg", name:"Tesamorelin", category:"Growth Hormone", price:89.99, concentration:"5mg/vial", description:"Stabilized GHRH analogue studied for GH axis modulation and visceral adipose tissue research.", image:"/products/tesamorelin-5mg.png", stock:"Limited Stock" },
  { slug:"bpc-157-tablets", name:"BPC-157 Tablets", category:"Regenerative", price:249.99, concentration:"500mcg/tablet — 100 tablets", description:"Oral BPC-157 tablets — 500mcg each, 100 per bottle. Studied for GI mucosal repair, systemic tissue regeneration, and anti-inflammatory activity." },
  { slug:"bpc-157-tb500", name:"BPC-157 / TB-500 Blend", category:"Regenerative", price:109.99, concentration:"10mg/vial (5mg+5mg)", description:"Dual-action regenerative blend combining BPC-157 and TB-500 for synergistic tissue repair research.", image:"/products/bpc-157-tb500-blend.png" },
  { slug:"ghk-cu-100mg", name:"GHK-Cu", category:"Regenerative", price:89.99, concentration:"100mg/vial", description:"Copper-binding tripeptide with broad research in wound healing, collagen, and gene expression modulation.", image:"/products/ghk-cu-100mg.png", coa:true },
  { slug:"klow80-80mg", name:"Klow Blend 80mg", category:"Regenerative", price:229.99, concentration:"80mg/vial (GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg + KPV 10mg)", description:"Advanced four-compound regenerative blend adding KPV (anti-inflammatory tripeptide) to the Glow Blend base.", image:"/products/klow80-80mg.png", coa:true },
  { slug:"semax-5mg", name:"Semax", category:"Nootropic", price:89.99, concentration:"5mg/vial", description:"Synthetic ACTH(4-10) analogue studied for neuroprotective and cognitive research via BDNF modulation.", image:"/products/semax-5mg.png" },
  { slug:"selank-10mg", name:"Selank", category:"Nootropic", price:89.99, concentration:"10mg/vial", description:"Synthetic tuftsin analogue studied for anxiolytic, nootropic, and immunomodulatory effects via BDNF and serotonin pathways.", image:"/products/selank-5mg.png", variants:2 },
  { slug:"ss31-10mg", name:"SS-31", category:"Longevity", price:129.99, concentration:"10mg/vial", description:"Mitochondria-targeted tetrapeptide studied for cardioprotection, oxidative stress, and mitochondrial membrane integrity.", image:"/products/ss31-10mg.png" },
  { slug:"nad-plus", name:"NAD+", category:"Longevity", price:179.99, concentration:"1000mg/vial", description:"Nicotinamide adenine dinucleotide — essential cofactor studied for sirtuin activation, DNA repair, and mitochondrial function.", image:"/products/nad-plus-500mg.png", coa:true, variants:2 },
  { slug:"mots-c-10mg", name:"MOTS-c", category:"Longevity", price:99.99, concentration:"10mg/vial", description:"Mitochondrial-derived peptide that regulates metabolic homeostasis and insulin sensitivity.", image:"/products/mots-c-10mg.png", coa:true },
  { slug:"kpv-10mg", name:"KPV", category:"Regenerative", price:84.99, concentration:"10mg/vial", description:"C-terminal alpha-MSH tripeptide studied for anti-inflammatory, mucosal repair, and melanocortin receptor research.", image:"/products/kpv-10mg.png" },
  { slug:"pt141-10mg", name:"PT-141", category:"Specialized", price:99.99, concentration:"10mg/vial", description:"Melanocortin receptor agonist (MC3R/MC4R) studied for CNS-mediated arousal and sexual health pathway research.", image:"/products/pt141-10mg.png" },
  { slug:"kisspeptin-5mg", name:"Kisspeptin", category:"Specialized", price:99.99, concentration:"5mg/vial", description:"Hypothalamic neuropeptide that governs GnRH pulsatility — key tool for HPG axis and reproductive endocrinology research.", image:"/products/kisspeptin-5mg.png" },
  { slug:"thymosin-alpha-1", name:"Thymosin Alpha-1", category:"Specialized", price:149.99, concentration:"10mg/vial", description:"Immunomodulatory thymic peptide studied for T-cell activation, innate immune priming, and inflammatory regulation.", image:"/products/thymosin-alpha-1.png" },
  { slug:"epithalon-10mg", name:"Epithalon", category:"Longevity", price:89.99, concentration:"10mg/vial", description:"Tetrapeptide epigenetic regulator studied for telomerase activation, telomere elongation, and longevity biology.", image:"/products/epithalon-10mg.png" },
  { slug:"glutathione-1500mg", name:"Glutathione", category:"Longevity", price:114.99, concentration:"1500mg/vial", description:"Master antioxidant tripeptide studied for oxidative stress reduction, detoxification, and immune modulation.", image:"/products/glutathione-1500mg.png" },
  { slug:"bacteriostatic-water", name:"Bacteriostatic Water", category:"Specialized", price:29.99, concentration:"1.5ml/vial (0.9% benzyl alcohol)", description:"0.9% benzyl alcohol sterile water for peptide reconstitution. Preserves multi-dose vials.", coa:true }
];

const featured = [
  { ...products[0], name:"Retatrutide", price:149.99, concentration:"10mg/vial", slug:"retatrutide-10mg", description:"Triple receptor agonist (GLP-1, GIP, Glucagon) under active investigation for metabolic regulation." },
  products[1],
  products[2],
  { ...products[0], name:"Retatrutide 5mg" },
  { ...products[0], name:"Retatrutide 15mg", price:199.99, concentration:"15mg/vial", slug:"retatrutide-15mg", description:"Triple receptor agonist (GLP-1, GIP, Glucagon) — high-dose 15mg vial for advanced metabolic research." }
];

const categories = ["All","Metabolic","Growth Hormone","Regenerative","Nootropic","Longevity","Specialized"];
const counts: Record<string, number> = { All:23, Metabolic:4, "Growth Hormone":3, Regenerative:5, Nootropic:2, Longevity:5, Specialized:4 };

export default function Home() {
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const filtered = useMemo(() => category === "All" ? products : products.filter(p => p.category === category), [category]);

  return <main>
    <div className="shipping">FREE Shipping on orders $200+</div>
    <header className="site-header">
      <a className="brand" href="#home"><span className="brand-mark">LE</span><span>LION ELITE</span></a>
      <nav className="desktop-nav"><a href="#home">Home</a><a href="#products">Products</a><a href="#about">About Us</a><a href="#contact">Contact</a></nav>
      <div className="header-actions"><button className="cart-button" aria-label="Cart">Bag <span>{cartCount}</span></button><a className="shop-button" href="#products">Shop Now</a></div>
    </header>

    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="hero-copy">
        <div className="eyebrow">PREMIUM RESEARCH PEPTIDES</div>
        <h1>LION ELITE<br/><span>WELLNESS</span></h1>
        <p>Premium research-grade peptides for elite performance. Precision-formulated compounds delivering molecular excellence.</p>
        <div className="hero-actions"><a className="gold-button" href="#products">Explore Products <span>→</span></a><a className="text-button" href="#about">Learn More <span>↓</span></a></div>
      </div>
      <div className="hero-stats">
        <div><strong>13</strong><span>Peptides</span></div><div><strong>Research Grade</strong><span>Lab Tested</span></div><div><strong>99%+</strong><span>Purity</span></div><div><strong>Fast Shipping</strong><span>Worldwide</span></div>
      </div>
      <a className="scroll-hint" href="#featured">Scroll to Explore <span>↓</span></a>
    </section>

    <section id="featured" className="featured-section">
      <div className="section-title"><span>FEATURED</span><h2>Popular Compounds</h2></div>
      <div className="featured-track">
        {[...featured,...featured].map((p,i) => <a className="featured-card" href={`/products/${p.slug}`} key={`${p.slug}-${i}`}>
          <div className="featured-meta"><span>{p.category}</span><strong>${p.price.toFixed(2)}</strong></div>
          <h3>{p.name}</h3><p>{p.description}</p>
          <div className="featured-bottom"><b>{p.concentration}</b><span>View Details →</span></div>
        </a>)}
      </div>
    </section>

    <section id="products" className="catalog-section">
      <div className="section-title centered"><span>CATALOG</span><h2>Research Peptides</h2><p>Premium compounds for advanced scientific research. All products tested by Janoshik analytical laboratory.</p></div>
      <div className="filter-row">{categories.map(c => <button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}<span>({counts[c]})</span></button>)}</div>
      <div className="product-grid">
        {filtered.map(p => <article className="product-card" key={p.slug}>
          <div className="card-badges"><span>{p.category}</span>{p.coa && <span className="coa-badge">CoA Available</span>}{p.stock && <span className="stock-badge">{p.stock}</span>}</div>
          <a href={`/products/${p.slug}`} className="product-image-wrap">{p.image ? <img src={`${OLD_ASSET_BASE}${p.image}`} alt={p.name}/> : <div className="image-placeholder"><span>LE</span></div>}</a>
          <div className="card-content">
            <a href={`/products/${p.slug}`}><h3>{p.name}</h3></a>{p.variants && <span className="variants">{p.variants} dosages available</span>}
            <a className="price" href={`/products/${p.slug}`}>{p.variants ? "From " : ""}$ {p.price.toFixed(2)}</a>
            <p>{p.description}</p>
            <div className="concentration"><span>Concentration</span><strong>{p.concentration}</strong></div>
            <div className="research-label">Research Use Only</div>
            <div className="card-actions"><button onClick={()=>setCartCount(n=>n+1)}>Add to Cart</button><a href={`/products/${p.slug}`}>Details</a></div>
          </div>
        </article>)}
      </div>
      <p className="catalog-disclaimer">All products sold by Lion Elite Wellness are for research use only. Not for human consumption or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease. Products have not been evaluated by the FDA. By purchasing, buyer certifies they are a qualified researcher.</p>
    </section>

    <section className="excellence-section">
      <div className="section-title centered"><span>WHY CHOOSE US</span><h2>Research Excellence</h2><p>Committed to providing the highest quality peptides for scientific advancement</p></div>
      <div className="excellence-grid">
        {[['◇','99%+ Purity','Every batch undergoes rigorous HPLC and mass spectrometry analysis'],['⌁','Lab Certified','Third-party tested with certificates of analysis for each product'],['❄','Cold Chain','Temperature-controlled shipping to maintain peptide integrity'],['↗','Fast Delivery','Same-day processing with express shipping options worldwide'],['◎','Research Support','Detailed protocols and dosing guidelines for your research'],['✓','Quality Promise','100% satisfaction guarantee on all research compounds']].map(([icon,title,text])=><div className="excellence-card" key={title}><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{text}</p></div>)}
      </div>
    </section>

    <section id="about" className="about-section">
      <div className="about-intro"><div><span className="eyebrow">ABOUT US</span><h2>Who We Are</h2><p>Lion Elite Wellness is a research peptide supplier dedicated to providing licensed researchers and qualified professionals with premium, analytically verified compounds.</p></div>
      <div className="about-brand"><div className="about-logo">LE</div><h3>LION ELITE WELLNESS</h3><span>Research Peptide Specialists</span></div></div>
      <div className="about-copy"><p>We believe that access to high-purity research compounds should come with transparency, accountability, and education. That's why every product we offer is backed by third-party testing, clear documentation, and a strict research-use-only policy.</p><p>Our catalog is curated from analytically tested sources and updated continuously as new compounds enter active research phases. We serve independent researchers, licensed professionals, and academic institutions across the United States.</p></div>
      <div className="about-stats"><div><strong>25+</strong><span>Products Available</span></div><div><strong>9+</strong><span>Lab-Verified Compounds</span></div><div><strong>1–2 Days</strong><span>Order Fulfillment</span></div><div><strong>100%</strong><span>Satisfaction Guarantee</span></div></div>
      <div className="about-pillars">{[['Research-Grade Purity','Every compound we carry is sourced for analytical-grade research use, with third-party Janoshik certificates available on applicable products.'],['Compliance First','All products are sold strictly for laboratory research purposes. We enforce researcher certification at checkout and maintain full legal compliance.'],['Transparent Testing','We publish Certificates of Analysis directly on product pages so you can verify purity and identity before you order.'],['Researcher Support','Our team is available at info@lionelitewellness.com to assist with product inquiries, reconstitution guidance, and order questions.']].map(([h,p])=><div key={h}><h4>{h}</h4><p>{p}</p></div>)}</div>
    </section>

    <section className="policies-section">
      <div className="section-title centered"><span>POLICIES</span><h2>Shipping, Returns & Refunds</h2><p>Everything you need to know about how we ship and our return and refund policies.</p></div>
      <div className="policy-columns">
        <div className="policy-card"><h3>Shipping Information</h3><h4>Domestic Shipping</h4><p>All orders ship from our US warehouse. Standard shipping takes 4–7 business days. Express options may be available at checkout. Shipping fees are calculated at checkout based on order weight and destination.</p><h4>Processing Time</h4><p>Orders are processed within 1–2 business days after payment is confirmed via Zelle or CashApp. You will receive an order confirmation email once processing begins.</p><h4>Packaging</h4><p>All peptides are shipped in discreet, temperature-appropriate packaging to preserve compound integrity. Lyophilized (freeze-dried) peptides are stable at room temperature for shipping but should be refrigerated upon receipt.</p><h4>Shipping Jurisdiction</h4><p>Customers are solely responsible for ensuring that the purchase, possession, and use of research peptides complies with all applicable federal, state, and local laws in their jurisdiction. Lion Elite Wellness assumes no liability for customs issues or regulatory actions.</p></div>
        <div className="policy-card"><h3>Returns & Refunds</h3><h4>Damaged or Incorrect Orders</h4><p>If you receive a damaged product or an incorrect item, contact us within 48 hours of delivery at info@lionelitewellness.com with your order details and photos. We will arrange a replacement or refund at our discretion.</p><h4>No Returns on Research Compounds</h4><p>Due to the nature of research peptides, we do not accept returns on opened or used products. Unused, unopened items may be considered for return within 7 days of delivery — contact us first before shipping anything back.</p><h4>Refunds</h4><p>Approved refunds are processed within 5–7 business days back to the original payment method. Zelle and CashApp refunds are issued manually and may take additional time.</p><h4>Lost Packages</h4><p>If your tracking shows delivered but you have not received your package, contact us within 5 days of the delivery date. We will work with the carrier to investigate. Lion Elite Wellness is not responsible for packages stolen after confirmed delivery.</p></div>
      </div>
      <p className="policy-note"><strong>Research Use Only.</strong> All products are sold strictly for in-vitro laboratory and analytical research purposes only. Not for human consumption or veterinary use. By placing an order you confirm that you are a licensed researcher or qualified professional and agree to all Terms and Conditions.</p>
    </section>

    <section className="legal-section">
      <div className="section-title centered"><span>LEGAL NOTICE</span><h2>Research Use & Compliance Disclosure</h2></div>
      <div className="legal-grid">{[['Strictly for Research','All products sold by Lion Elite Wellness are exclusively for laboratory research and scientific analysis by qualified researchers, licensed institutions, and scientific entities. These materials are not intended for human consumption, therapeutic use, or veterinary application.'],['Not FDA Evaluated','These statements have not been evaluated by the Food and Drug Administration. No product offered by Lion Elite Wellness is approved by the FDA for human or animal use, and none are intended to diagnose, treat, cure, or prevent any disease.'],['No Medical Guidance','Lion Elite Wellness does not provide and expressly disclaims any medical advice, clinical dosing guidance, or therapeutic recommendations. All website content is strictly informational and intended for scientific reference only.'],['Buyer Responsibility','By completing a purchase, the buyer confirms they are a qualified researcher and that all products will be used solely for lawful laboratory research. Compliance with all applicable local, state, federal, and international laws is the sole responsibility of the buyer.']].map(([h,p])=><div key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
      <div className="important-notice"><strong>IMPORTANT NOTICE</strong><p>For Research Use Only. This product is intended solely for laboratory research and analytical purposes. Not for human consumption or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease.</p></div>
    </section>

    <footer id="contact">
      <div className="footer-brand"><div className="brand"><span className="brand-mark">LE</span><span>LION ELITE</span></div><p>Premium research-grade peptides for scientific exploration. Committed to quality, purity, and innovation.</p></div>
      <div><h4>Quick Links</h4><a href="#products">Peptides for Sale</a><a href="#about">About Us</a><a href="#policies">Shipping, Returns & Refunds</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms and Conditions</a><a href="#contact">Contact</a><a href="/rep">Rep Portal</a></div>
      <div><h4>Legal</h4><a href="/terms">Terms and Conditions</a><a href="/privacy">Privacy Policy</a><a href="/disclaimers">Research Disclaimers</a><a href="#policies">Shipping Policy</a></div>
      <div><h4>Contact</h4><a href="mailto:info@lionelitewellness.com">info@lionelitewellness.com</a></div>
      <div className="footer-bottom"><span>© 2026 Lion Elite Wellness. All rights reserved. For research purposes only.</span><div><a href="/terms">Terms & Conditions</a><a href="/privacy">Privacy Policy</a><a href="/disclaimers">Disclaimers</a></div></div>
    </footer>
  </main>;
}
