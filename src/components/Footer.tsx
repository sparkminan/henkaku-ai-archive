import React from 'react';
import Link from 'next/link';
import { Github, Twitter, ExternalLink, Zap, Brain, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-dark-900 border-t border-cyber-500/30 overflow-hidden">
      {/* 背景グリッド効果 */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* グラデーション背景 */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center shadow-neon-blue floating">
                <Zap className="text-dark-900 w-7 h-7" />
                <div className="absolute inset-0 bg-neon-blue opacity-20 rounded-lg blur-sm"></div>
              </div>
              <div>
                <h3 className="text-xl font-cyber font-bold text-neon-blue">
                  HENKAKU AI LAB
                </h3>
                <p className="text-sm text-cyber-300 font-cyber tracking-wider">
                  GENERATIVE AI ARCHIVE
                </p>
              </div>
            </div>
            
            <p className="text-cyan-200 mb-6 leading-relaxed">
              HENKAKUコミュニティにおける有志の勉強会「生成AI会」のアーカイブ。
              最新のAI技術を楽しく議論しながら学び、実験して日々の生活に役立てる。
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/sparkminan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-700/50 border border-cyber-500/50 rounded-lg text-cyan-300 
                         hover:text-neon-blue hover:border-neon-blue hover:shadow-neon-blue 
                         transition-all duration-300 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://x.com/spark_infinity8"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-700/50 border border-cyber-500/50 rounded-lg text-cyan-300 
                         hover:text-neon-blue hover:border-neon-blue hover:shadow-neon-blue 
                         transition-all duration-300 group font-cyber font-bold text-lg"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h4 className="text-lg font-cyber font-semibold mb-6 text-neon-purple flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium relative group">
                  HOME
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium relative group">
                  SESSIONS
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium relative group">
                  CATEGORIES
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium relative group">
                  ABOUT
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* リソース */}
          <div>
            <h4 className="text-lg font-cyber font-semibold mb-6 text-neon-pink flex items-center">
              <Code2 className="h-5 w-5 mr-2" />
              RESOURCES
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://henkaku.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium 
                           flex items-center group"
                >
                  HENKAKU OFFICIAL
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://community.henkaku.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium 
                           flex items-center group"
                >
                  DISCORD COMMUNITY
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 分割線 */}
        <div className="border-t border-cyber-500/30 mt-12 pt-8 text-center relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
          
          <p className="text-cyan-400 text-sm font-cyber">
            © 2025 HENKAKU GENERATIVE AI LAB. POWERED BY COMMUNITY.
          </p>
          
          {/* デコレーション */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full pulse-cyber"></div>
            <div className="w-2 h-2 bg-neon-purple rounded-full pulse-cyber" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-neon-pink rounded-full pulse-cyber" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      {/* フローティング要素 */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 
                      rounded-full blur-xl floating opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-neon-pink/10 to-neon-blue/10 
                      rounded-full blur-xl floating opacity-40" style={{animationDelay: '2s'}}></div>
    </footer>
  );
};

export default Footer;
