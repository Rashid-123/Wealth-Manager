import React from 'react';
import { Github, Linkedin, ExternalLink, TrendingUp, Mail, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Message Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">PortfolioTracker</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-md">
                            Your intelligent portfolio management companion. Track investments, analyze performance,
                            and make informed decisions with real-time market insights and comprehensive analytics.
                        </p>
                        <div className="text-xs text-slate-500">
                            © 2025 PortfolioTracker. Built with precision for smart investors.
                        </div>
                    </div>

                    {/* Developer Info Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                            Developer
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-600">shadanrashid786@gmail.com</span>
                            </div>
                            <a
                                href="https://github.com/Rashid-123"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub Profile</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/shadan-rashid/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span>LinkedIn</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                                href="https://rashid-tau.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Portfolio Website</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Project Links Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                            Project
                        </h4>
                        <div className="space-y-3">
                            <a
                                href="https://github.com/yourusername/portfolio-tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>Source Code</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>

                            <div className="pt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Next.js
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 ml-2">
                                    Node.js
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-xs text-slate-500 mb-4 sm:mb-0">
                            Made with ❤️ for smart investing  • Real-time updates
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>Version 1.0.0</span>
                            <span>•</span>
                            <span>Updated {new Date().toLocaleDateString()}</span>
                            <span>•</span>
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                            <span>•</span>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;