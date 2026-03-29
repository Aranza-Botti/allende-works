import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  client_name: string;
  rating: number;
  testimonial: string;
  published: boolean | null;
  featured: boolean | null;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ client_name: "", rating: 5, testimonial: "", published: true, featured: false });
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data as Testimonial[]) || []);
  };

  useEffect(() => { fetch(); }, []);

  const resetForm = () => { setForm({ client_name: "", rating: 5, testimonial: "", published: true, featured: false }); setEditing(null); };

  const handleSave = async () => {
    if (!form.client_name || !form.testimonial) return;
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
      toast({ title: "Testimonio actualizado" });
    } else {
      await supabase.from("testimonials").insert(form);
      toast({ title: "Testimonio creado" });
    }
    setOpen(false);
    resetForm();
    fetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Testimonio eliminado" });
    fetch();
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">{items.length} testimonios</p>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent font-display tracking-wider">
                <Plus className="w-4 h-4 mr-2" /> Nuevo testimonio
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-foreground">{editing ? "Editar" : "Nuevo testimonio"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nombre del cliente</Label>
                  <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label>Calificación (1-5)</Label>
                  <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="mt-1 bg-secondary border-border w-24" />
                </div>
                <div>
                  <Label>Testimonio</Label>
                  <Textarea value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} rows={3} className="mt-1 bg-secondary border-border" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.published} onCheckedChange={(c) => setForm({ ...form, published: c })} />
                    <Label>Publicado</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(c) => setForm({ ...form, featured: c })} />
                    <Label>Destacado</Label>
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
          {items.map((t) => (
            <div key={t.id} className="bg-gradient-card border border-border rounded-lg p-5 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-semibold text-foreground">{t.client_name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{t.testimonial}"</p>
                <div className="mt-2 flex gap-2">
                  {t.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Destacado</span>}
                  {!t.published && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">No publicado</span>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(t); setForm({ client_name: t.client_name, rating: t.rating, testimonial: t.testimonial, published: t.published !== false, featured: t.featured || false }); setOpen(true); }} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
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

export default AdminTestimonials;
