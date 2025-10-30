import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight, BarChart, Users, Zap } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-card-lg mb-6">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Modern Job Portal
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              For Smart Recruiters
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your hiring process with powerful analytics, intuitive job posting, 
            and comprehensive candidate management.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-card-lg transition-smooth">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Easy Job Posting</h3>
            <p className="text-muted-foreground">
              Create and manage job listings with a simple, intuitive interface
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-card-lg transition-smooth">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl">
              <BarChart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Track applications, views, and conversions with beautiful visualizations
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-card-lg transition-smooth">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Fast & Efficient</h3>
            <p className="text-muted-foreground">
              Built with modern technologies for lightning-fast performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
