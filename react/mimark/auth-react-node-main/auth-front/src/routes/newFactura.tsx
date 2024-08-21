import PortalLayout from "../layout/PortalLayout";
import FacturaForm from "../components/facturaForm";
// import { useProducts } from "../hoocks/infoPage";


export default function NewFactura ()  {
    // const {productos,refetch,error,isLoading} = useProducts();
    return (
        <PortalLayout>
        <h1>Crear Factura</h1>
        <FacturaForm />
        </PortalLayout>
    );
    }