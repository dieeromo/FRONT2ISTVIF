import DashboardVisitante from "../../pages/components/DashboardVisitante"
import { useGetBolsaEmpleo_all_publicQuery } from '../services/generalApi'
import BolsaEmpleoCard from "./components/BolsaEmpleoCard"

export default function BolsaEmpleoPublic() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data ,isSuccess } = useGetBolsaEmpleo_all_publicQuery()
    //console.log(data)
    return (
        <DashboardVisitante>
            {isSuccess ? 
            <div className="grid grid-cols-2">
                {data.map((item, index) => (
                    <BolsaEmpleoCard
                        key={index}
                        institution={item.institutcion}
                        description={item.descripcion}
                        deadline={item.fecha_limite}
                        url={item.url}
                        phone={item.telefono}
                        email={item.email}
                       
                    />
                ))}
            </div>
                :
                <>
                    Cargando...
                </>
            }



        </DashboardVisitante>
    )
}