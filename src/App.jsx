import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --card-white:rgba(252,252,248,0.96);
          --card-cream:rgba(248,246,234,0.97);
          --card-sage:rgba(225,238,210,0.97);
          --teal:#3d6644;
          --teal-label:#4a7a5a;
          --text-dark:#1e2e1a;
          --text-body:#3a4e34;
          --text-mid:#5a6e54;
          --text-light:#8a9e84;
          --gold:#c8a85a;
          --serif:'Cormorant Garamond',Georgia,serif;
        }
        html{scroll-behavior:smooth;}
        body{
          font-family:var(--serif);
          color:var(--text-dark);
          overflow-x:hidden;
          position:relative;
          background:#5a8c3a;
        }

        /* ── BACKGROUND ── */
        .bg-bokeh{
          position:fixed;inset:0;z-index:0;
          background-image:url('/unicorn-assets/background_greenbokeh.jpg');
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
        }
        .bg-bokeh::before{
          content:'';position:absolute;inset:0;
          background:rgba(60,100,30,0.18);
        }

        .page{position:relative;z-index:1;padding:0 0 80px;}

        /* ── NAV ── */
        nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:18px 40px;
          background:rgba(200,220,170,0.2);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(255,255,255,0.12);
        }
        .nav-brand{font-size:0.72rem;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.92);font-weight:400;}
        .nav-links{display:flex;gap:36px;}
        .nav-links a{font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.78);text-decoration:none;transition:color 0.2s;}
        .nav-links a:hover{color:#fff;}

        /* ── CARD BASE ── */
        .card{
          background:var(--card-white);
          border-radius:18px;
          margin:0 auto 20px;
          max-width:900px;
          padding:52px 60px;
          box-shadow:0 4px 40px rgba(30,60,10,0.18);
        }
        .card-cream{background:var(--card-cream);}
        .card-sage{background:var(--card-sage);}

        /* ── SCROLL REVEAL ── */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.75s ease,transform 0.75s ease;}
        .reveal.visible{opacity:1;transform:translateY(0);}
        .d1{transition-delay:0.08s;}.d2{transition-delay:0.16s;}
        .d3{transition-delay:0.24s;}.d4{transition-delay:0.32s;}
        .d5{transition-delay:0.40s;}.d6{transition-delay:0.48s;}

        /* ── SHARED ── */
        .label{font-size:0.68rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--teal-label);display:block;margin-bottom:14px;}
        .divider{width:60px;height:1px;background:var(--gold);margin:20px 0;}

        /* ── 1. HERO ── */
        #hero{
          min-height:100vh;display:flex;align-items:center;
          padding:110px 40px 60px;max-width:980px;margin:0 auto;gap:60px;
        }
        .hero-left{flex:1;}
        .hero-left h1{
          font-size:clamp(3.5rem,6vw,6rem);font-weight:300;
          letter-spacing:0.1em;line-height:1.0;
          color:#fff;text-transform:uppercase;
          text-shadow:0 2px 20px rgba(30,60,10,0.3);
          margin-bottom:28px;
        }
        .hero-left .hero-sub{
          font-size:1.2rem;font-weight:300;
          color:rgba(255,255,255,0.88);line-height:1.75;
          border-left:2px solid rgba(255,255,255,0.5);
          padding-left:18px;max-width:420px;
        }
        .hero-right{flex:0 0 380px;display:flex;align-items:center;justify-content:center;}
        .hero-right img{
          width:360px;height:360px;object-fit:contain;
          filter:drop-shadow(0 8px 30px rgba(20,50,5,0.45)) brightness(1.05);
        }

        /* ── 2. WHO WE ARE ── */
        .who-inner{display:flex;align-items:center;gap:50px;}
        .who-logo img{width:180px;height:180px;object-fit:contain;display:block;filter:grayscale(100%) contrast(1.1) brightness(0.82);}
        .who-text h2{font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:300;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-dark);margin-bottom:18px;}
        .who-text p{font-size:1.1rem;font-weight:300;line-height:1.9;color:var(--text-body);}

        /* ── 3. MAKERS ── */
        .makers-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .makers-img-col{
          border-radius:18px 0 0 18px;overflow:hidden;
          min-height:480px;display:flex;align-items:center;justify-content:center;
        }
        .makers-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .makers-text-col{padding:48px 44px;}
        .makers-text-col h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;color:var(--text-dark);margin-bottom:10px;}
        .makers-text-col .intro-p{font-size:0.98rem;font-weight:300;color:var(--text-mid);line-height:1.7;margin-bottom:28px;}
        .makers-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .maker-card{background:rgba(240,248,230,0.7);border:1px solid rgba(120,170,80,0.2);border-radius:10px;padding:20px 18px;transition:transform 0.25s,background 0.25s;}
        .maker-card:hover{transform:translateY(-3px);background:rgba(240,248,230,0.95);}
        .maker-card h3{font-size:0.98rem;font-weight:600;color:var(--teal);margin-bottom:6px;}
        .maker-card p{font-size:0.88rem;font-weight:300;line-height:1.6;color:var(--text-mid);}

        /* ── 4. SETTING ── */
        .setting-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .setting-img-col{
          border-radius:18px 0 0 18px;overflow:hidden;
          min-height:520px;display:flex;align-items:center;justify-content:center;
        }
        .setting-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting-content{padding:52px 48px;}
        .setting-content h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--text-dark);margin-bottom:12px;}
        .setting-sub{font-size:1.15rem;font-weight:300;color:var(--text-body);line-height:1.5;margin-bottom:18px;}
        .setting-desc{font-size:0.95rem;font-weight:300;line-height:1.8;color:var(--text-mid);margin-bottom:32px;}
        .setting-features{display:flex;flex-direction:column;gap:22px;}
        .sf h3{font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--teal);font-weight:600;margin-bottom:5px;}
        .sf p{font-size:0.93rem;font-weight:300;line-height:1.6;color:var(--text-body);}

        /* ── PHOTO CARDS ── */
        .photo-card{
          max-width:900px;margin:0 auto 20px;
          border-radius:18px;overflow:hidden;
          box-shadow:0 4px 40px rgba(30,60,10,0.22);
          position:relative;min-height:380px;
          display:flex;align-items:center;
        }
        .photo-card img.ph-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
        .photo-card .ph-overlay{position:relative;z-index:2;padding:60px 70px;}
        .photo-card .ph-overlay-bg{position:absolute;inset:0;background:rgba(20,40,10,0.38);z-index:1;}
        .monument-text{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:300;line-height:1.4;color:rgba(255,255,255,0.93);text-shadow:0 2px 20px rgba(10,30,5,0.45);}
        .monument-text em{display:block;font-style:italic;color:rgba(210,238,160,0.96);}

        /* ── 6. LABORATORY ── */
        .lab-header{text-align:center;margin-bottom:40px;}
        .lab-header h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--text-dark);margin-bottom:14px;}
        .lab-header p{font-size:1rem;font-weight:300;color:var(--text-mid);line-height:1.8;max-width:680px;margin:0 auto;}
        .lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
        .lab-item{background:rgba(255,255,255,0.55);border:1px solid rgba(140,180,100,0.3);border-radius:12px;padding:28px 24px;transition:transform 0.25s,background 0.25s;}
        .lab-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.8);}
        .lab-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:8px;}
        .lab-item p{font-size:0.9rem;font-weight:300;line-height:1.65;color:var(--text-mid);}
        .no-place{background:rgba(255,255,255,0.5);border:1px solid rgba(140,180,100,0.25);border-radius:12px;padding:36px 40px;}
        .no-place .np-label{font-size:0.68rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--teal-label);display:block;margin-bottom:12px;}
        .no-place h3{font-size:1.6rem;font-weight:400;color:var(--text-dark);margin-bottom:14px;letter-spacing:0.02em;}
        .no-place p{font-size:0.9rem;font-weight:300;line-height:1.9;color:var(--text-mid);}

        /* ── 8. PHASE I ── */
        .phase-header{text-align:center;margin-bottom:44px;}
        .phase-header h2{font-size:clamp(2.2rem,3.8vw,3.4rem);font-weight:300;color:var(--text-dark);margin-bottom:14px;}
        .phase-header p{font-size:1rem;font-weight:300;color:var(--text-mid);line-height:1.8;max-width:640px;margin:0 auto;}
        .ritual-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .ritual-item{background:rgba(255,255,255,0.5);border:1px solid rgba(140,180,100,0.25);border-radius:12px;padding:26px 22px;transition:transform 0.25s,background 0.25s;}
        .ritual-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.78);}
        .ritual-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:7px;}
        .ritual-item p{font-size:0.9rem;font-weight:300;line-height:1.6;color:var(--text-mid);}

        /* ── 9. PHASE II ── */
        .phase2-inner{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start;}
        .phase2-img{border-radius:12px;overflow:hidden;min-height:380px;display:flex;align-items:center;justify-content:center;}
        .phase2-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .phase2-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;color:var(--text-dark);margin-bottom:18px;}
        .phase2-text p{font-size:0.98rem;font-weight:300;line-height:1.85;color:var(--text-body);margin-bottom:16px;}
        .phase2-highlight{background:rgba(200,230,180,0.4);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:18px 22px;margin-top:8px;}
        .phase2-highlight h3{font-size:0.98rem;font-weight:600;color:var(--teal);margin-bottom:6px;}
        .phase2-highlight p{font-size:0.9rem;font-weight:300;color:var(--text-mid);line-height:1.65;}

        /* ── 10. REVENUE ── */
        .revenue-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .revenue-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:480px;display:flex;align-items:center;justify-content:center;}
        .revenue-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .revenue-content{padding:52px 48px;}
        .revenue-content h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--text-dark);margin-bottom:32px;}
        .rev-list{display:flex;flex-direction:column;gap:12px;}
        .rev-item{background:rgba(255,255,255,0.55);border:1px solid rgba(140,180,100,0.25);border-radius:10px;padding:20px 22px;transition:transform 0.25s,background 0.25s;}
        .rev-item:hover{transform:translateX(4px);background:rgba(255,255,255,0.8);}
        .rev-item h3{font-size:1rem;font-weight:600;color:var(--text-dark);margin-bottom:5px;}
        .rev-item p{font-size:0.88rem;font-weight:300;line-height:1.6;color:var(--text-mid);}

        /* ── 11. FOUNDER ── */
        .founder-inner{display:grid;grid-template-columns:1fr 1.4fr;gap:60px;align-items:start;}
        .founder-img{border-radius:12px;overflow:hidden;min-height:460px;display:flex;align-items:center;justify-content:center;}
        .founder-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .ft-name{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:300;color:var(--text-dark);margin-bottom:4px;}
        .ft-sub{font-size:0.95rem;font-weight:300;color:var(--text-light);margin-bottom:22px;display:block;}
        .founder-bullets{list-style:none;margin-top:8px;}
        .founder-bullets li{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid rgba(140,180,100,0.2);font-size:0.98rem;font-weight:300;line-height:1.65;color:var(--text-body);}
        .founder-bullets li:last-child{border-bottom:none;}
        .founder-bullets li::before{content:'✦';color:var(--gold);font-size:0.6rem;flex-shrink:0;margin-top:6px;}

        /* ── 12. ART ── */
        .art-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
        .art-img{border-radius:12px;overflow:hidden;min-height:420px;display:flex;align-items:center;justify-content:center;}
        .art-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .art-text h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:300;color:var(--text-dark);margin-bottom:18px;}
        .art-text p{font-size:0.97rem;font-weight:300;line-height:1.85;color:var(--text-body);margin-bottom:16px;}
        .art-quote{font-size:1.15rem;font-style:italic;font-weight:400;color:var(--teal);border-left:3px solid var(--gold);padding-left:18px;margin:22px 0;line-height:1.6;}
        .art-press{font-size:0.85rem;font-weight:300;color:var(--text-light);}

        /* ── 13. CTA ── */
        .cta-card{background:var(--card-cream);border-radius:18px;max-width:900px;margin:0 auto;padding:80px 60px;text-align:center;box-shadow:0 4px 40px rgba(30,60,10,0.18);position:relative;overflow:hidden;}
        .cta-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.13;}
        .cta-inner{position:relative;z-index:1;}
        .cta-logo{width:120px;height:120px;object-fit:contain;filter:grayscale(100%) contrast(1.1) brightness(0.8);margin:0 auto 32px;display:block;}
        .cta-card h2{font-size:clamp(2.5rem,5vw,4rem);font-weight:300;color:var(--text-dark);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:18px;}
        .cta-card p{font-size:1.1rem;font-weight:300;color:var(--text-mid);margin-bottom:44px;line-height:1.7;}
        .cta-btn{display:inline-block;padding:16px 48px;border:1.5px solid var(--teal);color:var(--teal);font-family:var(--serif);font-size:0.85rem;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;transition:all 0.3s;background:transparent;cursor:pointer;border-radius:2px;}
        .cta-btn:hover{background:var(--teal);color:#fff;transform:translateY(-2px);box-shadow:0 6px 24px rgba(40,80,30,0.25);}

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          .makers-split,.setting-split,.revenue-split,.phase2-inner,.art-inner,.founder-inner{grid-template-columns:1fr;}
          .makers-img-col,.setting-img-col,.revenue-img-col{border-radius:18px 18px 0 0;min-height:260px;}
          .lab-grid,.ritual-grid,.makers-grid{grid-template-columns:1fr;}
          #hero{flex-direction:column;gap:32px;}
          .hero-right{flex:none;}
          .hero-right img{width:240px;height:240px;}
          .card{padding:32px 24px;}
          nav{padding:14px 20px;}
          .nav-links{display:none;}
        }
      `}</style>

      <div className="bg-bokeh" />

      <nav>
        <span className="nav-brand">Unicorn Alliance</span>
        <div className="nav-links">
          <a href="#who">About</a>
          <a href="#setting">The Château</a>
          <a href="#phase1">The Life</a>
          <a href="#phase2">Healing</a>
          <a href="#founder">Founder</a>
        </div>
      </nav>

      <div className="page" style={{paddingTop:'100px'}}>

        {/* ══ 1. HERO ══ */}
        <section id="hero">
          <div className="hero-left">
            <h1 className="reveal">Unicorn<br/>Alliance</h1>
            <p className="hero-sub reveal d2">Unicorns are rare. They are magical. Their horn purifies water. When they show up — expect miracles.</p>
          </div>
          <div className="hero-right reveal d3">
            <img src="/unicorn-assets/logo.svg" alt="Unicorn Alliance crest" />
          </div>
        </section>

        {/* ══ 2. WHO WE ARE ══ */}
        <section id="who" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <div className="who-inner">
              <div className="who-logo" style={{flex:'0 0 180px'}}>
                <img src="/unicorn-assets/logo.svg" alt="Unicorn Alliance logo" />
              </div>
              <div className="who-text">
                <h2>Who We Are</h2>
                <div className="divider" />
                <p style={{marginTop:'18px'}}>UNICORN ALLIANCE is a creative collective of makers who live their dreams and make magic together. The kind of magic that changes lives, that empowers and heals — not only each other but post treatment young adults with challenges.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. THE MAKERS ══ */}
        <section id="makers" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="makers-split">
              <div className="makers-img-col">
                <img src="/unicorn-assets/makers.jpg" alt="The Makers" />
              </div>
              <div className="makers-text-col">
                <span className="label">The Collective</span>
                <h2 className="reveal d1">The Makers</h2>
                <p className="intro-p reveal d2">Unicorn welcomes poets, painters, landscapers, builders, composers, scientists and entrepreneurs — anyone passionate about:</p>
                <div className="makers-grid">
                  <div className="maker-card reveal d2"><h3>Life Inside a Château</h3><p>Immersed in the French countryside, living and creating within a historic monument of extraordinary beauty.</p></div>
                  <div className="maker-card reveal d3"><h3>Daily Collaboration</h3><p>A diet of creative exchange with talented, passionate peers who push each other toward their highest potential.</p></div>
                  <div className="maker-card reveal d4"><h3>Crafting Culture</h3><p>Building environments and shared rituals that shift consciousness and elevate the human experience.</p></div>
                  <div className="maker-card reveal d5"><h3>Art Meets Healing</h3><p>Carving new pathways between creative expression and healing, celebrating modalities outside the medical model.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 4. THE SETTING ══ */}
        <section id="setting" style={{padding:'0 40px'}}>
          <div className="card card-white reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="setting-split">
              <div className="setting-img-col">
                <img src="/unicorn-assets/setting1.jpg" alt="The Château" />
              </div>
              <div className="setting-content">
                <span className="label">The Setting</span>
                <h2 className="reveal d1">The Setting</h2>
                <p className="setting-sub reveal d2">A 16th-century château in the heart of the Loire Valley.</p>
                <p className="setting-desc reveal d3">Unicorn Alliance lives in a 16th-century château in the heart of the Loire Valley. This historic monument has been in the same family for 9 generations, retaining many of its original components.</p>
                <div className="setting-features">
                  <div className="sf reveal d2"><h3>Marquetry &amp; Fireplaces</h3><p>Original craftsmanship preserved across nine generations of family stewardship.</p></div>
                  <div className="sf reveal d3"><h3>Orangerie</h3><p>A grand orangerie — perfect for a restaurant or performance piece.</p></div>
                  <div className="sf reveal d4"><h3>Hidden Stairways</h3><p>Secret passages and architectural mysteries woven into the château's bones.</p></div>
                  <div className="sf reveal d5"><h3>Stables, Atelier &amp; Glacier</h3><p>A medieval icehouse and historic outbuildings ripe for transformation into studios, sanctuaries, and living spaces.</p></div>
                  <div className="sf reveal d6"><h3>Pigeonnier &amp; 17th-Century Stove</h3><p>A giant pigeonnier and a remarkable 17th-century stove — extraordinary relics of another age.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 5. PHOTO / QUOTE CARD ══ */}
        <section style={{padding:'0 40px'}} className="reveal">
          <div className="photo-card" style={{minHeight:'380px'}}>
            <img className="ph-img" src="/unicorn-assets/quote.jpg" alt="Château" />
            <div className="ph-overlay-bg" />
            <div className="ph-overlay">
              <div className="monument-text">A 16th-century monument.<br/><em>Nine generations. One family.</em></div>
            </div>
          </div>
        </section>

        {/* ══ 6. CHÂTEAU AS LIVING LABORATORY ══ */}
        <section id="laboratory" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal">
            <div className="lab-header">
              <span className="label">The Château</span>
              <h2>Château as Living Laboratory</h2>
              <p style={{marginTop:'12px'}}>The Unicorn château is more than a historic estate — it is a living laboratory for building environments that foster creativity, leadership, and healing. Every element of this landscape becomes a teacher, a tool, and a sanctuary.</p>
            </div>
            <div className="lab-grid">
              <div className="lab-item reveal d2"><h3>Beauty as mood enhancer</h3><p>Aesthetic environments that actively shift emotional and psychological states.</p></div>
              <div className="lab-item reveal d3"><h3>Interior design as therapeutic container</h3><p>Art installation and spatial design as instruments of healing and transformation.</p></div>
              <div className="lab-item reveal d4"><h3>Green building practices</h3><p>Historic monument preservation as experimental field for green building practices.</p></div>
              <div className="lab-item reveal d5"><h3>Immersive room environments</h3><p>Rooms designed with therapeutic goals — inner calm, inspiration, alignment with ancestors, journey to the underground.</p></div>
            </div>
            <div className="no-place reveal d3" style={{marginTop:'16px'}}>
              <span className="np-label">No Place Like Home</span>
              <h3>The château as guild, sanctuary, and home.</h3>
              <p>The château functions as a multidisciplinary guild. Makers build and live in immersive environments in the château in collaboration with each other and a team of French artisans and experts trained in historic monuments. Makers have the opportunity to lease living and studio space from the many bedrooms and outbuildings in a flexible timeshare structure.</p>
            </div>
          </div>
        </section>

        {/* ══ 7. MONUMENT PHOTO ══ */}
        <section style={{padding:'0 40px'}} className="reveal">
          <div className="photo-card" style={{minHeight:'420px'}}>
            <img className="ph-img" src="/unicorn-assets/setting2.jpg" alt="Château monument" />
            <div className="ph-overlay-bg" />
            <div className="ph-overlay">
              <div className="monument-text">A 16th-century monument.<br/><em>Nine generations. One family.</em></div>
            </div>
          </div>
        </section>

        {/* ══ 8. PHASE I — CREATING CULTURE ══ */}
        <section id="phase1" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal">
            <div className="phase-header">
              <span className="label">Creating Culture</span>
              <h2>Phase I — Creating Culture</h2>
              <p style={{marginTop:'12px'}}>Daily rituals entrain and uplift frequency throughout the day, weaving a living culture of presence, creativity, and collective care.</p>
            </div>
            <div className="ritual-grid">
              <div className="ritual-item reveal d2"><h3>Sunrise &amp; sunset meditations</h3><p>Bookending each day with stillness and intention, anchoring the community in rhythm and light.</p></div>
              <div className="ritual-item reveal d3"><h3>Communal silence</h3><p>Moments of shared silence announced by a tolling bell — a pause that reconnects the collective.</p></div>
              <div className="ritual-item reveal d2"><h3>Grounding in the garden</h3><p>Sing and tone while caring for plants — embodied presence through earth and voice.</p></div>
              <div className="ritual-item reveal d3"><h3>Morning swims in the moat</h3><p>A daily ritual of immersion, awakening the body and spirit in the château's ancient waters.</p></div>
              <div className="ritual-item reveal d2"><h3>Rewilding through animal care</h3><p>Tending to animals as a practice of presence, empathy, and reconnection with the natural world.</p></div>
              <div className="ritual-item reveal d3"><h3>Shared farm-to-table meals</h3><p>Farm to table and organic, prepared by Unicorn's private chef — nourishment as ceremony and community.</p></div>
            </div>
          </div>
        </section>

        {/* ══ 9. PHASE II — INVITING IN THE VULNERABLE ══ */}
        <section id="phase2" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <span className="label">Inviting in the Vulnerable</span>
            <div className="phase2-inner">
              <div className="phase2-img">
                <img src="/unicorn-assets/phase2.jpg" alt="Phase II — Creative Mentorship" />
              </div>
              <div className="phase2-text">
                <h2 className="reveal d1">Phase II — Inviting in the Vulnerable</h2>
                <p className="reveal d2">Once the culture of makers is established, Unicorn offers <strong>creative mentorship</strong> to post-treatment teenagers and young adults with addiction and mental health challenges.</p>
                <p className="reveal d3">Unicorn's team of makers provides highly personalized support in awakening the creative voice of the individual through projects. Whether a symphony, art exhibit, performance, or book — <strong>the creative process and the awakening of purpose heals.</strong></p>
                <div className="phase2-highlight reveal d4">
                  <h3>Family Reunification</h3>
                  <p>Family members are invited to Unicorn for month-long visits to support the creative process of their loved one. This provides what other treatment models do not: a meeting ground for families to reunite, live together, and repair broken relationships.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. REVENUE STREAMS ══ */}
        <section id="revenue" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="revenue-split">
              <div className="revenue-img-col">
                <img src="/unicorn-assets/revenue.jpeg" alt="Revenue" />
              </div>
              <div className="revenue-content">
                <span className="label">Sustainability</span>
                <h2>Revenue Streams</h2>
                <div className="rev-list">
                  <div className="rev-item reveal d2"><h3>Product sales</h3><p>Artisan goods, publications, and creative works produced by the maker community.</p></div>
                  <div className="rev-item reveal d3"><h3>Experiential programs</h3><p>Immersive retreats, workshops, and healing programs hosted at the château.</p></div>
                  <div className="rev-item reveal d4"><h3>Strategic partnerships</h3><p>Collaborations with aligned organizations in art, wellness, and education.</p></div>
                  <div className="rev-item reveal d5"><h3>Leasing land to farmers</h3><p>Agricultural partnerships that activate the château's land and support local food systems.</p></div>
                  <div className="rev-item reveal d6"><h3>Short &amp; long-term rentals</h3><p>Flexible timeshare leasing of rooms and outbuildings to makers and visiting creatives.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 11. THE FOUNDER ══ */}
        <section id="founder" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal">
            <span className="label">The Founder</span>
            <div className="founder-inner">
              <div className="founder-img">
                <img src="/unicorn-assets/founder.jpeg" alt="Meghan Boody" />
              </div>
              <div className="founder-text">
                <p className="ft-name reveal d1">Meghan Boody</p>
                <span className="ft-sub reveal d2">Multimedia artist, pioneer, and visionary. Passionate about the process of inner change.</span>
                <div className="divider" />
                <ul className="founder-bullets">
                  <li className="reveal d2">Apprenticed with renowned photographer Hans Namuth</li>
                  <li className="reveal d3">Pioneer of Photoshop in fine art photography since the early '90s</li>
                  <li className="reveal d4">Work held in The Whitney Museum of American Art, Herbert F. Johnson Museum at Cornell, and MONA in Tasmania</li>
                  <li className="reveal d5">Monograph published by Kerber Verlag, 2016</li>
                  <li className="reveal d6">Founder and co-leader of Gang of Girls — a transformative think tank for women in creative fields — for 15 years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 12. MEGHAN'S ART ══ */}
        <section id="art" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <span className="label">The Work</span>
            <div className="art-inner">
              <div className="art-img">
                <img src="/unicorn-assets/hero.jpg" alt="Meghan Boody artwork" />
              </div>
              <div className="art-text">
                <h2 className="reveal d1">Meghan's Art</h2>
                <p className="reveal d2">Boody's fantastical photographs and interactive sculpture tell stories about the hero's journey, unfolding in her unique brew of fairy tale, myth, and personal memory. Her interest in quantum physics, Jungian psychology, and energy-based healing modalities inform her trippy artwork that questions our relationship with the beyond.</p>
                <p className="reveal d3">Her work will be displayed throughout the château, providing psychological tools, touchpoints, and portals for the community. Artwork by Unicorn's team of makers will follow.</p>
                <blockquote className="art-quote reveal d4">"The beauty of the past informs innovation of the present."</blockquote>
                <p className="art-press reveal d5">Boody has been celebrated for her magical homes in Dutch Vogue, New York magazine, Telegraph Magazine, H&amp;G, Cottages and Gardens, Messy Nessy Chic, and Timeout.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 13. ARE YOU A UNICORN? ══ */}
        <section id="cta" style={{padding:'0 40px 60px'}}>
          <div className="cta-card reveal">
            <img className="cta-bg" src="/unicorn-assets/cta.jpg" alt="" aria-hidden="true" />
            <div className="cta-inner">
              <img className="cta-logo" src="/unicorn-assets/logo.svg" alt="Unicorn Alliance" />
              <h2>Are You a Unicorn?</h2>
              <p>Discover our unique onboarding process</p>
              <a className="cta-btn" href="mailto:mboody@lookingglasslabs.com">Discover Now</a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
