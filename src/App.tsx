import './App.css'

function ThresholdArtwork() {
  return (
    <svg className="scene-illustration scene-illustration--threshold" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="threshold-stone" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3d4540" />
          <stop offset="0.46" stopColor="#171e1d" />
          <stop offset="1" stopColor="#080b0c" />
        </linearGradient>
        <linearGradient id="threshold-edge" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#b99e70" stopOpacity="0" />
          <stop offset="0.52" stopColor="#d5bd8d" stopOpacity="0.78" />
          <stop offset="1" stopColor="#8e8062" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="threshold-depth" cx="50%" cy="42%" r="62%">
          <stop stopColor="#151b1b" />
          <stop offset="0.65" stopColor="#080b0c" />
          <stop offset="1" stopColor="#030506" />
        </radialGradient>
      </defs>
      <path d="M0 900V145L156 74 244 172 296 900Z" fill="url(#threshold-stone)" />
      <path d="M1200 900V94L1090 151 1027 99 943 193 901 900Z" fill="url(#threshold-stone)" />
      <path d="M170 900V354C170 132 331 29 493 29S816 132 816 354V900H731V363C731 205 629 124 493 124S255 205 255 363V900Z" fill="url(#threshold-stone)" fillRule="evenodd" />
      <path d="M255 900V363C255 205 357 124 493 124S731 205 731 363V900Z" fill="url(#threshold-depth)" />
      <path d="M170 900V354C170 132 331 29 493 29S816 132 816 354V900" fill="none" stroke="url(#threshold-edge)" strokeWidth="2" />
      <path d="M255 900V363C255 205 357 124 493 124S731 205 731 363V900" fill="none" stroke="#aaa082" strokeOpacity="0.22" strokeWidth="1" />
      <path d="M0 816 222 777 326 824 433 789 590 839 785 797 940 845 1200 788V900H0Z" fill="#111616" />
      <path d="M0 858 272 828 478 863 741 824 1008 867 1200 838" fill="none" stroke="#677169" strokeOpacity="0.18" strokeWidth="2" />
    </svg>
  )
}

function CrossingArtwork() {
  return (
    <svg className="scene-illustration scene-illustration--crossing" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="crossing-stone" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3c4440" />
          <stop offset="0.5" stopColor="#151c1c" />
          <stop offset="1" stopColor="#080b0c" />
        </linearGradient>
        <radialGradient id="crossing-veil" cx="54%" cy="46%" r="57%">
          <stop stopColor="#829283" stopOpacity="0.2" />
          <stop offset="0.46" stopColor="#53645d" stopOpacity="0.1" />
          <stop offset="1" stopColor="#090d0d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="crossing-rim" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#6e786e" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#c4ad7d" stopOpacity="0.7" />
          <stop offset="1" stopColor="#6e786e" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d="M0 900V152L138 97 240 170 321 82 414 900Z" fill="url(#crossing-stone)" />
      <path d="M1200 900V87L1080 130 986 76 901 174 826 900Z" fill="url(#crossing-stone)" />
      <path d="M359 900V395C359 195 473 95 603 95S847 195 847 395V900" fill="none" stroke="#53605a" strokeOpacity="0.34" strokeWidth="80" />
      <path d="M359 900V395C359 195 473 95 603 95S847 195 847 395V900" fill="none" stroke="url(#crossing-rim)" strokeWidth="2" />
      <path d="M400 900V405C400 232 489 147 603 147S806 232 806 405V900Z" fill="#080b0c" />
      <path d="M400 900V405C400 232 489 147 603 147S806 232 806 405V900Z" fill="url(#crossing-veil)" />
      <path d="M434 900 485 520 564 344 604 278 644 351 721 527 777 900Z" fill="#0d1212" fillOpacity="0.78" />
      <path d="M0 814 228 792 369 837 505 810 705 846 908 805 1200 837V900H0Z" fill="#111616" />
      <path d="M427 900 504 852 600 883 691 846 781 900" fill="none" stroke="#a18e69" strokeOpacity="0.32" strokeWidth="2" />
    </svg>
  )
}

function UnknownArtwork() {
  return (
    <svg className="scene-illustration scene-illustration--unknown" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="unknown-mineral" x1="0" y1="0" x2="0.9" y2="1">
          <stop stopColor="#414943" />
          <stop offset="0.36" stopColor="#242c29" />
          <stop offset="1" stopColor="#0b1010" />
        </linearGradient>
        <linearGradient id="unknown-cut" x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="#fff8df" />
          <stop offset="0.22" stopColor="#ead39e" />
          <stop offset="0.52" stopColor="#fff5dc" />
          <stop offset="0.78" stopColor="#c7a66d" />
          <stop offset="1" stopColor="#f8e8bd" />
        </linearGradient>
        <radialGradient id="unknown-radiance" cx="63%" cy="48%" r="49%">
          <stop stopColor="#e8c98e" stopOpacity="0.2" />
          <stop offset="0.4" stopColor="#b89a69" stopOpacity="0.09" />
          <stop offset="1" stopColor="#a88a5b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="785" cy="423" rx="345" ry="394" fill="url(#unknown-radiance)" />
      <path d="M0 0H452L482 128 445 249 474 364 430 493 463 603 420 900H0Z" fill="url(#unknown-mineral)" />
      <path d="M0 0H452L482 128 445 249 474 364 430 493 463 603 420 900H0Z" fill="none" stroke="#9da394" strokeOpacity="0.11" strokeWidth="2" />
      <path d="M822 0H1200V900H759L789 748 754 632 798 506 766 374 809 241 779 120Z" fill="url(#unknown-mineral)" />
      <path d="M822 0H1200V900H759L789 748 754 632 798 506 766 374 809 241 779 120Z" fill="none" stroke="#adb09d" strokeOpacity="0.12" strokeWidth="2" />
      <path d="M258 0 365 92 404 229 368 336 434 450 391 573 451 702 419 900H217L252 743 214 612 256 487 218 355 260 224 224 99Z" fill="#151d1b" fillOpacity="0.72" />
      <path d="M699 0 787 102 756 231 798 358 761 491 811 617 775 743 819 900H612L648 757 615 626 655 498 618 368 653 235 624 106Z" fill="#17201d" fillOpacity="0.86" />
      <path d="M621 92 653 180 631 246 666 316 640 390 674 456 647 523 677 589 651 664 680 734 656 810 671 900 703 900 687 809 710 735 682 664 707 590 678 523 704 456 674 390 701 316 671 246 695 179 668 92Z" fill="#151a17" />
      <path d="M655 56 674 150 660 219 680 285 665 356 687 426 671 500 695 566 677 641 699 712 686 786 704 856" fill="none" stroke="#d8c18e" strokeOpacity="0.42" strokeWidth="3" />
      <path d="M662 78 675 153 663 224 678 290 665 360 681 427 670 500 688 567 675 641 692 712 683 785 695 856 701 900 707 900 702 854 691 784 704 713 688 640 700 567 683 499 694 427 674 359 687 290 669 224 681 153 668 78Z" fill="url(#unknown-cut)" />
      <path d="M0 781 168 752 302 790 431 762 548 809 679 781 799 816 947 767 1084 800 1200 774V900H0Z" fill="#111716" />
      <path d="M0 835 178 813 339 850 510 820 689 854 850 816 1038 853 1200 826" fill="none" stroke="#8d9588" strokeOpacity="0.18" strokeWidth="2" />
    </svg>
  )
}

function RevelationArtwork() {
  return (
    <svg className="scene-illustration scene-illustration--revelation" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="revelation-stone" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#42443d" />
          <stop offset="0.5" stopColor="#1c2220" />
          <stop offset="1" stopColor="#090c0d" />
        </linearGradient>
        <linearGradient id="revelation-rim" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8e8064" stopOpacity="0.18" />
          <stop offset="0.48" stopColor="#d2ba89" stopOpacity="0.72" />
          <stop offset="1" stopColor="#85775c" stopOpacity="0.24" />
        </linearGradient>
        <radialGradient id="revelation-void" cx="46%" cy="43%" r="58%">
          <stop stopColor="#020405" />
          <stop offset="0.75" stopColor="#080b0b" />
          <stop offset="1" stopColor="#252a26" />
        </radialGradient>
      </defs>
      <path d="M0 900V134L129 79 236 150 317 63 383 900Z" fill="url(#revelation-stone)" />
      <path d="M1200 900V78L1098 117 1016 66 931 147 835 900Z" fill="url(#revelation-stone)" />
      <ellipse cx="756" cy="421" rx="307" ry="329" fill="none" stroke="#343b36" strokeWidth="58" />
      <ellipse cx="756" cy="421" rx="307" ry="329" fill="none" stroke="url(#revelation-rim)" strokeWidth="2" />
      <ellipse cx="756" cy="421" rx="212" ry="235" fill="url(#revelation-void)" />
      <path d="M619 369C681 312 787 290 878 338" fill="none" stroke="#c6ad7b" strokeOpacity="0.48" strokeWidth="2" />
      <path d="M0 786 180 756 347 802 495 770 638 818 803 779 951 819 1086 770 1200 799V900H0Z" fill="#111615" />
      <path d="M279 900 438 842 579 874 744 840 896 882 1051 843" fill="none" stroke="#9a8969" strokeOpacity="0.28" strokeWidth="2" />
    </svg>
  )
}

function App() {
  return (
    <div className="experience">
      <header className="masthead">
        <a className="wordmark" href="#threshold" aria-label="The Veil — beginning">
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>THE VEIL</span>
        </a>
        <div className="masthead-meta"><span>FIELD NOTE 001</span><span>AN INTERACTIVE DREAM</span></div>
      </header>

      <div className="chapter-index" aria-hidden="true">
        <span>01</span><span className="index-rule" /><span>04</span>
      </div>

      <main className="story">
        <section id="threshold" className="chapter chapter--threshold" aria-labelledby="chapter-one-title">
          <div className="scene-art" aria-hidden="true"><ThresholdArtwork /></div>
          <div className="chapter-copy">
            <p className="eyebrow"><span>01</span><span className="eyebrow-line" /> THE THRESHOLD</p>
            <h1 id="chapter-one-title">The world<br />forgets its shape.</h1>
            <p className="chapter-note">Somewhere between the last thought<br />and the first light, a door appears.</p>
          </div>
          <a className="scroll-cue" href="#descent">
            <span>SCROLL TO DESCEND</span>
            <span className="scroll-stem" aria-hidden="true" />
          </a>
        </section>

        <section id="descent" className="chapter chapter--descent" aria-labelledby="chapter-two-title">
          <div className="scene-art" aria-hidden="true"><CrossingArtwork /></div>
          <div className="chapter-copy chapter-copy--right">
            <p className="eyebrow"><span>02</span><span className="eyebrow-line" /> THE CROSSING</p>
            <h2 id="chapter-two-title">The dark<br />opens inward.</h2>
            <p className="chapter-note">The threshold falls away behind you.<br />Another horizon gathers ahead.</p>
          </div>
        </section>

        <section id="beyond" className="chapter chapter--beyond" aria-labelledby="chapter-three-title">
          <div className="scene-art" aria-hidden="true"><UnknownArtwork /></div>
          <div className="chapter-copy">
            <p className="eyebrow"><span>03</span><span className="eyebrow-line" /> THE UNKNOWN</p>
            <h2 id="chapter-three-title">A country<br />without a horizon.</h2>
            <p className="chapter-note">The drowned observatory keeps its vigil.<br />The water remembers another sky.</p>
          </div>
        </section>

        <section id="revelation" className="chapter chapter--revelation" aria-labelledby="chapter-four-title">
          <div className="scene-art" aria-hidden="true"><RevelationArtwork /></div>
          <div className="chapter-copy">
            <p className="eyebrow"><span>04</span><span className="eyebrow-line" /> THE REVELATION</p>
            <h2 id="chapter-four-title">The dark<br />has an interior.</h2>
            <p className="chapter-note">Beyond the eclipsed sun, a chamber<br />holds its breath for you.</p>
          </div>
          <a className="return-link" href="#threshold">RETURN TO THE THRESHOLD <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="frame-footer" aria-hidden="true">
        <span>AN EXPLORATION OF THE UNSEEN</span>
        <span className="footer-coordinate">54°21′ N&nbsp;&nbsp; 18°39′ E</span>
      </footer>
      <div className="progress-line" aria-hidden="true" />
    </div>
  )
}

export default App
