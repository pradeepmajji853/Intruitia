import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Hero from './components/Hero-ai-focused';
import Services from './components/Services-ai-focused';
import AboutUs from './components/AboutUs-ai';
import AIToolsShowcase from './components/AIToolsShowcase';
import PageWrapper from './components/PageWrapper';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import RefundPolicy from './components/RefundPolicy';
import CancellationPolicy from './components/CancellationPolicy';
import AboutUsPage from './components/AboutUsPage';
import Pricing from './components/Pricing';

// Lazy load AI tools for better performance
const ContentGenerator = lazy(() => import('./components/ContentGenerator'));
const HashtagGenerator = lazy(() => import('./components/HashtagGenerator'));
const SocialMediaCaption = lazy(() => import('./components/SocialMediaCaption'));
const AdCopyGenerator = lazy(() => import('./components/AdCopyGenerator'));
const SEOMetaGenerator = lazy(() => import('./components/SEOMetaGenerator'));
const AIVideoEditor = lazy(() => import('./components/AIVideoEditor'));

// Loading component for AI tools
const AIToolLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
    <div className="text-center">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400/50 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Loading AI Tool</h3>
      <p className="text-blue-200/80">Preparing your creative workspace...</p>
    </div>
  </div>
);

function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <Services />
      <AIToolsShowcase />
      <AboutUs />
    </PageWrapper>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={
          <PageWrapper>
            <PrivacyPolicy />
          </PageWrapper>
        } />
        <Route path="/terms-and-conditions" element={
          <PageWrapper>
            <TermsAndConditions />
          </PageWrapper>
        } />
        <Route path="/pricing" element={
          <PageWrapper>
            <Pricing />
          </PageWrapper>
        } />
        <Route path="/refund-policy" element={
          <PageWrapper>
            <RefundPolicy />
          </PageWrapper>
        } />
        <Route path="/cancellation-policy" element={
          <PageWrapper>
            <CancellationPolicy />
          </PageWrapper>
        } />
        <Route path="/about-us" element={
          <PageWrapper>
            <AboutUsPage />
          </PageWrapper>
        } />
        
        {/* AI Tools Routes with Lazy Loading */}
        <Route path="/content-generator" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <ContentGenerator />
            </Suspense>
          </PageWrapper>
        } />
        <Route path="/hashtag-generator" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <HashtagGenerator />
            </Suspense>
          </PageWrapper>
        } />
        <Route path="/social-media-caption" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <SocialMediaCaption />
            </Suspense>
          </PageWrapper>
        } />
        <Route path="/ad-copy-generator" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <AdCopyGenerator />
            </Suspense>
          </PageWrapper>
        } />
        <Route path="/seo-meta-generator" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <SEOMetaGenerator />
            </Suspense>
          </PageWrapper>
        } />
        <Route path="/ai-video-editor" element={
          <PageWrapper>
            <Suspense fallback={<AIToolLoader />}>
              <AIVideoEditor />
            </Suspense>
          </PageWrapper>
        } />
        
        {/* Redirect unknown routes to homepage */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
