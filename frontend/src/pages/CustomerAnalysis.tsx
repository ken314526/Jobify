import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Briefcase, Eye } from 'lucide-react';

const CustomerAnalysis = () => {
  // Dummy data for charts
  const monthlyApplications = [
    { month: 'Jan', applications: 45 },
    { month: 'Feb', applications: 52 },
    { month: 'Mar', applications: 61 },
    { month: 'Apr', applications: 58 },
    { month: 'May', applications: 70 },
    { month: 'Jun', applications: 65 },
  ];

  const jobCategoryData = [
    { name: 'Frontend', value: 35 },
    { name: 'Backend', value: 25 },
    { name: 'Full Stack', value: 20 },
    { name: 'UI/UX', value: 15 },
    { name: 'DevOps', value: 5 },
  ];

  const viewsData = [
    { week: 'Week 1', views: 120 },
    { week: 'Week 2', views: 150 },
    { week: 'Week 3', views: 180 },
    { week: 'Week 4', views: 210 },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const stats = [
    { title: 'Total Applications', value: '351', icon: Users, trend: '+12%', color: 'text-chart-1' },
    { title: 'Active Jobs', value: '24', icon: Briefcase, trend: '+8%', color: 'text-chart-2' },
    { title: 'Total Views', value: '660', icon: Eye, trend: '+15%', color: 'text-chart-3' },
    { title: 'Conversion Rate', value: '53%', icon: TrendingUp, trend: '+5%', color: 'text-chart-4' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Analysis</h1>
        <p className="text-muted-foreground mt-2">Track your recruitment metrics and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-accent font-medium">{stat.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Applications</CardTitle>
            <CardDescription>Application trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Job Categories Distribution</CardTitle>
            <CardDescription>Breakdown of job postings by category</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {jobCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Job Views Trend</CardTitle>
          <CardDescription>Weekly job posting views</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalysis;
