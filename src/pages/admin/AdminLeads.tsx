import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, MessageCircle, Phone } from "lucide-react";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const statusColors: Record<string, string> = {
  new: "bg-green-500/10 text-green-400 border-green-500/20",
  contacted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  quoted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  won: "bg-primary/10 text-primary border-primary/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  quoted: "Cotizado",
  won: "Ganado",
  lost: "Perdido",
};

interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  whatsapp: string | null;
  email: string | null;
  ciudad: string | null;
  vehiculo_tipo: string | null;
  marca: string | null;
  modelo: string | null;
  servicio: string;
  status: string;
  notes: string | null;
}

const getDaysSince = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    fetchLeads();
  };

  const filtered = leads.filter((l) => {
    const matchesSearch = l.nombre.toLowerCase().includes(search.toLowerCase()) ||
      l.servicio.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ["Nombre", "Teléfono", "WhatsApp", "Email", "Ciudad", "Vehículo", "Marca", "Modelo", "Servicio", "Estado", "Fecha"];
    const rows = filtered.map((l) => [
      l.nombre, l.telefono, l.whatsapp || "", l.email || "", l.ciudad || "",
      l.vehiculo_tipo || "", l.marca || "", l.modelo || "", l.servicio,
      statusLabels[l.status] || l.status, new Date(l.created_at).toLocaleDateString("es-MX"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  const getFollowUpLink = (lead: Lead) => {
    const days = getDaysSince(lead.created_at);
    const phone = lead.whatsapp || lead.telefono;
    const cleanPhone = phone.replace(/\D/g, "");
    const fullPhone = cleanPhone.startsWith("52") ? cleanPhone : `52${cleanPhone}`;
    const message = (WHATSAPP_MESSAGES.followUp as (name: string, days: number) => string)(lead.nombre, days);
    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por nombre o servicio..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {Object.entries(statusLabels).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCSV} className="border-border text-muted-foreground">
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
        </div>

        <div className="bg-gradient-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Nombre</th>
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Servicio</th>
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Vehículo</th>
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Estado</th>
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Fecha</th>
                  <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-foreground">{lead.nombre}</div>
                      <div className="text-xs text-muted-foreground">{lead.telefono}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{lead.servicio}</td>
                    <td className="p-4 text-muted-foreground">
                      {[lead.marca, lead.modelo].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="p-4">
                      <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                        <SelectTrigger className={`h-7 text-xs border rounded-full px-3 w-auto ${statusColors[lead.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([k, v]) => (
                            <SelectItem key={k} value={k}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {new Date(lead.created_at).toLocaleDateString("es-MX")}
                      <div className="text-[10px] text-muted-foreground/60">hace {getDaysSince(lead.created_at)} días</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <a href={getFollowUpLink(lead)} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white">
                            <MessageCircle className="w-3.5 h-3.5 mr-1" /> Seguimiento
                          </Button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      {loading ? "Cargando..." : "No hay leads que mostrar."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminLeads;
