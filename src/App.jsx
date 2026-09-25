import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Committees from '@/pages/Committees';
import CommitteeDetail from '@/pages/CommitteeDetail';
import Secretariat from '@/pages/Secretariat';
import Registration from '@/pages/Registration';
import Applications from '@/pages/Applications';
import Partners from '@/pages/Partners';
import Contact from '@/pages/Contact';
import EChitsLogin from '@/pages/EChitsLogin';
import EChitsDesk from '@/pages/EChitsDesk';
import RulesOfProcedure from '@/pages/RulesOfProcedure';
import DelegateResources from '@/pages/DelegateResources';
import FAQ from '@/pages/FAQ';
import ScrollToTop from '@/components/ScrollToTop';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/committees/:slug" element={<CommitteeDetail />} />
        <Route path="/secretariat" element={<Secretariat />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/applications/chair" element={<Applications />} />
        <Route path="/applications/admin" element={<Applications />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rules-of-procedure" element={<RulesOfProcedure />} />
        <Route path="/resources" element={<DelegateResources />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
      <Route path="/echits/login" element={<EChitsLogin />} />
      <Route path="/echits/desk" element={<EChitsDesk />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App