import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteJob, toggleJobStatus, updateJob, fetchMyJobs } from '@/store/slices/jobsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Building2, Trash2, Edit, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const JobsPosted = () => {
  const { jobs, loading, error } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyJobs())
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      setActionInProgress(id);
      await dispatch(deleteJob(id)).unwrap();
      toast.success('Job deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error(error as string || 'Failed to delete job');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      setActionInProgress(id);
      await dispatch(toggleJobStatus(id)).unwrap();
      toast.success('Job status updated successfully');
    } catch (error) {
      toast.error(error as string || 'Failed to update job status');
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Jobs Posted</h1>
        <p className="text-muted-foreground mt-2">Manage your job postings</p>
      </div>

      {loading ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading your job postings...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <XCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      ) : jobs.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No jobs posted yet. Create your first job posting!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <Card key={job._id} className="shadow-card hover:shadow-card-lg transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {job.companyName}
                    </div>
                  </div>
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.status === 'active' ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted: {job.postedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {job.lastDate}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(job._id)}
                    className="flex-1"
                    disabled={actionInProgress === job._id}
                  >
                    {actionInProgress === job._id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {job.status === 'active' ? 'Close' : 'Reopen'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(job._id)}
                    disabled={actionInProgress === job._id}
                  >
                    {actionInProgress === job._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobsPosted;
