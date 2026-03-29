import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => (
  <AdminGuard>
    <AdminLayout>
      <div className="bg-gradient-card border border-border rounded-lg p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Configuración del negocio</h3>
        <p className="text-sm text-muted-foreground">
          La configuración del negocio (número de WhatsApp, dirección, horarios, redes sociales) se puede editar en el archivo <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">src/lib/constants.ts</code>.
        </p>
      </div>
    </AdminLayout>
  </AdminGuard>
);

export default AdminSettings;
