import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import PublicNavbar from './components/PublicNavbar';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import HomeDashboard from './components/HomeDashboard';
import InsightsDashboard from './components/InsightsDashboard';
import GoalsDashboard from './components/GoalsDashboard';
import InvestmentsView from './components/InvestmentsView';
import TransactionsView from './components/TransactionsView';
import ProfileSettings from './components/ProfileSettings';
import SettingsView from './components/SettingsView';
import AddTransactionModal from './components/AddTransactionModal';
import AuthModal from './components/AuthModal';
import PrivacyPolicy from './components/PrivacyPolicy';

function MainApp() {
  const { user, isAuthenticated, loading, authFetch, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard'); // Tabs: 'dashboard' | 'insights' | 'goals' | 'investments' | 'transactions' | 'profile' | 'settings'
  const [publicPage, setPublicPage] = useState('landing'); // Public: 'landing' | 'features'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core dynamic user data
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [insights, setInsights] = useState(null);

  // Fetch initial data from backend when user is authenticated
  const fetchData = async () => {
    if (!isAuthenticated) return;
    try {
      const [txRes, goalsRes, invRes, userRes, insightsRes] = await Promise.all([
        authFetch('/api/transactions'),
        authFetch('/api/goals'),
        authFetch('/api/investments'),
        authFetch('/api/user'),
        authFetch('/api/insights')
      ]);

      if (txRes.ok) setTransactions(await txRes.json());
      if (goalsRes.ok) setGoals(await goalsRes.json());
      if (invRes.ok) setInvestments(await invRes.json());
      if (userRes.ok) setUser(await userRes.json());
      if (insightsRes.ok) setInsights(await insightsRes.json());
    } catch (err) {
      console.log('Error fetching user data:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  // Compute live budget summary
  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const budget = user?.monthlyBudget || 35000;
  const remaining = Math.max(0, budget - totalSpent);
  const budgetUsedPercent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;

  const summary = {
    budget,
    totalSpent,
    remaining,
    budgetUsedPercent,
    daysLeft: Math.max(1, 31 - new Date().getDate()),
    weeklySpend: insights?.weeklySpend
  };

  // Add Transaction handler (Forces expense type)
  const handleAddTransaction = async (newTx) => {
    if (!isAuthenticated) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    try {
      const res = await authFetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({ ...newTx, type: 'expense' })
      });
      if (res.ok) {
        const saved = await res.json();
        setTransactions(prev => [saved, ...prev]);
        fetchData();
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  // Delete Transaction handler
  const handleDeleteTransaction = async (id) => {
    try {
      const res = await authFetch(`/api/transactions/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setTransactions(prev => prev.filter(t => t._id !== id));
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  // Add Goal handler
  const handleAddGoal = async (newGoal) => {
    if (!isAuthenticated) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    try {
      const res = await authFetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify(newGoal)
      });
      if (res.ok) {
        const saved = await res.json();
        setGoals(prev => [...prev, saved]);
        fetchData();
      }
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  // Allocate / Deposit money to goal
  const handleAllocateMoney = async (goalId, amount) => {
    try {
      const res = await authFetch(`/api/goals/${goalId}/allocate`, {
        method: 'POST',
        body: JSON.stringify({ amount })
      });
      if (res.ok) {
        const updatedGoal = await res.json();
        setGoals(prev => prev.map(g => g._id === goalId ? updatedGoal : g));
        fetchData();
      }
    } catch (err) {
      console.error('Error allocating goal money:', err);
    }
  };

  // Delete Goal handler
  const handleDeleteGoal = async (goalId) => {
    try {
      const res = await authFetch(`/api/goals/${goalId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setGoals(prev => prev.filter(g => g._id !== goalId));
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  // Investments Handlers
  const handleAddInvestment = async (newInv) => {
    if (!isAuthenticated) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    try {
      const res = await authFetch('/api/investments', {
        method: 'POST',
        body: JSON.stringify(newInv)
      });
      if (res.ok) {
        const saved = await res.json();
        setInvestments(prev => [saved, ...prev]);
        fetchData();
      }
    } catch (err) {
      console.error('Error adding investment:', err);
    }
  };

  const handleAllocateInvestment = async (investmentId, amount, currentValue) => {
    try {
      const res = await authFetch(`/api/investments/${investmentId}/allocate`, {
        method: 'POST',
        body: JSON.stringify({ amount, currentValue })
      });
      if (res.ok) {
        const updated = await res.json();
        setInvestments(prev => prev.map(i => i._id === investmentId ? updated : i));
        fetchData();
      }
    } catch (err) {
      console.error('Error allocating investment money:', err);
    }
  };

  const handleDeleteInvestment = async (investmentId) => {
    try {
      const res = await authFetch(`/api/investments/${investmentId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setInvestments(prev => prev.filter(i => i._id !== investmentId));
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting investment:', err);
    }
  };

  // Target Budget Update handler
  const handleUpdateBudget = async (newMonthlyBudget) => {
    try {
      const res = await authFetch('/api/user/budget', {
        method: 'PUT',
        body: JSON.stringify({ monthlyBudget: newMonthlyBudget })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        fetchData();
      }
    } catch (err) {
      console.error('Error updating budget:', err);
    }
  };

  // Update User profile/settings
  const handleUpdateUser = async (updatedData) => {
    try {
      const res = await authFetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  // Render Public Website if user is NOT authenticated
  if (!isAuthenticated) {
    if (publicPage === 'privacy') {
      return (
        <PrivacyPolicy
          onNavigateHome={() => setPublicPage('landing')}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        />
      );
    }

    return (
      <div className="min-h-screen bg-[#0b0b0e] text-white flex flex-col font-sans">
        {/* Public Header */}
        <PublicNavbar
          publicPage={publicPage}
          setPublicPage={setPublicPage}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        />

        {/* Public Page View */}
        {publicPage === 'landing' ? (
          <LandingPage
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
            onNavigateFeatures={() => setPublicPage('features')}
            onNavigatePrivacy={() => setPublicPage('privacy')}
          />
        ) : (
          <FeaturesPage
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
            onNavigateHome={() => setPublicPage('landing')}
            onNavigatePrivacy={() => setPublicPage('privacy')}
          />
        )}

        <AuthModal
          isOpen={authModal.isOpen}
          initialMode={authModal.mode}
          onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
          onSuccess={() => {
            setActiveTab('dashboard');
            fetchData();
          }}
        />
      </div>
    );
  }

  // Render Authenticated App Layout with Left Sidebar matching exact design
  return (
    <div className="min-h-screen bg-[#09090c] text-white flex font-sans selection:bg-paisa-lime selection:text-black">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto max-h-screen pt-16 md:pt-0">
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {(activeTab === 'dashboard' || activeTab === 'home') && (
            <HomeDashboard
              user={user}
              summary={summary}
              transactions={transactions}
              goals={goals}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onViewAllTransactions={() => setActiveTab('transactions')}
              onUpdateBudget={handleUpdateBudget}
              onDeleteTransaction={handleDeleteTransaction}
              onNavigateGoals={() => setActiveTab('goals')}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsDashboard
              insightsData={insights}
              user={user}
              transactions={transactions}
              investments={investments}
            />
          )}

          {activeTab === 'goals' && (
            <GoalsDashboard
              goals={goals}
              onAddGoal={handleAddGoal}
              onAllocateMoney={handleAllocateMoney}
              onDeleteGoal={handleDeleteGoal}
            />
          )}

          {activeTab === 'investments' && (
            <InvestmentsView
              investments={investments}
              onAddInvestment={handleAddInvestment}
              onAllocateInvestment={handleAllocateInvestment}
              onDeleteInvestment={handleDeleteInvestment}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              user={user}
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              user={user}
              summary={summary}
              onUpdateUser={handleUpdateUser}
              onBackToHome={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              summary={summary}
              transactions={transactions}
              onUpdateUser={handleUpdateUser}
              onUpdateBudget={handleUpdateBudget}
              onNavigatePrivacy={() => setActiveTab('privacy')}
            />
          )}

          {activeTab === 'privacy' && (
            <PrivacyPolicy
              onNavigateHome={() => setActiveTab('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Quick Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onSuccess={() => {
          setActiveTab('dashboard');
          fetchData();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
