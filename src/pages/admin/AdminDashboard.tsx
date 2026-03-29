import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, FolderOpen, Star } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="bg-gradient-card border border-border rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-3xl font-bold text-foreground mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ leads: 0, newLeads: 0, projects: 0, testimonials: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [leads, projects, testimonials] = await Promise.all([
        supabase.from("leads").select("id, status", { count: "exact" }),
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("testimonials").select("id", { count: "exact" }),
      ]);
      const newLeads = leads.data?.filter((l) => l.status === "new").length || 0;
      setStats({
        leads: leads.count || 0,
        newLeads,
        projects: projects.count || 0,
        testimonials: testimonials.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Total leads" value={stats.leads} color="bg-primary/10 text-primary" />
          <StatCard icon={FileText} label="Leads nuevos" value={stats.newLeads} color="bg-green-500/10 text-green-400" />
          <StatCard icon={FolderOpen} label="Proyectos" value={stats.projects} color="bg-blue-500/10 text-blue-400" />
          <StatCard icon={Star} label="Testimonios" value={stats.testimonials} color="bg-yellow-500/10 text-yellow-400" />
        </div>
        <div className="bg-gradient-card border border-border rounded-lg p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Actividad reciente</h3>
          <p className="text-sm text-muted-foreground">Los leads más recientes aparecerán aquí.</p>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminDashboard;
