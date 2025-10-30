import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addJob } from '@/store/slices/jobsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [lastDate, setLastDate] = useState('');
  
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !companyName || !lastDate) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(addJob({ title, description, companyName, lastDate }));
    
    setTitle('');
    setDescription('');
    setCompanyName('');
    setLastDate('');
    
    toast.success('Job posted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Post a New Job</h1>
        <p className="text-muted-foreground mt-2">Fill in the details to create a new job posting</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Job Details
          </CardTitle>
          <CardDescription>Enter the job information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g., Senior Frontend Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="e.g., Tech Innovations Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastDate">Last Date for Application</Label>
              <Input
                id="lastDate"
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
