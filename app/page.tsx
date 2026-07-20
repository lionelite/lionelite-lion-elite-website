const products = [
  { name: "Retatrutide", category: "Metabolic", price: 149.99, concentration: "10mg/vial", description: "Triple receptor agonist (GLP-1, GIP, Glucagon) under active investigation for metabolic regulation." },
  { name: "Tirzepatide", category: "Metabolic", price: 139.99, concentration: "10mg/vial", description: "Dual GLP-1 / GIP receptor agonist for glycemic and metabolic research." },
  { name: "AOD-9604", category: "Metabolic", price: 99.99, concentration: "5mg/vial", description: "C-terminal HGH fragment investigated for lipolytic activity without affecting blood glucose or IGF-1." },
  { name: "Retatrutide 5mg", category: "Metabolic", price: 89.99, concentration: "5mg/vial", description: "Triple receptor agonist research compound in a 5mg vial." },
  { name: "Retatrutide 15mg", category: "Metabolic", price: 199.99, concentration: "15mg/vial", description: "Triple receptor agonist research compound in a 15mg vial." },
  { name: "IGF-1 LR3", category: "Growth Hormone", price: 189.99, concentration: "1mg/vial", description: "Long-R3 analogue of IGF-1 with extended half-life for downstream GH axis research." },
  { name: "CJC-1295 / Ipamorelin Blend", category: "Growth Hormone", price: 109.99, concentration: "10mg/vial (5mg+5mg)", description: "Synergistic GHRH + GHRP blend for pulsatile GH axis research." },
  { name: "Tesamorelin", category: "Growth Hormone", price: 89.99, concentration: "5mg/vial", description: "Stabilized GHRH analogue studied for GH axis modulation research." },
  { name: "BPC-157 Tablets", category: "Regenerative", price: 249.99, concentration: "500mcg/tablet — 100 tablets", description: "Oral BPC-157 tablets studied for GI mucosal and tissue-regeneration research." },
  { name: "BPC-157 / TB-500 Blend", category: "Regenerative", price: 109.99, concentration: "10mg/vial (5mg+5mg)", description: "Dual-compound regenerative blend for tissue-repair research." },
  { name: "GHK-Cu", category: "Regenerative", price: 89.99, concentration: "100mg/vial", description: "Copper-binding tripeptide studied in wound-healing, collagen, and gene-expression research." },
  { name: "Klow Blend 80mg", category: "Regenerative", price: 229.99, concentration: "80mg/vial", description: "Four-compound regenerative research blend containing GHK-Cu, BPC-157, TB-500, and KPV." },
  { name: "Semax", category: "Nootropic", price: 89.99, concentration: "5mg/vial", description: "Synthetic ACTH analogue studied in neuroprotective and cognitive research." },
  { name: "Selank", category: "Nootropic", price: 89.99, concentration: "10mg/vial", description: "Synthetic tuftsin analogue studied in nootropic and immunomodulatory research." },
  { name: "SS-31", category: "Longevity", price: 129.99, concentration: "10mg/vial", description: "Mitochondria-targeted tetrapeptide studied for oxidative stress and membrane integrity." },
  { name: "NAD+", category: "Longevity", price: 179.99, concentration: "1000mg/vial", description: "Essential cofactor studied in sirtuin activation, DNA repair, and mitochondrial function." },
  { name: "MOTS-c", category: "Longevity", price: 99.99, concentration: "10mg/vial", description: "Mitochondrial-derived peptide studied for metabolic homeostasis research." },
  { name: "KPV", category: "Regenerative", price: 84.99, concentration: "10mg/vial", description: "Alpha-MSH tripeptide studied for anti-inflammatory and mucosal-repair pathways." },
  { name: "PT-141", category: "Specialized", price: 99.99, concentration: "10mg/vial", description: "Melanocortin receptor agonist studied in CNS-mediated signaling research." },
  { name: "Kisspeptin", category: "Specialized", price: 99.99, concentration: "5mg/vial", description: "Hypothalamic neuropeptide studied in GnRH and HPG-axis research." },
  { name: "Thymosin Alpha-1", category: "Specialized", price: 149.99, concentration: "10mg/vial", description: "Thymic peptide studied in T-cell activation and immune-signaling research." },
  { name: "Epithalon", category: "Longevity", price: 89.99, concentration: "10mg/vial", description: "Tetrapeptide studied in telomerase and longevity-biology research." },
  { name: "Glutathione", category: "Longevity", price: 114.99, concentration: "1500mg/vial", description: "Antioxidant tripeptide studied in oxidative-stress and detoxification research." },
  { name: "Bacteriostatic Water", category: "Specialized", price: 29.99, concentration: "1.5ml/vial", description: "Sterile 0.9% benzyl alcohol water for laboratory reconstitution workflows." }
];

export default function Home() {
  return (
    <main>
      <div className="shipping">FREE Shipping on orders $200+</div>
      <nav>
        <a className="brand" href="#home">LION ELITE</a>
        <div className="navlinks">
          <a href="#home">Home</a><a href="#products">Products</a><a href="#about">About Us</a><a href="#contact">Contact</a>
        </div>
        <a className="button small" href="#products">Shop Now</a>
      </nav>

      <section id="home" className="hero">
        <div className="eyebrow">PREMIUM RESEARCH COMPOUNDS</div>
        <h1>LION ELITE<br/><span>WELLNESS</span></h1>
        <p>Premium research-grade peptides for elite scientific exploration. Precision-formulated compounds with a focus on quality, transparency, and analytical excellence.</p>
        <div className="actions"><a className="button" href="#products">Explore Products</a><a className="ghost" href="#about">Learn More</a></div>
        <div className="stats"><div><strong>20+</strong><span>Products</span></div><div><strong>99%+</strong><span>Purity Focus</span></div><div><strong>Fast</strong><span>Shipping</span></div><div><strong>Research</strong><span>Use Only</span></div></div>
      </section>

      <section className="featured">
        <div className="section-head"><span>FEATURED</span><h2>Popular Compounds</h2></div>
        <div className="featured-grid">
          {products.slice(0,5).map((p) => <article className="feature-card" key={p.name}><span>{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><div className="feature-bottom"><b>{p.concentration}</b><strong>${p.price.toFixed(2)}</strong></div></article>)}
        </div>
      </section>

      <section id="products" className="catalog">
        <div className="section-head"><span>CATALOG</span><h2>Research Peptides</h2><p>Premium compounds for advanced scientific research. Products are sold strictly for research use only.</p></div>
        <div className="product-grid">
          {products.map((p) => <article className="product-card" key={p.name}><div className="product-top"><span className="pill">{p.category}</span><span className="coa">Research Use Only</span></div><div className="vial">LE</div><h3>{p.name}</h3><div className="price">${p.price.toFixed(2)}</div><p>{p.description}</p><div className="concentration"><span>Concentration</span><b>{p.concentration}</b></div><button>Add to Cart</button></article>)}
        </div>
        <p className="legal-inline">All products sold by Lion Elite Wellness are for laboratory research use only. Not for human consumption or veterinary use. Products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      </section>

      <section id="about" className="why"><div className="section-head"><span>WHY CHOOSE US</span><h2>Research Excellence</h2></div><div className="why-grid"><div><h3>99%+ Purity Focus</h3><p>Analytical quality standards and transparent product information.</p></div><div><h3>Lab Documentation</h3><p>Certificates of analysis displayed where available.</p></div><div><h3>Fast Fulfillment</h3><p>Streamlined order processing and shipping support.</p></div><div><h3>Compliance First</h3><p>Strict research-use-only positioning across the catalog.</p></div></div></section>

      <section className="about"><div><span className="eyebrow">ABOUT US</span><h2>Who We Are</h2><p>Lion Elite Wellness is a research peptide supplier focused on premium, analytically verified compounds, transparent documentation, and clear research-use-only policies.</p></div><div className="about-panel"><strong>LION ELITE WELLNESS</strong><span>Research Peptide Specialists</span><p>Quality. Transparency. Accountability. Education.</p></div></section>

      <footer id="contact"><div><strong>LION ELITE</strong><p>Premium research-grade compounds for scientific exploration.</p></div><div><h4>Contact</h4><p>info@lionelitewellness.com</p></div><div><h4>Legal</h4><p>Research Use Only</p><p>Not for human consumption</p></div><div className="copyright">© 2026 Lion Elite Wellness. All rights reserved.</div></footer>
    </main>
  );
}
