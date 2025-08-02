import React from 'react';
import Link from 'next/link';
import { Github, Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">HENKAKU 生成AI会</h3>
                <p className="text-sm text-gray-400">情報アーカイブサイト</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              HENKAKUコミュニティの生成AI勉強会で発表された資料や情報をアーカイブしています。
              最新の生成AI技術について学び、実践的な知識を共有する場を提供します。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/henkaku"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/henkaku"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h4 className="text-lg font-semibold mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-gray-400 hover:text-white transition-colors">
                  勉強会一覧
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  このサイトについて
                </Link>
              </li>
            </ul>
          </div>

          {/* リソース */}
          <div>
            <h4 className="text-lg font-semibold mb-4">リソース</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://henkaku.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  HENKAKU公式サイト
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/henkaku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  Discordコミュニティ
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </li>
              <li>
                <Link href="/contribute" className="text-gray-400 hover:text-white transition-colors">
                  資料投稿について
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 HENKAKU 生成AI会. このサイトはコミュニティによって運営されています.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
