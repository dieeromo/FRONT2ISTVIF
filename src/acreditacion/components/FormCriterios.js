import {usePutCriteriosMutation} from '../services/criteriosApi'


export default function FormCriterios() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const[putCriterio,{data, isSuccess}] = usePutCriteriosMutation()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const criterio = e.target.elements.criterio.value.trim()
        const fecha_creacion = e.target.elements.fecha_creacion.value.trim()
        putCriterio([criterio,user.access, fecha_creacion])

       
    }


    return (
        <>
        Form de criterios
        <form onSubmit={handleSubmit}>
            <input type="text" name="criterio" />
            <input type="date" name="fecha_creacion" />

            <button> Agregar </button>
        </form>
        </>
    )
}