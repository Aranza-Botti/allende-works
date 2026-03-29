import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  slug: string | null;
  category: string | null;
  vehicle_type: string | null;
  description: string | null;
  featured: boolean | null;
  published: boolean | null;
  created_at: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", category: "", vehicle_type: "", description: "", featured: false, published: true });
  const { toast } = useToast();

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects((data as Project[]) || []);
  };

  useEffect(() => { fetchProjects(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", category: "", vehicle_type: "", description: "", featured: false, published: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.title) return;
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const payload = { ...form, slug };

    if (editing) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
      toast({ title: "Proyecto actualizado" });
    } else {
      await supabase.from("projects").insert(payload);
      toast({ title: "Proyecto creado" });
    }
    setOpen(false);
    resetForm();
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    toast({ title: "Proyecto eliminado" });
    fetchProjects();
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug || "",
      category: p.category || "",
      vehicle_type: p.vehicle_type || "",
      description: p.description || "",
      featured: p.featured || false,
      published: p.published !== false,
    });
    setOpen(true);
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">{projects.length} proyectos</p>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent font-display tracking-wider">
                <Plus className="w-4 h-4 mr-2" /> Nuevo proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-foreground">{editing ? "Editar proyecto" : "Nuevo proyecto"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 bg-secondary border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Categoría</Label>
                    <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Tirones, Fabricación..." className="mt-1 bg-secondary border-border" />
                  </div>
                  <div>
                    <Label>Tipo de vehículo</Label>
                    <Input value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} className="mt-1 bg-secondary border-border" />
                  </div>
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 bg-secondary border-border" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(c) => setForm({ ...form, featured: c })} />
                    <Label>Destacado</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.published} onCheckedChange={(c) => setForm({ ...form, published: c })} />
                    <Label>Publicado</Label>
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full bg-gradient-accent font-display tracking-wider">
                  {editing ? "Guardar cambios" : "Crear proyecto"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-gradient-card border border-border rounded-lg p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{p.category} · {p.vehicle_type}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              <div className="mt-3 flex gap-2">
                {p.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Destacado</span>}
                {!p.published && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">Borrador</span>}
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminProjects;
