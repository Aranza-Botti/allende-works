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

interface Service {
  id: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  long_description: string | null;
  icon: string | null;
  featured: boolean | null;
  published: boolean | null;
}

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", short_description: "", long_description: "", icon: "", featured: false, published: true });
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    setItems((data as Service[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ title: "", slug: "", short_description: "", long_description: "", icon: "", featured: false, published: true }); setEditing(null); };

  const handleSave = async () => {
    if (!form.title) return;
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const payload = { ...form, slug };
    if (editing) {
      await supabase.from("services").update(payload).eq("id", editing.id);
      toast({ title: "Servicio actualizado" });
    } else {
      await supabase.from("services").insert(payload);
      toast({ title: "Servicio creado" });
    }
    setOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Servicio eliminado" });
    fetchData();
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">{items.length} servicios</p>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent font-display tracking-wider">
                <Plus className="w-4 h-4 mr-2" /> Nuevo servicio
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-foreground">{editing ? "Editar servicio" : "Nuevo servicio"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label>Descripción corta</Label>
                  <Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label>Descripción larga</Label>
                  <Textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} rows={4} className="mt-1 bg-secondary border-border" />
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
                  {editing ? "Guardar" : "Crear"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {items.map((s) => (
            <div key={s.id} className="bg-gradient-card border border-border rounded-lg p-5 flex justify-between items-start">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.short_description}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(s); setForm({ title: s.title, slug: s.slug || "", short_description: s.short_description || "", long_description: s.long_description || "", icon: s.icon || "", featured: s.featured || false, published: s.published !== false }); setOpen(true); }} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminServices;
